let map3D = null;

const mexicoCamera = {
  center: { lat: 24.25459353020009, lng: -101.6559865211694, altitude: 3287 },
  range: 3459229,
  tilt: 3,
  heading: 3.5,
};

const officeLocations = [
  {
    name: "Jornada Digital",
    camera: {
      center: { lat: 25.51236429813362, lng: -103.4054206780309, altitude: 1121 },
      range: 178,
      tilt: 57.5,
      heading: -17,
    },
    point: { lat: 25.51236429813362, lng: -103.4054206780309, altitude: 1121 },
    pin: {
      background: "white",
      glyph: "https://images.vexels.com/media/users/3/239035/isolated/preview/30f14f21c3cc0a12edd11f2876c6fa90-camion-3.png",
      scale: 1.0,
    },
  },
  
];

async function init() {
  const { Map3DElement, MapMode, Marker3DInteractiveElement } =
    await google.maps.importLibrary("maps3d");
  const { PinElement } = await google.maps.importLibrary("marker");

  // Crear mapa
  map3D = new Map3DElement({
    ...mexicoCamera,
    mode: MapMode.SATELLITE,
  });

  // Añadir markers
  officeLocations.forEach((office) => {
    const marker = new Marker3DInteractiveElement({
      position: office.point,
      label: office.name,
      altitudeMode: "ABSOLUTE",
      extruded: true,
    });

    marker.addEventListener("gmp-click", () => {
      map3D.flyCameraTo({
        endCamera: office.camera,
        durationMillis: 5000,
      });
    });

    const markerPin = new PinElement(office.pin);
    marker.append(markerPin);

    map3D.append(marker);
  });

  document.body.append(map3D);
}

// Inicializar al cargar
init();
