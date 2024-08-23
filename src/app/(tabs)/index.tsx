import QuickAdd from "@/components/QuickAdd";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useDashStore from "@/store/dashStore";
import { supabase } from "@/lib/supabase";
import Chart from "@/components/Chart";
import InventoryList from "@/components/InventoryList";
import useAppStore from "@/store/appStore";
import HeatMap from "@/components/HeatMap";

export default function Page() {
	const [revenue, setRevenue] = useState(0);
	const [toggle, setToggle] = useState(true);
	const [daily, setDaily] = useState(100);
	const [weekly, setWeekly] = useState(100);
	const [monthly, setMonthly] = useState(100);
	const [user, setUser] = useState(null);
	const [bundles, setBundles] = useState([]);
	const { setUser_id } = useAppStore();
	const {
		cog,
		pog,
		qty,
		vog,
		setCog,
		setPog,
		setQty,
		setVog,
		grossSales,
		setGrossSales,
		netSales,
		setNetSales,
	} = useDashStore();
	const router = useRouter();
	useEffect(() => {
		if (toggle) {
			setRevenue(grossSales);
			setDaily(Number((grossSales / 90).toFixed(0)));
			setWeekly(Number(((grossSales / 90) * 7).toFixed(0)));
			setMonthly(Number((grossSales / 3).toFixed(0)));
		} else {
			setRevenue(netSales);
			setDaily(Number((netSales / 90).toFixed(0)));
			setWeekly(Number(((netSales / 90) * 7).toFixed(0)));
			setMonthly(Number((netSales / 3).toFixed(0)));
		}
	}, [toggle, grossSales, netSales]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data, error } = await supabase.auth.getUser();
				setUser(data.user);
				setUser_id(data.user.id);
				if (!data.user) {
					router.replace("/signin");
				}

				const { data: bundles } = await supabase
					.from("bundles")
					.select("*");
				setBundles(bundles);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View className="w-full h-full p-4 pt-20 flex flex-col gap-4">
				<View className="flex gap-4">
					<View className="flex flex-row gap-4 items-end">
						<Text className="text-2xl font-bold">
							90 day {toggle ? "Total" : "Profit"}
						</Text>
						<Pressable
							className="text-gray-500"
							onPress={() => setToggle(!toggle)}
						>
							<View className="border-indigo-500 border-2 border-solid rounded-full px-2 ">
								<Text>{toggle ? "Profit" : "Total"}</Text>
							</View>
						</Pressable>
					</View>
					<Text className="text-5xl font-bold">${revenue}</Text>
				</View>

				{/* <Chart /> */}
				<HeatMap />

				<View className="flex flex-row gap-6">
					<View className="flex flex-row items-center gap-2">
						<Text className="font-bold">${daily}</Text>
						<Text className="text-sm">Daily</Text>
					</View>
					<View className="flex flex-row items-center gap-2">
						<Text className="font-bold">${weekly}</Text>
						<Text className="text-sm">Weekly</Text>
					</View>
					<View className="flex flex-row items-center gap-2">
						<Text className="font-bold">${monthly}</Text>
						<Text className="text-sm">Monthly</Text>
					</View>
				</View>

				{/* STATS */}
				{/* <View className="flex flex-row">
					<StatsCard dollar label="Cost of Goods" value={cog} />
					<StatsCard dollar label="Profit of Goods" value={pog} />
					<StatsCard label="Number of Items" value={qty} />
					<StatsCard dollar label="Value of Goods" value={vog} />
				</View> */}
				{/* LIST OF RECENT PICKUPS */}
				<InventoryList data={bundles} />
			</View>

			{/* MODAL FOR QUICK ADD */}
			<QuickAdd />
		</GestureHandlerRootView>
	);
}
