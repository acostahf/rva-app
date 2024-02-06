import { AppContextType, Stats } from "@/types";
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

export const AppContext = createContext<AppContextType | null>(null);

export default function AppContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [bundles, setBundles] = useState([]);
	const [stats, setStats] = useState({} as Stats);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);

	const refreshData = async () => {
		try {
			setIsLoading(true);
			// await fetchBundles();
			// await fetchStats();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		try {
			// fetchUser();
			// fetchBundles();
			// fetchStats();
			setStats({
				totalCost: 3,
				totalCount: 1,
				totalProfit: 2,
				totalValue: 3,
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return (
		<AppContext.Provider
			value={{
				bundles: bundles,
				stats: stats,
				refreshData: refreshData,
				isLoading: isLoading,
				user: user,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export const useAppContext = () => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error(
			"useAppContext must be used within AppContextProvider"
		);
	}
	return context;
};
