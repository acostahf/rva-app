import { DashboardIcon } from "@/assets/icons";
import { Tabs } from "expo-router";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";

export default () => {
	return (
		<Tabs>
			<Tabs.Screen
				name="dashboard"
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<MaterialIcons size={28} name="dashboard" color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="estimator"
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="calculator-variant"
							size={24}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<Entypo name="open-book" size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
};
