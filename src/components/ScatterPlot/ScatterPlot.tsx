import {
	ResponsiveContainer,
	ComposedChart,
	Line,
	Scatter,
	Label,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { ComparisonData } from "state/selectors";
import { CustomTooltip } from "./CustomTooltip";

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
	const min = points[0]?.x || 0;
	const max = points[points.length - 1]?.x || 0;
	const diff = (max - min) / 10;

	const ticks: number[] = [];
	for (let i = min; i < max; i += diff) {
		const rounded = parseFloat(i.toFixed(2));
		ticks.push(rounded);
	}

	return (
		<ResponsiveContainer width={500} height={400}>
			<ComposedChart
				data={points}
				margin={{ top: 20, left: 20, right: 20, bottom: 20 }}
			>
				<XAxis
					dataKey="x"
					name={xAxisTitle}
					type="number"
					scale="linear"
					ticks={ticks}
				>
					<Label value={xAxisTitle} position="insideBottomRight" offset={-10} />
				</XAxis>

				<YAxis dataKey="y" name={yAxisTitle} type="number" scale="linear">
					<Label
						value={yAxisTitle}
						position="insideLeft"
						angle={-90}
						offset={-2}
					/>
				</YAxis>

				{/*
				// @ts-ignore */}
				<Tooltip cursor={false} content={CustomTooltip(name)} />
				<Scatter name={name} data={points} fill="#0fa2f7" />
				<Line stroke="red" dataKey="bestFitY" dot={false} activeDot={false} />
			</ComposedChart>
		</ResponsiveContainer>
	);
};
