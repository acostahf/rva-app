import { create } from "zustand";

interface AppStore {
	user_id: string;
	setUser_id: (user_id: string) => void;
}

const useAppStore = create<AppStore>((set) => ({
	user_id: "",
	setUser_id: (user_id) => set({ user_id }),
}));

export default useAppStore;
