import { configureStore } from "@reduxjs/toolkit";
import { candidates } from "./candidates";

import { twitterData } from "./twitterData";
import { ui } from "./ui";

export const store = configureStore({
	reducer: {
		candidates: candidates.reducer,
		twitterData: twitterData.reducer,
		ui: ui.reducer,
	},
});

export type Store = ReturnType<typeof store.getState>;
