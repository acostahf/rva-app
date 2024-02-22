import React from "react";
import { Switch, Text, View } from "react-native";
import useAppStore from "@/store/appStore";
import { useColorScheme } from "nativewind";
import useThemeStore from "@/store/themeStore";

const dashboard = () => {
	const { user } = useAppStore();

	return (
		<View>
			<Text>dashboard</Text>
			<Text>{user}</Text>
		</View>
	);
};

export default dashboard;
