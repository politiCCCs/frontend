// Based on https://stackoverflow.com/a/2901298/5018082
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
