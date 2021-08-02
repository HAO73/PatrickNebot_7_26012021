// envoi du formulaire d'inscription

const formSignup = document.getElementById('register');

formSignup.addEventListener('click', function (event) {

    event.preventDefault();


    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let bio = document.getElementById('bio').value;

    let profil = {

        email: email,
        username: username,
        password: password,
        bio: bio

    };



    //////Envoi du formulaire au backend

    const inscription = {

        method: 'POST',
        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify(profil),
        mode: 'cors',
        cache: 'default'

    };



    fetch("http://localhost:8080/api/users/register", inscription)
        .then(function (response) {
            if (response.ok) {
                window.location.href = "index.html"
            }

            return response.json();

        })


        .then(response => {
            alert(JSON.stringify(response))

        })
        .catch(error => alert("Erreur:" + error));


   



});