import "../styles/style.js";

import { getData } from "/src/app/scripts/process.js";
import { getFormElements } from "/src/app/scripts/ui.js";

const pageUrl =window.origin;
const pagehome=`${pageUrl}/home.html`
const pageSignUp=`${pageUrl}/signUp.html`


const signUpPage = new getFormElements("signUpRedirect");
let signUpClick = signUpPage.getElement ;


const formSignIn = new getFormElements("form__login");


signUpClick.addEventListener('click', ({target}) =>{  
    if (target.classList.contains('signUp')){
       location.href = `${pageSignUp}`;
    }
});


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
            Swal.fire({
                icon: 'success',
                title: 'Login successful',
                text: `Bienvenid@ ${response[0].name}`,
                showConfirmButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            });
            alert(` ${response[0].name}`);
            
            setTimeout(() => { location.href= `${pagehome}` }, 3000);
            localStorage.setItem("sesionUser", JSON.stringify(response[0]));
            location.href = `${pagehome}`;


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
        location.href = `${pagehome}`;
    }
};

// validationSession();

formSignIn.getElement.addEventListener("submit", (e) => {
    console.log(e);
    localStorage.clear();
    logIn(e);
});
