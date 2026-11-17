// =====================================================
// 1. THE MAP
// Interaction is switched off so scrolling the page doesn't fight with
// scrolling the map. The full interactive map lives on index.html.
// =====================================================

const map = L.map('map', {
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    touchZoom: false
}).setView([55.9533, -3.1883], 11);

// Basemap: standard OpenStreetMap tiles (no API key needed).
// styles.css softens the colours so our data stands out.
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    keepBuffer: 6,            // keep more tiles around the view, so less blank map while flying
    updateWhenZooming: false  // fetch tiles when the zoom settles, not during it
}).addTo(map);

// The ring that highlights the place a step is talking about
const highlight = L.circleMarker([0, 0], {
    radius: 16,
    color: '#b8651b',
    weight: 3,
    fillColor: '#b8651b',
    fillOpacity: 0.25
});


// =====================================================
// 2. DATA LAYERS (empty for now)
// Later we will fill this in, e.g.
//   dataLayers.traffic = L.geoJSON(trafficData, { ... });
// The names must match the data-layers="..." words in index.html:
//   no2, traffic, greenspace, deprivation
// =====================================================

const dataLayers = {};

function showLayers(names) {
    Object.keys(dataLayers).forEach(function (key) {
        const layer = dataLayers[key];
        if (names.includes(key)) {
            if (!map.hasLayer(layer)) layer.addTo(map);
        } else if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    });
}


// =====================================================
// 3. SCROLLYTELLING
// When a step reaches the middle of the screen, the map flies to it.
// =====================================================

const steps = document.querySelectorAll('.step');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Move the map so the place sits beside the text card, not underneath it
function flyToOffset(lat, lng, zoom) {
    const wide = window.innerWidth > 800;
    const offsetX = wide ? 220 : 0;    // desktop: push place to the right of the card
    const offsetY = wide ? 0 : 120;    // mobile: push place into the top half
    const point = map.project([lat, lng], zoom).add([-offsetX, offsetY]);
    const target = map.unproject(point, zoom);

    if (reduceMotion) {
        map.setView(target, zoom, { animate: false });
    } else {
        // Longer trips and bigger zoom changes get a longer, gentler flight
        const distance = map.getCenter().distanceTo(target);   // metres
        const zoomChange = Math.abs(map.getZoom() - zoom);
        const duration = Math.min(3, 1.4 + distance / 6000 + zoomChange * 0.15);
        map.flyTo(target, zoom, { duration: duration, easeLinearity: 0.2 });
    }
}

function goToStep(step) {
    steps.forEach(function (s) {
        s.classList.toggle('is-active', s === step);
    });

    const lat = parseFloat(step.dataset.lat);
    const lng = parseFloat(step.dataset.lng);
    const zoom = parseFloat(step.dataset.zoom);
    flyToOffset(lat, lng, zoom);

    if (step.dataset.marker === 'true') {
        highlight.setLatLng([lat, lng]);
        if (!map.hasLayer(highlight)) highlight.addTo(map);
    } else {
        map.removeLayer(highlight);
    }

    showLayers((step.dataset.layers || '').split(' ').filter(Boolean));
}

// Watch for a step crossing the middle line of the screen.
// The map only starts flying once scrolling pauses for a moment, so fast
// scrolling doesn't trigger a pile-up of half-finished flights.
let currentStep = null;
let flyTimer = null;

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const step = entry.target;
        steps.forEach(function (s) {
            s.classList.toggle('is-active', s === step);
        });

        clearTimeout(flyTimer);
        flyTimer = setTimeout(function () {
            if (step !== currentStep) {
                currentStep = step;
                goToStep(step);
            }
        }, 200);
    });
}, { rootMargin: '-50% 0px -50% 0px' });

steps.forEach(function (step) {
    observer.observe(step);
});

// Position the map for the first step straight away
currentStep = steps[0];
goToStep(steps[0]);


// =====================================================
// 4. PROGRESS BAR
// =====================================================

const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', function () {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
}, { passive: true });
