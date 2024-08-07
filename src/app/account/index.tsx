import Account from "@/components/Account";
import XBottomSheet from "@/components/XBottomSheet";
import { Link, Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Page() {
	return (
		<View>
			<Account />
		</View>
	);
}
