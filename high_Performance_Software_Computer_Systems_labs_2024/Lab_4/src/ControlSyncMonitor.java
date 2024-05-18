public class ControlSyncMonitor {

    private int flag_FL = 0;
    private int flag_S = 0;
    private int flag_C = 0;
    private int flag_FO = 0;

    public synchronized void inputWait() {
        if (flag_FL != 4) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public synchronized void inputSignal() {
        flag_FL++;
        if (flag_FL == 4) {
            this.notifyAll();
        }
    }

    public synchronized void sumPartASignal() {
        flag_S++;
        if (flag_S == 4) {
            notifyAll();
        }
    }

    public synchronized void sumPartAWait() {
        if (flag_S != 4) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public synchronized void calcC_Signal() {
        flag_C++;
        if (flag_C == 4) {
            notifyAll();
        }
    }

    public synchronized void calcC_Wait() {
        if (flag_C != 4) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public synchronized void finalOutputSignal() {
        flag_FO++;
        if (flag_FO == 3) {
            notify();
        }
    }

    public synchronized void finalOutputWait() {
        if (flag_FO != 3) {
            try {
                wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

}