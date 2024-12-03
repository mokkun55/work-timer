import { create } from "zustand";

type WorkContentState = {
  workContent: string;
  setWorkContent: (workContent: string) => void;
};

const useWorkContentStore = create<WorkContentState>((set) => ({
  workContent: "",
  setWorkContent: (workContent) => set({ workContent }),
}));

export default useWorkContentStore;
