$(() => {
    $("body").append( `
        <div id="left-panel">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-all-units-tab" data-bs-toggle="tab" data-bs-target="#nav-all-units" type="button" role="tab" aria-controls="nav-all-units" aria-selected="true">
                        Todas las unidades
                    </button>
                    <button class="nav-link" id="nav-groups-tab" data-bs-toggle="tab" data-bs-target="#nav-groups" type="button" role="tab" aria-controls="nav-groups" aria-selected="false">
                        Grupos
                    </button>
                </div>
            </nav>

            <div class="tab-content " id="nav-tabContent" ></div>
        </div>
    `);
})

export const createSectionsUnits = (units) => {
    let html_element = ``
    units.forEach(unit => {
        const unitName = unit.getName();
        const unitId = unit.getId();
        const unitIconUrl = unit.getIconUrl(32);
        const unitPosition = unit.getPosition();
        const altitude = (unitPosition.z == 0) ? 1500 : unitPosition.z;
        const { y, x, } = unitPosition;

        html_element += `<li class="list-group-item" onClick="(flyCameraToByUnit(${y}, ${x}, ${altitude}), unitSectionDetails(${unitId}) )"> <img src="${unitIconUrl}" class="img-fluid" alt="icon"> ${unitName}</li>`
    })

    $("#nav-tabContent").append(`
        <div class="tab-pane fade show active" id="nav-all-units" role="tabpanel" aria-labelledby="nav-all-units-tab">
            <ul class="list-group list-group-flush">
                ${html_element}
            </ul>
        </div>
    `);
}

export const createSectionsUnitsPerGroups = ( _groups ) => {
    let html_element = ``;
    for (const key in _groups) {

        if (Object.prototype.hasOwnProperty.call(_groups, key)) {
        const _grupo = _groups[key];
        html_element += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseGroup${_grupo.info.nameGroup.replaceAll(" ", "_")}" aria-expanded="true" aria-controls="collapseGroup${_grupo.info.nameGroup.replaceAll(" ", "_")}">
                        <div class="d-flex flex-row align-items-center gap-2" >
                            <img src="${_grupo.info.icon}" class="img-fluid" alt="icon-group">
                            ${_grupo.info.nameGroup}
                        </div>
                    </button>
                </h2>
                <div id="collapseGroup${_grupo.info.nameGroup.replaceAll(" ", "_")}" class="accordion-collapse collapse " data-bs-parent="#accordionGroups">
                    <div class="accordion-body">
                        <ul class="list-group list-group-flush">
                            ${createHTMLUnitsByGroup( _grupo.unidades )}
                        </ul>
                    </div>
                </div>
            </div>`
        }
    }

    $("#nav-tabContent").append(`
        <div class="tab-pane fade" id="nav-groups" role="tabpanel" aria-labelledby="nav-groups-tab">
            <div class="accordion" id="accordionGroups">
                ${html_element}
            </div>
        </div>`
    )
    return `Niggas in paris`
}

const createHTMLUnitsByGroup = ( units ) => {
    let html_element = ``;
    for (const key in units) {
        if (Object.prototype.hasOwnProperty.call(units, key)) {
            const _unit = units[key];
            const unit_root = _unit.root;
            const unitName = unit_root.getName();
            const unitId = unit_root.getId();
            const unitIconUrl = unit_root.getIconUrl(32);
            const unitPosition = unit_root.getPosition();
            const altitude = (unitPosition.z == 0) ? 1500 : unitPosition.z;
            const { y, x, } = unitPosition;
            
            html_element += `<li class="list-group-item" onClick="(flyCameraToByUnit(${y}, ${x}, ${altitude}), unitSectionDetails(${unitId}) )"> <img src="${unitIconUrl}" class="img-fluid" alt="icon"> ${unitName}</li>`
        }
    }
    return html_element;
}