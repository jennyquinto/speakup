import { dateHour } from "/src/app/scripts/dateHour.js";
let { date, horaMinutos, day } = dateHour();

const dateConnection = `${date} ${horaMinutos}`;


let Date = luxon.DateTime;


import "../styles/style.js";

import viewed from "../../assets/doublecheckblue.svg";
import unViewed from "../../assets/doublecheck.svg";


import { getData, upData } from "/src/app/scripts/process.js";
import { getFormElements } from "/src/app/scripts/ui.js";

let chatSections = new getFormElements("chatSection");
let conversationUser = new getFormElements("conversation");
let userCard = conversationUser.getElement;

let chat = new getFormElements("userChat");
let userChat = chat.getElement;

let contactInf = new getFormElements("user");
let contact = contactInf.getElement;

let messagesSection = new getFormElements("messagesSection");
let messages = messagesSection.getElement;


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
let count = -1;
let ultimaConver = 0;

let onSesion = JSON.parse(localStorage.getItem('sesionUser'));

const validationSession = () => {
    if (!onSesion) {
        location.href = 'http://localhost:5501';
    } else {
        user = onSesion;
    }
};
validationSession();

document.addEventListener('DOMContentLoaded', async (event) => {
    event.preventDefault()
    userChats();
    userChat.firstChild.classList.add('start');
    let obj = {
        ...onSesion,
        connection: true,
        sesion: dateConnection,

    };
    const userURL = `users/${onSesion.id}`;
    const upUser = await upData(userURL, obj);

    const userUpdated = upUser.status.data;

    localStorage.setItem("sesionUser", JSON.stringify(userUpdated));

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
            user.conversation = property.conversation
        };
        let property1 = receivedConversations.find(element => element.idUser1 == user.id);
        if (property1) {
            user.conversation = property1.conversation
        };

        let lastConversation = user.conversation[user.conversation.length - 1];
        let lastDateMessages = lastConversation.date;
        let dia;
        let mes;
        let monthReference = lastDateMessages.substr(3, 2);
        let dayReference = lastDateMessages.substr(0, 2);
        if (monthReference.startsWith("0", 0)) {
            monthReference = lastDateMessages.substr(4, 1);

        }
        if (dayReference.startsWith("0", 0)) {
            dayReference = lastDateMessages.substr(1, 1);
        }

        mes = Number(monthReference)
        dia = Number(dayReference)

        let fecha = Date.local(2022, mes, dia)
        let fecha2;

        if (fecha.ts - ultimaConver > 0) {
            ultimaConver = fecha.ts;
            fecha2 = lastConversation.date;
            count += 1;
        }
        let status = user.conversation[user.conversation.length - 1].viewed;

        let checkIcon = '';
        if (status) {
            checkIcon = viewed;
        }
        else {
            checkIcon = unViewed;
        }

        userChat.innerHTML += `
            <section class="left__chats__conversation">
                <div class="conversation__card conversation" user=${user.id}>
                    <figure class="card__user-chat conversation" user=${user.id}>
                        <img src="${user.imagen}" alt="User image" class="imgUser conversation" user=${user.id}>
                    </figure>
                <div class="card__info conversation" user=${user.id} >
                    <div class="card__info__top conversation" user=${user.id}>
                    <span class="userName conversation" user=${user.id}>${user.name}</span>
                    <span class="date conversation" user=${user.id}>${lastConversation.date}</span>
                    </div>
                    <div class="card__info__bottom conversation" user=${user.id}>
                    <figure>
                        <img src="${checkIcon}" alt="double check icon" width="16px" height="9.89">
                    </figure>
                    <div class="info__message conversation" user=${user.id}>
                        <span class="conversation" user=${user.id}>${lastConversation.message}</span>
                    </div>
                    </div>
                </div>
                </div>
        </section>
    `;
    });
    userChat.firstElementChild.classList.add('start')

    const lastUser = chatList[count];
    console.log(lastUser);

    let connect = '';
    if (lastUser.connection) {
        connect = 'En línea';
    }
    contact.innerHTML = '';
    contact.innerHTML += `
     <img src="${lastUser.imagen}" alt="User image" width="48" height="48">
    <p id="contactSection">
        <span class="user-name">${lastUser.name}</span>
        <span class="user-status">${connect}</span>
    </p>
    `;

    let idMy = 0;
    idMy = idUserOnSesion;
    let viewedIcon = '';
    let classMessages = '';

    messages.innerHTML = '';
    lastUser.conversation.forEach(message => {
        let classMessages = '';
        if (idMy !== message.sendBy) {
            classMessages = 'is-sender';

        } else {
            classMessages = 'is-receiver';
        }

        if (message.viewed) {
            viewedIcon = viewed;
        }
        else {
            viewedIcon = unViewed;
        }

        messages.innerHTML += `
            <div class="message ${classMessages}">
                <div class="message-body">
                 <p class="message-text">${message.message}</p>
                </div>
                <div class="message-details">
                 <span class="message-date">${message.hour}</span>
                <div class="message-status is-dobleCheck">
                    <img src="${viewedIcon}" alt="double check icon" width="16px" height="9.89"></div>
                </div>
            </div>

        `;


    });

}

const getHistorial = async (id) => {
    try {
        let conersationURL = `messages?idUser1=${onSesion.id}&idUser2=${id}`;
        let chat = await getData(conersationURL);
        if (chat.length) {
            let chatConversation = chat[0].conversation;
            messages.innerHTML = '';
            let viewedIcon = '';
            
            chatConversation.forEach(message=> {
                let classMessages = '';
                if (onSesion.id !== message.sendBy) {
                    classMessages = 'is-sender';
        
                } else {
                    classMessages = 'is-receiver';
                }
        
                if (message.viewed) {
                    viewedIcon = viewed;
                }
                else {
                    viewedIcon = unViewed;
                }
        
                messages.innerHTML += `
                    <div class="message ${classMessages}">
                        <div class="message-body">
                         <p class="message-text">${message.message}</p>
                        </div>
                        <div class="message-details">
                         <span class="message-date">${message.hour}</span>
                        <div class="message-status is-dobleCheck">
                            <img src="${viewedIcon}" alt="double check icon" width="16px" height="9.89"></div>
                        </div>
                    </div>
        
                `;
        
            });

        } else {
            conersationURL = `messages?idUser1=${id}&idUser2=${onSesion.id}`;
            [chat]= await getData(conersationURL);
            let chatConversation = chat.conversation;

            messages.innerHTML = '';
            let viewedIcon = '';
            chatConversation.forEach(message=> {
                let classMessages = '';
                if (onSesion.id !== message.sendBy) {
                    classMessages = 'is-sender';
        
                } else {
                    classMessages = 'is-receiver';
                }
        
                if (message.viewed) {
                    viewedIcon = viewed;
                }
                else {
                    viewedIcon = unViewed;
                }
        
                messages.innerHTML += `
                    <div class="message ${classMessages}">
                        <div class="message-body">
                         <p class="message-text">${message.message}</p>
                        </div>
                        <div class="message-details">
                         <span class="message-date">${message.hour}</span>
                        <div class="message-status is-dobleCheck">
                            <img src="${viewedIcon}" alt="double check icon" width="16px" height="9.89"></div>
                        </div>
                    </div>
        
                `;
        
            });
        }

    } catch (error) {
        console.log(error);
    }
}

userCard.addEventListener('click', ({ target }) => {
    if (target.classList.contains('conversation')) {
        let idUserChats = target.getAttribute('user');
        getHistorial(idUserChats);
    }
});
