using System;

namespace lab3
{
    public class T4
    {
        private static int p4;
        private static int a4;
        private static int e4;
        public static void run(Data data)
        {
            Console.WriteLine("T4 started");
            // Введення B,p
            data.p = Data.fillScalar();
            data.B = new int[data.N];
            data.B = Data.fillVector(data.N);

            // Сигнал про введення B, p задачам T1, T2, T3 
            data.E4.Set();

            // Чекати завершення введення даних у потоках T1, T2, T3 
            data.E1.WaitOne();
            data.E2.WaitOne();
            data.E3.WaitOne();

            // Обчислення 1: a4 = max(C * (MA * MDH))  
            a4 = Data.calculateStepOne(data, data.H, data.H * 2);

            // КД 1. Mutex. Обчислення 2: a = max(a, a4)
            data.M0.WaitOne();
            data.a = Data.max(data.a, a4);
            data.M0.ReleaseMutex();

            // Cигнал про обчислення "a" потокам T1,T2,T3
            data.S4.Release(3);

            // Чекати завершення обчислення "а" у потоках T1,T2,T3
            data.S1.WaitOne();
            data.S2.WaitOne();
            data.S3.WaitOne();

            // КД2. Semaphore. Копія p4 = p
            data.S5.WaitOne();
            p4 = data.p;
            data.S5.Release();

            // КД3. Критична секція. Копія a4 = a
            lock (data.CS0)
            {
                a4 = data.a;
            }

            // КД4. Атомарна операція. Копія e4 = e
            e4 = (int)Interlocked.Read(ref data.e);

            // Обчислення 3: 3)	Xн = p4 * a4 * Rн + e4 * Bн         
            int[] R_H = Data.GetSubvector(data.R, data.H * 3, data.N);
            int[] B_H = Data.GetSubvector(data.B, data.H * 3, data.N);

            int[] X_H = Data.calculateStepThree(R_H, B_H, p4, a4, e4);

            // Об'єднання фінального результату
            Data.InsertIntoFullX(data, X_H, data.H * 3, data.N);

            // Чекати завершення обчислення Хн в потоках T1,T2,T3
            data.B0.SignalAndWait();

            // Виведення результату
            Data.PrintX(data);
            Console.WriteLine("T4 finished");
        }
    }
}
