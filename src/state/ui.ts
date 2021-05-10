import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	electorate: "",
};

export const ui = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setElectorate: (state, { payload }: PayloadAction<string>) => {
			state.electorate = payload;
		},
	},
});
