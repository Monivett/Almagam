
const formularioLogin = document.getElementById('Login'); //ACCEDEMOS AL FORMULARIO
const inputs = document.querySelectorAll('#Login input'); //ACCEDEMOS A TODOS LOS INPUTS DEL Login

formularioLogin.addEventListener("submit", e => {

    var correo = document.getElementById('txt_email').value;
    var contrasena = document.getElementById('txt_pass').value;

    var opc = 2;

    e.preventDefault();


    var FoDatos = new FormData(); //Form de HTML

    FoDatos.append('correo', correo);
    FoDatos.append('contrasena', contrasena);

    FoDatos.append('opc', opc);

    fetch('php/User.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            if(data==1){
                 alert("Has iniciado sesión");
                 window.location.href="Principal.html";  
            }
            else{
                alert("Favor de ingresar los datos correctamente");
            }
           
          
            console.log(data); //Imprimimos el texto
         

        })
   
});

