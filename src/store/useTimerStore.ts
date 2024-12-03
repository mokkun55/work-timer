import { create } from "zustand";

type TimerState = {
  startTime: number | null;
  elapsedTime: number; // 経過時間
  timer: NodeJS.Timeout | null; // setIntervalのID
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
};

const useTimerStore = create<TimerState>((set, get) => ({
  startTime: null,
  elapsedTime: 0,
  timer: null,

  // スタート
  startTimer: () => {
    if (!get().startTime) {
      const startTime = Date.now();
      set({
        startTime,
        elapsedTime: 0,
      });

      const timer = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = Math.floor((currentTime - startTime) / 1000);
        set({ elapsedTime: elapsed });
      }, 1000);
      set({ timer });
    }
  },

  // ストップ
  stopTimer: () => {
    const { timer } = get();
    if (timer) {
      clearInterval(timer);
      set({ timer: null });
    }
  },

  // リセット
  resetTimer: () => {
    const { timer } = get();
    if (timer) {
      clearInterval(timer);
      set({ timer: null });
    }
    set({
      startTime: null,
      elapsedTime: 0,
      timer: null,
    });
  },
}));

export default useTimerStore;
