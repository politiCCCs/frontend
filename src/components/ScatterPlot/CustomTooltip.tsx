import { GenericTable, GenericTableRow } from "components/GenericTable";
import { ComparisonData } from "state/selectors";
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

	const data = payload[0]?.payload;
	return (
		<div className={styles.customTooltip}>
			<GenericTable>
				<GenericTableRow header="Name">{data?.name}</GenericTableRow>
				<GenericTableRow header="Handle">@{data?.handle}</GenericTableRow>
				<GenericTableRow header="Votes">{data?.y}</GenericTableRow>
				<GenericTableRow header={dataKey}>{data?.x}</GenericTableRow>
			</GenericTable>
		</div>
	);
};
