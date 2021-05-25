/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
import { FeatureCollection } from "geojson";
import { useEffect, useState } from "react";

type SetError = (s: string) => void;

export const useShapeFile = (setError: SetError): FeatureCollection | null => {
	const [geoJSON, setGeoJSON] = useState<FeatureCollection | null>(null);

	useEffect(() => {
		fetch("/api/load/shapefile")
			.then((res) => res.json())
			.then((data) => {
				setGeoJSON(data);
			})
			.catch(() => {
				setError("Could not retrieve shape file");
			});
	}, [setError]);

	return geoJSON;
};
