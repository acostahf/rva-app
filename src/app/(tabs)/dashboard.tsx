import React from "react";
import { Text, View } from "react-native";
import useAppStore from "@/store/appStore";

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
