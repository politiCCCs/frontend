/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import ReactMapGL, { Source, Layer, MapEvent } from "react-map-gl";
import { useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import { electorateBorders, electorateFills } from "./layerStyles";
import { Feature } from "./types";
import { MapTooltip, MapTooltipProps } from "./MapTooltip";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

type GeoJSONType = Source["props"]["data"];

export const Map = (): JSX.Element => {
	const [error, setError] = useState("");
	const [geoJSON, setGeoJSON] = useState<GeoJSONType | null>(null);

	const [viewport, setViewport] = useState({
		longitude: 144.9631,
		latitude: -37.8136,
		zoom: 2,
	});

	const [tooltipProps, setTooltipProps] = useState<MapTooltipProps | null>(
		null,
	);

	const onHover = ({ features, srcEvent }: MapEvent): void => {
		const { offsetX, offsetY } = srcEvent as MouseEvent;
		const hoveredFeature: Feature = features && features[0];

		setTooltipProps(
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

				{tooltipProps !== null && <MapTooltip {...tooltipProps} />}
			</ReactMapGL>
		);
	} else {
		content = <Spinner />;
	}

	return content;
};
