export const unitSectionDetails = ( unit ) => {
    console.log(unit);
    $("#iframeDetailsUnit").attr("src", `http://ws4cjdg.com/RendimientoGafi.com/index.html?idUnit=${unit}`);
    $("#right-panel").removeClass("closed");

}

export const createSectionDetailsUnit = (  ) => {
    return `<div id="right-panel" class="closed">
        <div class="panel-header">
            <h3>Información de consumos de combustible de 15 dias</h3>
            <button id="close-right-panel-btn" onClick="(colapseSectionUnit())"class="btn btn-sm btn-danger">Cerrar</button>
        </div>
        <div class="panel-content" style="width: 100%;height: 98%;">
          <iframe
            id="iframeDetailsUnit"
            title="Inline Frame Example"
            width="100%"
            height="100%"
            src="http://127.0.0.1:5501/index.html">
          </iframe>
        </div>
    </div>`
}

/* http://127.0.0.1:5501/index.html?idUnit=28776132&name=Gafi-516 */
/* http://ws4cjdg.com/RendimientoGafi.com/ */
/* http://ws4cjdg.com/RendimientoGafi.com/index.html?idUnit=28776132 */