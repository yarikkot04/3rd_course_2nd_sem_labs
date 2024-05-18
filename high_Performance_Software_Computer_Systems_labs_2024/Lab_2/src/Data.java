import java.util.Arrays;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.Semaphore;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class Data {
    public int N = 16;
    public int P = 4;
    public int H = N / P;
    AtomicInteger a = new AtomicInteger(0);
    int d;
    int[] W = new int[N];
    int[] C = new int[N];
    int[] E = new int[N];
    int[] A = new int[N];
    int[][] MD = new int[N][N];
    int[][] MA = new int[N][N];
    int[][] MB = new int[N][N];
    int[][] MC = new int[N][N];
    CyclicBarrier barrier1 = new CyclicBarrier(4);
    Semaphore semaphore_1 = new Semaphore(0);
    Semaphore semaphore_2 = new Semaphore(0);
    Semaphore semaphore_3 = new Semaphore(0);
    Semaphore semaphore_4 = new Semaphore(0);
    Semaphore semaphore_5 = new Semaphore(1);
    Semaphore semaphore_6 = new Semaphore(0);
    static Lock pointLock = new ReentrantLock();

    // Метод для обчислення 1: Aн = C * MDн
    public static int[] calculateStep1(int[] C, int[][] MD_H) {
        return multiplyVectorByMatrix(C, MD_H);
    }

    // Метод для обчислення 4: MCн = MA * MBн
    public static int[][] calculateStep4(int[][] MA, int[][] MB_H) {
        return Data.multiplyMatrices(MA, MB_H);
    }

    // Метод для обчислення 5: Xн = E * MCн
    public static int[] calculateStep5(int[] E, int[][] MC_H) {
        return multiplyVectorByMatrix(E, MC_H);
    }

    // Метод для обчислення 6: Wн = a4 * Cн + d4 * Xн
    public static int[] calculateStep6(int a, int d, int[] C_H, int[] X_H) {
        return addVectors(scalarMultiply(a, C_H), scalarMultiply(d, X_H));
    }

    // Метод для копіювання d використовуючи lock
    public static int copyD_CS(Data data) {
        pointLock.lock();
        try {
            return data.d;
        } finally {
            pointLock.unlock();
        }
    }

    // Метод для множення скаляру на вектор
    public static int[] scalarMultiply(int scalar, int[] vector) {
        int[] result = new int[vector.length];
        for (int i = 0; i < vector.length; i++) {
            result[i] = scalar * vector[i];
        }
        return result;
    }

    // Метод для додавання двох векторів
    public static int[] addVectors(int[] vectorA, int[] vectorB) {
        int[] result = new int[vectorA.length];
        for (int i = 0; i < vectorA.length; i++) {
            result[i] = vectorA[i] + vectorB[i];
        }
        return result;
    }

    // Метод для множення двох матриць
    public static int[][] multiplyMatrices(int[][] matrix1, int[][] matrix2) {
        int rows1 = matrix1.length;
        int columns1 = matrix1[0].length;
        int columns2 = matrix2[0].length;
        int[][] result = new int[rows1][columns2];
        for (int i = 0; i < rows1; i++) {
            for (int j = 0; j < columns2; j++) {
                for (int k = 0; k < columns1; k++) {
                    result[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }
        return result;
    }

    // Метод для знаходження максимуму в векторі
    public static int findMaxInVector(int[] vector) {
        return Arrays.stream(vector).max().getAsInt();
    }

    // Метод для множення вектора на матрицю
    public static int[] multiplyVectorByMatrix(int[] vector, int[][] matrix) {
        int vectorLength = vector.length;
        int matrixColumns = matrix[0].length;
        int[] result = new int[matrixColumns];
        for (int i = 0; i < matrixColumns; i++) {
            int sum = 0;
            for (int j = 0; j < vectorLength; j++) {
                sum += vector[j] * matrix[j][i];
            }
            result[i] = sum;
        }
        return result;
    }

    // Метод для отримання підматриці з стовпців, за заданими координатами початку та кінця
    public static int[][] getSubmatrixFromColumns(int[][] sourceMatrix, int
            startColumn, int endColumn) {
        int rowCount = sourceMatrix.length;
        int columnCount = endColumn - startColumn;
        int[][] submatrix = new int[rowCount][columnCount];
        for (int i = 0; i < rowCount; i++) {
            for (int j = startColumn; j < endColumn; j++) {
                submatrix[i][j - startColumn] = sourceMatrix[i][j];
            }
        }
        return submatrix;
    }

    // Метод для отримання підвектора, за заданими координатами початку та кінця
    public static int[] getSubvector(int[] sourceVector, int startPos, int
            endPos) {
        int size = endPos - startPos;
        int[] subvector = new int[size];
        for (int i = startPos; i < endPos; i++) {
            subvector[i - startPos] = sourceVector[i];
        }
        return subvector;
    }

    // Метод для об'єднання частинних результатів в один - фінальний
    public static void insertIntoFullW(Data data, int[] sub_W, int startPos, int endPos) {
        for (int i = startPos, j = 0; i < endPos; i++, j++) {
            data.W[i] = sub_W[j];
        }
    }

    // Виведення фінально результату
    public static void printW(Data data) {
        System.out.println(Arrays.toString(data.W));
    }
}