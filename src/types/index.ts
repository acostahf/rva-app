import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export interface Bundle {
	created_at?: Date;
	title: string;
	buy_price: number;
	market_value: number;
	ebay_link: string;
	qty: number;
	user_id?: string;
	id?: string;
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

export interface SupabaseBundle {
	id: number;
	created_at: Date;
	title: string;
	buy_price: number;
	market_value: number;
	qty: number;
	receipt: string;
	ebay_link: string;
	user: number;
	// geo_location: string;
}
