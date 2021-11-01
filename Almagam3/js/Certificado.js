const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var ID_Curso, ID_Usuario;
/* Inicializamos la imagen */
const image = new Image();

$(document).ready(function () {

    getParameters();
   GetUser();

    /* Ruta de la Imagen */
    image.src = 'img/Certificado-Plantilla.png';
    /* Dimensionamos y seleccionamos imagen */
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);


});
function getParameters() {
    var parameters = new Object();
    var parts = window.location.search.substring(1).split('\x26');
    for (var parti = parts.length; parti-- > 0;) {
        var subparts = parts[parti].split(';'); // support semicolon separators as well as ampersand (see HTML 4.01 section B.2.2)
        for (var subparti = subparts.length; subparti-- > 0;) {
            var parparts = subparts[subparti].split('=', 2);
            if (parparts.length == 2)
                parameters[decodeURIComponent(parparts[0])] = decodeURIComponent(parparts[1]);
        }
    }
    ID_Curso = parameters["id"];
   
    return parameters;
}
function GetUser() {

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
            var genero = obj['Género'];
            ID_Usuario = obj['ID'];
            console.log(obj['Nombre']);
            if (data != "[]") {
                GetData();
            }
     

        })


}
function GetData() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('ID_User', ID_Usuario);
    FoDatos.append('ID_Curso', ID_Curso);
    FoDatos.append('opc', 9);

    fetch('php/User.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data); //Imprimimos el texto
            var Jason = data;
            var obj = JSON.parse(Jason);
     
            console.log(data);
            if (data != "[]") {
                /* Definimos tamaño de la fuente */
                ctx.font = '25px Times New Roman';
                ctx.textAlign = "center";
                ctx.textBaseline = 'middle';
                var x = canvas.width / 2;
                var y = canvas.height;
              
               
                ctx.font = '25px Times New Roman';
                ctx.fillText(obj[0]['Nombre'], x, 340);

                ctx.font = '25px Times New Roman';
                ctx.fillText(obj[0]['Título'], x, 480);
                ctx.fillText(obj[0]['FechaTerminación'], 200, 550);
                GetEscuela(obj[0]['Escuela']);

            }
         


        })

}
//MOSTRAMOS EL NOMBRE DE LA ESCUELA
function GetEscuela(ID_Escuela) {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('ID_User', ID_Escuela);
    FoDatos.append('opc', 'A');

    fetch('php/User.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data); //Imprimimos el texto
            var Jason = data;
            var obj = JSON.parse(Jason);
     
            console.log(data);
            if (data != "[]") {
                /* Definimos tamaño de la fuente */
                ctx.font = '25px Times New Roman';
                ctx.textAlign = "center";
                ctx.textBaseline = 'middle';
                var x = canvas.width / 2;
                var y = canvas.height;
                ctx.fillText(obj[0]['Nombre'], x, 265);
                ctx.fillText(obj[0]['Nombre'], 590, 545);
              

            }
         


        })

}
function GetRol() {

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
            console.log(obj['Rol']);


            if (rol == 0) { //Si es rol: estudiante
                document.getElementById("perfilU").style.display = 'block';
                document.getElementById("perfilM").style.display = 'none';

            } else { //Si es rol: escuela
                document.getElementById("perfilU").style.display = 'none';
                document.getElementById("perfilM").style.display = 'block';
                document.getElementById("btn_cat").style.display = 'block';
            }
            if (Jason != 0) { //Si esta logeado
                document.getElementById("BtnPerfil").style.display = 'block';
                document.getElementById("btn_cerrar").style.display = 'block';
     
            } else {
                document.getElementById("BtnPerfil").style.display = 'none';
                document.getElementById("btn_cerrar").style.display = 'none';
             
                document.getElementById("btn_misCursos").style.display = 'none';
                document.getElementById("btn_mensajes").style.display = 'none';
    
            }

        })



}
function BuscarCurso() {
    var BuscarCurso = document.getElementById('Buscador').value;
    window.location.href = "Principal.html?buscar=" + BuscarCurso;

}

$(document).on("click", "#btn_descargar", function () {
    let lblpng = document.createElement('a');
    lblpng.download = "Certificado.png";
    lblpng.href = canvas.toDataURL();
    lblpng.click();
});
