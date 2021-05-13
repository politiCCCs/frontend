import styles from "./GenericTableRow.module.css";

type Child = string | number | JSX.Element | undefined;

export interface GenericTableRowProps {
	header: string | JSX.Element;
	children: Child | Child[];
}

export const GenericTableRow = ({
	header,
	children,
}: GenericTableRowProps): JSX.Element => {
	return (
		<div className={styles.row}>
			<div className={styles.header}>{header}</div>
			<div>{children}</div>
		</div>
	);
};
