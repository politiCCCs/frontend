/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
import { configureStore } from "@reduxjs/toolkit";
import { candidates } from "./candidates";
import { generalComparisons } from "./generalComparisons";

import { twitterData } from "./twitterData";
import { ui } from "./ui";

export const store = configureStore({
	reducer: {
		candidates: candidates.reducer,
		general: generalComparisons.reducer,
		twitterData: twitterData.reducer,
		ui: ui.reducer,
	},
});

export type Store = ReturnType<typeof store.getState>;
