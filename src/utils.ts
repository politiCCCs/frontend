/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
export const numberWithCommas = (x: string | number | undefined): string => {
	if (x === undefined) {
		return "";
	}

	if (typeof x === "string") {
		x = Number.parseFloat(x)
	}

	const rounded = x.toFixed(2);
	return rounded.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
