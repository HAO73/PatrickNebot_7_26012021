let formLogin = document.getElementById("login");

formLogin.addEventListener('click', function (event) {

  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

 

  let connectionData = {

    email: email,
    password: password,

  };



  const login = {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(connectionData),
    mode: 'cors',
    cache: 'default'

  };

  fetch("http://localhost:8080/api/users/login", login)

    .then(function (response) {
       if (response.ok) {
        window.location.href = "forum.html"
        
       } else {

        throw new Error("Erreur de connection");

       }
       
      

      return response.json();

    })
    .then(response => {
      
      localStorage.setItem("username", JSON.stringify(response))
     


    })


    .catch(error => alert("Erreur:" + error));

})