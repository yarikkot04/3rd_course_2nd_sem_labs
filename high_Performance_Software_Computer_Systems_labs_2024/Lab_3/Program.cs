// Програмне забезпечення високопродуктивних комп'ютерних систем
// Лабораторна робота 3
// Варіант 8
// X= p*max(C*(MA*MD))*R+ e*B
// Котенко Ярослав Олегович
// Група ІМ-13
// 12.04.2024

using System;
using System.Diagnostics;
using System.Threading;

namespace lab3
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            int P = 4;
            int N = 16;
            Data data = new Data(P, N);
            Stopwatch sw = new Stopwatch();
            sw.Start();

            var t1 = new Thread(() => T1.run(data));
            var t2 = new Thread(() => T2.run(data));
            var t3 = new Thread(() => T3.run(data));
            var t4 = new Thread(() => T4.run(data));
            t1.Start();
            t2.Start();
            t3.Start();
            t4.Start();
            t1.Join();
            t2.Join();
            t3.Join();
            t4.Join();
            sw.Stop();
            Console.WriteLine("Execution time: " + sw.Elapsed);
            Console.ReadKey();
        }
    }
}
