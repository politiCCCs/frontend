import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	arrayReferenceEqual as arrayValueEqual,
	Count,
	TwitterCountData,
} from "./utils";

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
	nonPolitical?: TwitterCountData;
	laborLeader?: TwitterCountData;
	liberalsLeader?: TwitterCountData;
	greensLeader?: TwitterCountData;
	otherLeaderPoliticalContent?: TwitterCountData;
	otherLeaderNonPoliticalContent?: TwitterCountData;
}

export const GeneralComparisonsStateNameMap: Record<
	keyof GeneralComparisonsState,
	string
> = {
	greensLeader: "Greens Leader",
	laborLeader: "Labor Leader",
	liberalsLeader: "Liberals Leader",
	nonPolitical: "Non-political",
	otherLeaderNonPoliticalContent: "Small-Party Leaders (Non-political)",
	otherLeaderPoliticalContent: "Small-Party Leaders (Political)",
};

const initialState: GeneralComparisonsState = {};

// Thunk
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchData = <K, V>(dataKey: string) =>
	createAsyncThunk(`general/fetch/${dataKey}`, async () => {
		const url = `/global/${dataKey}`;
		const response = await fetch(url);
		const { data } = await response.json();
		return data as CouchDBData<K, V>;
	});

// General data
// is_leader, is_political, is_labor, is_liberals, is_greens
type LeaderKey = [boolean, boolean, boolean, boolean, boolean];
type LeaderValue = [Count, Count, Count];

const loadLeader = (
	state: GeneralComparisonsState,
	{ payload: { rows } }: LoadAction<LeaderKey, LeaderValue>,
): void => {
	for (const { key, value } of rows) {
		if (value.length !== 3) {
			continue;
		}

		const data = {
			sentiment: { ...value[0] },
			retweets: { ...value[1] },
			likes: { ...value[2] },
		};

		// completely non political
		if (arrayValueEqual(key, [false, false, false, false, false])) {
			state.nonPolitical = data;
		} else if (arrayValueEqual(key, [true, false, false, false, false])) {
			// Leaders tweeting out non-political things when they're not part of
			// labor, liberals, or greens
			state.otherLeaderNonPoliticalContent = data;
		} else if (arrayValueEqual(key, [true, true, false, false, false])) {
			// Leaders tweeting out political things when they're not part of labor,
			// liberals, or greens
			state.otherLeaderPoliticalContent = data;
		} else if (arrayValueEqual(key, [true, true, false, false, true])) {
			// Greens leader tweeting political things
			state.greensLeader = data;
		} else if (arrayValueEqual(key, [true, true, false, true, false])) {
			// Liberals leader tweeting political things
			state.liberalsLeader = data;
		} else if (arrayValueEqual(key, [true, true, true, false, false])) {
			// Labor leader tweeting political things
			state.laborLeader = data;
		}
	}
};
export const fetchLeaderData = fetchData<LeaderKey, LeaderValue>("leaders");

export const generalComparisons = createSlice({
	name: "general",
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder.addCase(fetchLeaderData.fulfilled, loadLeader),
});
