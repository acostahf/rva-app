import XBottomSheet from "@/components/XBottomSheet";
import useCalStore from "@/store/calStore";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

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
					<Text>Market Price: ${soldPrice}</Text>
					<Text>ROI: {roi}x</Text>
					<Text>Fees: {(marketplaceFee + tax + promotedFees) * 100}%</Text>
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
						<Text>Max Buy Price </Text>
						<Text className="text-lg font-semibold">${maxCost} </Text>
					</View>
				</View>
				{/* Flatlist here */}
				<View>
					<Text>Item 1</Text>
					<Text>Item 2</Text>
					<Text>Item 3</Text>
				</View>
				<XBottomSheet />
			</View>
		</GestureHandlerRootView>
	);
}
