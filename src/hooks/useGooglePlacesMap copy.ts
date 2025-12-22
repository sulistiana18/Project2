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

      const map = new google.maps.Map(
        document.getElementById(mapElementId) as HTMLElement,
        {
          center: { lat: 1.47483, lng: 124.842079 },
          zoom: 13,
          mapTypeId: "roadmap",
        }
      );

      const input = document.getElementById(searchInputId) as HTMLInputElement;
      const searchBox = new google.maps.places.SearchBox(input);

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
      });

      let markers: google.maps.Marker[] = [];

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (!places || places.length === 0) return;

        markers.forEach((marker) => marker.setMap(null));
        markers = [];

        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) return;

          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          console.log("Latitude:", lat, "Longitude:", lng);

          const latDisplay = document.getElementById(latDisplayId);
          const lngDisplay = document.getElementById(lngDisplayId);
          if (latDisplay) latDisplay.textContent = lat.toFixed(6);
          if (lngDisplay) lngDisplay.textContent = lng.toFixed(6);

          const latInput = document.getElementById(latInputId) as
            | HTMLInputElement
            | null;
          const lngInput = document.getElementById(lngInputId) as
            | HTMLInputElement
            | null;
          if (latInput && lngInput) {
            latInput.value = lat.toString();
            lngInput.value = lng.toString();
          }

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

    let cancelled = false;
    window.initAutocomplete = initAutocomplete;

    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (!cancelled) {
          initAutocomplete();
        }
      })
      .catch((err) => {
        console.error(err);
      });

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


