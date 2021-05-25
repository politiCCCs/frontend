/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
import ReactMapGL, { Source, Layer, MapEvent } from "react-map-gl";
import { useState } from "react";
import { Spinner } from "@blueprintjs/core";

import { electorateBorders, electorateFills } from "./layerStyles";
import { Feature } from "./types";
import { MapTooltip, MapTooltipProps } from "./MapTooltip";
import { useShapeFile } from "./useShapeFile";
import { useSelectedFeature } from "./useSelectedFeature";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

export const Map = (): JSX.Element => {
	const [error, setError] = useState("");
	const geoJSON = useShapeFile(setError);

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

	const onClick = useSelectedFeature();

	let content: JSX.Element;

	if (error) {
		content = <h1>Could not retrieve shape data</h1>;
	} else if (geoJSON !== null) {
		content = (
			<ReactMapGL
				{...viewport}
				width="100vw"
				height="calc(100vh - 50px - 400px)"
				onViewportChange={setViewport}
				mapboxApiAccessToken={MAPBOX_TOKEN}
				onHover={onHover}
				onClick={onClick}
			>
				<Source type="geojson" data={geoJSON} generateId>
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
