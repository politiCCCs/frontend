import { configureStore } from "@reduxjs/toolkit";

import { data } from "./data";
import { ui } from "./ui";

export const store = configureStore({
	reducer: {
		data: data.reducer,
		ui: ui.reducer,
	},
});
