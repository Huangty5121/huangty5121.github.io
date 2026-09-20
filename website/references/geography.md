# About geographic locator

The About map uses real land/coastline geometry and populated-place points from [Natural Earth](https://www.naturalearthdata.com/), a public-domain dataset. The source GeoJSON files are:

- [1:50m land](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_land.geojson) for the regional overview.
- [1:10m land](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_land.geojson) for the Pearl River Delta detail.
- [1:10m populated places](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_populated_places_simple.geojson) for the city centre points.

`website/map-geometry.mjs` is a small offline derivative. Regenerate it with `python3 website/tools/derive-map.py <50m-land.geojson> <10m-land.geojson> <10m-populated-places-simple.geojson> > website/map-geometry.mjs`. The fixed geographic windows are 103–125°E, 19–43°N for the overview and 113.7–114.6°E, 22–22.9°N for the detail. City points in the source data are Beijing 116.394201°E/39.90172°N, Shenzhen 114.061154°E/22.548097°N, and Hong Kong 114.183064°E/22.306927°N.

These are representative city-centre points, **not** campus, employer, address, or personal-travel locations. The overview marks the Pearl River Delta as a cluster, then the detail separates Shenzhen and Hong Kong at a larger scale. The map contains no travel lines or political boundaries. The city list remains an accessible text alternative and filters the same canonical institution/experience records.
