const form = document.getElementById("contactForm");

const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const phoneNumberInput = document.getElementById("phoneNumberInput");
const dateOfBirthInput = document.getElementById("dateOfBirthInput");

form.addEventListener("submit", (evt) => {
    let reqData = {
        "firstName": firstNameInput.value,
        "lastName": lastNameInput.value,
        "phoneNumber": phoneNumberInput.value
    }
    let dateOfBirth = dateOfBirthInput.value;
    if (dateOfBirth) {
        reqData.dateOfBirth = dateOfBirth;
    }

    evt.preventDefault();
    fetch(`${API_URL}/contact`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqData)
    })
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        displayAlert();
    })
    .then(() => {
        firstNameInput.value = "";
        lastNameInput.value = "";
        phoneNumberInput.value = "";
        dateOfBirthInput.value = "";
    })
    .catch(err => console.error(err.message));
});
