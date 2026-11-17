
// Initialize map
const map = L.map("map").setView([55.9533, -3.1883], 12);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19
    }
).addTo(map);

// Store loaded layers
const layers = {};

// Show feature information in sidebar
function showFeatureInfo(properties) {
    const panel = document.getElementById("feature-info");
    panel.replaceChildren();

    for (const [key, value] of Object.entries(properties || {})) {
        const row = document.createElement("div");
        row.className = "feature-row";

        const label = document.createElement("strong");
        label.textContent = key + ": ";

        row.appendChild(label);
        row.appendChild(
            document.createTextNode(String(value ?? "N/A"))
        );

        panel.appendChild(row);
    }
}

// Load GeoJSON
async function loadLayer(path, name, color, countId, toggleId) {
    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${path}`);
        }

        const data = await response.json();

        const layer = L.geoJSON(data, {
            style: {
                color: color,
                weight: name === "traffic" ? 3 : 1,
                fillColor: color,
                fillOpacity: 0.5
            },

            pointToLayer: (feature, latlng) =>
                L.circleMarker(latlng, {
                    radius: 6,
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.8
                }),

            onEachFeature: (feature, featureLayer) => {
                featureLayer.on("click", () => {
                    showFeatureInfo(feature.properties);
                });
            }
        });

        layers[name] = layer;

        const toggle = document.getElementById(toggleId);

        if (toggle.checked) {
            layer.addTo(map);
        }

        toggle.addEventListener("change", () => {
            if (toggle.checked) {
                layer.addTo(map);
            } else {
                map.removeLayer(layer);
            }
        });

        document.getElementById(countId).textContent =
            layer.getLayers().length.toLocaleString();

        console.log(
            `${name} loaded: ${layer.getLayers().length} features`
        );

    } catch (error) {
        console.error(`Failed to load ${name}:`, error);
        document.getElementById(countId).textContent = "Error";
    }
}

// Green spaces
loadLayer(
    "data/greenspaces.geojson",
    "greenspaces",
    "#55a96b",
    "greenspace-count",
    "greenspaces-toggle"
);

// Traffic
loadLayer(
    "data/traffic.geojson",
    "traffic",
    "#e47732",
    "traffic-count",
    "traffic-toggle"
);
