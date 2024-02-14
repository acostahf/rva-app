import { create } from "zustand";

interface AppStore {
	user: string;
}

const useAppStore = create<AppStore>((set) => ({
	user: "John Wick",
}));

export default useAppStore;
