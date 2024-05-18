package Data;

import java.util.Arrays;

public class Calculation {
    //    1.19 d = MAX(B + C) + MIN(A + B*(MA*ME))
    //    2.27 MF = (MG*MH)*TRANS(MK)
    //    3.28 MAX(S*MO) + MIN(MT*MS + MP)
    public static double F1(double[] A, double[] B, double[] C, double[][] MA, double[][] ME) {
        return getMaximumFromVector(addTwoVectors(B, C)) + getMinimumFromVector(addTwoVectors(A, multiplyVectorOnMatrix(B, multiplyTwoMatrix(MA, ME))));
    }

    public static double[][] F2(double[][] MG, double[][] MH, double[][] MK) {
        return multiplyTwoMatrix(multiplyTwoMatrix(MG,MH), transposeMatrix(MK, MK.length));
    }

    public static double F3(double[] S, double[][] MO, double[][] MT, double[][] MS, double[][] MP) {
        return getMaximumFromVector(multiplyVectorOnMatrix(S, MO)) + getMinimumFromMatrix(addTwoMartices(multiplyTwoMatrix(MT,MS), MP));
    }

    private static double[] addTwoVectors(double[] firstVector, double[] secondVector) {
        double[] result = new double[firstVector.length];

        for (int i = 0; i < firstVector.length; i++) {
            result[i] = firstVector[i] + secondVector[i];
        }

        return result;
    }

    private static double[][] multiplyTwoMatrix(double[][] firstMatrix, double[][] secondMatrix) {
        int N = firstMatrix.length;
        double[][] result = new double[N][N];

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                for (int k = 0; k < N; k++) {
                    result[i][j] += firstMatrix[i][k] * secondMatrix[k][j];
                }
            }
        }

        return result;
    }

    private static double[] multiplyVectorOnMatrix(double[] vector, double[][] matrix) {
        int N = vector.length;
        double[] result = new double[N];

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                result[j] += vector[i] * matrix[i][j];
            }
        }

        return result;
    }

    private static double getMaximumFromVector(double[] vector) {
        return Arrays.stream(vector).max().getAsDouble();
    }

    private static double getMinimumFromVector(double[] vector) {
        return Arrays.stream(vector).min().getAsDouble();
    }

    private static double getMinimumFromMatrix(double[][] matrix) {
        double min = matrix[0][0];
        int length = matrix.length;

        for (int i = 0; i < length; i++) {
            for (int j = 0; j < length; j++) {
                if (matrix[i][j] < min) {
                    min = matrix[i][j];
                }
            }
        }
        return min;
    }
    private static double[][] transposeMatrix(double[][] matrix, int length) {
        double[][] transposedMatrix = new double[length][length];

        for (int i = 0; i < length; i++) {
            for (int j = 0; j < length; j++) {
                transposedMatrix[j][i] = matrix[i][j];
            }
        }

        return transposedMatrix;
    }

    private static double[][] addTwoMartices(double[][] firstMatrix, double[][] secondMatrix) {
        int length = firstMatrix.length;

        double[][] sum = new double[length][length];

        for (int i = 0; i < length; i++) {
            for (int j = 0; j < length; j++) {
                sum[i][j] = firstMatrix[i][j] + secondMatrix[i][j];
            }
        }

        return sum;
    }
}
