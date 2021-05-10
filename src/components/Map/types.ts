export interface FeatureProperties {
	Actual: number;
	Area_SqKm: number;
	Australian: number;
	Elect_div: string;
	Numccds: number;
	Projected: number;
	Sortname: string;
	State: string;
	Total_Popu: number;
}

export interface Feature {
	properties: FeatureProperties;
}
