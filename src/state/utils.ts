import { PayloadAction } from "@reduxjs/toolkit";

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

export interface TwitterCountData {
	likes?: Count;
	retweets?: Count;
	sentiment?: Count;
}

export const arrayValueEqual = <T>(a: T[], b: T[]): boolean => {
	if (a.length !== b.length) {
		return false;
	}

	for (let i = 0; i < a.length; i += 1) {
		if (a[i] !== undefined && b[i] !== undefined && a[i] !== b[i]) {
			return false;
		}
	}

	return true;
};

export const capitalizeFirstLetter = (s: string): string =>
	s.charAt(0).toUpperCase() + s.slice(1);

// Types from CouchDB
export interface CouchDBRow<K, V> {
	key: K;
	value: V;
}

export interface CouchDBData<K, V> {
	rows: CouchDBRow<K, V>[];
}

// Redux helper to load from CouchDB
export type LoadAction<K, V> = PayloadAction<CouchDBData<K, V>>;
