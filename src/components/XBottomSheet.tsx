import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import XBottomSheetInput from "./XBottomSheetInput";

const XBottomSheet = () => {
	const snapPoints = useMemo(() => ["20%", "50%", "75%", "90%"], []);
	const [profit, setProfit] = useState(0);
	const [maxCost, setMaxCost] = useState(0);
	const [shipping, setShipping] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [soldPrice, setSoldPrice] = useState(0);
	const [marketplaceFee, setmarketplaceFee] = useState(0.13);
	const [tax, setTax] = useState(0.0875);
	const [promotedFees, setPromotedFees] = useState(0.03);
	const [userRate, setUserRate] = useState(0.3);
	const [coverShipping, setCoverShipping] = useState(false);

	const calculateProfit = useCallback(() => {
		let fees = 0;
		fees = marketplaceFee + tax + promotedFees;
		const finalPrice = soldPrice - (soldPrice * fees + shipping);
		const totalCost = finalPrice * userRate;

		setProfit(Math.round(finalPrice));
		setMaxCost(Math.round(totalCost));
	}, [soldPrice, marketplaceFee, tax, promotedFees, shipping, userRate]);

	const handleSoldPriceChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = parseInt(event.target.value);
		setSoldPrice(value);
	};

	const handleUserRateChange = (value: number) => {
		setUserRate(value);
	};

	useEffect(() => {
		calculateProfit();
	}, [
		soldPrice,
		marketplaceFee,
		tax,
		promotedFees,
		shipping,
		userRate,
		coverShipping,
		quantity,
		profit,
		maxCost,
		calculateProfit,
	]);

	return (
		<BottomSheet snapPoints={snapPoints}>
			<View className="p-4 w-full flex gap-4 justify-center items-center">
				<View className="flex flex-row gap-4 items-center">
					<Text className="text-xl basis-5/12 text-center">
						Asking Price
					</Text>

					<XBottomSheetInput dou placeholder="$100" />
				</View>

				<View className="flex flex-row gap-4">
					<Pressable
						className="basis-5/12 px-6 py-4 border-solid border-2 border-black rounded-2xl"
						onPress={() => {}}
					>
						<Text>Clear Feed</Text>
					</Pressable>
					<Pressable
						className="basis-5/12 px-6 py-4 border-solid border-2 border-black rounded-2xl"
						onPress={() => {}}
					>
						<Text>Add New Item</Text>
					</Pressable>
				</View>
				<View className="w-full px-6 pt-6">
					<XBottomSheetInput label="Item Name" placeholder="Item 1" />
				</View>

				<View className="flex flex-row gap-4 justify-center w-full">
					<XBottomSheetInput dou label="Market Value" placeholder="$100" />
					<XBottomSheetInput dou label="QTY" placeholder="20" />
				</View>

				<View className="w-full flex flex-row gap-4 px-6 content-start">
					<Pressable
						className="px-6 py-2 border-solid border-2 border-black bg-black rounded-full"
						onPress={() => {}}
					>
						<Text className="text-white">Preset 1</Text>
					</Pressable>
					<Pressable
						className="px-6 py-2 border-solid border-2 border-black rounded-full"
						onPress={() => {}}
					>
						<Text>Preset 2</Text>
					</Pressable>
				</View>

				<View className="w-full flex flex-col gap-4 px-6 content-start">
					<Text>Marketplace fee: {marketplaceFee}</Text>
					<Text>Shipping fee: {shipping}</Text>
					<Text>Tax: {tax}</Text>
					<Text>Shipping: {shipping}</Text>
					<Text>Promotion: {promotedFees}</Text>
				</View>
			</View>
		</BottomSheet>
	);
};

export default XBottomSheet;
