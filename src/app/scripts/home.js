// import { dateHour } from "/scripts/dateHour.js";
// let { date, horaMinutos, day } = dateHour();

// console.log(day,date,horaMinutos);
import "../styles/style.js";

import "../../assets/Ellipse1.png"


function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const images = importAll(require.context('../../assets/', false, /\.(png|jpe?g|svg)$/));
  
console.log(img);

console.log(window.origin);
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