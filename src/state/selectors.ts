import { Store } from "state";
import { PoliticianData } from "state/twitterData";

export interface ComparisonData {
	name: string;
	handle: string;
	x: number;
	y: number;
	bestFitY?: number;
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

type LeastSquares = (x?: number) => number;

const leastSquares = (
	points: ComparisonDataNoBestFit[],
): LeastSquares | undefined => {
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

	const m = (n * xySum - xSum * ySum) / (n * xSqSum - xSum * xSqSum);
	const b = (ySum - m * xSum) / n;

	return (x?: number): number => {
		if (x === undefined) {
			return 0;
		}
		return m * x + b;
	};
};

export const createSelector = (dataKey: keyof PoliticianData) => (
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
			x: typeof twitterData === "object" ? twitterData.count : twitterData,
			y: votes,
		});
	}

	points.sort(sortComparisonData);

	const bestFit = leastSquares(points);
	if (bestFit) {
		for (const point of points) {
			(point as ComparisonData).bestFitY = bestFit(point.y);
		}
	}
	return points;
};
