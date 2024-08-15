import { supabase } from "@/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SupabaseProduct } from "@/types/index";
import QuickAdd from "@/components/QuickAdd";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ItemPage = () => {
	const { id } = useLocalSearchParams();
	const [inventory, setInventory] = useState<SupabaseProduct | null>(null);

	const fetchData = async () => {
		try {
			const { data, error } = await supabase
				.from("inventory")
				.select("*")
				.eq("id", id);

			setInventory(data[0]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	const handleEdit = async ({
		title,
		buyPrice,
		marketPrice,
		ebayLink,
	}) => {
		const { data, error } = await supabase
			.from("inventory")
			.update({
				title: title,
				buy_price: buyPrice,
				market_value: marketPrice,
				ebay_link: ebayLink,
			})
			.eq("id", id)
			.select();

		fetchData();
	};

	return (
		<GestureHandlerRootView>
			{inventory && (
				<View className={`flex flex-col gap-4 p-4`}>
					<View className="flex flex-row justify-between">
						<Text className="text-3xl font-bold capitalize">
							{inventory.title}
						</Text>
						<Pressable onPress={handleEdit}>
							<Text className="text-xl font-bold text-blue-500">Edit</Text>
						</Pressable>
					</View>
					<Text className="text-2xl font-bold">
						Profit: ${inventory.market_value - inventory.buy_price}
					</Text>
					<Text className="text-xl">
						Buy Price: ${inventory.buy_price}
					</Text>
					<Text className="text-xl">
						Market value: ${inventory.market_value}
					</Text>
					<Text className="text-xl">
						Pickup Date: {new Date(inventory.created_at).toDateString()}
					</Text>
				</View>
			)}

			<QuickAdd
				data={inventory}
				edit
				pageId={id}
				handleEdit={handleEdit}
			/>
		</GestureHandlerRootView>
	);
};

export default ItemPage;
