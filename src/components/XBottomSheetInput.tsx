import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { Text, View } from "react-native";

interface XBottomSheetInputProps {
	label?: string;
	placeholder: string;
	type?: "number-pad" | "default";
	dou?: boolean;
}

const XBottomSheetInput = ({
	label,
	placeholder,
	type,
	dou,
}: XBottomSheetInputProps) => {
	return (
		<View className={dou ? "basis-5/12" : "grow"}>
			<BottomSheetTextInput
				keyboardType={type === "number-pad" ? "number-pad" : "default"}
				placeholder={placeholder}
				textAlign="center"
				className="px-6 py-4 border-solid border-2 border-black rounded-2xl"
			/>
			{label && <Text className="pt-2">{label}</Text>}
		</View>
	);
};

export default XBottomSheetInput;
