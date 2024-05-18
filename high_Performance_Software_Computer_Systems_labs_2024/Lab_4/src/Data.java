public class Data {
    public int N;
    public int P;
    public int H;

    public Data(int n, int p) {
        this.N = n;
        this.P = p;
        this.H = n / p;
    }

    public int p;
    public int d;
    public int[] R = new int[this.N];
    public int[] B = new int[this.N];
    public int[] Z = new int[this.N];
    public int[] E = new int[this.N];
    public int[] A = new int[this.N];
    public int[] C = new int[this.N];
    public int[][] MC = new int[this.N][this.N];
    public int[][] MD = new int[this.N][this.N];

    public ControlSyncMonitor controlSyncMonitor = new ControlSyncMonitor();
    public ControlVarMonitor controlVarMonitor = new ControlVarMonitor();

    // Метод для заповнення скаляру
    public int fillScalar() {
        return 1;
    }

    // Метод для заповнення вектору
    public int[] fillVector() {
        int[] result = new int[this.N];
        for (int i = 0; i < this.N; i++) {
            result[i] = 1;
        }
        return result;
    }

    // Метод для заповнення матриці
    public int[][] fillMatrix() {
        int[][] result = new int[this.N][this.N];
        for (int i = 0; i < this.N; i++) {
            for (int j = 0; j < this.N; j++) {
                result[i][j] = 1;
            }
        }
        return result;
    }

    // Метод для множення двох векторів
    public int multiplyTwoVectors(int[] firstVector, int[] secondVector) {
        int length = Math.min(firstVector.length, secondVector.length);
        int result = 0;
        for (int i = 0; i < length; i++) {
            result += firstVector[i] * secondVector[i];
        }
        return result;
    }

    // Метод для отримання підвектору
    public int[] getSubvector(int[] sourceVector, int startPos, int endPos) {
        int size = endPos - startPos;
        int[] subvector = new int[size];
        for (int i = startPos; i < endPos; i++) {
            subvector[i - startPos] = sourceVector[i];
        }
        return subvector;
    }

    // Метод для отримання підматриці
    public int[][] getSubmatrixFromColumns(int[][] sourceMatrix, int startColumn, int endColumn) {
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

    // Метод для множення вектору на матрицю
    public int[] multiplyVectorByMatrix(int[] vector, int[][] matrix) {
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

    // Метод для множення скаляру на вектор
    public static int[] scalarOnVectorMultiply(int scalar, int[] vector) {
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

    // Метод для обчислення кроку 4
    public int[] calculateStep4(int[][] MD_H, int[] E_H, int p, int a, int d) {
        return addVectors(scalarOnVectorMultiply(p, this.multiplyVectorByMatrix(this.C, MD_H)), scalarOnVectorMultiply(d, scalarOnVectorMultiply(a, E_H)));
    }

    // Метод для об'єднання частинок вектора в один вектор
    public void insertSubVectorIntoVector(int[] subVector, int startIndex, int endIndex, int statusVector) {
        for (int i = startIndex; i < endIndex; i++) {
            if (statusVector == 0) {
                this.C[i] = subVector[i - startIndex];
            } else {
                this.A[i] = subVector[i - startIndex];
            }
        }
    }


}
