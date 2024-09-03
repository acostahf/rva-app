import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import {
	Text,
	View,
	NativeSyntheticEvent,
	TextInputChangeEventData,
} from "react-native";

interface XBottomSheetInputProps {
	label?: string;
	placeholder?: string;
	type: "numeric" | "text";
	dou?: boolean;
	onInputChange?: (
		e: NativeSyntheticEvent<TextInputChangeEventData>
	) => void;
	val?: any;
}

const XBottomSheetInput = ({
	label,
	placeholder,
	type,
	dou,
	onInputChange,
	val,
}: XBottomSheetInputProps) => {
	return (
		<View className={dou ? "basis-5/12" : "grow"}>
			<BottomSheetTextInput
				// keyboardType={type === "number-pad" ? "number-pad" : "default"}
				placeholder={placeholder}
				onChange={onInputChange}
				disableFullscreenUI={true}
				value={val?.toString()}
				inputMode={type}
				returnKeyType="done"
				textAlign="center"
				className="px-6 py-4 border-solid border-2 border-black rounded-2xl"
			/>
			{label && <Text className="pt-2">{label}</Text>}
		</View>
	);
};

export default XBottomSheetInput;
