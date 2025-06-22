// Initialize the map centered over NYC
const map = L.map('map').setView([40.7128, -74.0060], 11);

// Add tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Function to add markers
let markers = [];

function updateMap() {
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  const styleFilter = document.getElementById('styleFilter').value;
  const priceFilter = document.getElementById('priceFilter').value;

  thriftStores.forEach(store => {
    const matchesStyle = !styleFilter || store.Style === styleFilter;
    const matchesPrice = !priceFilter || store["Price Range"] === priceFilter;

    if (matchesStyle && matchesPrice) {
      const popupContent = `
        <strong>${store["Store Name"]}</strong><br/>
        ${store.Address}<br/>
        <em>${store.Notes || ''}</em><br/>
        Style: ${store.Style}<br/>
        Price: ${store["Price Range"]}
      `;

      const marker = L.marker([store.lat, store.lon])
        .addTo(map)
        .bindPopup(popupContent);

      markers.push(marker);
    }
  });
}

// Initialize map on load
updateMap();

// Re-filter markers on change
document.getElementById('styleFilter').addEventListener('change', updateMap);
document.getElementById('priceFilter').addEventListener('change', updateMap);
