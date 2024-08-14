import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const Chart = () => {
	const data = [
		{ value: 50 },
		{ value: 80 },
		{ value: 90 },
		{ value: 70 },
	];
	const data2 = [
		{ value: 10 },
		{ value: 20 },
		{ value: 30 },
		{ value: 40 },
	];

	return (
		<View className="w-full">
			<LineChart
				initialSpacing={0}
				spacing={110}
				color="#0BA5A4"
				hideDataPoints
				data={data}
				data2={data2}
				color2="red"
				hideYAxisText
				hideAxesAndRules
			/>
		</View>
	);
};

export default Chart;
