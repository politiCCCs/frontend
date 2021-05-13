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
			<div>Name: {data?.name}</div>
			<div>
				{dataKey}: @{data?.handle}
			</div>
			<div>Votes: {data?.y}</div>
			<div>
				{dataKey}: {data?.x}
			</div>
		</div>
	);
};
