import java.util.Arrays;

public class T2 extends Thread {
    int Tid = 2;
    Data data;
    int startPos;
    int endPos;

    public T2(Data data) {
        this.data = data;
        this.startPos = (Tid - 1) * data.H;
        this.endPos = Tid * data.H;
    }

    @Override
    public void run() {
        System.out.println("T2 start");
        try {
            // Введення E, MB
            initData();
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
            // S2 - сигнал про завершення обчислення 3
            data.semaphore_2.release(3);
            // S1,S3,S4. Очікування, поки всі потоки завершать обчислення 3
            data.semaphore_1.acquire();
            data.semaphore_3.acquire();
            data.semaphore_4.acquire();
            // Обчислення 4
            int[][] MB_H = Data.getSubmatrixFromColumns(data.MB, startPos, endPos);
            int[][] MC_H = Data.calculateStep4(data.MA, MB_H);
            // Обчислення 5
            int[] X_H = Data.calculateStep5(data.E, MC_H);
            // КД 2. S5 - семафор. Копія a2
            data.semaphore_5.acquire();
            ai = Integer.parseInt(String.valueOf(data.a));
            data.semaphore_5.release();
            // КД 3. Критична секція. Копія d2
            int di = Data.copyD_CS(data);
            // Обчислення 6
            int[] C_H = Data.getSubvector(data.C, startPos, endPos);
            int[] W_H = Data.calculateStep6(ai, di, C_H, X_H);
            // Об'єднання фінального результату
            Data.insertIntoFullW(data, W_H, startPos, endPos);
            // S6 - сигнал про завершення обчислення 6
            data.semaphore_6.release();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            System.out.println("T2 finish");
        }
    }

    public void initData() {
        Arrays.fill(data.E, 1);
        for (int i = 0; i < data.MB[0].length; i++) {
            Arrays.fill(data.MB[i], 1);
        }
    }
}