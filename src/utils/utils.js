import { resetMap } from "../API/google_maps/google_maps.js";

export const getLocationsOfUnits = (units) => {
  return units.map(unit => {
    const pos = unit.getPosition();
    const { x, y, z } = pos;

    return {
      name: unit.getName(),
      id: unit.getId(),
      camera: {
        center: { lat: y, lng: x, altitude: z },
        range: 200,
        tilt: 45,
        heading: 0,
      },
      point: { lat: y, lng: x, altitude: z },
      pin: {
        background: "white",
        glyph: new URL('https://images.vexels.com/media/users/3/239035/isolated/preview/30f14f21c3cc0a12edd11f2876c6fa90-camion-3.png'),
        scale: 2.0,
      }
    };
  });
}

export const colapseSectionUnit = () => {
  $("#close-right-panel-btn").addClass("visually-hidden");
  $("#right-panel").addClass("closed");
  resetMap();
}
