import React, { useState } from "react";
import {
	Alert,
	StyleSheet,
	View,
	AppState,
	TextInput,
	Button,
	Text,
} from "react-native";
import { supabase } from "@/lib/supabase";
import XButton from "./XButton";
import { useRouter } from "expo-router";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

export default function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function signInWithEmail() {
		setLoading(true);
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (data) {
			router.replace("/");
		}

		if (error) Alert.alert(error.message);
		setLoading(false);
	}

	async function signUpWithEmail() {
		setLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		if (!session)
			Alert.alert("Please check your inbox for email verification!");
		setLoading(false);
	}

	return (
		<View className="p-6 flex flex-col gap-4">
			<View>
				<Text className="text-2xl">SIGN IN</Text>
			</View>
			<View>
				<TextInput
					className="border-solid border-2 border-black rounded-lg p-2"
					// label="Email"
					// leftIcon={{ type: "font-awesome", name: "envelope" }}
					onChangeText={(text) => setEmail(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize={"none"}
				/>
			</View>
			<View>
				<TextInput
					className="border-solid border-2 border-black rounded-lg p-2"
					// label="Password"
					// leftIcon={{ type: "font-awesome", name: "lock" }}
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize={"none"}
				/>
			</View>
			<View className="flex flex-col gap-4 mt-4">
				<XButton label="Sign in" onPress={() => signInWithEmail()} />
				<XButton label="Sign up" onPress={() => signUpWithEmail()} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: "stretch",
	},
	mt20: {
		marginTop: 20,
	},
});
