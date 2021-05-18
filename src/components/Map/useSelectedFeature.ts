import { useContext, useState } from "react";
import { MapContext, MapEvent } from "react-map-gl";
import { useDispatch } from "react-redux";
import type { FeatureIdentifier, Map as MapInstance } from "mapbox-gl";
import { ui as store } from "state/ui";
import { Feature } from "./types";

export type OnClick = (evt: MapEvent) => void;

export const useSelectedFeature = (): OnClick => {
	const dispatch = useDispatch();
	const { map }: { map: MapInstance } = useContext(MapContext);

	const [
		priorSelectedFeature,
		setPriorSelectedFeature,
	] = useState<Feature | null>(null);

	const onClick = ({ features }: MapEvent): void => {
		const selectedFeature: Feature = features && features[0];

		if (
			selectedFeature === null ||
			selectedFeature === undefined ||
			selectedFeature.properties === null ||
			selectedFeature.properties === undefined ||
			selectedFeature.properties.Elect_div === undefined
		) {
			return;
		}
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
	};

	return onClick;
};
