/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
import { Menu, MenuItem } from "@blueprintjs/core";
import { Column, ColumnHeaderCell, CellRenderer } from "@blueprintjs/table";

interface Comparable {
	toString: () => string;
}

export type Comparator = (a?: Comparable, b?: Comparable) => number;

export type SortColumnCallback = (comparator: Comparator) => void;

const SortableColumnMenu = (
	sortColumn: SortColumnCallback,
) => (): JSX.Element => {
	const compare = (a?: Comparable, b?: Comparable): number => {
		if (a === undefined) {
			return -1;
		}
		if (b === undefined) {
			return 1;
		}

		if (typeof a === "number" && typeof b === "number") {
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return 0;
		}

		return a.toString().localeCompare(b.toString());
	};

	const sortAsc = (): void => sortColumn(compare);
	const sortDesc = (): void => sortColumn((a, b) => compare(b, a));

	return (
		<Menu>
			<MenuItem icon="sort-asc" onClick={sortAsc} text="Sort Asc" />
			<MenuItem icon="sort-desc" onClick={sortDesc} text="Sort Desc" />
		</Menu>
	);
};

export interface SortableColumnProps {
	name: string;
	index: number;
	cellRenderer: CellRenderer;
	sortColumnCallback: SortColumnCallback;
}

export const SortableColumn = ({
	name,
	index,
	cellRenderer,
	sortColumnCallback,
}: SortableColumnProps): JSX.Element => {
	const headerRenderer = (): JSX.Element => (
		<ColumnHeaderCell
			name={name}
			menuRenderer={SortableColumnMenu(sortColumnCallback)}
		/>
	);

	return (
		<Column
			cellRenderer={cellRenderer}
			columnHeaderCellRenderer={headerRenderer}
			key={index}
			name={name}
		/>
	);
};
