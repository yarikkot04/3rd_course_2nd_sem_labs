public class T4 extends Thread {

    private final Data data;

    public T4(Data data) {
        this.data = data;
    }

    @Override
    public void run() {
        System.out.println("T4 is started");

        // Введення R, Z
        data.R = data.fillVector();
        data.Z = data.fillVector();

        // Сигнал про введення R, Z задачам T1,T2,T3
        data.controlSyncMonitor.inputSignal();

        // Чекати завершення введення даних у задачах T1,T2,T3
        data.controlSyncMonitor.inputWait();

        // Обчислення 1: a4=(Bн*Zн)
        int[] B_H = data.getSubvector(data.B, data.H * 3, data.N);
        int[] Z_H = data.getSubvector(data.Z, data.H * 3, data.N);

        int a4 = data.multiplyTwoVectors(B_H, Z_H);

        // КД1. Обчислення 2: a = a + a4
        data.controlVarMonitor.sumPartialA(a4);

        // Сигнал про обчислення "а" задачам T1,T2,T3
        data.controlSyncMonitor.sumPartASignal();

        // Чекати завершення обчислення "а" у задачах T1,T2,T3
        data.controlSyncMonitor.sumPartAWait();

        // Обчислення 3: Сн = R*MCн
        int[][] MC_H = data.getSubmatrixFromColumns(data.MC, data.H * 3, data.N);

        int[] C_H = data.multiplyVectorByMatrix(data.R, MC_H);

        // Об'єднання Сн в С
        data.insertSubVectorIntoVector(C_H, data.H * 3, data.N, 0);

        // Сигнал про обчислення "C" задачам T1,T2,T3
        data.controlSyncMonitor.calcC_Signal();

        // Чекати завершення обчислення "C" у задачах T1,T2,T3
        data.controlSyncMonitor.calcC_Wait();

        // КД2. Копія a4 = a
        a4 = data.controlVarMonitor.getCopyA();

        // КД3. Копія d4 = d
        int d4 = data.controlVarMonitor.getCopyD();

        // КД4. Копія p4 = p
        int p4 = data.controlVarMonitor.getCopyP();

        // Обчислення 4: Aн = S*MDн*p4+a4*Eн*d4
        int[][] MD_H = data.getSubmatrixFromColumns(data.MD, data.H * 3, data.N);
        int[] E_H = data.getSubvector(data.E, data.H * 3, data.N);

        int[] A_H = data.calculateStep4(MD_H, E_H, p4, a4, d4);

        // Об'єднання фінального результату
        data.insertSubVectorIntoVector(A_H, data.H * 3, data.N, 1);

        // Сигнал про завершення обчислення Aн потоку Т3
        data.controlSyncMonitor.finalOutputSignal();

        System.out.println("T4 is finished");
    }
}
