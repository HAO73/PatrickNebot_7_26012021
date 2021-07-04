// Menu Hamburger
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


////Variables


const containerProfil = document.getElementById("containerProfil");

let checkLocalStorage = JSON.parse(localStorage.getItem("username"));

console.log(checkLocalStorage)

////Requête Profil

const getProfil = {

    method: 'GET',
    headers: {

        'Content-Type': 'application/json',
        'Authorization': checkLocalStorage.token

    },

    mode: 'cors',
    cache: 'default'



}

console.log(getProfil)

fetch("http://localhost:8080/api/users/me", getProfil)
    .then(response => response.json())
    .then(response => {

        let profilDisplay = ` 
        <h1>Profil</h1>  
        <span>Username:</span>
        <span>${response.username}</span><br>
        <span>Bio:</span>
        <span>${response.bio}</span><br>
        <button class="updateAccount">Modification Compte</button><br>
        <button class="cancelAccount">Suppression Compte</button>`

        containerProfil.innerHTML = profilDisplay

        let updateAccount = document.querySelector(".updateAccount");
        let cancelAccount = document.querySelector(".cancelAccount");

        updateAccount.addEventListener('click', function (event) {
            event.preventDefault();

            let profilAmend = `
     <h1>Profil</h1>  
     <form>
    <label>Username:</label>
    <span>${response.username}</span><br>
     <label>Bio:</label>
     <input id="bio" type="text"></input><br>
     <button class="updateProfil">Enregistrer</button><br>
     </form>
    `

            containerProfil.innerHTML = profilAmend


            /////Modification bio

            let updateProfil = document.querySelector(".updateProfil");


            updateProfil.addEventListener('click', function (event) {
                event.preventDefault();

                let bio = document.getElementById("bio").value;

                let updateBio = {
                    bio: bio
                }

                const putProfil = {

                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': checkLocalStorage.token
                    },
                    body: JSON.stringify(updateBio),
                    mode: 'cors',
                    cache: 'default'
                }

                fetch("http://localhost:8080/api/users/me", putProfil)
                    .then(response => response.json())
                    .then(response => {
                        window.location.href = "profil.html"
                    })
                    .catch(error => alert("Erreur : " + error));
            })


        })

        //////Suppression Compte

        cancelAccount.addEventListener('click', function (event) {
            event.preventDefault();

            const deleteProfil = {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': checkLocalStorage.token
                },
                mode: 'cors',
                cache: 'default'
            }

            fetch("http://localhost:8080/api/users/delete", deleteProfil)
                .then(response => response.json())
                .then(response => {

                    alert(JSON.stringify(response))
                    window.location.href = "index.html"



                })
                .catch(error => alert("Erreur : " + error));

        })


    })

    .catch(error => alert("Erreur : " + error));


function deconnexion() {


    localStorage.clear("username")
    window.location.href = "index.html"


}