/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import ReactMapGL, { Source, Layer, MapEvent, MapContext } from "react-map-gl";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "@blueprintjs/core";
import type { FeatureIdentifier, Map as MapInstance } from "mapbox-gl";

import { ui as store } from "state/ui";
import { electorateBorders, electorateFills } from "./layerStyles";
import { Feature } from "./types";
import { MapTooltip, MapTooltipProps } from "./MapTooltip";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

type GeoJSONType = Source["props"]["data"];

export const Map = (): JSX.Element => {
	const dispatch = useDispatch();
	const { map }: { map: MapInstance } = useContext(MapContext);

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

	const [
		priorSelectedFeature,
		setPriorSelectedFeature,
	] = useState<Feature | null>(null);
	const onClick = ({ features }: MapEvent): void => {
		const selectedFeature: Feature = features && features[0];

		if (selectedFeature.properties.Elect_div !== undefined) {
			if (priorSelectedFeature) {
				// it's easier to use our own type, as FeatureIdentifier is not generic
				map.setFeatureState(
					(priorSelectedFeature as unknown) as FeatureIdentifier,
					{ clicked: false },
				);
			}

			map.setFeatureState((selectedFeature as unknown) as FeatureIdentifier, {
				clicked: true,
			});
			setPriorSelectedFeature(selectedFeature);
			dispatch(store.actions.setElectorate(selectedFeature.properties));
		}
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
				width="calc(100vw - 400px)"
				height="calc(100vh - 50px)"
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
