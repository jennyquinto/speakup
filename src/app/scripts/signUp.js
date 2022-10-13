import "../styles/style.js";

import { getData, postData } from "/src/app/scripts/process.js";
import { getFormElements } from "/src/app/scripts/ui.js";
import { dateHour } from "/src/app/scripts/dateHour.js";
let { date, horaMinutos, day } = dateHour();


localStorage.clear();

const pageUrl = window.origin;
const pageSignIn = `${pageUrl}/index.html`;

const formSignUp = new getFormElements("signUpForm");
const formRegister = formSignUp.getElement;

const logUp = async (e) => {
    e.preventDefault();
    const objNewUser = {
        name: formSignUp.getValue(0),
        phone: formSignUp.getValue(1),
        password: formSignUp.getValue(2),
        imagen: formSignUp.getValue(3),
        connection: false,
        about: formSignUp.getValue(4),
        sesion: `${date} ${horaMinutos}`,
    };
    console.log(objNewUser);

    for (const key in objNewUser) {
        const txtForm = objNewUser[key];
        if (txtForm === "") {
            alert(`Ingresa tu ${key}`);
            return;
        }
    };

    try {
        const query = `users?phone=${objNewUser.phone}`
        let response = await getData(query);
        console.log(response);
        if (response.length) {
            Swal.fire({
                icon: 'warning',
                title: 'El número ingresado ya se encuentra registrado',
                text: 'Ingrese otro cellphone',
                showConfirmButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            });

        } else {
            // let newUser = postData('users',objNewUser);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registro de usuario Exitoso',
                showConfirmButton: false,
                timer: 1800
              })
        };

    } catch (error) {
        console.log(error);
        Swal.fire("Oops!", "Fallo en el servidor!", "error");
    }

    formRegister.elements[0].value = "";
    formRegister.elements[1].value = "";
    formRegister.elements[2].value = "";
    formRegister.elements[3].value = "";
    formRegister.elements[4].value = "";

    const toSignIn =confirm('Desea iniciar sesion?');
    if (toSignIn) {
          location.href = `${pageSignIn}`;
    } 
};


formRegister.addEventListener("submit", (e) => {
    console.log(e);
    localStorage.clear();
    logUp(e);
});

