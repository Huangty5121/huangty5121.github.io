"""Derive the small About map from Natural Earth GeoJSON, without runtime map APIs.

Usage: python3 website/tools/derive-map.py 50m-land.geojson 10m-land.geojson 10m-populated-places-simple.geojson > website/map-geometry.mjs
Sources: https://github.com/nvkelso/natural-earth-vector/tree/master/geojson
Natural Earth data is public domain. The result is a static geographic locator,
not a route or a marker for any specific campus, workplace, or address.
"""

import json
import sys


OVERVIEW = (103.0, 19.0, 125.0, 43.0, 300.0, 330.0)
DELTA = (113.7, 22.0, 114.6, 22.9, 160.0, 200.0)


def clip_edge(points, inside, intersection):
    result = []
    for current, following in zip(points, points[1:] + points[:1]):
        current_inside, next_inside = inside(current), inside(following)
        if current_inside:
            result.append(current)
        if current_inside != next_inside:
            result.append(intersection(current, following))
    return result


def clipped_ring(points, box):
    west, south, east, north, _, _ = box
    points = [tuple(pair) for pair in points[:-1]]
    if not points:
        return []
    for axis, edge, positive in ((0, west, True), (0, east, False), (1, south, True), (1, north, False)):
        def inside(point):
            return point[axis] >= edge if positive else point[axis] <= edge

        def intersection(a, b):
            span = b[axis] - a[axis]
            fraction = (edge - a[axis]) / span if span else 0
            return (a[0] + fraction * (b[0] - a[0]), a[1] + fraction * (b[1] - a[1]))

        points = clip_edge(points, inside, intersection)
        if not points:
            return []
    return points


def project(point, box):
    west, south, east, north, width, height = box
    return ((point[0] - west) * width / (east - west), (north - point[1]) * height / (north - south))


def perpendicular_distance(point, start, finish):
    dx, dy = finish[0] - start[0], finish[1] - start[1]
    length_sq = dx * dx + dy * dy
    if not length_sq:
        return ((point[0] - start[0]) ** 2 + (point[1] - start[1]) ** 2) ** .5
    fraction = max(0, min(1, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / length_sq))
    return ((point[0] - start[0] - fraction * dx) ** 2 + (point[1] - start[1] - fraction * dy) ** 2) ** .5


def simplify(points, tolerance):
    if len(points) < 3:
        return points
    distances = [perpendicular_distance(point, points[0], points[-1]) for point in points[1:-1]]
    if not distances or max(distances) <= tolerance:
        return [points[0], points[-1]]
    index = distances.index(max(distances)) + 1
    return simplify(points[:index + 1], tolerance)[:-1] + simplify(points[index:], tolerance)


def area(points):
    return abs(sum(a[0] * b[1] - b[0] * a[1] for a, b in zip(points, points[1:] + points[:1]))) / 2


def land_path(filename, box, tolerance, min_area):
    data = json.load(open(filename, encoding='utf-8'))
    paths = []
    for feature in data['features']:
        geometry = feature['geometry']
        polygons = [geometry['coordinates']] if geometry['type'] == 'Polygon' else geometry['coordinates'] if geometry['type'] == 'MultiPolygon' else []
        for polygon in polygons:
            for ring in polygon:
                clipped = clipped_ring(ring, box)
                if len(clipped) < 3:
                    continue
                points = [project(point, box) for point in clipped]
                if area(points) < min_area:
                    continue
                points = simplify(points + points[:1], tolerance)[:-1]
                if len(points) < 3:
                    continue
                paths.append('M' + 'L'.join(f'{x:.1f},{y:.1f}' for x, y in points) + 'Z')
    return ''.join(paths)


def places(filename):
    data = json.load(open(filename, encoding='utf-8'))
    wanted = {'Beijing', 'Shenzhen', 'Hong Kong'}
    matches = {feature['properties'].get('name'): feature['geometry']['coordinates']
               for feature in data['features'] if feature['properties'].get('name') in wanted}
    if set(matches) != wanted:
        raise ValueError(f'Expected Natural Earth city points: {wanted - set(matches)}')
    return matches


if __name__ == '__main__':
    if len(sys.argv) != 4:
        raise SystemExit(__doc__)
    overview = land_path(sys.argv[1], OVERVIEW, .45, 1.0)
    delta = land_path(sys.argv[2], DELTA, .25, .35)
    city_points = places(sys.argv[3])
    result = {
        'overviewPath': overview,
        'deltaPath': delta,
        'cities': {
            name.lower().replace(' ', '-'): {
                'coordinates': coordinates,
                'overview': [round(value, 2) for value in project(coordinates, OVERVIEW)],
                'delta': [round(value, 2) for value in project(coordinates, DELTA)] if name != 'Beijing' else None,
            } for name, coordinates in city_points.items()
        },
    }
    print('// Derived from Natural Earth public-domain land and populated-place GeoJSON.')
    print('// Overview: 103–125°E, 19–43°N; Pearl River Delta: 113.7–114.6°E, 22–22.9°N.')
    print('export const mapGeometry = ' + json.dumps(result, ensure_ascii=False, separators=(',', ':')) + ';')
