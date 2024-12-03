import { create } from "zustand";

type WorkState = {
  isWorking: boolean;
  startWork: () => void;
  endWork: () => void;
};

const useWorkStore = create<WorkState>((set) => ({
  isWorking: false,
  startWork: () => set({ isWorking: true }),
  endWork: () => set({ isWorking: false }),
}));

export default useWorkStore;
