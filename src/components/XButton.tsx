import React from "react";
import { Pressable, Text } from "react-native";

interface XButtonProps {
	label: string;
	onPress: () => void;
}

const XButton = ({ label, onPress }: XButtonProps) => {
	return (
		<Pressable
			onPress={onPress}
			className="w-full p-4 bg-blue-500 rounded-lg"
		>
			<Text className="text-white text-center uppercase font-bold">
				{label}
			</Text>
		</Pressable>
	);
};

export default XButton;
