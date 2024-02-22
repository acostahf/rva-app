import { create } from "zustand";
import { darkTheme, lightTheme } from "@/styles/theme";

interface ThemeStore {
	theme: "dark" | "light";
	themeMode: typeof darkTheme | typeof lightTheme;
	toggleTheme: () => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
	theme: "dark",
	themeMode: darkTheme,
	toggleTheme: () =>
		set((state) => {
			return {
				theme: state.theme === "dark" ? "light" : "dark",
				themeMode: state.theme === "dark" ? lightTheme : darkTheme,
			};
		}),
}));

export default useThemeStore;
