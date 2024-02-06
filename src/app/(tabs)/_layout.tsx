import { Tabs } from "expo-router";
import React from "react";

export default () => {
	return (
		<Tabs>
			<Tabs.Screen name="dashboard" />
			<Tabs.Screen name="forge" />
		</Tabs>
	);
};
