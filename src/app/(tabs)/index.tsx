import QuickAdd from "@/components/QuickAdd";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Pressable,
	Text,
	View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InventoryList from "@/components/InventoryList";
import HeatMap from "@/components/HeatMap";
import { useStats } from "../api/stats";
import { supabase } from "@/lib/supabase";
import { Redirect, router } from "expo-router";
import { useBundles } from "../api/bundles";
import { useAuth } from "@/providers/AuthProvider";

export default function Page() {
	const { data, error, isError, isPending } = useStats();
	const [toggle, setToggle] = useState(true);
	const { data: bundles } = useBundles();
	const { session, loading } = useAuth();

	if (loading) {
		return <ActivityIndicator />;
	}

	if (!session) {
		return <Redirect href={"/signin"} />;
	}

	if (isError) {
		Alert.alert("stats error", error.message);
	}

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
					{isPending ? (
						<Text className="text-5xl font-bold">Loading...</Text>
					) : (
						<Text className="text-5xl font-bold">
							${data?.gross.toFixed(0)}
						</Text>
					)}
				</View>

				{/* <Chart /> */}
				<HeatMap />

				<View className="flex flex-row gap-6">
					<View className="flex flex-row items-center gap-2">
						<Text className="font-bold">${data?.daily.toFixed(2)}</Text>
						<Text className="text-sm">Daily</Text>
					</View>
					<View className="flex flex-row items-center gap-2">
						<Text className="font-bold">${data?.weekly.toFixed(2)}</Text>
						<Text className="text-sm">Weekly</Text>
					</View>
					<View className="flex flex-row items-center gap-2">
						<Text className="font-bold">${data?.monthly.toFixed(2)}</Text>
						<Text className="text-sm">Monthly</Text>
					</View>
				</View>

				{/* LIST OF RECENT PICKUPS */}
				<InventoryList data={bundles} />
			</View>

			{/* MODAL FOR QUICK ADD */}
			<QuickAdd />
		</GestureHandlerRootView>
	);
}
