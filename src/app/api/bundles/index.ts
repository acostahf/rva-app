import { supabase } from "@/lib/supabase";
import { Bundle } from "@/types";
import {
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { Alert } from "react-native";

export const useBundles = () => {
	return useQuery({
		queryKey: ["bundles"],
		queryFn: async () => {
			//get the user id
			const { data, error } = await supabase.auth.getUser();
			const user = data.user.id;
			//get the bundles for that user
			const { data: bundles, error: activityError } = await supabase
				.from("bundles")
				.select("*")
				.eq("user_id", user)
				.order("created_at", { ascending: false });

			if (error || activityError) {
				throw new Error(error.message);
			}

			return bundles;
		},
	});
};

// export const getBundles = async () => {
// 	const { data, error } = await supabase.auth.getUser();
// 	const user = data.user.id;

// 	const { data: bundles, error: activityError } = await supabase
// 		.from("bundles")
// 		.select("*")
// 		.eq("user_id", user)
// 		.order("created_at", { ascending: false });

// 	if (error || activityError) {
// 		throw new Error(error.message);
// 	}

// 	return bundles;
// };

export const useAddBundle = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["addBundle"],
		mutationFn: async (bundle: Bundle) => {
			const user = await supabase.auth.getUser();
			const { data: bundleData, error } = await supabase
				.from("bundles")
				.insert([
					{
						title: bundle.title,
						buy_price: Number(bundle.buy_price),
						qty: Number(bundle.qty),
						market_value: Number(bundle.market_value),
						ebay_link: bundle.ebay_link,
						user_id: user.data.user.id,
					},
				])
				.select();

			let bundlesArry = [];
			//take the qty and create that many inventory items
			for (let i = 0; i < bundle.qty; i++) {
				bundlesArry.push({ title: `${bundle.title} - ${i + 1}` });
			}
			//insert that many inventory items
			const { data: inventoryData, error: inventoryError } = await supabase
				.from("inventory")
				.insert(
					bundlesArry.map((item, i) => ({
						...item,
						buy_price: bundle.buy_price / bundle.qty,
						market_value: bundle.market_value / bundle.qty,
						ebay_link: bundle.ebay_link,
						user_id: user.data.user.id,
						bundle_id: bundleData[0].id,
					}))
				);

			//get todays date to check if the user has been active today
			const todayDate = new Date().toISOString();
			const removetime = todayDate.split("T");
			const { data: activityData, error: activityError } = await supabase
				.from("activity")
				.select("*")
				.eq("user_id", user.data.user.id)
				.order("date", { ascending: false });

			//if the user has not been active today, add a row to the activity table
			//if they have, update the row by adding 1 to the count
			if (activityData[0]?.date.split("T")[0] !== removetime[0]) {
				await supabase.from("activity").insert([
					{
						user_id: user.data.user.id,
						count: 1,
					},
				]);
			} else {
				await supabase
					.from("activity")
					.update({ count: activityData[0].count + 1 })
					.eq("id", activityData[0].id);
			}

			if (error || activityError || inventoryError) {
				throw new Error(
					error?.message ||
						activityError?.message ||
						inventoryError?.message
				);
			}

			return bundleData[0];
		},
		onError: (error) => {
			console.log("Adding Bundle Error:", error);
			Alert.alert("Error", error.message);
		},
		onSuccess: () => {
			// Invalidate the query to refetch the data
			queryClient.invalidateQueries({
				queryKey: ["bundles"],
			});
		},
	});
};

// export const addBundle = async (bundle: Bundle) => {
// 	const user = await supabase.auth.getUser();
// 	const { data: bundleData, error } = await supabase
// 		.from("bundles")
// 		.insert([
// 			{
// 				title: bundle.title,
// 				buy_price: Number(bundle.buy_price),
// 				qty: Number(bundle.qty),
// 				market_value: Number(bundle.market_value),
// 				ebay_link: bundle.ebay_link,
// 				user_id: user.data.user.id,
// 			},
// 		])
// 		.select();

// 	let bundlesArry = [];
// 	//take the qty and create that many inventory items
// 	for (let i = 0; i < bundle.qty; i++) {
// 		bundlesArry.push({ title: `${bundle.title} - ${i + 1}` });
// 	}
// 	//insert that many inventory items
// 	const { data: inventoryData, error: inventoryError } = await supabase
// 		.from("inventory")
// 		.insert(
// 			bundlesArry.map((item, i) => ({
// 				...item,
// 				buy_price: bundle.buy_price / bundle.qty,
// 				market_value: bundle.market_value / bundle.qty,
// 				ebay_link: bundle.ebay_link,
// 				user_id: user.data.user.id,
// 				bundle_id: bundleData[0].id,
// 			}))
// 		);

// 	//Want to check the activity table to see if the user has been active today
// 	//if not, add a row to the activity table
// 	//if they have, update the row by adding 1 to the count
// 	const { data: activityData, error: activityError } = await supabase
// 		.from("activity")
// 		.select("*")
// 		.eq("user_id", user.data.user.id)
// 		.single();

// 	if (!activityData) {
// 		await supabase.from("activity").insert([
// 			{
// 				user_id: user.data.user.id,
// 				count: 1,
// 			},
// 		]);
// 	} else {
// 		await supabase
// 			.from("activity")
// 			.update({ count: activityData.count + 1 })
// 			.eq("user_id", user.data.user.id);
// 	}

// 	if (error || activityError || inventoryError) {
// 		throw new Error(
// 			error?.message || activityError?.message || inventoryError?.message
// 		);
// 	}

// 	return bundleData[0];
// };
