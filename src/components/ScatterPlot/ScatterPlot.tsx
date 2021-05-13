import { Utils } from "@blueprintjs/table";
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
	const diff = max - min;

	const ticks = Utils.times(10, (i) => (i * diff) / 10);

	return (
		<ResponsiveContainer width={500} height={400}>
			<ComposedChart data={points}>
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
