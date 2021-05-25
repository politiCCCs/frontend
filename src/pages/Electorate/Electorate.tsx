/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
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
