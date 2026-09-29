# About map: source and limits

The visible map uses [OpenStreetMap raster tiles](https://www.openstreetmap.org/copyright) through the locally hosted Leaflet library. Attribution remains visible on the map. The tile service is external, so map imagery can be delayed or unavailable; the city and institution buttons remain usable without it. The site does not prefetch offscreen tiles.

The three city-centre coordinates come from [Natural Earth populated places](https://www.naturalearthdata.com/) through `website/map-geometry.mjs`. Regenerate them with `python3 website/tools/derive-map.py <50m-land.geojson> <10m-land.geojson> <10m-populated-places-simple.geojson> > website/map-geometry.mjs`. These points frame the map only. They do not claim where the owner lived or worked.

Organisation coordinates in `website/views.mjs` were checked for the represented campus or office area. They are WGS-84 coordinates, so they align directly with the OpenStreetMap tiles. One institution may have multiple pins (the X-Institute has two sites), but all pins for it open the same set of records. PolySmart is a record under PolyU and has no separate institution pin. The directory is the text alternative to the map and remains usable when tiles do not load.


## Personal places map — 2026-09-29

The earlier institution-pin map above is historical. The visible map now uses `website/places.mjs`: all pins refer to a city or larger area, and every location has its own pin with no clustering or travel-route lines. The owner supplied the new place list in this conversation and confirmed 三杯酒 / Boundary as Beijing venues. These names are memory entries, not geocoded venue locations. The UK is a country-level point, Fujian a province-level point; neither substitutes a specific town. Other coordinates are approximate city identifiers in WGS-84, not precise visit evidence.

Geographical cross-checks: [UNGEGN Guiyang](https://ungegn.un.org/dashboard/cities/details?id=2054), [Ruijin coordinate record](https://www.wikidata.org/wiki/Q1025459), [Shenyang geographic extent](https://en.wikipedia.org/wiki/Shenyang), [Hangzhou and Shanghai reference coordinates](https://aaqr.org/articles/aaqr-17-10-maps-0368_suppl.pdf), [Fujian geographical overview](https://fdi.mofcom.gov.cn/resource/pdf/2020/03/01/7adc29fb436244e7bd5467e3e872ad28.pdf). UK/Fujian pins are deliberately approximate area identifiers.

City index buttons remain available when tiles fail. Clicking a map pin preserves the map scale and opens one city note; it does not imply a precise location within that city. Reduced motion disables paper development and drawer motion.
