import { MapTable, MapTableRow } from "components/MapTable";
import { ComparisonData } from "state/politicianSelectors";
import { numberWithCommas } from "utils";
import styles from "./CustomTooltip.module.css";

interface Payload {
	payload: ComparisonData;
}

export interface CustomTooltipProps {
	active: boolean;
	label: number;
	payload: Payload[];
}

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
