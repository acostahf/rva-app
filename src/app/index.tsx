import { Link, Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Page() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View className="">
				<Text>home</Text>
				<Link href={"/dashboard"}>dashboard</Link>
			</View>
		</GestureHandlerRootView>
	);
}
