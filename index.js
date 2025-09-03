import { TOKEN } from "./config.js";
import wialonSDK from "./src/API/wialon/sdk/wialonSDK.js";
import { Footer } from "./src/componets/Footer/Footer.js";
import { createSectionsUnits} from "./src/componets/Units/Units.js";
import { unitSectionDetails, createSectionDetailsUnit } from "./src/componets/Units/UnitsSecion.js";
import { getLocationsOfUnits, colapseSectionUnit  } from "./src/utils/utils.js";
import { initMap, flyCameraToByUnit } from "./src/API/google_maps/google_maps.js";

window.flyCameraToByUnit = flyCameraToByUnit;
window.unitSectionDetails = unitSectionDetails;
window.colapseSectionUnit = colapseSectionUnit;

let locations_of_the_units = [];

async function iniciarWialon(token) {
  const session = await wialonSDK.init(token);         
  const units = session.getItems('avl_unit');

  locations_of_the_units = getLocationsOfUnits(units);

  const google_maps = await initMap( locations_of_the_units );
  
  $("body").append( google_maps );
  $("body").append( createSectionsUnits( units ) );
  $("body").append( createSectionDetailsUnit() );
  $("body").append( Footer() );

}

iniciarWialon(TOKEN);
