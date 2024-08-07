import React, { useState } from "react";
import {
	FlatList,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

type ItemData = {
	id: number;
	title: string;
	buyPrice: number;
	marketPrice: number;
};

type ItemProps = {
	item: ItemData;
	onPress: () => void;
	backgroundColor: string;
	textColor: string;
};

const Item = ({
	item,
	onPress,
	backgroundColor,
	textColor,
}: ItemProps) => (
	<TouchableOpacity
		onPress={onPress}
		className="pb-2 flex flex-row justify-between"
	>
		<Text className="text-2xl">{item.title}</Text>
		<View className="flex flex-row">
			<Text>${item.marketPrice}/</Text>
			<Text className="text-red-500">${item.buyPrice}</Text>
		</View>
	</TouchableOpacity>
);

const XFlatList = ({ bundle }) => {
	const [selectedId, setSelectedId] = useState<number>();

	const hanldeSelection = (id: number) => {
		setSelectedId(id);
	};

	const renderItem = ({ item }: { item: ItemData }) => {
		const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
		const color = item.id === selectedId ? "white" : "black";

		return (
			<Item
				item={item}
				onPress={() => hanldeSelection(item.id)}
				backgroundColor={backgroundColor}
				textColor={color}
			/>
		);
	};

	return (
		<SafeAreaView className="">
			<FlatList
				className=""
				data={bundle}
				renderItem={renderItem}
				keyExtractor={(item) => `${item.title}-${item.id}`}
				extraData={selectedId}
			/>
		</SafeAreaView>
	);
};

export default XFlatList;
