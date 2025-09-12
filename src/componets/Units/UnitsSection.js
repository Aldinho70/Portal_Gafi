import { URI } from "../../../config.js";

$( () => {
  $("body").append( `
    <div id="right-panel" class="closed">
        <button id="close-right-panel-btn" onClick="(colapseSectionUnit())" class="btn btn-danger position-absolute top-2 translate-middle-y ms-2 z-3 visually-hidden" style="left: -125px; top: 18px;">
          Cerrar panel.
        </button>
        
        <div class="panel-content" style="width: 100%;height: 100%; border-radius: 150px">
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
  const _URI = (window.location.hostname === "ws4cjdg.com") ? URI.URI_PRODUCCION : URI.URI_DEV;
  $("#iframeDetailsUnit").attr("src", `${_URI}?idUnit=${unit}`);
  $("#right-panel").removeClass("closed");
  $("#close-right-panel-btn").removeClass("visually-hidden");
}