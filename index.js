import { TOKEN } from "./config.js";
import wialonSDK from "./src/API/wialon/sdk/wialonSDK.js";
import { Footer } from "./src/componets/Footer/Footer.js";
import { unitSectionDetails } from "./src/componets/Units/UnitsSection.js";
import { getLocationsOfUnits, colapseSectionUnit  } from "./src/utils/utils.js";
import { initMap, flyCameraToByUnit } from "./src/API/google_maps/google_maps.js";
import { createSectionsUnits, createSectionsUnitsPerGroups} from "./src/componets/Units/Units.js";

import { getGrupos } from "./src/API/wialon/utils/getGroups.js";

window.flyCameraToByUnit = flyCameraToByUnit;
window.unitSectionDetails = unitSectionDetails;
window.colapseSectionUnit = colapseSectionUnit;

let _groups
let locations_of_the_units = [];

async function iniciarWialon(token) {
  const session = await wialonSDK.init(token);         
  const units = session.getItems('avl_unit');
  const groups = session.getItems('avl_unit_group');

  _groups = await getGrupos( groups );

  locations_of_the_units = getLocationsOfUnits(units);

  const google_maps = await initMap( locations_of_the_units );
  
  $("body").append( google_maps );
  $("body").append( createSectionsUnits( units ) );
  $("body").append( createSectionsUnitsPerGroups( _groups ) );
  $("body").append( Footer() );
}

iniciarWialon(TOKEN);
