// import { dateHour } from "/scripts/dateHour.js";
// let { date, horaMinutos, day } = dateHour();

// console.log(day,date,horaMinutos);

import "../styles/style.js";

const onSesion = JSON.parse(localStorage.getItem('sesionUser'));

let user;
console.log(pageURL);
Swal.fire({
                icon: 'success',
                title: 'Login successful',
                text: `Bienvenid@ ${onSesion.name}`,
                showConfirmButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            });

const validationSession = () => {
    if (!onSesion) {
        location.href = 'http://127.0.0.1:5501/src/index.html'; 
    }else {
        user = onSesion;
    }
};
validationSession();