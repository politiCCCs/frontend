import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NamesState {
	handleToName: Record<string, string>;
	nameToHandle: Record<string, string>;
}

const initialState: NamesState = { handleToName: {}, nameToHandle: {} };

export const fetchNames = createAsyncThunk("names/fetch", async () => {
	const url = `/handle-name-map`;
	const response = await fetch(url);
	return response.json();
});

const loadNames = (
	state: NamesState,
	{ payload }: PayloadAction<Record<string, string>>,
): void => {
	for (const handle in payload) {
		if (Object.prototype.hasOwnProperty.call(payload, handle)) {
			const user = payload[handle]!;

			state.handleToName[handle] = user;
			state.nameToHandle[user] = handle;
		}
	}
};

export const names = createSlice({
	name: "names",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchNames.fulfilled, loadNames);
	},
});
