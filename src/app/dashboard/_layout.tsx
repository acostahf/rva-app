import { Text, View } from "react-native";
import { Slot, Stack, Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					// backgroundColor: "white",
				},
			}}
		/>
	);
}
