import { Bar } from "recharts";
import { BarChartWrapper } from "components/BarChartWrapper";
import { useSelector } from "react-redux";
import {
	generalComparisonsCountSelector,
	generalComparisonsSelector,
} from "state/generalComparisonsSelectors";
import { GeneralComparisonsState } from "state/generalComparisons";
import styles from "./GeneralComparisons.module.css";

const ignore = new Set<keyof GeneralComparisonsState>([
	"nonPolitical",
	"otherLeaderNonPoliticalContent",
]);

export const GeneralComparisonPage = (): JSX.Element => {
	const sentiment = useSelector(
		generalComparisonsCountSelector("sentiment", ignore),
	);

	const likes = useSelector(generalComparisonsCountSelector("likes", ignore));

	const retweets = useSelector(
		generalComparisonsCountSelector("retweets", ignore),
	);

	const vulgarity = useSelector(
		generalComparisonsSelector("vulgarity", ignore),
	);

	return (
		<div className={styles.wrapper}>
			<BarChartWrapper name="Leaders Sentiment (by Party)" data={sentiment}>
				<Bar dataKey="value" name="Sentiment" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper name="Leaders Likes (by Party)" data={likes}>
				<Bar dataKey="value" name="Likes" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper name="Leaders Retweets (by Party)" data={retweets}>
				<Bar dataKey="value" name="Retweets" fill="#8884d8" />
			</BarChartWrapper>

			<BarChartWrapper name="Leaders Vulgarity (by Party)" data={vulgarity}>
				<Bar dataKey="value" name="Vulgarity" fill="#8884d8" />
			</BarChartWrapper>
		</div>
	);
};
