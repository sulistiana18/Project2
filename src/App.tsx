import React, { useEffect } from "react";

declare global {
  interface Window {
    initAutocomplete: () => void;
  }
}

function loadGoogleMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (typeof window !== "undefined" && (window as any).google?.maps) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src^="https://maps.googleapis.com/maps/api/js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Google Maps failed to load.")),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBPy_1P3mgTXSUSlcQe30Eqb8J_tMmn_Ig&libraries=places&v=weekly";
    script.async = true;
    script.defer = true;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps failed to load."));

    document.head.appendChild(script);
  });
}

function initAutocomplete() {
  if (!(window as any).google?.maps) return;

  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: 1.47483, lng: 124.842079 },
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

const App: React.FC = () => {
  useEffect(() => {
    let cancelled = false;

    window.initAutocomplete = initAutocomplete;

    loadGoogleMapsScript()
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
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        INOVASI PERCEPATAN PASANG BARU
      </h2>
      <h3 style={{ textAlign: "center", marginBottom: 20 }}>Form Pemesanan</h3>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="nama">Nama Permohonan Pelanggan</label>
          <input
            type="text"
            id="nama"
            placeholder="Masukkan nama pelanggan..."
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="agenda">No Agenda</label>
          <input
            type="text"
            id="agenda"
            placeholder="Masukkan Nomor Induk Kependudukan..."
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="alamat">Alamat</label>
          <textarea
            id="alamat"
            placeholder="Masukkan alamat lengkap..."
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="Daya">Daya</label>
          <input
            type="text"
            id="Daya"
            placeholder="Masukkan besarnya daya"
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="Fasa">Fasa</label>
          <input
            type="text"
            id="Fasa"
            placeholder="Masukkan Fasa"
            autoComplete="off"
          />
        </div>
      </div>

      <input
        id="pac-input"
        className="controls"
        type="text"
        placeholder="Search lokasi..."
      />

      <div id="map" />

      <div id="latlngResult">
        <p>
          <strong>Latitude:</strong> <span id="latDisplay">-</span>
        </p>
        <p>
          <strong>Longitude:</strong> <span id="lngDisplay">-</span>
        </p>
      </div>

      <input type="hidden" id="lat" />
      <input type="hidden" id="lng" />

      <button className="btn-submit">Simpan Data</button>
    </div>
  );
};

export default App;


