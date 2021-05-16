import { Store } from "state";
import { GeneralComparisonsState } from "./generalComparisons";
import { capitalizeFirstLetter } from "./utils";

// Selectors helpers
export interface DataItem {
	name: string;
	value: number;
}

// Sentiment
type GeneralSentiment = GeneralComparisonsState["sentiment"];
export const partySentimentSelector = (store: Store): DataItem[] => {
	const items: DataItem[] = [];

	for (const key in store.general.sentiment) {
		if (Object.prototype.hasOwnProperty.call(store.general.sentiment, key)) {
			const value = store.general.sentiment[key as keyof GeneralSentiment];

			if (value === undefined) {
				continue;
			}

			items.push({
				name: capitalizeFirstLetter(key),
				value: value.sum,
			});
		}
	}

	return items;
};
