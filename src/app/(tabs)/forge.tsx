import { View, Text } from "react-native";
import React from "react";
import { useAppContext } from "@/context/AppContext";

const forge = () => {
	const { stats } = useAppContext();

	return (
		<View>
			<Text>forge</Text>
		</View>
	);
};

export default forge;
