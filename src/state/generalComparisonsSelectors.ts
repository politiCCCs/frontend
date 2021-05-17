import { Store } from "state";
import {
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
export const generalComparisonsSelector = (
	dataKey: keyof TwitterCountData,
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

			items.push({
				name: GeneralComparisonsStateNameMap[key],
				value: value[dataKey]?.sum,
			});
		}
	}

	return items;
};
