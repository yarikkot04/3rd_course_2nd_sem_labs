import Data.Calculation;
import Data.Input;
import Data.Output;

import java.util.Scanner;

public class T2 extends Thread {

    // MF = (MG*MH)*TRANS(MK)
    private int N = 0;
    private double[][] MF;
    private double[][] MG;
    private double[][] MH;
    private double[][] MK;
    private int range = 1000;

    public T2(int N) {
        this.N = N;
    }

    public void run() {
        System.out.println("T2 is started");
        if (this.N < 20) {
            initData();
            setAllParamsByKeyboard();
            this.MF = Calculation.F2(this.MG, this.MH, this.MK);
            System.out.println("Res T2: ");
            Output.printMatrix(this.MF, this.N, "MF", "T2");
        } else {
            Scanner scanner = new Scanner(System.in);
            System.out.println("\n" + "Choose the data generation method:\n" + "1 - Setting all data elements to a specified value (e.g., 1, 2, or 3)\n" + "2 - Using a random value generator. | T2");
            int generateMethod = scanner.nextInt();
            if (generateMethod == 1) {
                initData();
                double[][][] matrices = setMatrixBySpecifiedValue();
                writeDataToFiles(matrices[0], matrices[1], matrices[2]);
                readAndSetDataFromFile();
                this.MF = Calculation.F2(this.MG, this.MH, this.MK);
                Output.writeResultToFile("resultF2.txt", this.MF);
            } else if (generateMethod == 2) {
                initData();
                double[][][] matrices = setMatrixByRandomGeneration(this.range);
                writeDataToFiles(matrices[0], matrices[1], matrices[2]);
                readAndSetDataFromFile();
                this.MF = Calculation.F2(this.MG, this.MH, this.MK);
                Output.writeResultToFile("resultF2.txt", this.MF);
            } else {
                throw new IllegalArgumentException("Unknown generation method!");
            }
        }
        System.out.println("T2 is finished");
    }

    private void initData() {
        this.MF = new double[this.N][this.N];
        this.MG = new double[this.N][this.N];
        this.MH = new double[this.N][this.N];
        this.MK = new double[this.N][this.N];
    }

    private void setAllParamsByKeyboard() {
        this.MG = Input.setMatrixByKeyboard(this.MG, "MG", this.N, "T2");
        this.MH = Input.setMatrixByKeyboard(this.MH, "MH", this.N, "T2");
        this.MK = Input.setMatrixByKeyboard(this.MK, "MK", this.N, "T2");
    }

    private double[][][] setMatrixBySpecifiedValue() {
        double[][] matrixMG = Input.setMatrixBySpecifiedValue(this.MG, this.N, 2);
        double[][] matrixMH = Input.setMatrixBySpecifiedValue(this.MH, this.N, 2);
        double[][] matrixMK = Input.setMatrixBySpecifiedValue(this.MK, this.N, 2);
        return new double[][][]{matrixMG, matrixMH, matrixMK};
    }

    private double[][][] setMatrixByRandomGeneration(int range) {
        double[][] matrixMG = Input.setMatrixByRandomValues(this.MG, this.N, range);
        double[][] matrixMH = Input.setMatrixByRandomValues(this.MH, this.N, range);
        double[][] matrixMK = Input.setMatrixByRandomValues(this.MK, this.N, range);
        return new double[][][]{matrixMG, matrixMH, matrixMK};
    }

    private void writeDataToFiles(double[][] matrixMG, double[][] matrixMH, double[][] matrixMK) {
        Input.writeMatrixToFile("Matrix_MG.txt", matrixMG);
        Input.writeMatrixToFile("Matrix_MH.txt", matrixMH);
        Input.writeMatrixToFile("Matrix_MK.txt", matrixMK);
    }

    private void readAndSetDataFromFile() {
        this.MG = Input.readMatrixFromFile("Matrix_MG.txt", this.N);
        this.MH = Input.readMatrixFromFile("Matrix_MH.txt", this.N);
        this.MK = Input.readMatrixFromFile("Matrix_MK.txt", this.N);
    }

}
