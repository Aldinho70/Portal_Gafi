import wialonSDK from "./src/API/wialon/sdk/wialonSDK.js";

let officeLocations = [];

const TOKEN = "733a7307cd0dd55c139f57fcaa9269d33033EF2588751D51ECB53AA291A5B6501EF5426B";

async function iniciarWialon(token) {
  const session = await wialonSDK.init(token);         
  const units = session.getItems('avl_unit');

  // Transformar units a officeLocations
  officeLocations = units.map(unit => {
    // console.log(unit.getIconUrl(64));
    // const url = unit.getIconUrl(64);
    const pos = unit.getPosition();
    const { x, y, z } = pos;
    return {
      name: unit.getName(),
      id: unit.getId(),
      camera: {
        center: { lat: y, lng: x, altitude: z  },
        range: 200,
        tilt: 45,
        heading: 0,
      },
      point: { lat: y, lng: x, altitude: z },
      pin: {
        background: "white",
        glyph:  new URL('https://images.vexels.com/media/users/3/239035/isolated/preview/30f14f21c3cc0a12edd11f2876c6fa90-camion-3.png'),
        // glyph:  new URL(url),
        scale: 2.0,
      }
    };
  });

  // Ahora sí inicializamos el mapa
  initMap();
}

/* Google Maps */
let map3D = null;

const mexicoCamera = {
  center: { lat: 24.25459353020009, lng: -101.6559865211694, altitude: 3287 },
  range: 3459229,
  tilt: 3,
  heading: 3.5,
};

async function initMap() {
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

// Iniciar todo
iniciarWialon(TOKEN);
