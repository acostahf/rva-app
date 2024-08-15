import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { View } from "react-native";
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import XBottomSheetInput from "./XBottomSheetInput";
import XButton from "./XButton";
import { supabase } from "@/lib/supabase";
import useAppStore from "@/store/appStore";
import { SupabaseProduct } from "@/types/index";

interface QuickAddProps {
	edit?: boolean;
	pageId?: any;
	data?: any | null;
	handleEdit?: ({
		title,
		buyPrice,
		marketPrice,
		ebayLink,
	}: {
		title: string;
		buyPrice: string;
		marketPrice: string;
		ebayLink: string;
	}) => void;
}

const QuickAdd = ({ edit, pageId, data, handleEdit }: QuickAddProps) => {
	const [title, setTitle] = useState("");
	const [qty, setQty] = useState("");
	const [buyPrice, setBuyPrice] = useState("");
	const [marketPrice, setMarketPrice] = useState("");
	const [ebayLink, setEbayLink] = useState("");
	const { user_id } = useAppStore();

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
	useEffect(() => {
		if (data) {
			setTitle(data.title);
			setQty(data.qty);
			setBuyPrice(data.buy_price);
			setMarketPrice(data.market_value);
			setEbayLink(data.ebay_link);
		}
	}, [data]);

	const handleSubmit = useCallback(async () => {
		try {
			if (!edit) {
				const { data: bundle, error } = await supabase
					.from("bundles")
					.insert([
						{
							title: title,
							buy_price: Number(buyPrice),
							qty: Number(qty),
							market_value: Number(marketPrice),
							ebay_link: ebayLink,
							user_id: user_id,
						},
					])
					.select();
				let bundlesArry = [];
				//take the qty and create that many inventory items
				for (let i = 0; i < Number(qty); i++) {
					bundlesArry.push({ title: `${title} - ${i + 1}` });
				}
				//insert that many inventory items
				await supabase.from("inventory").insert(
					bundlesArry.map((item, i) => ({
						...item,
						buy_price: Number(buyPrice) / Number(qty),
						market_value: Number(marketPrice) / Number(qty),
						ebay_link: ebayLink,
						user: user_id,
						bundle_id: bundle[0].id,
					}))
				);
			} else {
				//edit

				handleEdit({
					title: title,
					buyPrice: buyPrice,
					marketPrice: marketPrice,
					ebayLink: ebayLink,
				});
			}
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
			<View
				className={`absolute ${
					!edit ? "bottom-2" : "bottom-6"
				} w-full px-4`}
			>
				<XButton onPress={handlePresentModalPress} label="Quick Add" />
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
						{!edit && (
							<XBottomSheetInput
								label="Qty"
								val={qty}
								onInputChange={(e) => {
									setQty(e.nativeEvent.text);
								}}
							/>
						)}
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
