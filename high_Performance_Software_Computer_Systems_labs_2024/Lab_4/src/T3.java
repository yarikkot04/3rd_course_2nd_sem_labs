import java.util.Arrays;

public class T3 extends Thread {

    private final Data data;

    public T3(Data data) {
        this.data = data;
    }

    @Override
    public void run() {
        System.out.println("T3 is started");

        // Введення A, B, p
        data.A = data.fillVector();
        data.B = data.fillVector();
        data.p = data.fillScalar();
        data.controlVarMonitor.setP(data.p);

        // Сигнал про введення A, B, p задачам T1,T2,T4
        data.controlSyncMonitor.inputSignal();

        // Чекати завершення введення даних у задачах T1,T2,T4
        data.controlSyncMonitor.inputWait();

        // Обчислення 1: a3=(Bн*Zн)
        int[] B_H = data.getSubvector(data.B, data.H * 2, data.H * 3);
        int[] Z_H = data.getSubvector(data.Z, data.H * 2, data.H * 3);

        int a3 = data.multiplyTwoVectors(B_H, Z_H);

        // КД1. Обчислення 2: a = a + a3
        data.controlVarMonitor.sumPartialA(a3);

        // Сигнал про обчислення "а" задачам T1,T2,T4
        data.controlSyncMonitor.sumPartASignal();

        // Чекати завершення обчислення "а" у задачах T1,T2,T4
        data.controlSyncMonitor.sumPartAWait();

        // Обчислення 3: Сн = R*MCн
        int[][] MC_H = data.getSubmatrixFromColumns(data.MC, data.H * 2, data.H * 3);

        int[] C_H = data.multiplyVectorByMatrix(data.R, MC_H);

        // Об'єднання Сн в С
        data.insertSubVectorIntoVector(C_H, data.H * 2, data.H * 3, 0);

        // Сигнал про обчислення "C" задачам T1,T2,T4
        data.controlSyncMonitor.calcC_Signal();

        // Чекати завершення обчислення "C" у задачах T1,T2,T4
        data.controlSyncMonitor.calcC_Wait();

        // КД2. Копія a3 = a
        a3 = data.controlVarMonitor.getCopyA();

        // КД3. Копія d3 = d
        int d3 = data.controlVarMonitor.getCopyD();

        // КД4. Копія p3 = p
        int p3 = data.controlVarMonitor.getCopyP();

        // Обчислення 4: Aн = S*MDн*p3+a3*Eн*d3
        int[][] MD_H = data.getSubmatrixFromColumns(data.MD, data.H * 2, data.H * 3);
        int[] E_H = data.getSubvector(data.E, data.H * 2, data.H * 3);

        int[] A_H = data.calculateStep4(MD_H, E_H, p3, a3, d3);

        // Об'єднання фінального результату
        data.insertSubVectorIntoVector(A_H, data.H * 2, data.H * 3, 1);

        // Чекати завершення обчислення Aн в потоках T1,T2,T4
        data.controlSyncMonitor.finalOutputWait();

        // Виведення фінального результату
        System.out.println("A = " + Arrays.toString(data.A));

        System.out.println("T3 is finished");

    }
}
