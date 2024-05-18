import Data.Calculation;
import Data.Input;
import Data.Output;

import java.util.Scanner;

public class T3 extends Thread {
    //MAX(S*MO) + MIN(MT*MS + MP)
    private int N = 0;
    private double s;
    private double[] S;
    private double[][] MO;
    private double[][] MT;
    private double[][] MS;
    private double[][] MP;
    private int range = 1000;

    public T3(int N) {
        this.N = N;
    }

    public void run() {
        System.out.println("T3 is started");
        if (this.N < 20) {
            setAllParamsByKeyboard();
            this.s = Calculation.F3(this.S, this.MO, this.MT, this.MS, this.MP);
            System.out.println("Result of third expression | T3: " + this.s);
        } else {
            Scanner scanner = new Scanner(System.in);
            System.out.println("\n" + "Choose the data generation method:\n" + "1 - Setting all data elements to a specified value (e.g., 1, 2, or 3)\n" + "2 - Using a random value generator. | T3");
            int generateMethod = scanner.nextInt();
            if (generateMethod == 1) {
                initData();
                double[] vectorS = setVectorSbySpecifiedValue();
                double[][][] matrices = setMatrixBySpecifiedValue();
                writeDataToFiles(vectorS, matrices[0], matrices[1], matrices[2], matrices[3]);
                readAndSetDataFromFile();
                this.s = Calculation.F3(this.S, this.MO, this.MT, this.MS, this.MP);
                Output.writeResultToFile("resultF3.txt", this.s);
            } else if (generateMethod == 2) {
                initData();
                double[] vectorS = setVectorSbyRandomGeneration(this.range);
                double[][][] matrices = setMatrixByRandomGeneration(this.range);
                writeDataToFiles(vectorS, matrices[0], matrices[1], matrices[2], matrices[3]);
                readAndSetDataFromFile();
                this.s = Calculation.F3(this.S, this.MO, this.MT, this.MS, this.MP);
                Output.writeResultToFile("resultF3.txt", this.s);
            } else {
                throw new IllegalArgumentException("Unknown generation method!");
            }
        }
        System.out.println("T3 is finished");
    }

    private void initData() {
        this.S = new double[this.N];
        this.MO = new double[this.N][this.N];
        this.MT = new double[this.N][this.N];
        this.MS = new double[this.N][this.N];
        this.MP = new double[this.N][this.N];
    }

    private void setAllParamsByKeyboard() {
        initData();
        this.S = Input.setVectorByKeyboard(this.S, "S", this.N, "T3");
        this.MO = Input.setMatrixByKeyboard(this.MO, "MO", this.N, "T3");
        this.MT = Input.setMatrixByKeyboard(this.MT, "MT", this.N, "T3");
        this.MS = Input.setMatrixByKeyboard(this.MS, "MS", this.N, "T3");
        this.MP = Input.setMatrixByKeyboard(this.MP, "MP", this.N, "T3");
    }

    private double[] setVectorSbyRandomGeneration(int range) {
        return Input.setVectorByRandomValues(this.S, this.N, range);
    }

    private double[] setVectorSbySpecifiedValue() {
        return Input.setVectorBySpecifiedValue(this.S, this.N, 3);
    }

    private double[][][] setMatrixBySpecifiedValue() {
        double[][] matrixMO = Input.setMatrixBySpecifiedValue(this.MO, this.N, 3);
        double[][] matrixMT = Input.setMatrixBySpecifiedValue(this.MT, this.N, 3);
        double[][] matrixMS = Input.setMatrixBySpecifiedValue(this.MS, this.N, 3);
        double[][] matrixMP = Input.setMatrixBySpecifiedValue(this.MP, this.N, 3);
        return new double[][][]{matrixMO, matrixMT, matrixMS, matrixMP};
    }

    private double[][][] setMatrixByRandomGeneration(int range) {
        double[][] matrixMO = Input.setMatrixByRandomValues(this.MO, this.N, range);
        double[][] matrixMT = Input.setMatrixByRandomValues(this.MT, this.N, range);
        double[][] matrixMS = Input.setMatrixByRandomValues(this.MS, this.N, range);
        double[][] matrixMP = Input.setMatrixByRandomValues(this.MP, this.N, range);
        return new double[][][]{matrixMO, matrixMT, matrixMS, matrixMP};
    }

    private void writeDataToFiles(double[] vectorS, double[][] matrixMO, double[][] matrixMT, double[][] matrixMS, double[][] matrixMP) {
        Input.writeVectorToFile("Vector_S.txt", vectorS);
        Input.writeMatrixToFile("Matrix_MO.txt", matrixMO);
        Input.writeMatrixToFile("Matrix_MT.txt", matrixMT);
        Input.writeMatrixToFile("Matrix_MS.txt", matrixMS);
        Input.writeMatrixToFile("Matrix_MP.txt", matrixMP);
    }

    private void readAndSetDataFromFile() {
        this.S = Input.readVectorFromFile("Vector_S.txt", this.N);
        this.MO = Input.readMatrixFromFile("Matrix_MO.txt", this.N);
        this.MT = Input.readMatrixFromFile("Matrix_MT.txt", this.N);
        this.MS = Input.readMatrixFromFile("Matrix_MS.txt", this.N);
        this.MP = Input.readMatrixFromFile("Matrix_MP.txt", this.N);
    }
}
