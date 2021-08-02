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

        for (i = 0; i < messages.length; i++) {

            let checkLocalStorage = JSON.parse(localStorage.getItem("username"));


            //Affichage Comments
            let comments
            let commentsArray = []

            for (j = 0; j < messages[i].Comments.length; j++) {

                if (messages[i].Comments[j].userId === checkLocalStorage.userId || checkLocalStorage.isAdmin) {

                    commentsArray = commentsArray + `<div class="commentNumber">
                  <span class="commentUsername">${messages[i].Comments[j].username}</span>
                  <p class=""commentPosted">${messages[i].Comments[j].content}</p>
                  <button class="eraseComment" title="eraseComment" value="${messages[i].Comments[j].id}"><i class="far fa-trash-alt"></i></button>
                 </div>   `




                } else {

                    commentsArray = commentsArray + ` <div class="commentNumber">
                <span class="commentUsername">${messages[i].Comments[j].username}</span>
                <p class=""commentPosted">${messages[i].Comments[j].content}</p>    
                </div>`
                }


                comments = commentsArray
            }



            if (messages[i].attachment == 0) {

                if (messages[i].userId === checkLocalStorage.userId || checkLocalStorage.isAdmin) {

                    MessagesArray = MessagesArray + `
                     <div class="encart" >
                     <span id="username">${messages[i].User.username}</span><br>
                     <span id="title">${messages[i].title}</span><br>
                     <p id="message">${messages[i].content}</p><br>
                     <button class="eraseMessage" title="eraseMessage" value="${messages[i].id}"><i class="far fa-trash-alt"></i></button>
                    </div>
                    <div class="containerComments" value="${messages[i].id}">${comments ? comments : ""}
                    </div>  
                    <div id="encartComment">
                    <textarea class="comments" placeholder="Commentaires"></textarea>
                    <button class="validComment" value="${messages[i].id}">Post</button>                  
                    </div>

                    `

                } else {



                    MessagesArray = MessagesArray + `
                    <div class="encart">
                    <span id="username">${messages[i].User.username}</span><br>
                 <span id="title">${messages[i].title}</span><br>
                 
                     <p id="message">${messages[i].content}</p><br>
                     </div>
                     <div class="containerComments" value="${messages[i].id}">
                     ${comments ? comments : ""}
                     </div>
                     <div id="encartComment">

                     <textarea class="comments" placeholder="Commentaires"></textarea>
                     <button class="validComment" value="${messages[i].id}">Post</button>                     
                     
                     </div>
 
                     `

                }

            } else {

                if (messages[i].userId === checkLocalStorage.userId || checkLocalStorage.isAdmin) {



                    MessagesArray = MessagesArray + `
                     <div class="encart" >
                    
                     <span id="username">${messages[i].User.username}</span><br>
                     <span id="title">${messages[i].title}</span><br>
                    <img id="imagePost" src="${messages[i].attachment}" alt="Image${messages[i].id}"/><br>
                     <p id="message">${messages[i].content}</p><br>
                     <button class="eraseMessage" title="eraseMessage" value="${messages[i].id}"><i class="far fa-trash-alt"></i></button>
                     </div>
                     <div class="containerComments" value="${messages[i].id}">
                     ${comments ? comments : ""}
                     </div>
                     <div id="encartComment">
                     <textarea class="comments" placeholder="Commentaires"></textarea>
                     <button class="validComment" value="${messages[i].id}">Post</button>                    
                     
                     </div>
                    

                     

                   `

                } else {


                    MessagesArray = MessagesArray + `
                 <div class="encart">
                
                 <span id="username">${messages[i].User.username}</span><br>
             <span id="title">${messages[i].title}</span><br>
                
                 <img id="imagePost" src="${messages[i].attachment}" alt="Image${messages[i].id}" /><br>
                 <p id="message">${messages[i].content}</p><br>
                 </div>
                 <div class="containerComments" value="${messages[i].id}">
                 ${comments ? comments : ""}
                 </div>
                 <div id="encartComment">
                 <textarea class="comments" placeholder="Commentaires"></textarea>
                 <button class="validComment" value="${messages[i].id}">Post</button>                    
                 
                 </div>
                

                

                `

                }



            };

        }


        if (i === messages.length) {
            containerMessages.innerHTML = MessagesArray;
        }


        ////Suppression Message

        let eraseMessage = document.querySelectorAll(".eraseMessage");


        for (let j = 0; j < eraseMessage.length; j++) {

            eraseMessage[j].addEventListener("click", function (event) {
                let checkLocalStorage = JSON.parse(localStorage.getItem("username"));
                event.preventDefault();
                event.stopPropagation();

                let deleteMessage = {

                    method: "delete",
                    headers: {

                        'Content-Type': 'application/json',
                        'Authorization': checkLocalStorage.token

                    },

                    mode: 'cors',
                    cache: 'default'

                }

                fetch(`http://localhost:8080/api/messages/${eraseMessage[j].value}`, deleteMessage)
                    .then(response => response.json())
                    .then(response => {

                        window.location.href = "forum.html"

                    })

                    .catch(error => alert("Erreur : " + error));
            })

        }


        //// Post Comment



        let commentPost = document.querySelectorAll(".validComment");
        let content = document.querySelectorAll(".comments");
        let messageId = document.querySelectorAll(".validComment");



        for (let k = 0; k < commentPost.length; k++) {



            commentPost[k].addEventListener("click", function (event) {

                event.preventDefault();

                content = content[k].value
                messageId = messageId[k].value


                let checkLocalStorage = JSON.parse(localStorage.getItem("username"));
                let username = checkLocalStorage.username



                let envoiComment = {

                    content: content,
                    messageId: messageId,
                    username: username

                }



                const postCommentJSON = {


                    method: 'POST',

                    headers: {
                        'content-type': 'application/json',
                        'Authorization': checkLocalStorage.token
                    },

                    body: JSON.stringify(envoiComment),
                    mode: 'cors',
                    cache: 'default'

                };

                fetch("http://localhost:8080/api/comments/new", postCommentJSON)
                    .then(response => response.json())
                    .then(response => {

                        window.location.href = "forum.html"

                    })

                    .catch(error => alert("Erreur : " + error));



            })

        }


        ////Suppression Comment

        let eraseComment = document.querySelectorAll(".eraseComment");


        for (let p = 0; p < eraseComment.length; p++) {

            eraseComment[p].addEventListener("click", function (event) {
                let checkLocalStorage = JSON.parse(localStorage.getItem("username"));
                event.preventDefault();
                event.stopPropagation();

                let deleteComment = {

                    method: "delete",
                    headers: {

                        'Content-Type': 'application/json',
                        'Authorization': checkLocalStorage.token

                    },

                    mode: 'cors',
                    cache: 'default'

                }

                fetch(`http://localhost:8080/api/comments/${eraseComment[p].value}`, deleteComment)
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










