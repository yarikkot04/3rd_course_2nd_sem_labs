// Програмне забезпечення високопродуктивних комп'ютерних систем
// Лабораторна робота 4
// Варіант 6
// A=(R*MC)*MD*p+(B*Z)*E*d
// Котенко Ярослав Олегович
// Група ІМ-13
// 30.04.2024

import static java.lang.Thread.sleep;

public class Main {
    final static int N = 2000;
    final static int P = 4;

    public static void main(String[] args) throws InterruptedException {
        sleep(80);
        sleep(80);
        sleep(80);

        long start = System.currentTimeMillis();
        Data data = new Data(N, P);

        T1 t1 = new T1(data);
        T2 t2 = new T2(data);
        T3 t3 = new T3(data);
        T4 t4 = new T4(data);

        t1.start();
        t2.start();
        t3.start();
        t4.start();

        t1.join();
        t2.join();
        t3.join();
        t4.join();

        long end = System.currentTimeMillis();
        long totalTime = end - start;
        System.out.println("Executed time: " + totalTime + " ms");
    }
}