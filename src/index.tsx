import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import { Provider } from "react-redux";
import { MapContext } from "react-map-gl";

import { App } from "./App";
import { store } from "./state";
import { reportWebVitals } from "./reportWebVitals";

import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, @typescript-eslint/no-unsafe-member-access
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

ReactDOM.render(
	<React.StrictMode>
		{/*
		// @ts-expect-error */}
		<MapContext.Provider>
			<Provider store={store}>
				<App />
			</Provider>
		</MapContext.Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
