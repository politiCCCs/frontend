import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MapContext } from "react-map-gl";
import { App } from "./App";
import { store } from "./state";
import { reportWebVitals } from "./reportWebVitals";

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
