import { useSelector } from "react-redux";
import {
	generalComparisonsCountSelector as countSelector,
	generalComparisonsSelector as valueSelector,
} from "state/generalComparisonsSelectors";
import { GeneralComparisonsState } from "state/generalComparisons";
import { ComparisonPlots } from "components/ComparisonPlots";
import styles from "./GeneralComparisons.module.css";

const party = new Set<keyof GeneralComparisonsState>([
	"greensLeader",
	"laborLeader",
	"liberalsLeader",
]);

const political = new Set<keyof GeneralComparisonsState>([
	"politicalTweets",
	"nonPoliticalTweets",
]);

export const GeneralComparisonPage = (): JSX.Element => {
	// Sentiment
	const sentimentParty = useSelector(countSelector("sentiment", false, party));
	const sentimentPartyMean = useSelector(
		countSelector("sentiment", true, party),
	);

	const sentimentPolitical = useSelector(
		countSelector("sentiment", false, political),
	);
	const sentimentPoliticalMean = useSelector(
		countSelector("sentiment", true, political),
	);

	// Likes
	const likesParty = useSelector(countSelector("likes", false, party));
	const likesPartyMean = useSelector(countSelector("likes", true, party));

	const likesPolitical = useSelector(countSelector("likes", false, political));
	const likesPoliticalMean = useSelector(
		countSelector("likes", true, political),
	);

	// Retweets
	const retweetsParty = useSelector(countSelector("retweets", false, party));
	const retweetsPartyMean = useSelector(countSelector("retweets", true, party));

	const retweetsPolitical = useSelector(
		countSelector("retweets", false, political),
	);
	const retweetsPoliticalMean = useSelector(
		countSelector("retweets", true, political),
	);

	// Vulgarity
	const vulgarityParty = useSelector(valueSelector("vulgarity", false, party));
	const vulgarityPartyMean = useSelector(
		valueSelector("vulgarity", true, party),
	);

	const vulgarityPolitical = useSelector(
		valueSelector("vulgarity", false, political),
	);
	const vulgarityPoliticalMean = useSelector(
		valueSelector("vulgarity", true, political),
	);

	return (
		<div className={styles.wrapper}>
			<ComparisonPlots
				name="Sentiment"
				party={sentimentParty}
				partyMean={sentimentPartyMean}
				political={sentimentPolitical}
				politicalMean={sentimentPoliticalMean}
			/>
			<ComparisonPlots
				name="Likes"
				party={likesParty}
				partyMean={likesPartyMean}
				political={likesPolitical}
				politicalMean={likesPoliticalMean}
			/>
			<ComparisonPlots
				name="Retweets"
				party={retweetsParty}
				partyMean={retweetsPartyMean}
				political={retweetsPolitical}
				politicalMean={retweetsPoliticalMean}
			/>
			<ComparisonPlots
				name="Vulgarity"
				party={vulgarityParty}
				partyMean={vulgarityPartyMean}
				political={vulgarityPolitical}
				politicalMean={vulgarityPoliticalMean}
				meanTitle="Proportion"
			/>
		</div>
	);
};
