import Data.Calculation;
import Data.Input;
import Data.Output;

import java.util.Scanner;

public class T1 extends Thread {

    //    1.19 d = MAX(B + C) + MIN(A + B*(MA*ME))
    private int N = 0;
    private double d;
    private double[] A;
    private double[] B;
    private double[] C;

    private double[][] MA;
    private double[][] ME;
    private int range = 1000;

    public T1(int N) {
        this.N = N;
    }

    public void run() {
        System.out.println("T1 is started");
        if (this.N < 20) {
            initData();
            setAllParamsByKeyboard();
            this.d = Calculation.F1(this.A, this.B, this.C, this.MA, this.ME);
            System.out.println("Result of first expression | T1: " + this.d);
        } else {
            Scanner scanner = new Scanner(System.in);
            System.out.println("\n" + "Choose the data generation method:\n" + "1 - Setting all data elements to a specified value (e.g., 1, 2, or 3)\n" + "2 - Using a random value generator. | T1");
            int generateMethod = scanner.nextInt();
            if (generateMethod == 1) {
                initData();
                double[][] vectors = setVectorsBySpecifiedValue();
                double[][][] matrices = setMatrixBySpecifiedValue();
                writeDataToFiles(vectors[0], vectors[1], vectors[2], matrices[0], matrices[1]);
                readAndSetDataFromFile();
                this.d = Calculation.F1(this.A, this.B, this.C, this.MA, this.ME);
                Output.writeResultToFile("resultF1.txt", this.d);
            } else if (generateMethod == 2) {
                initData();
                double[][] vectors = setVectorsByRandomGeneration(this.range);
                double[][][] matrices = setMatrixByRandomGeneration(this.range);
                writeDataToFiles(vectors[0], vectors[1], vectors[2], matrices[0], matrices[1]);
                readAndSetDataFromFile();
                this.d = Calculation.F1(this.A, this.B, this.C, this.MA, this.ME);
                Output.writeResultToFile("resultF1.txt", this.d);
            } else {
                throw new IllegalArgumentException("Unknown generation method!");
            }
        }
        System.out.println("T1 is finished");
    }

    private void initData() {
        this.A = new double[this.N];
        this.B = new double[this.N];
        this.C = new double[this.N];
        this.MA = new double[this.N][this.N];
        this.ME = new double[this.N][this.N];
    }

    private void setAllParamsByKeyboard() {
        this.A = Input.setVectorByKeyboard(this.A, "A", this.N, "T1");
        this.B = Input.setVectorByKeyboard(this.B, "B", this.N, "T1");
        this.C = Input.setVectorByKeyboard(this.C, "C", this.N, "T1");
        this.MA = Input.setMatrixByKeyboard(this.MA, "MA", this.N, "T1");
        this.ME = Input.setMatrixByKeyboard(this.ME, "ME", this.N, "T1");
    }

    private double[][] setVectorsByRandomGeneration(int range) {
        double[] vectorA = Input.setVectorByRandomValues(this.A, this.N, range);
        double[] vectorB = Input.setVectorByRandomValues(this.B, this.N, range);
        double[] vectorC = Input.setVectorByRandomValues(this.C, this.N, range);
        return new double[][]{vectorA, vectorB, vectorC};
    }

    private double[][][] setMatrixByRandomGeneration(int range) {
        double[][] matrixMA = Input.setMatrixByRandomValues(this.MA, this.N, range);
        double[][] matrixME = Input.setMatrixByRandomValues(this.ME, this.N, range);
        return new double[][][]{matrixMA, matrixME};
    }

    private double[][] setVectorsBySpecifiedValue() {
        double[] vectorA = Input.setVectorBySpecifiedValue(this.A, this.N, 1);
        double[] vectorB = Input.setVectorBySpecifiedValue(this.B, this.N, 1);
        double[] vectorC = Input.setVectorBySpecifiedValue(this.C, this.N, 1);
        return new double[][]{vectorA, vectorB, vectorC};
    }

    private double[][][] setMatrixBySpecifiedValue() {
        double[][] matrixMA = Input.setMatrixBySpecifiedValue(this.MA, this.N, 1);
        double[][] matrixME = Input.setMatrixBySpecifiedValue(this.ME, this.N, 1);
        return new double[][][]{matrixMA, matrixME};
    }

    private void writeDataToFiles(double[] vectorA, double[] vectorB, double[] vectorC, double[][] matrixMA, double[][] matrixME) {
        Input.writeVectorToFile("Vector_A.txt", vectorA);
        Input.writeVectorToFile("Vector_B.txt", vectorB);
        Input.writeVectorToFile("Vector_C.txt", vectorC);
        Input.writeMatrixToFile("Matrix_MA.txt", matrixMA);
        Input.writeMatrixToFile("Matrix_ME.txt", matrixME);
    }

    private void readAndSetDataFromFile() {
        this.A = Input.readVectorFromFile("Vector_A.txt", this.N);
        this.B = Input.readVectorFromFile("Vector_B.txt", this.N);
        this.C = Input.readVectorFromFile("Vector_C.txt", this.N);
        this.MA = Input.readMatrixFromFile("Matrix_MA.txt", this.N);
        this.ME = Input.readMatrixFromFile("Matrix_ME.txt", this.N);
    }
}
