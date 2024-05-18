public class T2 extends Thread {

    private final Data data;

    public T2(Data data) {
        this.data = data;
    }

    @Override
    public void run() {
        System.out.println("T2 is started");

        // Введення MD, d
        data.MD = data.fillMatrix();
        data.d = data.fillScalar();
        data.controlVarMonitor.setD(data.d);

        // Сигнал про введення MD, d задачам T1,T3,T4
        data.controlSyncMonitor.inputSignal();

        // Чекати завершення введення даних у задачах T1,T3,T4
        data.controlSyncMonitor.inputWait();

        // Обчислення 1: a2=(Bн*Zн)
        int[] B_H = data.getSubvector(data.B, data.H, data.H * 2);
        int[] Z_H = data.getSubvector(data.Z, data.H, data.H * 2);

        int a2 = data.multiplyTwoVectors(B_H, Z_H);

        // КД1. Обчислення 2: a = a + a2
        data.controlVarMonitor.sumPartialA(a2);

        // Сигнал про обчислення "а" задачам T1,T3,T4
        data.controlSyncMonitor.sumPartASignal();

        // Чекати завершення обчислення "а" у задачах T1,T3,T4
        data.controlSyncMonitor.sumPartAWait();

        // Обчислення 3: Сн = R*MCн
        int[][] MC_H = data.getSubmatrixFromColumns(data.MC, data.H, data.H * 2);

        int[] C_H = data.multiplyVectorByMatrix(data.R, MC_H);

        // Об'єднання Сн в С
        data.insertSubVectorIntoVector(C_H, data.H, data.H * 2, 0);

        // Сигнал про обчислення "C" задачам T1,T3,T4
        data.controlSyncMonitor.calcC_Signal();

        // Чекати завершення обчислення "C" у задачах T1,T3,T4
        data.controlSyncMonitor.calcC_Wait();

        // КД2. Копія a2 = a
        a2 = data.controlVarMonitor.getCopyA();

        // КД3. Копія d2 = d
        int d2 = data.controlVarMonitor.getCopyD();

        // КД4. Копія p2 = p
        int p2 = data.controlVarMonitor.getCopyP();

        // Обчислення 4: Aн = S*MDн*p2+a2*Eн*d2
        int[][] MD_H = data.getSubmatrixFromColumns(data.MD, data.H, data.H * 2);
        int[] E_H = data.getSubvector(data.E, data.H, data.H * 2);

        int[] A_H = data.calculateStep4(MD_H, E_H, p2, a2, d2);

        // Об'єднання фінального результату
        data.insertSubVectorIntoVector(A_H, data.H, data.H * 2, 1);

        // Сигнал про завершення обчислення Aн потоку Т3
        data.controlSyncMonitor.finalOutputSignal();

        System.out.println("T2 is finished");
    }
}
