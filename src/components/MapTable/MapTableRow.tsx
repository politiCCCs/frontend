/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
import styles from "./MapTableRow.module.css";

type Child = string | number | JSX.Element | undefined;

export interface MapTableRowProps {
	header: string | JSX.Element;
	children: Child | Child[];
}

export const MapTableRow = ({
	header,
	children,
}: MapTableRowProps): JSX.Element => {
	return (
		<div className={styles.row}>
			<div className={styles.header}>{header}</div>
			<div>{children}</div>
		</div>
	);
};
