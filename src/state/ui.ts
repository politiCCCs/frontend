import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureProperties } from "components/Map/types";

interface UIState {
	electorate?: FeatureProperties;
}

const initialState: UIState = {};

export const ui = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setElectorate: (state, { payload }: PayloadAction<FeatureProperties>) => {
			state.electorate = { ...payload };
		},
	},
});
