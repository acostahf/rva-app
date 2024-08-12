import QuickAdd from "@/components/QuickAdd";
import StatsCard from "@/components/StatsCard";
import XBottomSheet from "@/components/XBottomSheet";
import { Link, Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Switch, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useDashStore from "@/store/dashStore";
import Auth from "@/components/Auth";
import { supabase } from "@/lib/supabase";

export default function Page() {
	const [revenue, setRevenue] = useState(0);
	const [toggle, setToggle] = useState(true);
	const [daily, setDaily] = useState(100);
	const [weekly, setWeekly] = useState(100);
	const [monthly, setMonthly] = useState(100);
	const [user, setUser] = useState(null);
	const [inventory, setInventory] = useState([]);
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

				let { data: inventory } = await supabase
					.from("inventory")
					.select("*");
				setInventory(inventory);
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
							<Text>{toggle ? "Total" : "Profit"}</Text>
						</Pressable>
						<Link href="/account"> Account </Link>
					</View>
					<Text className="text-5xl font-bold">${revenue}</Text>
				</View>
				<View className="flex flex-row gap-4">
					<View>
						<Text className="text-md font-bold">Daily</Text>
						<Text className="text-xl font-bold">${daily}</Text>
					</View>
					<View>
						<Text className="text-md font-bold">Weekly</Text>
						<Text className="text-xl font-bold">${weekly}</Text>
					</View>
					<View>
						<Text className="text-md font-bold">Monthly</Text>
						<Text className="text-xl font-bold">${monthly}</Text>
					</View>
				</View>

				{/* STATS */}
				<View className="flex flex-row ">
					<StatsCard dollar label="Cost of Goods" value={cog} />
					<StatsCard dollar label="Profit of Goods" value={pog} />
					<StatsCard label="Number of Items" value={qty} />
					<StatsCard dollar label="Value of Goods" value={vog} />
				</View>
				{/* LIST OF RECENT PICKUPS */}
				<FlatList
					data={inventory}
					renderItem={({ item }) => (
						<Pressable>
							<Link href={`/details/${item.id}`}>
								<View className="flex flex-row justify-between mb-4 bg-cyan-900/40 p-8 rounded-xl w-full">
									<Text className="text-white text-xl font-bold">
										{item.title}
									</Text>
									<Text className="text-white text-xl font-bold">
										${item.market_value}
									</Text>
								</View>
							</Link>
						</Pressable>
					)}
				/>

				<View>{!user && <Auth />}</View>
			</View>

			{/* MODAL FOR QUICK ADD */}
			<QuickAdd />
		</GestureHandlerRootView>
	);
}
