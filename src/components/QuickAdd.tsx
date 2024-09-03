import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Alert, View } from "react-native";
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import XBottomSheetInput from "./XBottomSheetInput";
import XButton from "./XButton";
import { Bundle } from "@/types";
import { useAddBundle } from "@/app/api/bundles";

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
	const { mutate: addBundle } = useAddBundle();

	const snapPoints = useMemo(() => ["20%", "55%"], []);
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		// console.log("handleSheetChanges", index);
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
		const inputData: Bundle = {
			title: title,
			buy_price: parseInt(buyPrice),
			market_value: parseInt(marketPrice),
			ebay_link: ebayLink,
			qty: parseInt(qty),
		};

		try {
			if (!edit) {
				addBundle(inputData);
				// mutation.mutate(inputData);
			} else {
				//edit
				// handleEdit(inputData);
			}

			//clear state
			bottomSheetModalRef.current?.close();
			setTitle("");
			setQty("");
			setBuyPrice("");
			setMarketPrice("");
			setEbayLink("");
		} catch (error) {
			console.log("Submit Error:", error);
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
							type="text"
							onInputChange={(e) => {
								setTitle(e.nativeEvent.text);
							}}
						/>
						{!edit && (
							<XBottomSheetInput
								label="Qty"
								val={qty}
								type="numeric"
								onInputChange={(e) => {
									setQty(e.nativeEvent.text);
								}}
							/>
						)}
						<View className="flex flex-row gap-4 justify-center w-full">
							<XBottomSheetInput
								label="Buy Price"
								val={buyPrice}
								type="numeric"
								onInputChange={(e) => {
									setBuyPrice(e.nativeEvent.text);
								}}
							/>
							<XBottomSheetInput
								label="Market Price"
								val={marketPrice}
								type="numeric"
								onInputChange={(e) => {
									setMarketPrice(e.nativeEvent.text);
								}}
							/>
						</View>
						<XBottomSheetInput
							placeholder="Ebay Link"
							type="text"
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
