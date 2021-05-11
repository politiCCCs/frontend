import { useSelector } from "react-redux";
import { Store } from "state";
import styles from "./MapData.module.css";
import { MapDataRow } from "./MapDataRow";

export const MapData = (): JSX.Element => {
	const electorate = useSelector((state: Store) => state.ui.electorate);

	return electorate ? (
		<div className={styles.wrapper}>
			<MapDataRow header="Electorate" data={electorate.Elect_div} />
			<MapDataRow header="State" data={electorate.State} />
			<MapDataRow
				header="Area"
				data={
					<p>
						{electorate.Area_SqKm.toFixed(2)} km<sup>2</sup>
					</p>
				}
			/>
		</div>
	) : (
		<></>
	);
};
