// Програмне забезпечення високопродуктивних комп'ютерних систем
// Лабораторна робота №2
// Варіант 22
// W = max(C*MD)*С + E*(MA*MB)*d
// Котенко Ярослав Олегович
// Група ІМ-13
// 29.03.2024
import java.text.DecimalFormat;
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Data data = new Data();
        long startTime = System.nanoTime();
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
        long endTime = System.nanoTime();
        double duration = (double) (endTime - startTime) / 1_000_000;
        DecimalFormat df = new DecimalFormat("0.00");
        String formattedDuration = df.format(duration);
        System.out.println("Time " + formattedDuration + " ms");
    }
}