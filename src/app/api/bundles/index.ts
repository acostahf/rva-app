import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useBundles = () => {
	return useQuery({
		queryKey: ["bundles"],
		queryFn: async () => {
			const { data, error } = await supabase.auth.getUser();
			const user = data.user.id;
			const { data: bundles, error: activityError } = await supabase
				.from("bundles")
				.select("*")
				.eq("user_id", user);

			if (error || activityError) {
				throw new Error(error.message);
			}

			return bundles;
		},
	});
};
