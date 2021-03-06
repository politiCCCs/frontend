/*
 * COMP90024 Cluster and Cloud Computing
 * Group 5
 * Aleksandar Pasquini (912504)
 * Amelia Fleischer-Boermans (389511)
 * Isaac Daly (1129173)
 * Mahardini Rizky Putri (921790)
 * Richard Yang (1215150)
 */
declare module "@loaders.gl/shapefile" {
	export const ShapefileLoader = {
		name: "Shapefile",
		id: "shapefile",
		module: "shapefile",
		version: VERSION,
		category: "geometry",
		extensions: ["shp"],
		mimeTypes: ["application/octet-stream"],
		tests: [new Uint8Array(SHP_MAGIC_NUMBER).buffer],
		options: {
			shapefile: {},
			shp: {
				_maxDimensions: 4,
			},
		},
		parse: parseShapefile,
		parseInBatches: parseShapefileInBatches,
	};
}
