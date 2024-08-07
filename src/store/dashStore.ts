import { create } from "zustand";

interface DashStore {
	cog: number;
	vog: number;
	pog: number;
	qty: number;
	grossSales: number;
	netSales: number;
	setGrossSales: (grossSales: number) => void;
	setNetSales: (netSales: number) => void;
	setCog: (cog: number) => void;
	setVog: (vog: number) => void;
	setPog: (pog: number) => void;
	setQty: (qty: number) => void;
}

const useDashStore = create<DashStore>((set) => ({
	cog: 10,
	vog: 30,
	pog: 50,
	qty: 40,
	grossSales: 15000,
	netSales: 10000,
	setNetSales: (netSales) => set(() => ({ netSales })),
	setGrossSales: (grossSales) => set(() => ({ grossSales })),
	setCog: (cog) => set(() => ({ cog })),
	setVog: (vog) => set(() => ({ vog })),
	setPog: (pog) => set(() => ({ pog })),
	setQty: (qty) => set(() => ({ qty })),
}));

export default useDashStore;
