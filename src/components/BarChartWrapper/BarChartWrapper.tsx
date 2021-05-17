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
import styles from "./BarChartWrapper.module.css";

export interface BarChartWrapperProps {
	name: string;
	data: any;
	children: ReactElement<BarProps>;
}

export const BarChartWrapper = ({
	name,
	children,
	data,
}: BarChartWrapperProps): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<h3>{name}</h3>

			<BarChart width={1000} height={400} data={data} layout="vertical">
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis type="number" />
				<YAxis dataKey="name" type="category" tick width={220} />
				<Tooltip />
				<Legend />
				{children}
			</BarChart>
		</div>
	);
};
