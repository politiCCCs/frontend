import { BarChartWrapper } from "components/BarChartWrapper";
import { Bar } from "recharts";
import { DataItem } from "state/generalComparisonsSelectors";

export interface ComparisonPlotsProps {
	name: string;
	party: DataItem[];
	partyMean: DataItem[];
	political: DataItem[];
	politicalMean: DataItem[];
}

export const ComparisonPlots = ({
	name,
	party,
	partyMean,
	political,
	politicalMean,
}: ComparisonPlotsProps): JSX.Element => {
	return (
		<>
			<BarChartWrapper name={`${name} - Leaders (by party)`} data={party}>
				<Bar dataKey="value" name={name} fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper
				name={`${name} Mean - Leaders (by party)`}
				data={partyMean}
			>
				<Bar dataKey="value" name={name} fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper
				name={`${name} Mean - Content`}
				data={politicalMean}
			>
				<Bar dataKey="value" name={name} fill="#8884d8" />
			</BarChartWrapper>
		</>
	);
};
