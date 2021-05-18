import { ReactElement } from "react";
import { MapTableRowProps } from "./MapTableRow";
import styles from "./MapTable.module.css";

export interface MapTableProps {
	children: ReactElement<MapTableRowProps>[];
}

export const MapTable = ({ children }: MapTableProps): JSX.Element => {
	return <div className={styles.wrapper}>{children}</div>;
};
