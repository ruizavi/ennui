import { create } from "zustand";

interface Store {
  location: {
    [key: symbol | string]: boolean;
  };
}

interface Action {
  toggle: (id: symbol | string) => void;
}

export const useExpand = create<Store & Action>((set) => ({
  location: {},
  toggle: (id: symbol | string) =>
    set((state) => ({ location: { [id]: !state.location[id] } })),
}));
