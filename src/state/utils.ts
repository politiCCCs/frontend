/**
 * Count type returned by CouchDB
 */
export interface Count {
	sum: number;
	count: number;
	min: number;
	max: number;
	sumsqr: number;
}

export const arrayReferenceEqual = <T>(a: T[], b: T[]): boolean => {
	if (a.length !== b.length) {
		return false;
	}

	for (let i = 0; i < a.length; i += 1) {
		if (a[i] !== b[i]) {
			return false;
		}
	}

	return true;
};

export const capitalizeFirstLetter = (s: string): string =>
	s.charAt(0).toUpperCase() + s.slice(1);
