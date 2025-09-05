import { URI } from "../../../config.js";

$( () => {
  $("body").append( `
    <div id="right-panel" class="closed">
        <div class="panel-header">
            <button id="close-right-panel-btn" onClick="(colapseSectionUnit())"class="btn btn-sm btn-danger">Cerrar</button>
        </div>
        <div class="panel-content" style="width: 100%;height: 95%;">
          <iframe
            id="iframeDetailsUnit"
            title="Inline Frame Example"
            width="100%"
            height="100%"
            src="http://ws4cjdg.com/RendimientoGafi.com/index.html">
          </iframe>
        </div>
    </div>` 
  );
} )

export const unitSectionDetails = ( unit ) => {
  const _URI = (window.location.hostname === "127.0.0.1") ? URI.URI_DEV : URI.URI_PRODUCCION;
  $("#iframeDetailsUnit").attr("src", `${_URI}?idUnit=${unit}`);
  $("#right-panel").removeClass("closed");
}

// export const createSectionDetailsUnit = (  ) => {
//   return `
//     <div id="right-panel" class="closed">
//         <div class="panel-header">
//             <button id="close-right-panel-btn" onClick="(colapseSectionUnit())"class="btn btn-sm btn-danger">Cerrar</button>
//         </div>
//         <div class="panel-content" style="width: 100%;height: 95%;">
//           <iframe
//             id="iframeDetailsUnit"
//             title="Inline Frame Example"
//             width="100%"
//             height="100%"
//             src="http://ws4cjdg.com/RendimientoGafi.com/index.html">
//           </iframe>
//         </div>
//     </div>`
// }