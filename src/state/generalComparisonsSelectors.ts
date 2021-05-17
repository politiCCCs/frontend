import { Store } from "state";
import {
	GeneralComparisonsItem,
	GeneralComparisonsState,
	GeneralComparisonsStateNameMap,
} from "./generalComparisons";
import { TwitterCountData } from "./utils";

// Selectors helpers
export interface DataItem {
	name: string;
	value?: number;
}

// Sentiment
export const generalComparisonsCountSelector = (
	dataKey: keyof TwitterCountData,
	getAverage: boolean = false,
	ignore?: Set<keyof GeneralComparisonsState>,
) => (store: Store): DataItem[] => {
	const items: DataItem[] = [];

	let key: keyof GeneralComparisonsState;
	for (key in store.general) {
		if (ignore?.has(key)) {
			continue;
		}

		if (Object.prototype.hasOwnProperty.call(store.general, key)) {
			const value = store.general[key];

			if (value === undefined) {
				continue;
			}

			const attrs = value.count?.[dataKey];
			if (attrs === undefined) {
				continue;
			}

			const data = getAverage ? attrs.sum / attrs.count : attrs.sum;
			items.push({
				name: GeneralComparisonsStateNameMap[key],
				value: data,
			});
		}
	}

	return items;
};

export const generalComparisonsSelector = (
	dataKey: Exclude<keyof GeneralComparisonsItem, "count">,
	getAverage: boolean = false,
	ignore?: Set<keyof GeneralComparisonsState>,
) => (store: Store): DataItem[] => {
	const items: DataItem[] = [];

	let key: keyof GeneralComparisonsState;
	for (key in store.general) {
		if (ignore?.has(key)) {
			continue;
		}

		if (Object.prototype.hasOwnProperty.call(store.general, key)) {
			const value = store.general[key];
			const data = value[dataKey];

			if (value === undefined || data === undefined) {
				continue;
			}

			let selectedData = data;
			if (getAverage) {
				if (value.tweets === undefined) {
					continue;
				}
				selectedData /= value.tweets;
			}

			items.push({
				name: GeneralComparisonsStateNameMap[key],
				value: selectedData,
			});
		}
	}

	return items;
};
