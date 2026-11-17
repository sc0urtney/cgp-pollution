#!/usr/bin/env python3

import geopandas as gpd
import pandas as pd
import cgi
import cgitb

# Get the parameter from the web URL or set to 0.001
form = cgi.FieldStorage()
distance = float(form.getfirst("distance", "0.001"))

# Gete data from orcale!
import oracledb

credentials = open("../../credentials.txt").read().strip()
conn = oracledb.connect(credentials,config_dir="/etc/")
c = conn.cursor()
c.execute("SELECT * FROM CGP_SENSOR_SITES")

for row in c:
    print(row[0])


sensors = pd.read_sql("SELECT * FROM CGP_TRAFFIC", con=conn)
sensors_gdf = gpd.GeoDataFrame(sensors,
    geometry=gpd.points_from_xy(sensors['easting'], sensors['northing']),
    crs="EPSG:27700")

# conver to geojson for output
sensors_geojson = sensors_gdf.to_json()

conn.close()

# Now output HTTP header and HTML with a leaflet map embedded
print("Content-Type: text/html\n")

html = f"""<!DOCTYPE html>
<html>
<head>
  <title>Overlay Map</title>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""
  >
  <style>
    html, body {{
        height: 100%;
            margin: 0;
            padding: 0;
            }}
            #map {{
            width: 100%;
            height: 100%;
            }}
    </style>
</head>
<body>
<div id="map"></div>

<script
    src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin="">
</script>
<script>
    // Embed GeoJSON directly from the CGI script
    var tramData = {geojson_str};

    // Create the map
    var map = L.map('map');

    // Base tiles
    L.tileLayer('https://{{s}}.tile.openstreetmap.org/{{z}}/{{x}}/{{y}}.png', {{
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }}).addTo(map);

      // Fit map to tram data
    if (layer.getBounds().isValid()) {{
        map.fitBounds(layer.getBounds());
    }} else {{
        map.setView([0, 0], 2);  // fallback if no valid geometry
    }}
</script>
</body>
</html>
"""

print(html)

