package Data;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Input {
    public static double[] setVectorByKeyboard(double[] vector, String vectorName, int length, String threadName) {
        Scanner scanner = new Scanner(System.in);
        for (int i = 0; i < length; i++) {
            System.out.printf("Enter element [%d] for vector %s | %s \n", i, vectorName, threadName);
            vector[i] = scanner.nextDouble();
        }
        return vector;
    }

    public static double[][] setMatrixByKeyboard(double[][] matrix, String matrixName, int length, String threadName) {
        Scanner scanner = new Scanner(System.in);
        for (int i = 0; i < length; i++) {
            for (int j = 0; j < length; j++) {
                System.out.printf("Enter element [%d][%d] for matrix %s| %s \n", i, j, matrixName, threadName);
                matrix[i][j] = scanner.nextDouble();
            }
        }
        return matrix;
    }

    public static double[] setVectorByRandomValues(double[] vector, int length, int range) {
        for (int i = 0; i < length; i++) {
            vector[i] = Math.round(Math.random() * range) / 100.0;
        }
        return vector;
    }

    public static double[][] setMatrixByRandomValues(double[][] matrix, int length, int range) {
        for (int i = 0; i < length; i++) {
            for (int j = 0; j < length; j++) {
                matrix[i][j] = Math.round(Math.random() * range) / 100.0;
            }
        }
        return matrix;
    }

    public static double[] setVectorBySpecifiedValue(double[] vector, int length, int value) {
        for (int i = 0; i < length; i++) {
            vector[i] = value;
        }
        return vector;
    }

    public static double[][] setMatrixBySpecifiedValue(double[][] matrix, int length, int value) {
        for (int i = 0; i < length; i++) {
            for (int j = 0; j < length; j++) {
                matrix[i][j] = value;
            }
        }
        return matrix;
    }

    public static void writeVectorToFile(String filename, double[] vector) {
        try (FileWriter writer = new FileWriter(filename)) {
            StringBuilder content = new StringBuilder();
            for (double elem : vector) {
                content.append(elem + " ");
            }
            writer.write(String.valueOf(content));
        } catch (IOException e) {
            System.out.println("An error occurred while writing to the file " + filename);
            System.out.println("Error: " + e);
        }
    }

    public static void writeMatrixToFile(String filename, double[][] matrix) {
        try (FileWriter writer = new FileWriter(filename)) {
            StringBuilder content = new StringBuilder();
            for (double[] array : matrix) {
                for (double elem : array) {
                    content.append(elem + " ");
                }
                content.append("\n");
            }
            writer.write(String.valueOf(content));
        } catch (IOException e) {
            System.out.println("An error occurred while writing to the file " + filename);
            System.out.println("Error: " + e);
        }
    }

    public static double[] readVectorFromFile(String filename, int vectorLength) {
        double[] vector = new double[vectorLength];
        try (FileReader reader = new FileReader(filename)) {
            int character;
            StringBuilder content = new StringBuilder();
            while ((character = reader.read()) != -1) {
                content.append((char) character);
            }
            String[] values = content.toString().trim().split(" ");
            for (int i = 0; i < values.length; i++) {
                vector[i] = Double.parseDouble(values[i]);
            }
        } catch (IOException e) {
            System.out.println("An error occurred while reading from the file " + filename);
            System.out.println("Error: " + e);
        }

        return vector;
    }

    public static double[][] readMatrixFromFile(String filename, int matrixLength) {
        double[][] matrix = new double[matrixLength][matrixLength];
        try (BufferedReader reader= new BufferedReader(new FileReader(filename))){
            String line;
            int row = 0;
            while ((line = reader.readLine()) != null && row < matrixLength) {
                String[] values = line.split("\\s+");
                for (int col = 0; col < Math.min(values.length, matrixLength); col++) {
                    matrix[row][col] = Double.parseDouble(values[col]);
                }
                row++;
            }
        } catch (IOException e) {
            System.out.println("An error occurred while reading from the file " + filename);
            System.out.println("Error: " + e);
        }
        return matrix;
    }
}
