import { Map } from "components/Map";
import { MapData } from "components/MapData";
import styles from "./Electorate.module.css";

export const ElectoratePage = (): JSX.Element => {
	return (
		<div className={styles.electorateWrapper}>
			<div className={styles.dataPane}>
				<MapData />
			</div>
			<div className={styles.mapPane}>
				<Map />
			</div>
		</div>
	);
};
