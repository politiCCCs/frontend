import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { parse } from "@fast-csv/parse";

interface CandidateRow {
	StateAb: string;
	DivisionID: string;
	DivisionNm: string;
	PartyAb: string;
	PartyNm: string;
	CandidateID: string;
	Surname: string;
	GivenNm: string;
	Elected: string;
	HistoricElected: string;
}

interface Candidate extends Partial<Omit<CandidateRow, "Surname" | "GivenNm">> {
	handle?: string;
}

interface CandidatesState {
	handleToName: Record<string, string>;
	candidates: Record<string, Candidate>;
}

const initialState: CandidatesState = { handleToName: {}, candidates: {} };

export const fetchNames = createAsyncThunk(
	"candidates/fetchNames",
	async () => {
		const url = `/handle-name-map`;
		const response = await fetch(url);
		return response.json();
	},
);

const loadNames = (
	state: CandidatesState,
	{ payload }: PayloadAction<Record<string, string>>,
): void => {
	for (const handle in payload) {
		if (Object.prototype.hasOwnProperty.call(payload, handle)) {
			const user = payload[handle]!;

			state.handleToName[handle] = user;

			if (!Object.prototype.hasOwnProperty.call(state.candidates, user)) {
				state.candidates[user] = {};
			}

			state.candidates[user]!.handle = handle;
		}
	}
};

export const fetchCandidates = createAsyncThunk(
	"candidates/fetchCandidates",
	async () => {
		const url = `/votes-by-candidate.csv`;
		const response = await fetch(url);
		return response.text();
	},
);

const loadCandidates = (
	state: CandidatesState,
	{ payload }: PayloadAction<string>,
): void => {
	const stream = parse({ headers: true }).on("data", (row: CandidateRow) => {
		const { GivenNm, Surname, ...data } = row;
		const name = `${GivenNm} ${Surname}`;

		state.candidates[name] = { ...state.candidates[name], ...data };
	});

	stream.write(payload);
	stream.end();
};

export const candidates = createSlice({
	name: "candidates",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNames.fulfilled, loadNames)
			.addCase(fetchCandidates.fulfilled, loadCandidates);
	},
});
