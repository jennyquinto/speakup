import "../styles/style.js";

import { getData } from "/src/app/scripts/process.js";
import { getFormElements } from "/src/app/scripts/ui.js";

const formSignIn = new getFormElements("form__login");

// const pageUrl = window.URL;
console.log(window.location.toString());


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
            location.href = 'http://127.0.0.1:5501/src/home.html';           
        } else {
            Swal.fire("Oops!", "Usuario o contraseña incorrecta!", "error");
        };

    } catch (error) {
        console.log(error);
        Swal.fire("Oops!", "Fallo en el servidor!", "error");
    }

    formSignIn.getElement.elements[0].value = "";
    formSignIn.getElement.elements[1].value = "";

};

const validationSession = () => {
    const user = localStorage.getItem('sesionUser');
    console.log(user);
    if (user) {
        location.href = 'http://127.0.0.1:5501/src/home.html';        
    }
};

validationSession();

formSignIn.getElement.addEventListener("submit", (e) => { 
    console.log(e);  
    logIn(e);
});
