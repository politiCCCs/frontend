import { GenericTable, GenericTableRow } from "components/GenericTable";
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
			<GenericTable>
				<GenericTableRow header="Name">{data?.name}</GenericTableRow>
				<GenericTableRow header="Handle">@{data?.handle}</GenericTableRow>
				<GenericTableRow header="Votes">
					{numberWithCommas(data?.y)}
				</GenericTableRow>
				<GenericTableRow header={dataKey}>
					{numberWithCommas(data?.x)}
				</GenericTableRow>
				<GenericTableRow header="Best Fit Y">
					{numberWithCommas(data?.bestFitY)}
				</GenericTableRow>
				<GenericTableRow header="r^2">
					{numberWithCommas(data?.r2)}
				</GenericTableRow>
			</GenericTable>
		</div>
	);
};
