import React from "react";
import { Text, View } from "react-native";

interface StatsCardProps {
	value: number;
	label: string;
	dollar?: boolean;
}

const StatsCard = ({ value, label, dollar }: StatsCardProps) => {
	return (
		<View className="flex flex-col items-center flex-1">
			<Text className="text-xl font-bold">
				{dollar ? `$${value}` : value}
			</Text>
			<Text className="text-sm">{label}</Text>
		</View>
	);
};

export default StatsCard;
