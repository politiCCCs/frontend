/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import ReactMapGL, { Source, Layer, MapEvent } from "react-map-gl";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Map.css";
import { electorateBorders, electorateFills } from "./styles";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

type GeoJSONType = Source["props"]["data"];

interface HoverInfo {
	feature: any;
	x: number;
	y: number;
}

interface FeatureProperties {
	Actual: number;
	Area_SqKm: number;
	Australian: number;
	Elect_div: string;
	Numccds: number;
	Projected: number;
	Sortname: string;
	State: string;
	Total_Popu: number;
}

interface Feature {
	properties: FeatureProperties;
}

export const Map = (): JSX.Element => {
	const [error, setError] = useState("");
	const [geoJSON, setGeoJSON] = useState<GeoJSONType | null>(null);

	const [viewport, setViewport] = useState({
		longitude: 144.9631,
		latitude: -37.8136,
		zoom: 2,
	});

	const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

	const onHover = ({ features, srcEvent }: MapEvent): void => {
		const { offsetX, offsetY } = srcEvent as MouseEvent;
		const hoveredFeature: Feature = features && features[0];

		setHoverInfo(
			hoveredFeature?.properties.Elect_div !== undefined
				? {
						feature: hoveredFeature,
						x: offsetX,
						y: offsetY,
				  }
				: null,
		);
	};

	// Fetch the shapefile
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
				onHover={onHover}
				mapboxApiAccessToken={MAPBOX_TOKEN}
			>
				<Source id="my-data" type="geojson" data={geoJSON}>
					<Layer {...electorateFills} />
					<Layer {...electorateBorders} />
				</Source>

				{hoverInfo && (
					<div
						className="tooltip"
						style={{ left: hoverInfo.x, top: hoverInfo.y }}
					>
						<div>{hoverInfo.feature.properties.toString()}</div>
					</div>
				)}
			</ReactMapGL>
		);
	} else {
		content = <Spinner animation="border" role="status" />;
	}

	return content;
};
