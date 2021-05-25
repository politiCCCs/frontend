/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
import { ReactElement } from "react";
import { MapTableRowProps } from "./MapTableRow";
import styles from "./MapTable.module.css";

export interface MapTableProps {
	children: ReactElement<MapTableRowProps>[];
}

export const MapTable = ({ children }: MapTableProps): JSX.Element => {
	return <div className={styles.wrapper}>{children}</div>;
};
