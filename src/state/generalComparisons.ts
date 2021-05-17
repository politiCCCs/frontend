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

interface GeneralComparisonsItem {
	count?: TwitterCountData;
	vulgarity?: number;
	tweets?: number;
}

export interface GeneralComparisonsState {
	nonPolitical: GeneralComparisonsItem;
	laborLeader: GeneralComparisonsItem;
	liberalsLeader: GeneralComparisonsItem;
	greensLeader: GeneralComparisonsItem;
	otherLeaderPoliticalContent: GeneralComparisonsItem;
	otherLeaderNonPoliticalContent: GeneralComparisonsItem;
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

const initialState: GeneralComparisonsState = {
	nonPolitical: {},
	laborLeader: {},
	liberalsLeader: {},
	greensLeader: {},
	otherLeaderPoliticalContent: {},
	otherLeaderNonPoliticalContent: {},
};

// General data
// is_leader, is_political, is_labor, is_liberals, is_greens
type GeneralKey = [boolean, boolean, boolean, boolean, boolean];

// Thunk
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchData = <V>(dataKey: string) =>
	createAsyncThunk(`general/fetch/${dataKey}`, async () => {
		const url = `/general/${dataKey}`;
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

		// completely non political
		if (arrayValueEqual(key, [false, false, false, false, false])) {
			state.nonPolitical = {
				...state.nonPolitical,
				[dataKey]: data,
			};
		} else if (arrayValueEqual(key, [true, false, false, false, false])) {
			// Leaders tweeting out non-political things when they're not part of
			// labor, liberals, or greens
			state.otherLeaderNonPoliticalContent = {
				...state.otherLeaderNonPoliticalContent,
				[dataKey]: data,
			};
		} else if (arrayValueEqual(key, [true, true, false, false, false])) {
			// Leaders tweeting out political things when they're not part of labor,
			// liberals, or greens
			state.otherLeaderPoliticalContent = {
				...state.otherLeaderPoliticalContent,
				[dataKey]: data,
			};
		} else if (arrayValueEqual(key, [true, true, false, false, true])) {
			// Greens leader tweeting political things
			state.greensLeader = {
				...state.greensLeader,
				[dataKey]: data,
			};
		} else if (arrayValueEqual(key, [true, true, false, true, false])) {
			// Liberals leader tweeting political things
			state.liberalsLeader = {
				...state.liberalsLeader,
				[dataKey]: data,
			};
		} else if (arrayValueEqual(key, [true, true, true, false, false])) {
			// Labor leader tweeting political things
			state.laborLeader = {
				...state.laborLeader,
				[dataKey]: data,
			};
		}
	}
};

// Leader
type LeaderValue = [Count, Count, Count];
export const fetchLeaderData = fetchData<LeaderValue>("leaders");

// Vulgarity
type VulgarityValue = number;
export const fetchVulgarityData = fetchData<VulgarityValue>("vulgarity");

export const generalComparisons = createSlice({
	name: "general",
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(fetchLeaderData.fulfilled, loadGeneral("count"))
			.addCase(fetchVulgarityData.fulfilled, loadGeneral("vulgarity")),
});
