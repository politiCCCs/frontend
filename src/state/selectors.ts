import { Store } from "state";
import { PoliticianData } from "state/twitterData";

export interface ComparisonData {
	name: string;
	handle: string;
	x: number;
	y: number;
}

export const createSelector = (dataKey: keyof PoliticianData) => (
	state: Store,
) => {
	const acc: ComparisonData[] = [];

	for (const twitterHandle of Object.keys(state.twitterData.data)) {
		if (
			!Object.prototype.hasOwnProperty.call(
				state.twitterData.data,
				twitterHandle,
			)
		) {
			continue;
		}

		const realName = state.candidates.handleToName[twitterHandle];
		if (realName === undefined) {
			continue;
		}

		const votes = state.candidates.candidates[realName]?.TotalVotes;
		const twitterData = state.twitterData.data[twitterHandle]?.[dataKey];
		if (twitterData === undefined || votes === undefined) {
			continue;
		}

		acc.push({
			name: realName,
			handle: twitterHandle,
			x: typeof twitterData === "object" ? twitterData.count : twitterData,
			y: votes,
		});
	}

	return acc;
};
