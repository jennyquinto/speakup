// import { dateHour } from "/scripts/dateHour.js";
// let { date, horaMinutos, day } = dateHour();

// console.log(day,date,horaMinutos);
import "../styles/style.js";

import { getData } from "/src/app/scripts/process.js";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../../assets/', false, /\.(png|jpe?g|svg)$/));

// console.log(images);

let user;
let idUserOnSesion;

let userChatList = [];
let objUser = {
    id: '',
    inf: {}
};
let userList = [];

const onSesion = JSON.parse(localStorage.getItem('sesionUser'));

const validationSession = () => {
    if (!onSesion) {
        location.href = 'http://localhost:5501';
    } else {
        user = onSesion;
    }
};
validationSession();

document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault()
    userChats();

});

const userChats = async () => {
    idUserOnSesion = user.id;
    const userURL = 'users?id=';
    let [infoUser] = await getData(`${userURL}${idUserOnSesion}`);
    userList.push(infoUser);

    const sentConvertationURL = `messages?idUser1=${idUserOnSesion}&idUser2?`;
    let sentConversations = await getData(sentConvertationURL);
    sentConversations.forEach(async (element) => {
        let [User] = await getData(`${userURL}${element.idUser2}`);
        User.conversation = element.conversation;
        userList.push(User);
    });

    const receivedConvertationURL = `messages?idUser1?&idUser2=${idUserOnSesion}`;
    let receivedConversations = await getData(receivedConvertationURL);
    receivedConversations.forEach(async (element) => {
        let [User2] = await getData(`${userURL}${element.idUser1}`);
        User2.conversation = element.conversation;
        userList.push(User2);
    });

    console.log(userList);
}