import "../styles/style.js";

import { getData } from "/src/app/scripts/process.js";
import { getFormElements } from "/src/app/scripts/ui.js";

const pageURL = window.origin;
const formSignIn = new getFormElements("form__login");

const logIn = async (e) => {
    e.preventDefault();
    const objUser = {
        cellPhone: formSignIn.getValue(0),
        password: formSignIn.getValue(1),
    };
    console.log(objUser);

    for (const key in objUser) {
        const txtForm = objUser[key];
        if (txtForm === "") {
            alert(`Ingresa tu ${key}`);
            return;
        }
    };

    try {
        let response = await getData(
            `users?phone=${objUser.cellPhone}&password=${objUser.password}`
        );
        console.log(response);
        if (response.length) {
            alert(` ${response[0].name}`); 
            localStorage.setItem("sesionUser", JSON.stringify(response[0]));
            location.href = `${pageURL}/src/app/pages/home.html`;
            
        } else {
            Swal.fire("Oops!", "Usuario o contraseña incorrecta!", "error");
        };

    } catch (error) {
        console.log(error);
        Swal.fire("Oops!", "Fallo en el servidor!", "error");
    }

    form.elements[0].value = "";
    form.elements[1].value = "";

};

const validationSession = () => {
    const user = localStorage.getItem('sesionUser');
    console.log(user);
    if (user) {
        location.href = `${pageURL}/src/app/pages/home.html`;
    }
};

validationSession();

form.addEventListener("submit", (e) => {
    logIn(e);
});
