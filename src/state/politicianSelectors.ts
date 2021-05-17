import { Store } from "state";
import { PoliticianData } from "state/twitterData";

export interface ComparisonData {
	name: string;
	handle: string;
	x: number;
	y: number;
	bestFitY?: number;
	r2?: number;
}

type ComparisonDataNoBestFit = Omit<ComparisonData, "bestFitY">;

export interface Point {
	x: number;
	y: number;
}

const sortComparisonData = (a: Point, b: Point): number => {
	if (a.x < b.x) {
		return -1;
	}
	if (a.x > b.x) {
		return 1;
	}
	return 0;
};

interface Analysis {
	bestFit: (x?: number) => number;
	r2Acc: (y: number, predY: number) => number;
	t2Acc: (y: number, meanY: number) => number;
}

const analysis = (points: ComparisonDataNoBestFit[]): Analysis | undefined => {
	if (points.length === 0) {
		return;
	}

	let xSum = 0;
	let xSqSum = 0;
	let ySum = 0;
	let xySum = 0;
	const n = points.length;

	for (const p of points) {
		xSum += p.x;
		xSqSum += p.x * p.x;
		ySum += p.y;
		xySum += p.x * p.y;
	}

	const m = (n * xySum - xSum * ySum) / (n * xSqSum - xSum * xSum);
	const b = (ySum - m * xSum) / n;

	return {
		bestFit: (x?: number): number => {
			if (x === undefined) {
				return 0;
			}
			return m * x + b;
		},
		r2Acc: (y: number, predY: number) => Math.pow(y - predY, 2),
		t2Acc: (y: number, meanY: number) => Math.pow(y - meanY, 2),
	};
};

export const createPoliticianSelector = (dataKey: keyof PoliticianData) => (
	state: Store,
): ComparisonData[] => {
	const points = [];

	for (const twitterHandle of Object.keys(state.twitterData.data)) {
		if (
			!Object.prototype.hasOwnProperty.call(
				state.twitterData.data,
				twitterHandle,
			)
		) {
			continue;
		}

		const realName = state.candidates.handleToName[twitterHandle];
		if (realName === undefined) {
			continue;
		}

		const votes = state.candidates.candidates[realName]?.TotalVotes;
		const twitterData = state.twitterData.data[twitterHandle]?.[dataKey];
		if (twitterData === undefined || votes === undefined) {
			continue;
		}

		points.push({
			name: realName,
			handle: twitterHandle,
			x: typeof twitterData === "object" ? twitterData.sum : twitterData,
			y: votes,
		});
	}

	points.sort(sortComparisonData);

	const fns = analysis(points);
	if (fns === undefined) {
		return points;
	}

	const { bestFit, r2Acc, t2Acc } = fns;
	let rss = 0;
	let tss = 0;
	const meanY = points.reduce((acc, curr) => acc + curr.y, 0) / points.length;

	for (const point of points) {
		const predY = bestFit(point.x);
		(point as ComparisonData).bestFitY = predY;
		rss += r2Acc(point.y, predY);
		tss += t2Acc(point.y, meanY);
	}

	const r2 = 1 - rss / tss;
	for (const point of points) {
		(point as ComparisonData).r2 = r2;
	}

	return points;
};
