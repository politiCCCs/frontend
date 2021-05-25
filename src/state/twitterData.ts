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
import { CouchDBData, Count, LoadAction, TwitterCountData } from "./utils";

export interface PoliticianData extends TwitterCountData {
	count?: number;
}

interface PoliticianDataState {
	[user: string]: PoliticianData;
}

export interface DataState {
	data: PoliticianDataState;
}

const initialState: DataState = { data: {} };

// Load action payload into state
const loadPoliticianPayload = <K extends keyof PoliticianData>(dataKey: K) => (
	state: DataState,
	{ payload }: LoadAction<[string], Count>,
): void => {
	if (payload === undefined) {
		// bad request
		return;
	}

	const { rows } = payload;
	for (const { key, value } of rows) {
		const userId = key[0];
		state.data[userId] = {
			...state.data[userId],
			[dataKey]: typeof value === "object" ? { ...value } : value,
		};
	}
};

// Thunk
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchData = (dataKey: keyof PoliticianData) =>
	createAsyncThunk(`data/fetch/${dataKey}`, async () => {
		const url = `/api/politicians/${dataKey}`;
		const response = await fetch(url);
		const { data } = await response.json();
		return data as CouchDBData<[string], Count>;
	});

export const fetchCount = fetchData("count");
export const fetchLikes = fetchData("likes");
export const fetchRetweets = fetchData("retweets");
export const fetchSentiment = fetchData("sentiment");

export const twitterData = createSlice({
	name: "twitterData",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCount.fulfilled, loadPoliticianPayload("count"))
			.addCase(fetchLikes.fulfilled, loadPoliticianPayload("likes"))
			.addCase(fetchRetweets.fulfilled, loadPoliticianPayload("retweets"))
			.addCase(fetchSentiment.fulfilled, loadPoliticianPayload("sentiment"));
	},
});
