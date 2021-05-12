import Chart from "react-apexcharts";
import { ComparisonData } from "state/selectors";

export interface ScatterPlotProps {
	name: string;
	xAxisTitle: string;
	yAxisTitle: string;
	points: ComparisonData[];
}

export const ScatterPlot = ({
	name,
	xAxisTitle,
	yAxisTitle,
	points,
}: ScatterPlotProps): JSX.Element => {
	const scatter = {
		name,
		type: "scatter",
		data: points,
	};

	const line = {
		name: "Line of best fit",
		type: "line",
		data: [
			{
				x: 1,
				y: 1,
			},
		],
	};

	const series = [scatter, line];

	return (
		<Chart
			series={series}
			options={{
				chart: {
					height: 350,
					type: "line",
				},
				fill: {
					type: "solid",
				},
				markers: {
					size: [6, 0],
				},
				tooltip: {
					shared: false,
					intersect: true,
				},
				legend: {
					show: false,
				},
				xaxis: {
					type: "numeric",
					title: { text: xAxisTitle },
				},
				yaxis: {
					title: { text: yAxisTitle },
				},
			}}
		/>
	);
};
