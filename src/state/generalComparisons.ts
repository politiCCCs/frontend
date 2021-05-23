import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	arrayValueEqual,
	CouchDBData,
	Count,
	LoadAction,
	TwitterCountData,
} from "./utils";

export interface GeneralComparisonsItem {
	count?: TwitterCountData;
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
	greensLeader: "Greens Leader",
	laborLeader: "Labor Leader",
	liberalsLeader: "Liberals Leader",
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

const loadGeneral = <ReturnedData>(dataKey: keyof GeneralComparisonsItem) => (
	state: GeneralComparisonsState,
	{ payload: { rows } }: LoadAction<GeneralKey, ReturnedData>,
): void => {
	for (const { key, value } of rows) {
		let data: TwitterCountData | number;

		if (Array.isArray(value)) {
			if (value.length !== 3) {
				continue;
			}

			data = {
				sentiment: { ...value[0] },
				retweets: { ...value[1] },
				likes: { ...value[2] },
			} as TwitterCountData;
		} else {
			data = value;
		}

		// Labor leader
		if (arrayValueEqual(key, [true, undefined, true, undefined, undefined])) {
			state.laborLeader = {
				...state.laborLeader,
				[dataKey]: data,
			};
		}

		// Liberal leader
		if (arrayValueEqual(key, [true, undefined, undefined, true, undefined])) {
			state.liberalsLeader = {
				...state.liberalsLeader,
				[dataKey]: data,
			};
		}

		// Greens leader
		if (arrayValueEqual(key, [true, undefined, undefined, undefined, true])) {
			state.greensLeader = {
				...state.greensLeader,
				[dataKey]: data,
			};
		}

		// Political tweets
		if (
			arrayValueEqual(key, [undefined, true, undefined, undefined, undefined])
		) {
			state.politicalTweets = { ...state.politicalTweets, [dataKey]: data };
		}

		// Non-political tweets
		if (
			arrayValueEqual(key, [undefined, false, undefined, undefined, undefined])
		) {
			state.nonPoliticalTweets = {
				...state.nonPoliticalTweets,
				[dataKey]: data,
			};
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
			.addCase(fetchLeaderData.fulfilled, loadGeneral("count"))
			.addCase(fetchVulgarityData.fulfilled, loadGeneral("vulgarity"))
			.addCase(fetchTweetsData.fulfilled, loadGeneral("tweets")),
});
