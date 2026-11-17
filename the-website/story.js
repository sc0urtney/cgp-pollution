// =====================================================
// 1. THE MAP
// Interaction is switched off so scrolling the page doesn't fight with
// scrolling the map. The full interactive map lives on index.html.
// =====================================================

const map = L.map('map', {
    zoomControl: false,
    zoomSnap: 0,          // allow in-between zoom levels, needed for smooth scroll-driven zooming
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
// 3. SCROLLYTELLING (scroll-driven camera)
// The map is tied directly to the scrollbar: as you scroll from one card
// to the next, the map glides from the first place to the second.
// Scroll back and it glides back. Near each card the map "holds" still.
// =====================================================

const steps = Array.from(document.querySelectorAll('.step'));
// If the visitor's device asks for reduced motion we skip the zoom-out flourish,
// but the map still follows the scrollbar (the visitor controls the movement).
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Read each step's place from its data- attributes
const stops = steps.map(function (step) {
    return {
        lat: parseFloat(step.dataset.lat),
        lng: parseFloat(step.dataset.lng),
        zoom: parseFloat(step.dataset.zoom)
    };
});

// Where is the middle of each step on the page? (re-measured on resize)
let centres = [];
function measure() {
    centres = steps.map(function (step) {
        const box = step.getBoundingClientRect();
        return window.scrollY + box.top + box.height / 2;
    });
}

function smoothstep(x) {
    return x * x * (3 - 2 * x);
}

// Draw the map for the current scroll position
let activeIndex = -1;
function update() {
    if (!centres.length) return;

    const ref = window.scrollY + window.innerHeight / 2;   // the line across the middle of the screen

    // Which two steps are we between, and how far along (0 to 1)?
    let i = 0;
    while (i < centres.length - 2 && ref > centres[i + 1]) i++;
    let t = (ref - centres[i]) / (centres[i + 1] - centres[i]);
    t = Math.max(0, Math.min(1, t));

    // Hold still near each card, travel during the middle of the gap
    t = smoothstep(Math.max(0, Math.min(1, (t - 0.2) / 0.6)));

    const a = stops[i];
    const b = stops[i + 1];

    // Blend the place and the zoom
    const lat = a.lat + (b.lat - a.lat) * t;
    const lng = a.lng + (b.lng - a.lng) * t;
    let zoom = a.zoom + (b.zoom - a.zoom) * t;

    // On long trips, zoom out a little mid-journey, then back in (a "fly" feel)
    const distance = L.latLng(a.lat, a.lng).distanceTo([b.lat, b.lng]);   // metres
    const arc = reduceMotion ? 0 : Math.min(1.8, distance / 5000);
    zoom -= arc * Math.sin(Math.PI * t);

    // Keep the place beside the text card, not underneath it
    const wide = window.innerWidth > 800;
    const offsetX = wide ? 220 : 0;
    const offsetY = wide ? 0 : 120;
    const point = map.project([lat, lng], zoom).add([-offsetX, offsetY]);
    map.setView(map.unproject(point, zoom), zoom, { animate: false });

    // Switch highlight ring and layers when we pass the halfway point
    const nearest = t < 0.5 ? i : i + 1;
    if (nearest !== activeIndex) {
        activeIndex = nearest;
        showStep(nearest);
    }
}

function showStep(index) {
    const step = steps[index];
    steps.forEach(function (s) {
        s.classList.toggle('is-active', s === step);
    });

    if (step.dataset.marker === 'true') {
        highlight.setLatLng([stops[index].lat, stops[index].lng]);
        if (!map.hasLayer(highlight)) highlight.addTo(map);
    } else {
        map.removeLayer(highlight);
    }

    showLayers((step.dataset.layers || '').split(' ').filter(Boolean));
}

// Run update() smoothly, at most once per screen refresh
let ticking = false;
function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
        ticking = false;
        update();
    });
}

window.addEventListener('scroll', requestUpdate, { passive: true });
window.addEventListener('resize', function () {
    measure();
    requestUpdate();
});
window.addEventListener('load', function () {
    measure();
    update();
});

measure();
update();


// =====================================================
// 4. PROGRESS BAR
// =====================================================

const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', function () {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
}, { passive: true });
