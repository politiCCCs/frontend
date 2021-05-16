import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayReferenceEqual, Count } from "./utils";

// Redux action helpers
interface CouchDBRow<K, V> {
	key: K;
	value: V;
}

interface CouchDBData<K, V> {
	rows: CouchDBRow<K, V>[];
}

type LoadAction<K, V> = PayloadAction<CouchDBData<K, V>>;

export interface GeneralComparisonsState {
	sentiment: {
		labor?: Count;
		liberal?: Count;
		other?: Count;
	};
}

const initialState: GeneralComparisonsState = { sentiment: {} };

// Thunk
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchData = <K, V>(dataKey: keyof GeneralComparisonsState) =>
	createAsyncThunk(`general/fetch/${dataKey}`, async () => {
		const url = `/global/${dataKey}`;
		const response = await fetch(url);
		const { data } = await response.json();
		return data as CouchDBData<K, V>;
	});

// Party sentiment
type SentimentKey = [boolean, boolean];
type SentimentVal = Count;
const loadPartySentiment = (
	state: GeneralComparisonsState,
	{ payload: { rows } }: LoadAction<SentimentKey, SentimentVal>,
): void => {
	for (const { key, value } of rows) {
		if (arrayReferenceEqual([false, false], key)) {
			state.sentiment.other = { ...value };
		} else if (arrayReferenceEqual([true, false], key)) {
			state.sentiment.labor = { ...value };
		} else if (arrayReferenceEqual([false, true], key)) {
			state.sentiment.liberal = { ...value };
		}
	}
};


export const fetchPartySentiment = fetchData<SentimentKey, SentimentVal>(
	"sentiment",
);

export const generalComparisons = createSlice({
	name: "general",
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder.addCase(fetchPartySentiment.fulfilled, loadPartySentiment),
});
