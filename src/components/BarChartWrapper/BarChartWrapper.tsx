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
import {
	BarChart,
	BarProps,
	CartesianGrid,
	Legend,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { ScaleType } from "recharts/types/util/types";
import { numberWithCommas } from "../../utils";
import styles from "./BarChartWrapper.module.css";

export interface BarChartWrapperProps {
	name: string;
	data: any;
	children: ReactElement<BarProps>;
	scale?: ScaleType;
}

export const BarChartWrapper = ({
	name,
	children,
	data,
	scale = "auto",
}: BarChartWrapperProps): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<h3>{name}</h3>

			<BarChart width={1000} height={400} data={data} layout="vertical">
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis type="number" scale={scale} domain={[0.01, "auto"]} />
				<YAxis dataKey="name" type="category" tick width={150} />
				<Tooltip formatter={(value: number) => numberWithCommas(value)} />
				<Legend
					formatter={(value) => (
						<div>
							{value}
							{scale !== "auto" ? `(${scale as string} scale)` : null}
						</div>
					)}
				/>
				{children}
			</BarChart>
		</div>
	);
};
