using System;

namespace lab3
{
    public class T1
    {
        private static int p1;
        private static int a1;
        private static int e1;
        public static void run(Data data)
        {
            Console.WriteLine("T1 started");
            // Введення e, X
            data.e = Data.fillScalar();
            data.X = new int[data.N];
            data.X = Data.fillVector(data.N);

            // Сигнал про введення e, X задачам T2, T3, T4 
            data.E1.Set();

            // Чекати завершення введення даних у потоках T2, T3, T4 
            data.E2.WaitOne();
            data.E3.WaitOne();
            data.E4.WaitOne();

            // Обчислення 1: a1 = max(C * (MA * MDH))  
            a1 = Data.calculateStepOne(data, 0, data.H);

            // КД 1. Mutex. Обчислення 2: a = max(a, a1)
            data.M0.WaitOne();
            data.a = Data.max(data.a, a1);
            data.M0.ReleaseMutex();

            // Cигнал про обчислення "a" потокам T2,T3,T4
            data.S1.Release(3);

            // Чекати завершення обчислення "а" у потоках T2,T3,T4
            data.S2.WaitOne();
            data.S3.WaitOne();
            data.S4.WaitOne();

            // КД2. Semaphore. Копія p1 = p
            data.S5.WaitOne();
            p1 = data.p;
            data.S5.Release();

            // КД3. Критична секція. Копія a1 = a
            lock (data.CS0)
            {
                a1 = data.a;
            }

            // КД4. Атомарна операція. Копія e1 = e
            e1 = (int)Interlocked.Read(ref data.e);

            // Обчислення 3: 3)	Xн = p1 * a1 * Rн + e1 * Bн 
            int[] R_H = Data.GetSubvector(data.R, 0, data.H);
            int[] B_H = Data.GetSubvector(data.B, 0, data.H);

            int[] X_H = Data.calculateStepThree(R_H, B_H, p1, a1, e1);

            // Об'єднання фінального результату
            Data.InsertIntoFullX(data, X_H, 0, data.H);

            // Сигнал про завершення обчислення Хн потоку Т4
            data.B0.SignalAndWait();
            Console.WriteLine("T1 finished");

        }
    }
}
