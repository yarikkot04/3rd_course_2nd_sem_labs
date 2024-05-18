using System;

namespace lab3
{
    public class T3
    {
        private static int p3;
        private static int a3;
        private static int e3;
        public static void run(Data data)
        {
            Console.WriteLine("T3 started");
            // Введення R,MD
            data.R = new int[data.N];
            data.MD = new int[data.N, data.N];
            data.R = Data.fillVector(data.N);
            data.MD = Data.fillMatrix(data.N);

            // Сигнал про введення R,MD задачам T1, T2, T4 
            data.E3.Set();

            // Чекати завершення введення даних у потоках T1, T2, T4 
            data.E1.WaitOne();
            data.E2.WaitOne();
            data.E4.WaitOne();

            // Обчислення 1: a3 = max(C * (MA * MDH))  
            a3 = Data.calculateStepOne(data, data.H * 2, data.H * 3);

            // КД 1. Mutex. Обчислення 2: a = max(a, a3)
            data.M0.WaitOne();
            data.a = Data.max(data.a, a3);
            data.M0.ReleaseMutex();

            // Cигнал про обчислення "a" потокам T1,T2,T4
            data.S3.Release(3);

            // Чекати завершення обчислення "а" у потоках T1,T2,T4
            data.S1.WaitOne();
            data.S2.WaitOne();
            data.S4.WaitOne();

            // КД2. Semaphore. Копія p3 = p
            data.S5.WaitOne();
            p3 = data.p;
            data.S5.Release();

            // КД3. Критична секція. Копія a3 = a
            lock (data.CS0)
            {
                a3 = data.a;
            }

            // КД4. Атомарна операція. Копія e3 = e
            e3 = (int)Interlocked.Read(ref data.e);

            // Обчислення 3: 3)	Xн = p3 * a3 * Rн + e3 * Bн 
            int[] R_H = Data.GetSubvector(data.R, data.H * 2, data.H * 3);
            int[] B_H = Data.GetSubvector(data.B, data.H * 2, data.H * 3);

            int[] X_H = Data.calculateStepThree(R_H, B_H, p3, a3, e3);

            // Об'єднання фінального результату
            Data.InsertIntoFullX(data, X_H, data.H * 2, data.H * 3);

            // Сигнал про завершення обчислення Хн потоку Т4
            data.B0.SignalAndWait();
            Console.WriteLine("T3 finished");
        }

    }
}
