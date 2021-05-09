import * as React from "react";
import ReactMapGL, {
	Source,
	Layer,
	LayerProps,
	SVGOverlay,
} from "react-map-gl";
import GeoJSON from "data/E_AUGFN3_region.json";

const layerStyle: LayerProps = {
	id: "point",
	type: "line",
	paint: {
		"line-color": "#007cbf",
	},
};

interface RedrawArgs {
	project: (pos: [number, number]) => [number, number];
}

function redraw({ project }: RedrawArgs): JSX.IntrinsicElements["circle"] {
	const [cx, cy] = project([-122, 37]);
	return <circle cx={cx} cy={cy} r={4} fill="blue" />;
}

export const Map = (): JSX.Element => {
	const [viewport, setViewport] = React.useState({
		longitude: 144.9631,
		latitude: -37.8136,
		zoom: 14,
	});

	return (
		<ReactMapGL
			{...viewport}
			width="100vw"
			height="100vh"
			onViewportChange={setViewport}
			onClick={(e) => console.log(e)}
		>
			<SVGOverlay redraw={redraw} />
			<Source
				id="my-data"
				type="geojson"
				data={GeoJSON as Source["props"]["data"]}
			>
				<Layer {...layerStyle} />
			</Source>
		</ReactMapGL>
	);
};
