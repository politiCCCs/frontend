/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Redux action helpers
interface CouchDBRow<T> {
	key: [string];
	value: T;
}

interface CouchDBData<T> {
	rows: CouchDBRow<T>[];
}

type LoadAction<T> = PayloadAction<CouchDBData<T>>;

// Slice state
interface Count {
	sum: number;
	count: number;
	min: number;
	max: number;
	sumsqr: number;
}

interface PoliticianData {
	likes?: Count;
	retweets?: Count;
	sentiment?: Count;
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
	{ payload: { rows } }: LoadAction<Count>,
): void => {
	for (const { key, value } of rows) {
		const userId = key[0];
		state.data[userId] = { ...state.data[userId], [dataKey]: value };
	}
};

// Thunk
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchData = (dataKey: keyof PoliticianData) =>
	createAsyncThunk(`data/fetch/${dataKey}`, async () => {
		const url = `/${dataKey}-per-politician`;
		const response = await fetch(url);
		const { data } = await response.json();
		return data as CouchDBData<Count>;
	});

export const fetchLikes = fetchData("likes");
export const fetchRetweets = fetchData("retweets");
export const fetchSentiment = fetchData("sentiment");

export const twitterData = createSlice({
	name: "twitterData",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLikes.fulfilled, loadPoliticianPayload("likes"))
			.addCase(fetchRetweets.fulfilled, loadPoliticianPayload("retweets"))
			.addCase(fetchSentiment.fulfilled, loadPoliticianPayload("sentiment"));
	},
});
