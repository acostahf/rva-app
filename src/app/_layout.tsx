import "../global.css";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DevToolsBubble } from "react-native-react-query-devtools";
import AuthProvider from "@/providers/AuthProvider";

export default function Layout() {
	const queryClient = new QueryClient();

	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
				<DevToolsBubble />
			</QueryClientProvider>
		</AuthProvider>
	);
}
