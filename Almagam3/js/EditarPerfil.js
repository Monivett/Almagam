//Solo validar contraseña y fecha
const formularioRegistro = document.getElementById('EditarPerfil'); //ACCEDEMOS AL FORMULARIO
const inputs = document.querySelectorAll('input'); //ACCEDEMOS A TODOS LOS INPUTS DEL REGISTRO
var ID_Usuario;
var rol;
$(document).ready(function () {

    MostrarUser();

});
var contravieja;
function MostrarUser() {

    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 3);

    fetch('php/User.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data); //Imprimimos el texto
            var Jason = data;
            var obj = JSON.parse(Jason);
            rol = obj['Rol'];
            ID_Usuario = obj['ID'];
            document.getElementById("inputName").value = obj['Nombre'];
            document.getElementById("inputDate").value = obj['FechaNacimiento'];
            contravieja = obj['Contraseña'];
            document.getElementById("InputEmail").value = obj['Email'];
        
            if (rol == 1) {
                document.getElementById("genero").style.display = "none";
                document.getElementById("fecha").innerHTML = "Fecha de Fundación";
            } else {
                document.getElementById("genero").style.display = "block";
            }
        })


}

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
if(password!=""){
    var MAYUS = false;
    var minus = false;
    var numero = false;
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
    }
    if (MAYUS === true && minus === true && caracter_especial === true && numero === true) {
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

//MOSTRAR LA FOTO
document.getElementById('file').onchange = function (e) {//FUNCIÓN PARA PREVISUALIZAR LA IMAGEN

    let reader = new FileReader(); //Crea un obj para almacenar la imagen
    reader.readAsDataURL(e.target.files[0]); //Pasamos las propiedades de la imagen

    var fileName = this.files[0].name;
    var fileSize = this.files[0].size;

    if (fileSize > 50000000) {
        alert('El archivo es muy pesado');
        this.value = '';
        this.files[0].name = '';
    } else {
        // recuperamos la extensión del archivo
        var ext = fileName.split('.').pop();

        // Convertimos en minúscula porque 
        // la extensión del archivo puede estar en mayúscula
        ext = ext.toLowerCase();

        // console.log(ext);
        switch (ext) {
            case 'png':

                reader.onload = function () {//Cuando se cargue la imagen
                    let preview = document.getElementById('usuarioFoto'); //Relacion con el div usuario
                    Image = document.createElement('img');
                    Image.src = reader.result;//Accedemos a la propiedad del img
                    //Cambiamos el tamaño
                    Image.style.width = "550px";
                    Image.style.height = "550px";
                    preview.innerHTML = '';
                    preview.append(Image);
                };
                break;
            case 'jpg':

                reader.onload = function () {//Cuando se cargue la imagen
                    let preview = document.getElementById('usuarioFoto'); //Relacion con el div usuario
                    Image = document.createElement('img');
                    Image.src = reader.result;//Accedemos a la propiedad del img
                    //Cambiamos el tamaño
                    Image.style.width = "550px";
                    Image.style.height = "550px";
                    preview.innerHTML = '';
                    preview.append(Image);
                };
                break;
            case 'jpeg':

                reader.onload = function () {//Cuando se cargue la imagen
                    let preview = document.getElementById('usuarioFoto'); //Relacion con el div usuario
                    Image = document.createElement('img');
                    Image.src = reader.result;//Accedemos a la propiedad del img
                    //Cambiamos el tamaño
                    Image.style.width = "550px";
                    Image.style.height = "550px";
                    preview.innerHTML = '';
                    preview.append(Image);
                }; break;
            default:
                alert('Formato incorrecto para la imagen');
                this.value = ''; // reset del valor
                this.files[0].name = '';
        }
    }


}



var constrasena;
formularioRegistro.addEventListener("submit", e => {



    var nombre = document.getElementById('inputName').value;
    var correo = document.getElementById('InputEmail').value;
    constrasena = document.getElementById('inputPassword').value;
    var fechanac = document.getElementById('inputDate').value;

    var genero;
    if (rol == 0) {
        genero = $('input:radio[name=Genero]:checked').val();
        if (genero == "option1") {
            genero = 0;
        } else {
            genero = 1;
        }
    } else{
        genero = 0;
    }
    e.preventDefault();
    if (FechaError == true && Pass1_Error == true) {

        var foto = $("#file")[0].files[0];

        var FoDatos = new FormData(); //Form artificial de HTML
        FoDatos.append('ID', ID_Usuario);
        FoDatos.append('nombre', nombre);
        FoDatos.append('correo', correo);
        FoDatos.append('genero', genero);
        if(constrasena == ""){
            FoDatos.append('contrasena', null);
            constrasena = contravieja;
        }else{
            FoDatos.append('contrasena', constrasena);
        }
    
        FoDatos.append('fechanac', fechanac);
        if (foto != undefined) {
            FoDatos.append('foto', $("#file")[0].files[0]);
            FoDatos.append('opc', 4);
        } else {
            FoDatos.append('foto', null);
            FoDatos.append('opc', 'J');
        }
  

        fetch('php/User.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
            .then(response => {
                return response.text(); //Regresa tipo de dato texto
            })
            .then(data => {
                console.log(data); //Imprimimos el texto
                if(data==1){
                   Login(constrasena);  
                }else if(data == "Duplicate entry '" + correo + "' for key 'Email'"){
                    alert("Error: Ya existe un usuario con este correo");
                }
                else {
                    alert("Error: No se pudo registrar");
                }
               
               

               
            })

    } else {
        alert("Porfavor ingrese los datos correctamente");
    }
});


function Login(contrasena){
    var correo = document.getElementById('InputEmail').value;
   

    var opc = 2;
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
                alert("Se actualizaron los datos correctamente");
                if (rol == 1) {
                    window.location.href = "PerfilMaestro.html";
                } else {
                    window.location.href = "PerfilUsuario.html";
                }
            }
            else{
              
            }
           
          
            console.log(data); //Imprimimos el texto
         

        })
}