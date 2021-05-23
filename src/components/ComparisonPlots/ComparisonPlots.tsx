import { BarChartWrapper } from "components/BarChartWrapper";
import { Bar } from "recharts";
import { DataItem } from "state/generalComparisonsSelectors";

export interface ComparisonPlotsProps {
	name: string;
	party: DataItem[];
	partyMean: DataItem[];
	political: DataItem[];
	politicalMean: DataItem[];
	meanTitle?: string
}

export const ComparisonPlots = ({
	name,
	party,
	partyMean,
	politicalMean,
	meanTitle = "Mean"
}: ComparisonPlotsProps): JSX.Element => {
	return (
		<>
			<BarChartWrapper name={`${name} - Candidate (by party)`} data={party}>
				<Bar dataKey="value" name={name} fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper
				name={`${name} ${meanTitle} - Candidate (by party)`}
				data={partyMean}
			>
				<Bar dataKey="value" name={name} fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper
				name={`${name} ${meanTitle} - Content`}
				data={politicalMean}
			>
				<Bar dataKey="value" name={name} fill="#8884d8" />
			</BarChartWrapper>
		</>
	);
};
