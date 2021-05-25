/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
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
