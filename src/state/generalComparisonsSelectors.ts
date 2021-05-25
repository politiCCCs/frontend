/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
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
	pick?: Set<keyof GeneralComparisonsState>,
) => (store: Store): DataItem[] => {
	const items: DataItem[] = [];

	let key: keyof GeneralComparisonsState;
	for (key in store.general) {
		if (pick !== undefined && !pick.has(key)) {
			continue;
		}

		if (Object.prototype.hasOwnProperty.call(store.general, key)) {
			const value = store.general[key];

			if (value === undefined) {
				continue;
			}

			const attrs = value?.[dataKey];
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
	dataKey: Exclude<
		keyof GeneralComparisonsItem,
		"sentiment" | "retweets" | "likes"
	>,
	getAverage: boolean = false,
	pick?: Set<keyof GeneralComparisonsState>,
) => (store: Store): DataItem[] => {
	const items: DataItem[] = [];

	let key: keyof GeneralComparisonsState;
	for (key in store.general) {
		if (pick !== undefined && !pick.has(key)) {
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
