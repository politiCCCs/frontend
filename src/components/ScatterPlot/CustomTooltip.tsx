import { MapTable, MapTableRow } from "components/MapTable";
import { ComparisonData } from "state/politicianSelectors";
import styles from "./CustomTooltip.module.css";

interface Payload {
	payload: ComparisonData;
}

export interface CustomTooltipProps {
	active: boolean;
	label: number;
	payload: Payload[];
}

// Based on https://stackoverflow.com/a/2901298/5018082
const numberWithCommas = (x: number | undefined): string => {
	if (x === undefined) {
		return "";
	}

	const rounded = x.toFixed(2);
	return rounded.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const CustomTooltip = (dataKey: string) => ({
	active,
	payload,
}: CustomTooltipProps): JSX.Element => {
	if (!active) {
		return <></>;
	}

	const data = payload?.[0]?.payload;
	return (
		<div className={styles.customTooltip}>
			<MapTable>
				<MapTableRow header="Name">{data?.name}</MapTableRow>
				<MapTableRow header="Handle">@{data?.handle}</MapTableRow>
				<MapTableRow header="Votes">
					{numberWithCommas(data?.y)}
				</MapTableRow>
				<MapTableRow header={dataKey}>
					{numberWithCommas(data?.x)}
				</MapTableRow>
				<MapTableRow header="Best Fit Y">
					{numberWithCommas(data?.bestFitY)}
				</MapTableRow>
				<MapTableRow header="r^2">
					{numberWithCommas(data?.r2)}
				</MapTableRow>
			</MapTable>
		</div>
	);
};
