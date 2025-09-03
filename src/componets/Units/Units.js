export const createSectionsUnits = ( units ) => {
    let html_element = ``
    units.forEach( unit => {
        const unitName = unit.getName();
        const unitId = unit.getId();
        const unitIconUrl = unit.getIconUrl(32); 
        const unitPosition = unit.getPosition();
        const altitude = (unitPosition.z == 0) ? 1500 : unitPosition.z;
        const { y, x,} = unitPosition;

        html_element += `<li class="list-group-item" onClick="(flyCameraToByUnit(${y}, ${x}, ${altitude}), unitSectionDetails(${unitId}) )"> <img src="${unitIconUrl}" class="img-fluid" alt="icon"> ${unitName}</li>`
    })

    return `
        <div id="left-panel">
            <ul class="list-group list-group-flush">
                ${html_element}
            </ul>
        </div>
    `;
}