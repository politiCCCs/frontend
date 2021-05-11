import styles from "./MapDataRow.module.css";

export interface MapDataRowProps {
	header: string | JSX.Element;
	data: string | number | JSX.Element;
}

export const MapDataRow = ({ header, data }: MapDataRowProps): JSX.Element => {
	return (
		<div className={styles.row}>
			<div className={styles.header}>{header}</div>
			<div>{data}</div>
		</div>
	);
};
