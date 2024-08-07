import React, { useCallback, useMemo, useRef, useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import XBottomSheetInput from "./XBottomSheetInput";
import XButton from "./XButton";

const QuickAdd = () => {
	const [title, setTitle] = useState("");
	const [qty, setQty] = useState("");
	const [buyPrice, setBuyPrice] = useState("");
	const [marketPrice, setMarketPrice] = useState("");
	const [ebayLink, setEbayLink] = useState("");
	const [submit, setSubmit] = useState("");

	const snapPoints = useMemo(() => ["10%", "50%"], []);
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const handleSubmit = useCallback(() => {
		//need to send this data to the backend
		//collection would be products
		console.log("handleSubmit");
	}, []);

	return (
		<BottomSheetModalProvider>
			<View className="absolute bottom-0 ">
				<Button
					onPress={handlePresentModalPress}
					title="Quick Add"
					color="black"
				/>
				<BottomSheetModal
					ref={bottomSheetModalRef}
					index={1}
					snapPoints={snapPoints}
					onChange={handleSheetChanges}
				>
					<BottomSheetView className="w-full p-4 flex flex-col gap-4">
						<XBottomSheetInput
							label="Product Name"
							onInputChange={(e) => {
								setTitle(e.nativeEvent.text);
							}}
						/>
						<XBottomSheetInput
							label="Qty"
							onInputChange={(e) => {
								setQty(e.nativeEvent.text);
							}}
						/>
						<View className="flex flex-row gap-4 justify-center w-full">
							<XBottomSheetInput
								label="Buy Price"
								onInputChange={(e) => {
									setBuyPrice(e.nativeEvent.text);
								}}
							/>
							<XBottomSheetInput
								label="Market Price"
								onInputChange={(e) => {
									setMarketPrice(e.nativeEvent.text);
								}}
							/>
						</View>
						<XBottomSheetInput
							placeholder="Ebay Link"
							onInputChange={(e) => {
								setEbayLink(e.nativeEvent.text);
							}}
						/>
						<XButton label="Submit" onPress={handleSubmit} />
					</BottomSheetView>
				</BottomSheetModal>
			</View>
		</BottomSheetModalProvider>
	);
};

export default QuickAdd;
