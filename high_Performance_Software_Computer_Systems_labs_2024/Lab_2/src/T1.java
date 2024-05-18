public class T1 extends Thread {
    int Tid = 1;
    Data data;
    int startPos = 0;
    int endPos;

    public T1(Data data) {
        this.data = data;
        endPos = Tid * data.H;
    }

    @Override
    public void run() {
        System.out.println("T1 start");
        try {
            // В1 - бар'єр, що сигналізує про очікування введення даних усіма іншими потоками.
            data.barrier1.await();
            // Обчислення 1
            int[][] MD_H = Data.getSubmatrixFromColumns(data.MD, startPos, endPos);
            int[] A_H = Data.calculateStep1(data.C, MD_H);
            // Обчислення 2
            int ai = Data.findMaxInVector(A_H);
            // Обчислення 3
            int finalAi = ai;
            // КД 1 . Атомік змінна
            data.a.updateAndGet(a -> Math.max(a, finalAi));
            // S1 - сигнал про завершення обчислення 3
            data.semaphore_1.release(3);
            // S2,S3,S4. Очікування, поки всі потоки завершать обчислення 3
            data.semaphore_2.acquire();
            data.semaphore_3.acquire();
            data.semaphore_4.acquire();
            // Обчислення 4
            int[][] MB_H = Data.getSubmatrixFromColumns(data.MB, startPos, endPos);
            int[][] MC_H = Data.calculateStep4(data.MA, MB_H);
            // Обчислення 5
            int[] X_H = Data.calculateStep5(data.E, MC_H);
            // КД 2. S5 - семафор. Копія a1
            data.semaphore_5.acquire();
            ai = Integer.parseInt(String.valueOf(data.a));
            data.semaphore_5.release();
            // КД 3. Критична секція. Копія d1
            int di = Data.copyD_CS(data);
            // Обчислення 6
            int[] C_H = Data.getSubvector(data.C, startPos, endPos);
            int[] W_H = Data.calculateStep6(ai, di, C_H, X_H);
            // Об'єднання фінального результату
            Data.insertIntoFullW(data, W_H, startPos, endPos);
            // чекати, щоб інші потоки завершили обчислення 6
            data.semaphore_6.acquire(3);
            // Виведення результату
            Data.printW(data);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            System.out.println("T1 finish");
        }
    }
}