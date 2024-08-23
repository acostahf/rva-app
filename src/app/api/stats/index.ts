import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useStats = () => {
	//gets the date 90 days ago
	const today = new Date();
	const ninetyDaysAgo = new Date(today);
	ninetyDaysAgo.setDate(today.getDate() - 90);
	const beginningDate = ninetyDaysAgo.toISOString();

	return useQuery({
		queryKey: ["stats"],
		queryFn: async () => {
			const { data, error } = await supabase.auth.getUser();
			const user = data.user.id;
			let stats = {
				gross: 0,
				net: 0,
				cog: 0,
				daily: 0,
				weekly: 0,
				monthly: 0,
				yearly: 0,
			};

			const { data: invData, error: invErr } = await supabase
				.from("inventory")
				.select("*")
				.eq("user", user)
				.gt("created_at", beginningDate);

			invData.forEach((item) => {
				stats.gross += item.market_value;
				stats.net += item.market_value - item.buy_price;
				stats.cog += item.buy_price;
			});
			stats.daily = stats.gross / 90;
			stats.weekly = stats.gross / 12;
			stats.monthly = stats.net / 3;

			if (error || invErr) {
				throw new Error(error.message);
			}

			return stats;
		},
	});
};

export const useActivity = () => {
	return useQuery({
		queryKey: ["activity"],
		queryFn: async () => {
			const { data, error } = await supabase.auth.getUser();
			const user = data.user.id;
			const { data: activity, error: activityError } = await supabase
				.from("activity")
				.select("*")
				.eq("user_id", user);

			if (error || activityError) {
				throw new Error(error.message);
			}

			return activity;
		},
	});
};
