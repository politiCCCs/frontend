import { LayerProps } from "react-map-gl";

export const electorateFills: LayerProps = {
	id: "electorate-fills",
	type: "fill",
	paint: {
		"fill-color": "#627BC1",
		"fill-opacity": [
			"case",
			["boolean", ["feature-state", "clicked"], false],
			0.8,
			0.4,
		],
	},
};

export const electorateBorders: LayerProps = {
	id: "electorate-borders",
	type: "line",
	paint: {
		"line-color": "#627BC1",
		"line-width": 1,
	},
};
