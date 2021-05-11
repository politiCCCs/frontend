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
