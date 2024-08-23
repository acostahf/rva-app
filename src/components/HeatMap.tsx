import React from "react";
import { Dimensions, View } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";
import { useActivity } from "@/app/api/stats";

//This component is a heatmap or contribution graph that shows the user's activity on a daily basis.
//If the user list their daily goal for the day, the heatmap will show a filled square, if they list less than their goal then the color will be lighter.
//and if they list nothing then the square will be a dark gray.
//This component is to be reusable for any of the users habits or goals.

const HeatMap = () => {
	const { data } = useActivity();
	const chartConfig = {
		backgroundGradientFrom: "#1E2923",
		backgroundGradientTo: "#08130D",
		backgroundGradientFromOpacity: 0,
		backgroundGradientToOpacity: 0,
		color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
		strokeWidth: 2, // optional, default 3
		barPercentage: 0.5,
		useShadowColorFromDataset: false, // optional
	};

	return (
		<View className="">
			<ContributionGraph
				showMonthLabels={true}
				showOutOfRangeDays={false}
				style={{
					marginLeft: -15,
					marginTop: -15,
				}}
				yAxisLabel="day"
				values={data ? data : []}
				endDate={new Date()}
				numDays={105}
				width={Dimensions.get("window").width}
				height={220}
				chartConfig={chartConfig}
				tooltipDataAttrs={({
					value,
					date,
					title,
					tooltipDataAttrs,
				}) => ({})}
			/>
		</View>
	);
};
export default HeatMap;
