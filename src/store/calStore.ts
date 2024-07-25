import { create } from "zustand";

interface CalStore {
	profit: number;
	maxCost: number;
	soldPrice: number;
	marketplaceFee: number;
	tax: number;
	promotedFees: number;
	shipping: number;
	userRate: number;
	coverShipping: boolean;
	quantity: number;
	buyPrice: number;
	setProfit: (value: number) => void;
	setMaxCost: (value: number) => void;
	setSoldPrice: (value: number) => void;
	setMarketplaceFee: (value: number) => void;
	setTax: (value: number) => void;
	setPromotedFees: (value: number) => void;
	setShipping: (value: number) => void;
	setUserRate: (value: number) => void;
	setCoverShipping: (value: boolean) => void;
	setQuantity: (value: number) => void;
	setBuyPrice: (value: number) => void;
}

const useCalStore = create<CalStore>((set) => ({
	profit: 0,
	maxCost: 0,
	soldPrice: 0,
	marketplaceFee: 0.13,
	tax: 0,
	promotedFees: 0.03,
	shipping: 1,
	userRate: 30,
	coverShipping: false,
	quantity: 1,
	buyPrice: 0,
	setProfit: (value) => set({ profit: value }),
	setMaxCost: (value) => set({ maxCost: value }),
	setSoldPrice: (value) => set({ soldPrice: value }),
	setMarketplaceFee: (value) => set({ marketplaceFee: value }),
	setTax: (value) => set({ tax: value }),
	setPromotedFees: (value) => set({ promotedFees: value }),
	setShipping: (value) => set({ shipping: value }),
	setUserRate: (value) => set({ userRate: value }),
	setCoverShipping: (value) => set({ coverShipping: value }),
	setQuantity: (value) => set({ quantity: value }),
	setBuyPrice: (value) => set({ buyPrice: value }),
}));

export default useCalStore;
