import { TOKEN } from "./config.js";
import wialonSDK from "./src/API/wialon/sdk/wialonSDK.js";
import { getLocationsOfUnits } from "./src/utils/utils.js";
import { initMap } from "./src/API/google_maps/google_maps.js";

let locations_of_the_units = [];

async function iniciarWialon(token) {
  const session = await wialonSDK.init(token);         
  const units = session.getItems('avl_unit');

  locations_of_the_units = getLocationsOfUnits(units);

  initMap( locations_of_the_units );
}

iniciarWialon(TOKEN);
