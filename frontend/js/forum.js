///// Menu Hamburger

const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');




openMenu.addEventListener('click', show);
closeMenu.addEventListener('click', close);

function show() {
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close() {
    mainMenu.style.top = '-100%';
}


////Post Message


let sendMessage = document.querySelector(".sendMessage")

sendMessage.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    let title = document.querySelector(".titlePost").value;
    let message = document.querySelector(".messagePost").value;
    let attachment = document.querySelector(".imageUpload").files[0];
    let checkLocalStorage = JSON.parse(localStorage.getItem("username"));



    if (attachment !== null) {


        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', message);
        formData.append('attachment', attachment)





        const postMessage = {

            method: 'POST',
            headers: {

                'Authorization': checkLocalStorage.token

            },
            body: formData,
            mode: 'cors',
            cache: 'default'

        };


        fetch("http://localhost:8080/api/messages/new", postMessage)
            .then(response => response.json())
            .then(response => {

                window.location.href = "forum.html"

            })

            .catch(error => alert("Erreur : " + error));


    } else {


        envoiPost = {

            title: title,
            content: message
        };


        const postMessageJSON = {


            method: 'POST',

            headers: {
                'content-type': 'application/json',
                'Authorization': checkLocalStorage.token
            },

            body: JSON.stringify(envoiPost),
            mode: 'cors',
            cache: 'default'

        };

        fetch("http://localhost:8080/api/messages/new", postMessageJSON)
            .then(response => response.json())
            .then(response => {

                window.location.href = "forum.html"

            })

            .catch(error => alert("Erreur : " + error));


    }


})


////Affichage Messages


fetch("http://localhost:8080/api/messages/?order=id:DESC")
    .then(function (httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function (messages) {
        let containerMessages = document.querySelector(".containerMessages");
        let MessagesArray = [];
        let MessagesArrayImage = [];




        for (i = 0; i < messages.length; i++) {

            let checkLocalStorage = JSON.parse(localStorage.getItem("username"));



            if (messages[i].attachment == null) {


                if (messages[i].UserId === checkLocalStorage.userId || checkLocalStorage.isAdmin) {

                    

                    MessagesArray = MessagesArray + `
                     <div class="encart" >
                     <span id="username">${messages[i].User.username}</span><br>
                     <span id="title">${messages[i].title}</span><br>
                     
                    
                    <p id="message">${messages[i].content}</p><br>
                     <button class="eraseMessage" value="${messages[i].id}">Supprimer</button>
                    </div>
                  `

                } else {

                    

                    MessagesArray = MessagesArray + `
                    <div class="encart">
                    <span id="username">${messages[i].User.username}</span><br>
                 <span id="title">${messages[i].title}</span><br>
                 
                     <p id="message">${messages[i].content}</p><br>
                     </div>
                    
                     `




                }
            };


            if (messages[i].attachment !== null) {

                if (messages[i].UserId === checkLocalStorage.userId || checkLocalStorage.isAdmin) {

                    MessagesArrayImage = MessagesArrayImage + `
                     <div class="encart" >
                    
                     <span id="username">${messages[i].User.username}</span><br>
                     <span id="title">${messages[i].title}</span><br>
                    <img id="imagePost" src="${messages[i].attachment}"/><br>
                     <p id="message">${messages[i].content}</p><br>
                     <button class="eraseMessage" value="${messages[i].id}">Supprimer</button>
                     </div>
                    
                   `


                } else {
                    MessagesArrayImage = MessagesArrayImage + `
                 <div class="encart">
                
                 <span id="username">${messages[i].User.username}</span><br>
             <span id="title">${messages[i].title}</span><br>
                
                 <img id="imagePost" src="${messages[i].attachment}" /><br>
                 <p id="message">${messages[i].content}</p><br>
                </div>
                
                `



                }




            };
        }


        if (i === messages.length) {
            containerMessages.innerHTML = MessagesArray;
            containerMessages.innerHTML = MessagesArrayImage;

        }




        ////Suppression Message

        let eraseMessage = document.querySelectorAll(".eraseMessage");
        let eraseMessageId = document.querySelector(".eraseMessage").value;




        for (let j = 0; j < eraseMessage.length; j++) {

            eraseMessage[j].addEventListener("click", function (event) {
                let checkLocalStorage = JSON.parse(localStorage.getItem("username"));
                event.preventDefault();

                let deleteMessage = {

                    method: "delete",
                    headers: {

                        'Content-Type': 'application/json',
                        'Authorization': checkLocalStorage.token

                    },

                    mode: 'cors',
                    cache: 'default'

                }

                fetch(`http://localhost:8080/api/messages/${eraseMessageId}`, deleteMessage)
                    .then(response => response.json())
                    .then(response => {

                        window.location.href = "forum.html"

                    })

                    .catch(error => alert("Erreur : " + error));
            })

        }

    })
    .catch(error => alert("Erreur : " + error));


function deconnexion() {


    localStorage.clear("username")
    window.location.href = "index.html"


}


