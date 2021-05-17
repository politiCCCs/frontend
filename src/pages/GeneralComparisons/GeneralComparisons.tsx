import { Bar } from "recharts";
import { BarChartWrapper } from "components/BarChartWrapper";
import { useSelector } from "react-redux";
import {
	generalComparisonsCountSelector,
	generalComparisonsSelector,
} from "state/generalComparisonsSelectors";
import styles from "./GeneralComparisons.module.css";


export const GeneralComparisonPage = (): JSX.Element => {
	const sentiment = useSelector(generalComparisonsCountSelector("sentiment"));

	const likes = useSelector(generalComparisonsCountSelector("likes"));

	const retweets = useSelector(generalComparisonsCountSelector("retweets"));

	const vulgarity = useSelector(generalComparisonsSelector("vulgarity"));

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
