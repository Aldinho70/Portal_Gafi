import { TOKEN } from "./config.js";
import wialonSDK from "./src/API/wialon/sdk/wialonSDK.js";
import { getLocationsOfUnits } from "./src/utils/utils.js";
import { initMap } from "./src/API/google_maps/google_maps.js";
import { Footer } from "./src/componets/Footer/Footer.js";

let locations_of_the_units = [];

async function iniciarWialon(token) {
  const session = await wialonSDK.init(token);         
  const units = session.getItems('avl_unit');

  locations_of_the_units = getLocationsOfUnits(units);

  const google_maps = await initMap( locations_of_the_units );
  
  $("body").append( google_maps );
  $("body").append( Footer() );

}

iniciarWialon(TOKEN);
