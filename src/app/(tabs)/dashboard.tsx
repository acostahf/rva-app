import XBottomSheet from "@/components/XBottomSheet";
import { Link, Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View className="w-full h-full p-4 pt-20">
				<View>
					<Text className="text-2xl">Total Profit:</Text>
					<Text>Total Value:</Text>
					<Text>Max Buy Price:</Text>
				</View>
				{/* slider here */}
				<View></View>
				{/* Flatlist here */}
				<View>
					<Text>Item 1</Text>
					<Text>Item 2</Text>
					<Text>Item 3</Text>
				</View>
				<XBottomSheet />
			</View>
		</GestureHandlerRootView>
	);
}
