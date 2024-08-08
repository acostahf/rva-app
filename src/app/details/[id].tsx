import { supabase } from "@/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SupabaseProduct } from "@/types/index";

const DetailsPage = () => {
	const { id } = useLocalSearchParams();
	const [product, setProduct] = useState<SupabaseProduct | null>(null);

	const fetchData = async () => {
		try {
			const { data, error } = await supabase
				.from("inventory")
				.select("*")
				.eq("id", id);
			setProduct(data[0]);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	return (
		<View>
			{product && (
				<View className={`flex flex-col gap-4 p-4`}>
					<Text className="text-3xl font-bold capitalize">
						{product.title}
					</Text>
					<Text className="text-2xl font-bold">
						Profit: ${product.market_value - product.buy_price}
					</Text>
					<Text className="text-xl">Buy Price: ${product.buy_price}</Text>
					<Text className="text-xl">
						Market value: ${product.market_value}
					</Text>
					<Text className="text-xl">Number of Items: {product.qty}</Text>
					<Text className="text-xl">
						Pickup Date: {product.created_at}
					</Text>
				</View>
			)}
		</View>
	);
};

export default DetailsPage;
