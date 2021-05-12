import { CandidateTable } from "components/CandidateTable";
import { useSelector } from "react-redux";
import { Store } from "state";
import styles from "./MapData.module.css";
import { MapDataRow } from "./MapDataRow";

export const MapData = (): JSX.Element => {
	const data = useSelector((state: Store) => {
		const { electorate } = state.ui;
		if (electorate === undefined) {
			return;
		}

		const candidateNames = state.candidates.electorates[electorate.Elect_div];
		return {
			electorate,
			candidates:
				candidateNames?.map((name) => {
					const candidate = state.candidates.candidates[name];
					const handle = candidate?.handle;
					return {
						name,
						candidate,
						tweetData: handle ? state.twitterData.data[handle] : undefined,
					};
				}) || [],
		};
	});

	return data ? (
		<div className={styles.wrapper}>
			<MapDataRow header="Electorate" data={data?.electorate.Elect_div} />
			<MapDataRow header="State" data={data?.electorate.State} />
			<MapDataRow
				header="Area"
				data={
					<p>
						{data?.electorate.Area_SqKm.toFixed(2)} km<sup>2</sup>
					</p>
				}
			/>

			{data.candidates !== undefined ? (
				<CandidateTable candidates={data.candidates} />
			) : null}
		</div>
	) : (
		<></>
	);
};
