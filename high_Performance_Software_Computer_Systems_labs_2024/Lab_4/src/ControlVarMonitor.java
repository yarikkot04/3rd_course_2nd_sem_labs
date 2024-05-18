public class ControlVarMonitor {
    private int d;
    private int p;
    private int a = 0;
    public synchronized void setD(int d) {
        this.d = d;
    }
    public synchronized void setP(int p) {
        this.p = p;
    }
    public synchronized int getCopyD() {
        return this.d;
    }
    public synchronized int getCopyP() {
        return this.p;
    }
    public synchronized void sumPartialA(int ai) {
        a += ai;
    }
    public synchronized int getCopyA() {
        return this.a;
    }
}
