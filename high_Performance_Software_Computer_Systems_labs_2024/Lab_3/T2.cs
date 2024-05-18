using System;

namespace lab3
{
    public class T2
    {
        private static int p2;
        private static int a2;
        private static int e2;
        public static void run(Data data)
        {
            Console.WriteLine("T2 started");
            // Введення C, MA
            data.C = new int[data.N];
            data.MA = new int[data.N, data.N];

            data.C = Data.fillVector(data.N);
            data.MA = Data.fillMatrix(data.N);

            // Сигнал про введення С, MA задачам T1, T3, T4 
            data.E2.Set();

            // Чекати завершення введення даних у потоках T1, T3, T4 
            data.E1.WaitOne();
            data.E3.WaitOne();
            data.E4.WaitOne();

            // Обчислення 1: a2 = max(C * (MA * MDH))      
            a2 = Data.calculateStepOne(data, data.H, data.H * 2);

            // КД 1. Mutex. Обчислення 2: a = max(a, a2)
            data.M0.WaitOne();
            data.a = Data.max(data.a, a2);
            data.M0.ReleaseMutex();

            // Cигнал про обчислення "a" потокам T1,T3,T4
            data.S2.Release(3);

            // Чекати завершення обчислення "а" у потоках T1,T3,T4
            data.S1.WaitOne();
            data.S3.WaitOne();
            data.S4.WaitOne();

            // КД2. Semaphore. Копія p2 = p
            data.S5.WaitOne();
            p2 = data.p;
            data.S5.Release();

            // КД3. Критична секція. Копія a2 = a
            lock (data.CS0)
            {
                a2 = data.a;
            }

            // КД4. Атомарна операція. Копія e2 = e
            e2 = (int)Interlocked.Read(ref data.e);

            // Обчислення 3: 3)	Xн = p2 * a2 * Rн + e2 * Bн 
            int[] R_H = Data.GetSubvector(data.R, data.H, data.H * 2);
            int[] B_H = Data.GetSubvector(data.B, data.H, data.H * 2);

            int[] X_H = Data.calculateStepThree(R_H, B_H, p2, a2, e2);

            // Об'єднання фінального результату
            Data.InsertIntoFullX(data, X_H, data.H, data.H * 2);

            // Сигнал про завершення обчислення Хн потоку Т4
            data.B0.SignalAndWait();
            Console.WriteLine("T2 finished");
        }
    }
}
