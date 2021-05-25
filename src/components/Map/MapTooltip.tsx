/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
import styles from "./MapTooltip.module.css";
import { Feature } from "./types";

export interface MapTooltipProps {
	feature: Feature;
	x: number;
	y: number;
}

export const MapTooltip = ({ feature, x, y }: MapTooltipProps): JSX.Element => {
	const props = feature.properties;

	return (
		<div className={styles.mapTooltip} style={{ left: x, top: y }}>
			<div>Electorate</div>
			<div>{props.Elect_div}</div>

			<div>
				Area (km<sup>2</sup>)
			</div>
			<div>{props.Area_SqKm}</div>

			<div>State</div>
			<div>{props.State}</div>
		</div>
	);
};
