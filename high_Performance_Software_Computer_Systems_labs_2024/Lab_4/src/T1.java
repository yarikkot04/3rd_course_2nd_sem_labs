public class T1 extends Thread {
    private final Data data;

    public T1(Data data) {
        this.data = data;
    }

    @Override
    public void run() {
        System.out.println("T1 is started");

        // Ініціалізація С ( для подальшої коректної роботи програми )
        data.C = new int[data.N];

        // Введення MC, E
        data.MC = data.fillMatrix();
        data.E = data.fillVector();

        // Сигнал про введення MC, E задачам T2,T3,T4
        data.controlSyncMonitor.inputSignal();

        // Чекати завершення введення даних у задачах T2,T3,T4
        data.controlSyncMonitor.inputWait();

        // Обчислення 1: a1=(Bн*Zн)
        int[] B_H = data.getSubvector(data.B, 0, data.H);
        int[] Z_H = data.getSubvector(data.Z, 0, data.H);

        int a1 = data.multiplyTwoVectors(B_H, Z_H);

        // КД1. Обчислення 2: a = a + a1
        data.controlVarMonitor.sumPartialA(a1);

        // Сигнал про обчислення "а" задачам T2,T3,T4
        data.controlSyncMonitor.sumPartASignal();

        // Чекати завершення обчислення "а" у задачах T2,T3,T4
        data.controlSyncMonitor.sumPartAWait();

        // Обчислення 3: Сн = R*MCн
        int[][] MC_H = data.getSubmatrixFromColumns(data.MC, 0, data.H);

        int[] C_H = data.multiplyVectorByMatrix(data.R, MC_H);

        // Об'єднання Сн в С
        data.insertSubVectorIntoVector(C_H, 0, data.H, 0);

        // Сигнал про обчислення "C" задачам T2,T3,T4
        data.controlSyncMonitor.calcC_Signal();

        // Чекати завершення обчислення "C" у задачах T2,T3,T4
        data.controlSyncMonitor.calcC_Wait();

        // КД2. Копія a1 = a
        a1 = data.controlVarMonitor.getCopyA();

        // КД3. Копія d1 = d
        int d1 = data.controlVarMonitor.getCopyD();

        // КД4. Копія p1 = p
        int p1 = data.controlVarMonitor.getCopyP();

        // Обчислення 4: Aн = S*MDн*p1+a1*Eн*d1
        int[][] MD_H = data.getSubmatrixFromColumns(data.MD, 0, data.H);
        int[] E_H = data.getSubvector(data.E, 0, data.H);

        int[] A_H = data.calculateStep4(MD_H, E_H, p1, a1, d1);

        // Об'єднання фінального результату
        data.insertSubVectorIntoVector(A_H, 0, data.H, 1);

        // Сигнал про завершення обчислення Aн потоку Т3
        data.controlSyncMonitor.finalOutputSignal();

        System.out.println("T1 is finished");
    }
}
