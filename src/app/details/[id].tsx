import { supabase } from "@/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SupabaseBundle, SupabaseProduct } from "@/types/index";
import InventoryList from "@/components/InventoryList";

const DetailsPage = () => {
	const { id } = useLocalSearchParams();
	const [inventory, setInventory] = useState([]);
	const [bundle, setBundle] = useState<SupabaseBundle | null>(null);

	const fetchData = async () => {
		try {
			const { data: bundle, error } = await supabase
				.from("bundles")
				.select("*")
				.eq("id", id);
			setBundle(bundle[0]);

			const { data: inventory, error: inventoryErr } = await supabase
				.from("inventory")
				.select("*")
				.eq("bundle_id", bundle[0].id);

			setInventory(inventory);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	return (
		<View>
			{bundle && (
				<View className={`flex flex-col gap-4 p-4`}>
					<Text className="text-3xl font-bold capitalize">
						{bundle.title}
					</Text>
					<Text className="text-2xl font-bold">
						Profit: ${bundle.market_value - bundle.buy_price}
					</Text>
					<Text className="text-xl">Buy Price: ${bundle.buy_price}</Text>
					<Text className="text-xl">
						Market value: ${bundle.market_value}
					</Text>
					<Text className="text-xl">Number of Items: {bundle.qty}</Text>
					<Text className="text-xl">
						Pickup Date: {new Date(bundle.created_at).toDateString()}
					</Text>
					<InventoryList inventory data={inventory} />
				</View>
			)}
		</View>
	);
};

export default DetailsPage;
