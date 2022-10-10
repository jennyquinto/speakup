// import { dateHour } from "/scripts/dateHour.js";
// let { date, horaMinutos, day } = dateHour();

// console.log(day,date,horaMinutos);
import "../styles/style.js";

let user;

const onSesion = JSON.parse(localStorage.getItem('sesionUser'));

const validationSession = () => {
    if (!onSesion) {
        location.href = 'http://localhost:5501';
    }else {
        user = onSesion;
    }
};
validationSession();