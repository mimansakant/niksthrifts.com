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

  // Get selected filter values and convert to lowercase
  const styleFilter = document.getElementById('styleFilter').value.toLowerCase();
  const priceFilter = document.getElementById('priceFilter').value.toLowerCase();
  const sellingFilter = document.getElementById('sellingFilter').value.toLowerCase();
  const newThriftersFilter = document.getElementById('newThriftersFilter').value.toLowerCase();
  const itemsFilter = document.getElementById('itemsFilter').value.toLowerCase();
  const designerStoreFilter = document.getElementById('designerStoreFilter').value.toLowerCase();

  thriftStores.forEach(store => {
    const style = (store.STYLE || '').toLowerCase();
    const price = (store.PRICE || '').toLowerCase();
    const selling = (store["SELLING CLOTHES"] || '').toLowerCase();
    const newThrifters = (store["GOOD 4 NEW THRIFTERS"] || '').toLowerCase();
    const items = (store.ITEMS || '').toLowerCase();
    const designer = ((store["DESIGNER STORE "] || 'no') || '').toLowerCase();

    const matchesStyle = !styleFilter || style === styleFilter;
    const matchesPrice = !priceFilter || price === priceFilter;
    const matchesSelling = !sellingFilter || selling === sellingFilter;
    const matchesNewThrifters = !newThriftersFilter || newThrifters === newThriftersFilter;
    const matchesItems =
      !itemsFilter ||
      (itemsFilter === "tchotchkes/knickknacks/homegoods" &&
        (items.includes("tchotchkes") || items.includes("knickknacks") || items.includes("homegoods"))) ||
      (itemsFilter === "furniture" && (items.includes("furniture") || items.includes("furnature"))) ||
      items.includes(itemsFilter);

    const matchesDesigner = !designerStoreFilter || designer === designerStoreFilter;

    if (
      matchesStyle &&
      matchesPrice &&
      matchesSelling &&
      matchesNewThrifters &&
      matchesItems &&
      matchesDesigner
    ) {
      const popupContent = `
        <strong>${store.STORE}</strong><br/>
        ${store.ADDRESS}, ${store.City}, ${store.State}, ${store.Country}<br/>
        <em>${store["NIK'S NOTE"] || ''}</em><br/>
        Style: ${store.STYLE}<br/>
        Price: ${store.PRICE}<br/>
        Location: ${store.LOCATION}<br/>
        Items: ${store.ITEMS}<br/>
        Good for New Thrifters: ${store["GOOD 4 NEW THRIFTERS"]}<br/>
        Selling Clothes: ${store["SELLING CLOTHES"]}<br/>
        Designer Store: ${store["DESIGNER STORE "] || 'No'}
      `;

      const marker = L.marker([store.latitude, store.longitude])
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
document.getElementById('sellingFilter').addEventListener('change', updateMap);
document.getElementById('newThriftersFilter').addEventListener('change', updateMap);
document.getElementById('itemsFilter').addEventListener('change', updateMap);
document.getElementById('designerStoreFilter').addEventListener('change', updateMap);

