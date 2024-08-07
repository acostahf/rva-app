import XBottomSheet from "@/components/XBottomSheet";
import XFlatList from "@/components/XFlatList";
import useCalStore from "@/store/calStore";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

type ItemData = {
	id: number;
	title: string;
	buyPrice: number;
	marketPrice: number;
};

export default function Page() {
	const {
		profit,
		userRate,
		soldPrice,
		maxCost,
		setUserRate,
		marketplaceFee,
		tax,
		promotedFees,
		shipping,
		setProfit,
		setMaxCost,
		setSoldPrice,
		coverShipping,
		quantity,
		buyPrice,
		setBuyPrice,
	} = useCalStore((state) => state);
	const progress = useSharedValue(userRate);
	const min = useSharedValue(0);
	const max = useSharedValue(100);
	const [roi, setRoi] = useState(0);

	const bundle: ItemData[] = [
		{
			id: 123,
			title: "Pikachu psa 10",
			buyPrice: 100,
			marketPrice: 200,
		},
		{
			id: 124,
			title: "Charizard psa 9",
			buyPrice: 100,
			marketPrice: 200,
		},
		{
			id: 125,
			title: "Another Card",
			buyPrice: 100,
			marketPrice: 200,
		},
		{
			id: 126,
			title: "Stack of raw cards",
			buyPrice: 100,
			marketPrice: 200,
		},
	];

	const handleUserRateChange = (value: number) => {
		setUserRate(value);
		setBuyPrice(null);
	};

	const calculateProfit = useCallback(() => {
		let fees = 0;
		let cost = 0;
		let genMax = soldPrice * (userRate / 100);
		let max = buyPrice ? buyPrice : genMax;

		fees = (marketplaceFee + tax + promotedFees) * soldPrice;
		cost = max + fees;

		setProfit(Math.round(soldPrice - cost));
		setMaxCost(Math.round(max));
		setRoi(Number(((soldPrice - cost) / max).toFixed(2)));
	}, [
		soldPrice,
		marketplaceFee,
		tax,
		promotedFees,
		shipping,
		userRate,
		buyPrice,
		coverShipping,
		quantity,
		profit,
		maxCost,
	]);

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
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View
				className={`w-full h-full p-4 pt-20  ${
					profit > 0 ? "bg-green-500/50 " : "bg-red-500/50"
				}`}
			>
				<View>
					<Text className="text-4xl font-bold">
						Total Profit: ${soldPrice ? profit : 0}
					</Text>
					<Text className="text-2xl">Market Price: ${soldPrice}</Text>
					<Text className="text-2xl">ROI: {roi}x</Text>
					<Text className="text-2xl">
						Fees: {(marketplaceFee + tax + promotedFees) * 100}%
					</Text>
				</View>
				{/* slider here */}
				<View className="w-full p-4 flex flex-col gap-4 justify-center items-center">
					<Slider
						style={{ width: "100%" }}
						progress={progress}
						onValueChange={(value) => {
							// progress.value = value;
							handleUserRateChange(value);
						}}
						minimumValue={min}
						maximumValue={max}
						step={10}
						snapToStep={true}
						// onHapticFeedback={() => {
						// 	ReactNativeHapticFeedback.trigger("impactLight", {
						// 		enableVibrateFallback: true,
						// 		ignoreAndroidSystemSettings: false,
						// 	});
						// }}
					/>
					<View className="flex flex-col gpa-2 items-center">
						<Text className="text-2xl">Max Buy Price </Text>
						<Text className="text-lg font-semibold">${maxCost} </Text>
					</View>
				</View>
				{/* Flatlist here */}
				{/* <XFlatList bundle={bundle} /> */}
				<View className="pt-10">
					<Text className="text-2xl text-center">More Coming Soon...</Text>
				</View>
				<XBottomSheet />
			</View>
		</GestureHandlerRootView>
	);
}
