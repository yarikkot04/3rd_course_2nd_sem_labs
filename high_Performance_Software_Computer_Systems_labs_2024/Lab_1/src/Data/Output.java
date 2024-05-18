package Data;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;

public class Output {
    public static void printVector(double[] vector, String vectorName, String thread) {
        System.out.printf("vector %s: %s | %s\n", vectorName, Arrays.toString(vector), thread);
    }

    public static void printMatrix(double[][] matrix, int length, String matrixName, String thread) {
        System.out.printf("Matrix %s: | %s\n", matrixName, thread);
        for (double[] array : matrix) {
            for (double num : array) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
    }

    public static void writeResultToFile(String filename, double result) {
        try (FileWriter writer = new FileWriter(filename)) {
            String strResult = "Result of expression: " + result;
            writer.write(String.valueOf(strResult));
        } catch (IOException e) {
            System.out.println("An error occurred while writing to the file " + filename);
            System.out.println("Error: " + e);
        }
    }

    public static void writeResultToFile(String filename, double[][] result) {
        try (FileWriter writer = new FileWriter(filename)) {
            String strResult = "Result of expression: " + Arrays.deepToString(result);
            writer.write(String.valueOf(strResult));
        } catch (IOException e) {
            System.out.println("An error occurred while writing to the file " + filename);
            System.out.println("Error: " + e);
        }
    }
}
