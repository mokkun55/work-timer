import { create } from "zustand";

type TimerSettingState = {
  showSeconds: boolean;
  toggleShowSeconds: () => void;
};

const useTimerSettingStore = create<TimerSettingState>((set) => ({
  showSeconds: true,
  toggleShowSeconds: () =>
    set((state) => ({ showSeconds: !state.showSeconds })),
}));

export default useTimerSettingStore;
