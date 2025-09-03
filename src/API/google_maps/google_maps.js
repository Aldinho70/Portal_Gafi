import { unitSectionDetails } from "../../componets/Units/UnitsSecion.js";

export let map3D = null;

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
      label: `${office.name}-${office.id} `,
      altitudeMode: "ABSOLUTE",
      extruded: true,
    });

    marker.addEventListener("gmp-click", (event) => {

      const partes = event.target.label.split("-");
      unitSectionDetails( partes[1] );
      event.stopPropagation();
      map3D.flyCameraTo({
        endCamera: office.camera,
        durationMillis: 5000,
      });
    });

    /* No borrar */
    // map3D.addEventListener('gmp-click', (event) => {
    //     console.log("camera: { center: { lat: " + map3D.center.lat + ", lng : " + map3D.center.lng + ", altitude: " + map3D.center.altitude + " }, range: " + map3D.range + ", tilt: " + map3D.tilt + " ,heading: " + map3D.heading + ", }");
    //     console.log("{ lat: " + event.position.lat + ", lng : " + event.position.lng + ", altitude: " + event.position.altitude + " }");
    //     map3D.stopCameraAnimation();
    // });

    const markerPin = new PinElement(office.pin);
    marker.append(markerPin);

    map3D.append(marker);
  });

  return map3D
}

export const flyCameraToByUnit = async ( lat, lng, altitude ) =>{
  map3D.flyCameraTo({
    endCamera: {
      center: { lat: lat, lng : lng, altitude: altitude },
      // center: { lat: 25.512436044681202, lng : -103.40546869247386, altitude: 1121.2403623597386 },
      range: 200,  // zoom aproximado
      tilt: 45,    // inclinación
      heading: 0,  // orientación
    },
    durationMillis: 5000, // animación de 2 segundos
  });
}

export const resetMap = () => {
  map3D.flyCameraTo({
    endCamera: mexico_google_maps,
    durationMillis: 3000, // 3 segundos de animación
  });
}