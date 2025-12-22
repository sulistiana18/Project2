import { useEffect } from "react";
import { loadGoogleMapsScript } from "../services/googleMapsService";

declare global {
  interface Window {
    initAutocomplete: () => void;
  }
}

interface UseGooglePlacesMapOptions {
  mapElementId?: string;
  searchInputId?: string;
  latDisplayId?: string;
  lngDisplayId?: string;
  latInputId?: string;
  lngInputId?: string;
}

export function useGooglePlacesMap(
  apiKey: string,
  {
    mapElementId = "map",
    searchInputId = "pac-input",
    latDisplayId = "latDisplay",
    lngDisplayId = "lngDisplay",
    latInputId = "lat",
    lngInputId = "lng",
  }: UseGooglePlacesMapOptions = {}
) {
  useEffect(() => {
    function initAutocomplete() {
      if (!(window as any).google?.maps) return;

      let initialLat = 1.47483;
      let initialLng = 124.842079;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            initialLat = position.coords.latitude;
            initialLng = position.coords.longitude;
            createMapAndSearchBox(initialLat, initialLng);
          },
          (error) => {
            console.warn("Gagal mendapatkan lokasi:", error.message);
            createMapAndSearchBox(initialLat, initialLng);
          }
        );
      } else {
        createMapAndSearchBox(initialLat, initialLng);
      }

      function createMapAndSearchBox(lat: number, lng: number) {
        const map = new google.maps.Map(
          document.getElementById(mapElementId) as HTMLElement,
          {
            center: { lat, lng },
            zoom: 13,
            mapTypeId: "roadmap",
          }
        );

        const input = document.getElementById(searchInputId) as HTMLInputElement;
        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // ===== Tombol Lokasi Saya (ikon) =====
        const locationButton = document.createElement("button");
        locationButton.textContent = "📍"; // pakai emoji sebagai ikon
        locationButton.title = "Lokasi Saya";
        locationButton.style.backgroundColor = "#fff";
        locationButton.style.border = "2px solid #2596be";
        locationButton.style.borderRadius = "4px";
        locationButton.style.padding = "6px";
        locationButton.style.margin = "10px";
        locationButton.style.cursor = "pointer";
        locationButton.style.fontSize = "18px";
        locationButton.style.lineHeight = "1";

        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);

        locationButton.addEventListener("click", () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                addMarker(pos);
                updateCoordinates(pos.lat(), pos.lng());
                map.setCenter(pos);
              },
              (err) => {
                alert("Gagal mendapatkan lokasi: " + err.message);
              }
            );
          } else {
            alert("Browser tidak mendukung geolocation.");
          }
        });

        map.addListener("bounds_changed", () => {
          searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
        });

        let markers: google.maps.Marker[] = [];

        const addMarker = (position: google.maps.LatLng) => {
          markers.forEach((m) => m.setMap(null));
          markers = [];

          const marker = new google.maps.Marker({
            map,
            position,
            draggable: true,
          });

          marker.addListener("dragend", () => {
            const newPos = marker.getPosition();
            if (newPos) updateCoordinates(newPos.lat(), newPos.lng());
          });

          markers.push(marker);
          map.setCenter(position);
        };

        const updateCoordinates = (lat: number, lng: number) => {
          const latDisplay = document.getElementById(latDisplayId);
          const lngDisplay = document.getElementById(lngDisplayId);
          if (latDisplay) latDisplay.textContent = lat.toFixed(6);
          if (lngDisplay) lngDisplay.textContent = lng.toFixed(6);

          const latInput = document.getElementById(latInputId) as HTMLInputElement | null;
          const lngInput = document.getElementById(lngInputId) as HTMLInputElement | null;
          if (latInput && lngInput) {
            latInput.value = lat.toString();
            lngInput.value = lng.toString();
          }
        };

        searchBox.addListener("places_changed", () => {
          const places = searchBox.getPlaces();
          if (!places || places.length === 0) return;

          const place = places[0];
          if (!place.geometry || !place.geometry.location) return;

          addMarker(place.geometry.location);
          updateCoordinates(place.geometry.location.lat(), place.geometry.location.lng());

          const bounds = new google.maps.LatLngBounds();
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
          map.fitBounds(bounds);
        });

        map.addListener("click", (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            addMarker(event.latLng);
            updateCoordinates(event.latLng.lat(), event.latLng.lng());
          }
        });

        // Marker awal di center
        addMarker(new google.maps.LatLng(lat, lng));
        updateCoordinates(lat, lng);
      }
    }

    let cancelled = false;
    window.initAutocomplete = initAutocomplete;

    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (!cancelled) initAutocomplete();
      })
      .catch((err) => console.error(err));

    return () => {
      cancelled = true;
    };
  }, [
    apiKey,
    latDisplayId,
    latInputId,
    lngDisplayId,
    lngInputId,
    mapElementId,
    searchInputId,
  ]);
}
