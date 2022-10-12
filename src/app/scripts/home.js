// import { dateHour } from "/scripts/dateHour.js";
// let { date, horaMinutos, day } = dateHour();

// console.log(day,date,horaMinutos);
import "../styles/style.js";

import viewed from "../../assets/doublecheckblue.svg";
import unViewed from "../../assets/doublecheck.svg";


import { getData } from "/src/app/scripts/process.js";
import { getFormElements } from "/src/app/scripts/ui.js";

let chatSections = new getFormElements("chatSection");
let chat = new getFormElements("userChat");
let userChat = chat.getElement;

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../../assets/', false, /\.(png|jpe?g|svg)$/));

let user;
let idUserOnSesion;
let userList = [];
let chatList = [];
let User2 = {}

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

    const sentConvertationURL = `messages?idUser1=${idUserOnSesion}&idUser2?`;
    let sentConversations = await getData(sentConvertationURL);

    let userPicture = chatSections.getElement.firstChild;
    userPicture.innerHTML = '';
    userPicture.innerHTML = `
        <img src="${infoUser.imagen}" alt="User image">
        `;

    sentConversations.forEach(element => {
        let User = getData(`${userURL}${element.idUser2}`);
        userList.push(User);
    });

    const receivedConvertationURL = `messages?idUser1?&idUser2=${idUserOnSesion}`;
    let receivedConversations = await getData(receivedConvertationURL);
    receivedConversations.forEach(element => {
        User2 = getData(`${userURL}${element.idUser1}`);
        User2.conversation = element.conversation;
        userList.push(User2);
    });

    let responseUserList = await Promise.all(userList)
    responseUserList.forEach((element, index) => {
        element = element[0];
        chatList.push(element);
    });

    userChat.innerHTML = '';

    chatList.forEach((user, index) => {
        let property = sentConversations.find(element => element.idUser2 == user.id);
        if (property) {
            console.log(property.conversation);
            user.conversation = property.conversation
        };
        let property1 = receivedConversations.find(element => element.idUser1 == user.id);
        if (property1) {
            user.conversation = property1.conversation
        };
        
        let lastConversation = user.conversation[user.conversation.length - 1];
        let lastDateMessages = lastConversation.date;
        let lastDate = lastDateMessages.substr(0, 2)
        console.log(lastDate);

        let status = user.conversation[user.conversation.length - 1].viewed;
        
        let checkIcon ='';
        if(status){            
            checkIcon = viewed;
        }
        else{
            checkIcon = unViewed;
        }
        
        console.log(status);
        // user.conversation.forEach(date => {
        // }); 
        
        // console.log(date);
        userChat.innerHTML += `
            <section class="left__chats__conversation">
                <div class="conversation__card">
                    <figure class="card__user-chat">
                        <img src="${user.imagen}" alt="User image" class="imgUser">
                    </figure>
                <div class="card__info">
                    <div class="card__info__top">
                    <span class="userName">${user.name}</span>
                    <span class="date">${lastConversation.date}</span>
                    </div>
                    <div class="card__info__bottom">
                    <figure>
                        <img src="${checkIcon}" alt="double check icon" width="16px" height="9.89">
                    </figure>
                    <div class="info__message">
                        <span>${lastConversation.message}</span>
                    </div>
                    </div>
                </div>
                </div>
        </section>
    `;
    });

    
}

