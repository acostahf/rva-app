import { View } from "react-native";
import "../global.css";
import { Slot, Stack, Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View className="dark:bg-gray-700 flex-1 justify-center items-center h-full w-full">
				{/* <Tabs>
				<Tabs.Screen name="dashboard" />
				<Tabs.Screen name="forge" />
				</Tabs> */}
				<Slot />
			</View>
		</GestureHandlerRootView>
	);
}
