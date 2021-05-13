import { ReactElement } from "react";
import { GenericTableRowProps } from "./GenericTableRow";
import styles from "./GenericTable.module.css";

export interface GenericTableProps {
	children: ReactElement<GenericTableRowProps>[];
}

export const GenericTable = ({ children }: GenericTableProps): JSX.Element => {
	return <div className={styles.wrapper}>{children}</div>;
};
