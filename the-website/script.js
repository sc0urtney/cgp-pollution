// =====================================================
// 1. THE MAP
// Interaction is switched off during the story so scrolling the page
// doesn't fight with scrolling the map. It is switched on in explore mode.
// =====================================================

const interactions = ['dragging', 'scrollWheelZoom', 'doubleClickZoom', 'boxZoom', 'keyboard', 'touchZoom'];

const map = L.map('map', {
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    touchZoom: false
}).setView([55.9533, -3.1883], 11);

// A muted basemap so our data stands out
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

const zoomControl = L.control.zoom({ position: 'topright' });

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
        map.flyTo(target, zoom, { duration: 1.6 });
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

// Watch for a step crossing the middle line of the screen
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) goToStep(entry.target);
    });
}, { rootMargin: '-50% 0px -50% 0px' });

steps.forEach(function (step) {
    observer.observe(step);
});

// Position the map for the first step straight away
goToStep(steps[0]);


// =====================================================
// 4. PROGRESS BAR
// =====================================================

const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', function () {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
}, { passive: true });


// =====================================================
// 5. FREE-EXPLORE MODE
// =====================================================

const panel = document.getElementById('explore-panel');

function enterExplore() {
    document.body.classList.add('exploring');
    panel.hidden = false;
    interactions.forEach(function (name) { map[name].enable(); });
    zoomControl.addTo(map);
    map.removeLayer(highlight);
    showLayers(Object.keys(dataLayers));
}

function exitExplore() {
    document.body.classList.remove('exploring');
    panel.hidden = true;
    interactions.forEach(function (name) { map[name].disable(); });
    map.removeControl(zoomControl);
    window.scrollTo({ top: 0, behavior: 'instant' });
    goToStep(steps[0]);
}

document.getElementById('explore').addEventListener('click', enterExplore);
document.getElementById('skip').addEventListener('click', enterExplore);
document.getElementById('back').addEventListener('click', exitExplore);
