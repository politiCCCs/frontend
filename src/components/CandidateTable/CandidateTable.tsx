/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Cell, RowHeaderCell, Table, Utils } from "@blueprintjs/table";
import { useCallback, useMemo, useState } from "react";

import type { Candidate, Candidate as CandidateType } from "state/candidates";
import { PoliticianData } from "state/twitterData";
import { Comparator, SortableColumn } from "./SortableColumn";
import styles from "./CandidateTable.module.css";

interface CandidateItem {
	name: string;
	candidate?: CandidateType;
	tweetData?: PoliticianData;
}

export interface CandidateProps {
	candidates: CandidateItem[];
}

interface Column {
	name: string;
	getCellData: (
		getSortedData: boolean,
	) => (index: number) => string | number | undefined;
}

export const CandidateTable = ({ candidates }: CandidateProps): JSX.Element => {
	const [sortedIndexMap, setSortedIndexMap] = useState<number[]>(
		Utils.times(candidates.length, (i) => i),
	);

	const sortColumn = useCallback(
		(getCellData: Column["getCellData"]) => (comparator: Comparator): void => {
			const currentSortedIndices = Utils.times(candidates.length, (i) => i);
			currentSortedIndices.sort((a, b) =>
				comparator(getCellData(false)(a), getCellData(false)(b)),
			);
			setSortedIndexMap(currentSortedIndices);
		},
		[candidates.length],
	);

	const rowRenderer = (rowIndex: number): JSX.Element => {
		return (
			<RowHeaderCell
				nameRenderer={(_name, index) => <p>{candidates[index!]?.name}</p>}
			>
				{candidates[rowIndex]?.name}
			</RowHeaderCell>
		);
	};

	const getTwitterData = useCallback(
		(key: keyof PoliticianData) => (getSortedData: boolean) => (
			rowIndex: number,
		): number | undefined => {
			if (getSortedData) {
				const actualIndex = sortedIndexMap[rowIndex];
				if (actualIndex === undefined) {
					return;
				}
				rowIndex = actualIndex;
			}

			const data = candidates[rowIndex]?.tweetData?.[key];
			const count = typeof data === "object" ? data.sum : data;
			return count;
		},
		[candidates, sortedIndexMap],
	);

	const getVotingData = useCallback(
		(key: keyof Candidate) => (getSortedData: boolean) => (
			rowIndex: number,
		): string | number | undefined => {
			if (getSortedData) {
				const actualIndex = sortedIndexMap[rowIndex];
				if (actualIndex === undefined) {
					return;
				}
				rowIndex = actualIndex;
			}

			return candidates[rowIndex]?.candidate?.[key];
		},
		[candidates, sortedIndexMap],
	);

	const cellRenderer = (renderer: Column["getCellData"]) => (
		index: number,
	): JSX.Element => <Cell>{renderer(true)(index)}</Cell>;

	const columns: Column[] = useMemo(
		() => [
			{ name: "Likes", getCellData: getTwitterData("likes") },
			{ name: "Tweets", getCellData: getTwitterData("count") },
			{ name: "Sentiment", getCellData: getTwitterData("sentiment") },
			{ name: "Ordinary Votes", getCellData: getVotingData("OrdinaryVotes") },
			{ name: "Absent Votes", getCellData: getVotingData("AbsentVotes") },
			{
				name: "Provisional Votes",
				getCellData: getVotingData("ProvisionalVotes"),
			},
			{ name: "PrePoll Votes", getCellData: getVotingData("PrePollVotes") },
			{ name: "Postal Votes", getCellData: getVotingData("PostalVotes") },
			{ name: "Total Votes", getCellData: getVotingData("TotalVotes") },
			{ name: "Swing", getCellData: getVotingData("Swing") },
			{ name: "Won", getCellData: getVotingData("Elected") },
		],
		[getTwitterData, getVotingData],
	);

	const tableContents = useMemo(
		() =>
			columns.map(({ name, getCellData }, index) => {
				return SortableColumn({
					name,
					index,
					sortColumnCallback: sortColumn(getCellData),
					cellRenderer: cellRenderer(getCellData),
				});
			}),
		[columns, sortColumn],
	);

	return (
		<div className={styles.wrapper}>
			<Table
				numRows={candidates.length}
				rowHeaderCellRenderer={rowRenderer}
				enableRowResizing={false}
				enableColumnResizing={false}
				className={styles.table}
			>
				{tableContents}
			</Table>
		</div>
	);
};
