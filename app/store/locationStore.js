import { create } from "zustand";

const useLocationStore = create((set) => ({
  location: null,
  setLocation: (lat, lon) => set({ location: { lat, lon } }),
}));

export default useLocationStore;
