import ReactMapGL, { Source, Layer, LayerProps } from "react-map-gl";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const layerStyle: LayerProps = {
	id: "point",
	type: "line",
	paint: {
		"line-color": "#007cbf",
	},
};

type GeoJSONType = Source["props"]["data"];

export const Map = (): JSX.Element => {
	const [error, setError] = useState("");
	const [geoJSON, setGeoJSON] = useState<GeoJSONType | null>(null);

	const [viewport, setViewport] = useState({
		longitude: 144.9631,
		latitude: -37.8136,
		zoom: 2,
	});

	useEffect(() => {
		fetch("/shapefile")
			.then((res) => res.json())
			.then((data) => {
				// @ts-ignore
				setGeoJSON(data as GeoJSONType);
			})
			.catch(() => {
				setError("Could not retrieve shape file");
			});
	}, []);

	let content: JSX.Element;

	if (error) {
		content = <h1>Could not retrieve shape data</h1>;
	} else if (geoJSON !== null) {
		content = (
			<ReactMapGL
				{...viewport}
				width="100vw"
				height="100vh"
				onViewportChange={setViewport}
				onClick={(e) => console.log(e)}
			>
				<Source id="my-data" type="geojson" data={geoJSON}>
					<Layer {...layerStyle} />
				</Source>
			</ReactMapGL>
		);
	} else {
		content = <Spinner animation="border" role="status" />;
	}

	return content;
};
