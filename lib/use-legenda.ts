import { create } from "zustand";

type Store = {
  hidden: boolean;
  onToggle: () => void;
}

export const useLegenda = create<Store>((set) => ({
  hidden: true,
  onToggle: () => set((state) => ({ hidden: !state.hidden })),
}));