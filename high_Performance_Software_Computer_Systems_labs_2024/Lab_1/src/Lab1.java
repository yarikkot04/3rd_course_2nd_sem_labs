// Лабораторна робота ЛР1.3 (Java)
// F1: (1.19)  d = MAX(B + C) + MIN(A + B*(MA*ME))
// F2: (2.27)  MF = (MG*MH)*TRANS(MK)
// F3: (3.28)  s = MAX(S*MO) + MIN(MT*MS + MP)
// Котенко Я. О. ІМ-13
// Дата 17.02.2024

import java.util.Scanner;

public class Lab1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the dimensions of vectors and matrices: ");
        final int N = scanner.nextInt();

        T1 t1 = new T1(N);
        T2 t2 = new T2(N);
        T3 t3 = new T3(N);
        t1.start();
        t2.start();
        t3.start();

        try {
            t1.join();
            t2.join();
            t3.join();
        } catch (InterruptedException e) {
            System.out.println(e);
        }

        System.out.println("All threads have finished. Exiting main thread.");
    }
}



