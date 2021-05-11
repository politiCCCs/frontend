/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Cell, Column, RowHeaderCell, Table } from "@blueprintjs/table";

import type { Candidate, Candidate as CandidateType } from "state/candidates";
import { PoliticianData } from "state/twitterData";
import styles from "./CandidateTable.module.css";

interface CandidateItem {
	name: string;
	candidate?: CandidateType;
	tweetData?: PoliticianData;
}

export interface CandidateProps {
	candidates: CandidateItem[];
}

export const CandidateTable = ({ candidates }: CandidateProps): JSX.Element => {
	const rowRenderer = (rowIndex: number): JSX.Element => {
		return (
			<RowHeaderCell key={`${rowIndex}`}>
				{candidates[rowIndex]?.name}
			</RowHeaderCell>
		);
	};

	const tweetRenderer = (key: keyof PoliticianData) => (
		rowIndex: number,
	): JSX.Element => {
		const data = candidates[rowIndex];
		const count = data?.tweetData?.[key]?.count;
		return <Cell key={`${rowIndex}`}>{count}</Cell>;
	};

	const candidateRenderer = (key: keyof Candidate) => (
		rowIndex: number,
	): JSX.Element => {
		const data = candidates[rowIndex];
		return <Cell key={`${rowIndex}`}>{data?.candidate?.[key]}</Cell>;
	};

	return (
		<div className={styles.wrapper}>
			<Table numRows={candidates.length} rowHeaderCellRenderer={rowRenderer}>
				<Column name="Likes" cellRenderer={tweetRenderer("likes")} />
				<Column name="Tweets" cellRenderer={tweetRenderer("count")} />
				<Column name="Sentiment" cellRenderer={tweetRenderer("sentiment")} />
				{/* <Column name="Votes" cellRenderer={candidateRenderer("")}/> */}
				<Column name="Won" cellRenderer={candidateRenderer("Elected")} />
			</Table>
		</div>
	);
};
