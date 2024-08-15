import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const Chart = () => {
	const data = [
		{ value: 50 },
		{ value: 400 },
		{ value: 930 },
		{ value: 1300 },
		{ value: 1300 },
		{ value: 1300 },
		{ value: 1300 },
		{ value: 2300 },
		{ value: 5300 },
		{ value: 8300 },
		{ value: 9300 },
		{ value: 12300 },
		{ value: 13200 },
		{ value: 13300 },
	];
	const data2 = [
		{ value: 20 },
		{ value: 200 },
		{ value: 300 },
		{ value: 700 },
		{ value: 700 },
	];

	return (
		<View className="w-full">
			<LineChart
				initialSpacing={0}
				// spacing={0}
				color="#0BA5A4"
				hideDataPoints
				data={data}
				// data2={data2}
				color2="red"
				hideYAxisText
				hideAxesAndRules
			/>
		</View>
	);
};

export default Chart;
