/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayValueEqual, CouchDBData, Count, LoadAction } from "./utils";

export interface GeneralComparisonsItem {
	sentiment?: Count;
	retweets?: Count;
	likes?: Count;
	vulgarity?: number;
	tweets?: number;
}

export interface GeneralComparisonsState {
	laborLeader: GeneralComparisonsItem;
	liberalsLeader: GeneralComparisonsItem;
	greensLeader: GeneralComparisonsItem;
	nonPoliticalTweets: GeneralComparisonsItem;
	politicalTweets: GeneralComparisonsItem;
}

export const GeneralComparisonsStateNameMap: Record<
	keyof GeneralComparisonsState,
	string
> = {
	greensLeader: "Greens Candidate",
	laborLeader: "Labor Candidate",
	liberalsLeader: "Liberals Candidate",
	nonPoliticalTweets: "Non-political",
	politicalTweets: "Political",
};

const initialState: GeneralComparisonsState = {
	laborLeader: {},
	liberalsLeader: {},
	greensLeader: {},
	nonPoliticalTweets: {},
	politicalTweets: {},
};

// General data
// is_leader, is_political, is_labor, is_liberals, is_greens
type GeneralKey = [boolean, boolean, boolean, boolean, boolean];

// Thunk
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchData = <V>(dataKey: string) =>
	createAsyncThunk(`general/fetch/${dataKey}`, async () => {
		const url = `/api/general/${dataKey}`;
		const response = await fetch(url);
		const { data } = await response.json();
		return data as CouchDBData<GeneralKey, V>;
	});

type UpdateArray = Array<
	[keyof GeneralComparisonsItem | undefined, Count | number | undefined]
>;

const updateCount = (a?: Count, b?: Count): Count | undefined => {
	if (a === undefined) {
		return b;
	}
	if (b === undefined) {
		return a;
	}

	return {
		sum: a.sum + b.sum,
		count: a.count + b.count,
		min: a.min + b.min,
		max: a.max + b.max,
		sumsqr: a.sumsqr + b.sumsqr,
	};
};

const update = (
	slice: GeneralComparisonsItem,
	updates: UpdateArray,
): GeneralComparisonsItem => {
	for (const [key, value] of updates) {
		if (key === undefined || value === undefined) {
			continue;
		}

		let updated: Count | number | undefined;
		if (typeof value === "object") {
			updated = updateCount(slice[key] as Count, value);
		} else if (typeof slice[key] === "number") {
			updated = (slice[key] as number) + value;
		} else {
			updated = value;
		}

		slice = {
			...slice,
			[key]: typeof updated === "object" ? { ...updated } : updated,
		};
	}

	return slice;
};

const loadGeneral = <ReturnedData>(
	dataKey: Array<keyof GeneralComparisonsItem>,
) => (
	state: GeneralComparisonsState,
	{ payload }: LoadAction<GeneralKey, ReturnedData>,
): void => {
	if (payload === undefined) {
		// bad request
		return;
	}

	const { rows } = payload;
	for (const { key, value } of rows) {
		const updates: UpdateArray = [];

		if (Array.isArray(value)) {
			const data = value as Count[];
			if (data.length !== 3) {
				continue;
			}

			updates.push(["sentiment", data[0]]);
			updates.push(["retweets", data[1]]);
			updates.push(["likes", data[2]]);
		} else {
			updates.push([dataKey[0], (value as unknown) as number]);
		}

		// Labor leader
		if (arrayValueEqual(key, [true, undefined, true, undefined, undefined])) {
			state.laborLeader = update(state.laborLeader, updates);
		}

		// Liberal leader
		if (arrayValueEqual(key, [true, undefined, undefined, true, undefined])) {
			state.liberalsLeader = update(state.liberalsLeader, updates);
		}

		// Greens leader
		if (arrayValueEqual(key, [true, undefined, undefined, undefined, true])) {
			state.greensLeader = update(state.greensLeader, updates);
		}

		// Political tweets
		if (
			arrayValueEqual(key, [undefined, true, undefined, undefined, undefined])
		) {
			state.politicalTweets = update(state.politicalTweets, updates);
		}

		// Non-political tweets
		if (
			arrayValueEqual(key, [undefined, false, undefined, undefined, undefined])
		) {
			state.nonPoliticalTweets = update(state.nonPoliticalTweets, updates);
		}
	}
};

// Leader
type LeaderValue = [Count, Count, Count];
export const fetchLeaderData = fetchData<LeaderValue>("leaders");

// Vulgarity
export const fetchVulgarityData = fetchData<number>("vulgarity");

// Tweets
export const fetchTweetsData = fetchData<number>("tweets");

export const generalComparisons = createSlice({
	name: "general",
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(
				fetchLeaderData.fulfilled,
				loadGeneral(["sentiment", "retweets", "likes"]),
			)
			.addCase(fetchVulgarityData.fulfilled, loadGeneral(["vulgarity"]))
			.addCase(fetchTweetsData.fulfilled, loadGeneral(["tweets"])),
});
