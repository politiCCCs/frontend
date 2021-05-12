import { ScatterPlot } from "components/ScatterPlot/ScatterPlot";
import { useSelector } from "react-redux";
import { createSelector } from "../../state/selectors";

export const CorrelationPage = (): JSX.Element => {
	const sentimentVsVotes = useSelector(createSelector("sentiment"));

	return (
		<div>
			<ScatterPlot
				name="Sentiment"
				xAxisTitle="Sentiment"
				yAxisTitle="Votes"
				points={sentimentVsVotes}
			/>
		</div>
	);
};
