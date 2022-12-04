function createAlert() {
    let alert = document.createElement("div");
    alert.innerHTML = [
        `<div class="alert alert-success alert-dismissible d-flex align-items-center" role="alert">`,
        `   <div>Nouveau contact ajouté</div>`,
        `   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
        `</div>`
    ].join('');
    return alert;
}

function displayAlert() {
    const alertPlaceholder = document.getElementById("alertPlaceholder");
    if (!alertPlaceholder.childElementCount) {
        alertPlaceholder.append(createAlert());
    }
}
