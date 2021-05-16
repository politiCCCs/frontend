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

			<BarChart
				width={500}
				height={400}
				data={data}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				{children}
			</BarChart>
		</div>
	);
};
