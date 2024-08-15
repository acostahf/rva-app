import { Link } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View, ScrollView } from "react-native";

interface InventoryListProps {
	data: any;
	inventory?: boolean;
}

const InventoryList = ({ data, inventory }: InventoryListProps) => {
	return (
		<View>
			<FlatList
				style={{ paddingTop: 20 }}
				data={data}
				renderItem={({ item }) => (
					<Pressable>
						<Link
							href={
								!inventory ? `/details/${item.id}` : `/item/${item.id}`
							}
						>
							<View className="flex flex-row justify-between mb-4 rounded-xl w-full">
								<Text className="text-black text-2xl font-bold capitalize">
									{item.title}
								</Text>
								<View className="rounded-3xl px-4 py-2 bg-indigo-500 min-w-24">
									<Text className="text-white text-lg font-bold text-center">
										${item.market_value}
									</Text>
								</View>
							</View>
						</Link>
					</Pressable>
				)}
			/>
		</View>
	);
};

export default InventoryList;
