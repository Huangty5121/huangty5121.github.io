# About map: source and limits

The visible map uses [OpenStreetMap raster tiles](https://www.openstreetmap.org/copyright) through the locally hosted Leaflet library. Attribution remains visible on the map. The tile service is external, so map imagery can be delayed or unavailable; the city and institution buttons remain usable without it. The site does not prefetch offscreen tiles.

The three city-centre coordinates come from [Natural Earth populated places](https://www.naturalearthdata.com/) through `website/map-geometry.mjs`. Regenerate them with `python3 website/tools/derive-map.py <50m-land.geojson> <10m-land.geojson> <10m-populated-places-simple.geojson> > website/map-geometry.mjs`. These points frame the map only. They do not claim where the owner lived or worked.

Organisation coordinates in `website/views.mjs` were checked for the represented campus or office area. They are WGS-84 coordinates, so they align directly with the OpenStreetMap tiles. One institution may have multiple pins (the X-Institute has two sites), but all pins for it open the same set of records. PolySmart is a record under PolyU and has no separate institution pin. The directory is the text alternative to the map and remains usable when tiles do not load.
