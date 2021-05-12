import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { parse } from "@fast-csv/parse";

interface CandidateRow {
	StateAb: string;
	DivisionID: string;
	DivisionNm: string;
	CandidateID: string;
	Surname: string;
	GivenNm: string;
	BallotPosition: string;
	Elected: string;
	HistoricElected: string;
	PartyAb: string;
	PartyNm: string;
	OrdinaryVotes: string;
	AbsentVotes: string;
	ProvisionalVotes: string;
	PrePollVotes: string;
	PostalVotes: string;
	TotalVotes: string;
	Swing: string;
}

export interface Candidate {
	handle?: string;

	// The below are properties from CandidateRow which we care about:string; with
	// the correct types (i.e., string numbers have been converted to numbers)
	StateAb?: string;
	DivisionID?: string;
	DivisionNm?: string;
	CandidateID?: string;
	BallotPosition?: number;
	Elected?: string;
	HistoricElected?: string;
	PartyAb?: string;
	PartyNm?: string;
	OrdinaryVotes?: number;
	AbsentVotes?: number;
	ProvisionalVotes?: number;
	PrePollVotes?: number;
	PostalVotes?: number;
	TotalVotes?: number;
	Swing?: number;
}

interface CandidatesState {
	handleToName: Record<string, string>;
	candidates: Record<string, Candidate>;
	electorates: Record<string, string[]>;
}

const initialState: CandidatesState = {
	handleToName: {},
	candidates: {},
	electorates: {},
};

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

			// Create the user if it doesn't exist
			if (!Object.prototype.hasOwnProperty.call(state.candidates, user)) {
				state.candidates[user] = {};
			}

			state.candidates[user]!.handle = handle;
		}
	}
};

const toInt = (s: string): number => parseInt(s, 10);

const parser = (csvStr: string): Promise<CandidateRow[]> =>
	new Promise((resolve, reject) => {
		const rows: CandidateRow[] = [];

		const stream = parse({ headers: true })
			.on("data", (data: CandidateRow) => rows.push(data))
			.on("end", () => {
				resolve(rows);
			})
			.on("error", (error) => reject(error));

		stream.write(csvStr);
		stream.end();
	});

export const fetchCandidates = createAsyncThunk(
	"candidates/fetchCandidates",
	async () => {
		const url = `/votes-by-candidate.csv`;
		const response = await fetch(url);
		const data = await response.text();
		const rows = await parser(data);
		return rows;
	},
);

const loadCandidates = (
	state: CandidatesState,
	{ payload }: PayloadAction<CandidateRow[]>,
): void => {
	for (const row of payload) {
		const {
			GivenNm,
			Surname,
			BallotPosition,
			OrdinaryVotes,
			AbsentVotes,
			ProvisionalVotes,
			PrePollVotes,
			PostalVotes,
			TotalVotes,
			Swing,
			...data
		} = row;
		const name = `${GivenNm} ${Surname}`;

		// Save the candidate's data
		state.candidates[name] = {
			...state.candidates[name],
			...data,
			BallotPosition: toInt(BallotPosition),
			OrdinaryVotes: toInt(OrdinaryVotes),
			AbsentVotes: toInt(AbsentVotes),
			ProvisionalVotes: toInt(ProvisionalVotes),
			PrePollVotes: toInt(PrePollVotes),
			PostalVotes: toInt(PostalVotes),
			TotalVotes: toInt(TotalVotes),
			Swing: parseFloat(Swing),
		};

		// Update the electoral list
		if (
			!Object.prototype.hasOwnProperty.call(state.electorates, data.DivisionNm)
		) {
			state.electorates[data.DivisionNm] = [];
		}

		state.electorates[data.DivisionNm]?.push(name);
	}
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
