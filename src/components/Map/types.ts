/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
import type { Feature as GeoJsonFeature } from "geojson";

export interface FeatureProperties {
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

export type Feature = GeoJsonFeature<null, FeatureProperties>;
