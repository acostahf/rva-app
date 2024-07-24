import XBottomSheet from "@/components/XBottomSheet";
import { Link, Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Page() {
	return (
		<View className="w-full h-full bg-orange-400">
			<XBottomSheet />
		</View>
	);
}
