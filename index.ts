/**
 * @license
 * Copyright …
 * SPDX-License-Identifier: Apache-2.0
 */
// @ts-nocheck

function initAutocomplete() {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: 1.474830, lng: 124.842079 },
      zoom: 13,
      mapTypeId: "roadmap",
    }
  );

  const input = document.getElementById("pac-input") as HTMLInputElement;
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
  });

  let markers: google.maps.Marker[] = [];

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (!places || places.length === 0) return;

    // Hapus marker lama
    markers.forEach((marker) => marker.setMap(null));
    markers = [];

    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) return;

      // --- Ambil LAT & LNG ---
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      console.log("Latitude:", lat, "Longitude:", lng);

      // --- Tampilkan di HTML di bawah map ---
      const latDisplay = document.getElementById("latDisplay");
      const lngDisplay = document.getElementById("lngDisplay");
      if (latDisplay) latDisplay.textContent = lat.toFixed(6);
      if (lngDisplay) lngDisplay.textContent = lng.toFixed(6);

      // --- Masukkan ke input hidden untuk submit ke DB ---
      const latInput = document.getElementById("lat") as HTMLInputElement;
      const lngInput = document.getElementById("lng") as HTMLInputElement;
      if (latInput && lngInput) {
        latInput.value = lat.toString();
        lngInput.value = lng.toString();
      }

      // --- Buat marker di map ---
      const marker = new google.maps.Marker({
        map,
        title: place.name,
        position: place.geometry.location,
      });
      markers.push(marker);

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);
  });
}

declare global {
  interface Window {
    initAutocomplete: () => void;
  }
}
window.initAutocomplete = initAutocomplete;
export {};
