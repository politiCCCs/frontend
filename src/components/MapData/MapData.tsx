import { CandidateTable } from "components/CandidateTable";
import { MapTable, MapTableRow } from "components/MapTable";
import { useSelector } from "react-redux";
import { Store } from "state";
import styles from "./MapData.module.css";

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
			<MapTable>
				<MapTableRow header="Electorate">
					{data?.electorate.Elect_div}
				</MapTableRow>

				<MapTableRow header="State">
					{data?.electorate.State}
				</MapTableRow>
				<MapTableRow header="Area">
					<p>
						{data?.electorate.Area_SqKm.toFixed(2)} km<sup>2</sup>
					</p>
				</MapTableRow>
			</MapTable>

			{data.candidates !== undefined ? (
				<CandidateTable candidates={data.candidates} />
			) : null}
		</div>
	) : (
		<></>
	);
};
