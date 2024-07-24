import React, { useMemo } from "react";
import { Text, View } from "react-native";
import useAppStore from "@/store/appStore";

const dashboard = () => {
	const { user } = useAppStore();

	return (
		<View className="flex w-full h-full bg-slate-500">
			<Text>Dashboard page</Text>
			<Text>User: {user}</Text>
		</View>
	);
};

export default dashboard;
