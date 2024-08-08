import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export interface Bundle {
	id: string;
	title: string;
	cost: number;
	value: number;
	geoLocation: string;
	quantity: number;
	receipt: string;
	ebayLink: string;
	createdAt: Date;
}

export type Bundles = Bundle[];

export type Product = {
	id: string;
	title: string;
	cost: number;
	value: number;
	geoLoaction: string;
	recipt: string;
	createAt: Date;
	aiTitle: string;
	aiDescription: string;
	dealId: string;
	ebayLink: string;
};

export type Stats = {
	totalCost: number;
	totalCount: number;
	totalProfit: number;
	totalValue: number;
};

export interface AppContextType {
	bundles: Bundles;
	stats: Stats;
	refreshData: () => Promise<void>;
	isLoading: boolean;
	user: any;
}

export interface SupabaseProduct {
	created_at: string;
	title: string;
	buy_price: number;
	market_value: number;
	ebay_link: string;
	qty: number;
	user: string;
	id: string;
}
