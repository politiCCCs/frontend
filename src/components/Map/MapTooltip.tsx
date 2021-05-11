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
