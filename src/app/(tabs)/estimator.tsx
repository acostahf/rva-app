import XBottomSheet from "@/components/XBottomSheet";
import useCalStore from "@/store/calStore";
import React, { useCallback, useEffect } from "react";
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
	} = useCalStore((state) => state);
	const progress = useSharedValue(userRate);
	const min = useSharedValue(0);
	const max = useSharedValue(1);

	const handleUserRateChange = (value: number) => {
		setUserRate(value);
	};

	const calculateProfit = useCallback(() => {
		let fees = 0;
		fees = marketplaceFee + tax + promotedFees;
		const finalProfit = soldPrice - (soldPrice * fees + shipping);
		const totalCost = finalProfit * userRate;

		setProfit(Math.round(finalProfit));
		setMaxCost(Math.round(totalCost));
	}, [soldPrice, marketplaceFee, tax, promotedFees, shipping, userRate]);

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
			<View className="w-full h-full p-4 pt-20 bg-orange-500/50">
				<View>
					<Text className="text-4xl font-bold">
						Total Profit: ${profit === -1 ? 0 : profit}
					</Text>
					<Text>Total Value: ${soldPrice}</Text>
					<Text>Max Buy Price: ${maxCost}</Text>
					<Text> {soldPrice}</Text>
				</View>
				{/* slider here */}
				<View className="w-full p-4">
					<Slider
						style={{ width: "100%" }}
						progress={progress}
						onValueChange={(value) => {
							// progress.value = value;
							handleUserRateChange(value);
						}}
						minimumValue={min}
						maximumValue={max}
					/>
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
