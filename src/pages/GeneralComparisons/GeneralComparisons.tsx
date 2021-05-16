import { Bar } from "recharts";
import { BarChartWrapper } from "components/BarChartWrapper";
import { useSelector } from "react-redux";
import { partySentimentSelector } from "state/generalComparisonsSelectors";

export const GeneralComparisonPage = (): JSX.Element => {
	const sentiment = useSelector(partySentimentSelector);

	return (
		<div>
			<BarChartWrapper name="Sentiment" data={sentiment}>
				<Bar dataKey="value" name="Sentiment" fill="#8884d8" />
			</BarChartWrapper>
		</div>
	);
};
