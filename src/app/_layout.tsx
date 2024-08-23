import { SafeAreaView, Text, View } from "react-native";
import "../global.css";
import { Slot, Stack, Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout() {
	const [session, setSession] = useState<Session | null>(null);
	const queryClient = new QueryClient();
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);
	return (
		<QueryClientProvider client={queryClient}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</QueryClientProvider>
	);
}
