using System;

namespace lab3
{
    public class Data
    {
        public int N;
        public int P;
        public int H;
        public Data(int p, int n)
        {
            N = n;
            P = p;
            H = n / p;
        }
        public int[,] MA;
        public int[,] MD;
        public int[,] MC;
        public int[] C;
        public int[] R;
        public int[] B;
        public int[] K;
        public int[] X;

        public long e = Int32.MaxValue;
        public int p;
        public int a;

        public EventWaitHandle E1 = new EventWaitHandle(false, EventResetMode.ManualReset);
        public EventWaitHandle E2 = new EventWaitHandle(false, EventResetMode.ManualReset);
        public EventWaitHandle E3 = new EventWaitHandle(false, EventResetMode.ManualReset);
        public EventWaitHandle E4 = new EventWaitHandle(false, EventResetMode.ManualReset);

        public Semaphore S1 = new Semaphore(0, 3);
        public Semaphore S2 = new Semaphore(0, 3);
        public Semaphore S3 = new Semaphore(0, 3);
        public Semaphore S4 = new Semaphore(0, 3);
        public Semaphore S5 = new Semaphore(1, 1);
        public Barrier B0 = new Barrier(4);

        public Mutex M0 = new Mutex();
        public object CS0 = new object();

        // Метод для заповнення скаляру одиницею
        public static int fillScalar()
        {
            return 1;
        }

        // Метод для заповнення вектору одиницями
        public static int[] fillVector(int N)
        {
            int[] result = new int[N];
            for (int i = 0; i < N; i++)
            {
                result[i] = 1;
            }
            return result;
        }

        // Метод для заповнення матриці одиницями
        public static int[,] fillMatrix(int N)
        {
            int[,] result = new int[N, N];
            for (int i = 0; i < N; i++)
            {
                for (int j = 0; j < N; j++)
                {
                    result[i, j] = 1;
                }
            }
            return result;
        }

        // Метод для обчислення 1
        public static int calculateStepOne(Data data, int start, int end)
        {
            int[,] MC = MultiplyMatrixByMatrix(data.MA, data.MD, start, data);
            int[] A = MultiplyVectorByMatrix(data.C, MC);

            int ai = findMaxInVector(A);
            return ai;
        }

        // Метод для обчислення 3
        public static int[] calculateStepThree(int[] R_H, int[] B_H, int p, int a, int e)
        {
            return AddVectors(ScalarMultiplyByVector(p, ScalarMultiplyByVector(a, R_H)), ScalarMultiplyByVector(e, B_H));
        }

        // Метод для множення вектора на матрицю
        private static int[] MultiplyVectorByMatrix(int[] vector, int[,] matrix)
        {
            int vectorLength = vector.Length;
            int matrixColumns = matrix.GetLength(1);

            int[] result = new int[matrixColumns];

            for (int i = 0; i < matrixColumns; i++)
            {
                int sum = 0;
                for (int j = 0; j < vectorLength; j++)
                {
                    sum += vector[j] * matrix[j, i];
                }
                result[i] = sum;
            }

            return result;
        }

        // Метод для множення двох матриць
        private static int[,] MultiplyMatrixByMatrix(int[,] firstMatrix, int[,] secondMatrix, int start, Data data)
        {
            int[,] result = new int[data.N, data.H];
            for (int i = 0; i < data.N; i++)
            {
                for (int j = start; j < start + data.H; j++)
                {
                    int sum = 0;
                    for (int k = 0; k < data.N; k++)
                    {
                        sum += firstMatrix[i, k] * secondMatrix[k, j];
                    }
                    result[i, j - start] = sum;
                }
            }
            return result;
        }

        // Метод для знаходження максимуму у векторі
        private static int findMaxInVector(int[] vector)
        {
            int max = vector[0];
            for (int i = 0; i < vector.Length; i++)
            {
                if (vector[i] > max)
                {
                    max = vector[i];
                }
            }
            return max;
        }

        // Метод для визначення максимуму серед двох скалярів
        public static int max(int fNum, int sNum)
        {
            if (fNum > sNum) return fNum;
            return sNum;
        }

        // Метод для отримання частини вектора
        public static int[] GetSubvector(int[] sourceVector, int startPos, int endPos)
        {
            int size = endPos - startPos;
            int[] subvector = new int[size];

            for (int i = startPos; i < endPos; i++)
            {
                subvector[i - startPos] = sourceVector[i];
            }

            return subvector;
        }

        // Метод для множення скаляру на вектор
        public static int[] ScalarMultiplyByVector(int scalar, int[] vector)
        {
            int[] result = new int[vector.Length];
            for (int i = 0; i < vector.Length; i++)
            {
                result[i] = scalar * vector[i];
            }
            return result;
        }

        // Метод для додавання двох векторів
        public static int[] AddVectors(int[] vectorA, int[] vectorB)
        {
            int[] result = new int[vectorA.Length];
            for (int i = 0; i < vectorA.Length; i++)
            {
                result[i] = vectorA[i] + vectorB[i];
            }
            return result;
        }

        // Метод для об'єднання фінального результату X
        public static void InsertIntoFullX(Data data, int[] sub_X, int startPos, int endPos)
        {
            for (int i = startPos, j = 0; i < endPos; i++, j++)
            {
                data.X[i] = sub_X[j];
            }
        }

        // Виведення фінального результату
        public static void PrintX(Data data)
        {
            Console.WriteLine("X : [ " + string.Join(" ", data.X) + " ]");
        }
    }
}
