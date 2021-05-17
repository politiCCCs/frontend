import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Point } from "geojson";
import { CouchDBData, LoadAction } from "./utils";

export interface GeolocationTweet {
	isLabor: boolean;
	isLiberals: boolean;
	isGreens: boolean;
	geo: Point;
}

export interface GeolocationState {
	tweets: GeolocationTweet[];
	electorate: Record<string, number[]>;
}

const initialState: GeolocationState = {
	tweets: [],
	electorate: {},
};

// isLabor, isLiberals, isGreens
type GeolocationTweetKey = [boolean, boolean, boolean];

export const fetchGeolocationTweets = createAsyncThunk(
	`geolocation/fetch`,
	async () => {
		const url = `/geolocation`;
		const response = await fetch(url);
		const { data } = await response.json();
		return data as CouchDBData<GeolocationTweetKey, Point>;
	},
);

export const loadGeolocationTweets = (
	state: GeolocationState,
	{ payload: { rows } }: LoadAction<GeolocationTweetKey, Point>,
): void => {
	for (const { key, value } of rows) {
		state.tweets.push({
			isLabor: key[0],
			isLiberals: key[1],
			isGreens: key[2],
			geo: value,
		});
	}
};

export const geolocation = createSlice({
	name: "geolocation",
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder.addCase(fetchGeolocationTweets.fulfilled, loadGeolocationTweets),
});

/**
 * Want number of political tweets for each party in an electorate
 */
