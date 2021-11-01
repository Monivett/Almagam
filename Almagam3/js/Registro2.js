//Solo validar contraseña y fecha
const formularioRegistro = document.getElementById('Registro'); 
const inputs = document.querySelectorAll('input'); 

//VARIABLES PARA LOS ERRORES 
var FechaError = new Boolean(true);
var Pass1_Error = new Boolean(true);

function Letra(e) { //FUNCIÓN PARA VALIDAR SÓLO LETRAS (NOMBRE Y APELLIDO)
    key = e.keyCode || e.which;  //Agarra el evento cuando presiono el teclado
    tecla = String.fromCharCode(key).toString();
    letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚabcdefghijklmnopqrstuvwxyzáéíóúñÑ";

    especiales = [8, 13, 32, 164, 165];
    tecla_especial = false;
    for (var i in especiales) {
        if (key === especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) === -1 && !tecla_especial) { //SI PONEMOS UN NÚMERO

        alert("Ingresar solo letras");

        return false;
    }
}

//CONSEGUIMOS LA FECHA DE HOY-----------------------
var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth() + 1; //Enero es 0 
var yyyy = hoy.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}

hoy = yyyy + '-' + mm + '-' + dd;


function Fecha() {
    var FechaForm = document.getElementById("inputDate").value;

    if (FechaForm > hoy) {
        document.getElementById('FechaError').style.display = 'block';
        FechaError = false;
    }
    else {
        document.getElementById('FechaError').style.display = 'none';
        FechaError = true;
    }


}

function Contraseña(password) {

    var MAYUS = false;
    var minus = false;
    var numero = false;
    var longitud = false;
    var caracter_especial = false;

    for (var i = 0; i < password.length; i++) {
        if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
            MAYUS = true;
        }
        else {

        }
        if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
            minus = true;

        }
        else {

        }
        if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
            numero = true;
        }
        else {
            caracter_especial = true;
        }
        if (password.length >= 8) {
            longitud = true
        }
        else {
            longitud = false;
        }
    }
    if (MAYUS === true && minus === true && caracter_especial === true && numero === true && longitud == true) {
        document.getElementById('ContraseñaError').style.display = 'none';
        Pass1_Error = true;
        return true;

    }
    else {
        document.getElementById('ContraseñaError').style.display = 'block';
        Pass1_Error = false;
    }

    return false;
}

const validarFormulario = (e) => {
    switch (e.target.name) {//Identifica el name del INPUT
        case "inputDate":
            Fecha();
            break;
        case "inputPassword":
            const password = document.getElementById('inputPassword').value; //ACCEDEMOS AL INPUT CONTRASEÑA
            Contraseña(password);
            break;

    }

};

inputs.forEach((input) => { //POR CADA INPUT EJECUTA LA FUNCIÓN
    input.addEventListener('keyup', validarFormulario);//Cuando suelte la tecla se ejecuta
    input.addEventListener('blur', validarFormulario);//Cuando de click en otro lugar se ejecuta

});

document.getElementById('file').onchange = function (e) {//FUNCIÓN PARA PREVISUALIZAR LA IMAGEN
    let reader = new FileReader(); //Crea un obj para almacenar la imagen
    reader.readAsDataURL(e.target.files[0]); //Pasamos las propiedades de la imagen

    reader.onload = function () {//Cuando se cargue la imagen
        let preview = document.getElementById('usuarioFoto'); //Relacion con el div usuario
        Image = document.createElement('img');
        Image.src = reader.result;//Accedemos a la propiedad del img
        //Cambiamos el tamaño
        Image.style.width = "700px";
        Image.style.height = "600px";
        preview.innerHTML = '';
        preview.append(Image);
    };
}



formularioRegistro.addEventListener("submit", e => {



    var nombre = document.getElementById('inputName').value;
    var correo = document.getElementById('inputEmail').value;
    var genero = $('input:radio[name=Genero]:checked').val();
    var constrasena = document.getElementById('inputPassword').value;
    var fechanac = document.getElementById('inputDate').value;
    var rol = $('input:radio[name=rol]:checked').val();
    var opc = 1;

    if (genero == "option1") {
        genero = 0;
    } else {
        genero = 1;
    }
    if (rol == "option1") {
        rol = 0;
    } else {
        rol = 1;
    }
    e.preventDefault();
    if (FechaError == true && Pass1_Error == true) {

        var FoDatos = new FormData(); //Form artificial de HTML

        FoDatos.append('nombre', nombre);
        FoDatos.append('correo', correo);
        FoDatos.append('genero', genero);
        FoDatos.append('contrasena', constrasena);
        FoDatos.append('fechanac', fechanac);
        FoDatos.append('rol', rol);
        FoDatos.append('foto', $("#file")[0].files[0]);
        FoDatos.append('opc', opc);

        fetch('php/User.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
            .then(response => {
                return response.text(); //Regresa tipo de dato texto
            })
            .then(data => {
                console.log(data); //Imprimimos el texto
                if (data == 1) {
                    alert("Te has registrado correctamente");
                    window.location.href = "IniciarSesion.html";


                } else {
                    alert("Error: El correo debe de ser único");
                }


            })

    } else {
        alert("Porfavor ingrese los datos correctamente");
    }
});
