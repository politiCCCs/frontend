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
