import { useAppContext } from "@/context/AppContext";
import React from "react";
import { Text, View } from "react-native";

const dashboard = () => {
	const { stats } = useAppContext();

	return (
		<View>
			<Text>dashboard</Text>
			<Text>{stats.totalCost}</Text>
		</View>
	);
};

export default dashboard;
