import { Link, Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Page() {
	return (
		<View className="">
			<Text>home</Text>
			<Link href={"/dashboard"}>dashboard</Link>
		</View>
	);
}
