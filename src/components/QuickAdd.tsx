import React, { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import XBottomSheetInput from "./XBottomSheetInput";
import XButton from "./XButton";
import { supabase } from "@/lib/supabase";

const QuickAdd = () => {
	const [title, setTitle] = useState("");
	const [qty, setQty] = useState("");
	const [buyPrice, setBuyPrice] = useState("");
	const [marketPrice, setMarketPrice] = useState("");
	const [ebayLink, setEbayLink] = useState("");

	const snapPoints = useMemo(() => ["20%", "55%"], []);
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const handleSubmit = useCallback(async () => {
		try {
			const user = await supabase.auth.getUser();
			const { data, error } = await supabase
				.from("inventory")
				.insert([
					{
						title: title,
						buy_price: Number(buyPrice),
						qty: Number(qty),
						market_value: Number(marketPrice),
						ebay_link: ebayLink,
						user: user.data.user.id,
					},
				])
				.select();
			//clear state
			bottomSheetModalRef.current?.close();
			setTitle("");
			setQty("");
			setBuyPrice("");
			setMarketPrice("");
			setEbayLink("");
		} catch (error) {
			console.log(error);
		}
	}, [title, qty, buyPrice, marketPrice, ebayLink]);

	return (
		<BottomSheetModalProvider>
			<View className="absolute bottom-2 w-full px-4">
				<XButton
					onPress={handlePresentModalPress}
					label="Quick Add"
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
							val={title}
							onInputChange={(e) => {
								setTitle(e.nativeEvent.text);
							}}
						/>
						<XBottomSheetInput
							label="Qty"
							val={qty}
							onInputChange={(e) => {
								setQty(e.nativeEvent.text);
							}}
						/>
						<View className="flex flex-row gap-4 justify-center w-full">
							<XBottomSheetInput
								label="Buy Price"
								val={buyPrice}
								onInputChange={(e) => {
									setBuyPrice(e.nativeEvent.text);
								}}
							/>
							<XBottomSheetInput
								label="Market Price"
								val={marketPrice}
								onInputChange={(e) => {
									setMarketPrice(e.nativeEvent.text);
								}}
							/>
						</View>
						<XBottomSheetInput
							placeholder="Ebay Link"
							val={ebayLink}
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
