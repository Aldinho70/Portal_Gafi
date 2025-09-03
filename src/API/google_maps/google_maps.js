let map3D = null;

const mexico_google_maps = {
  center: { lat: 24.25459353020009, lng: -101.6559865211694, altitude: 3287 },
  range: 3459229,
  tilt: 3,
  heading: 3.5,
};

export async function initMap( locations ) {
  const { Map3DElement, MapMode, Marker3DInteractiveElement } = await google.maps.importLibrary("maps3d");
  const { PinElement } = await google.maps.importLibrary("marker");

  // Crear mapa
  map3D = new Map3DElement({
    ...mexico_google_maps,
    mode: MapMode.SATELLITE,
  });

  // Añadir markers
  locations.forEach((office) => {
    const marker = new Marker3DInteractiveElement({
      position: office.point,
      label: office.name,
      altitudeMode: "ABSOLUTE",
      extruded: true,
    });

    marker.addEventListener("gmp-click", (event) => {

      console.log('You clicked on : ' + event.target.label);
      event.stopPropagation();
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