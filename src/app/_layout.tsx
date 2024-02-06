import "../global.css";
import { Stack } from "expo-router";
import AppContextProvider from "@/context/AppContext";

export default function Layout() {
	return (
		<AppContextProvider>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</AppContextProvider>
	);
}
