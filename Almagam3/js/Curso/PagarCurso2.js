const formularioPagar = document.getElementById('Pagar');

$(document).ready(function () {

    getParameters();
    GetCursos();
    GetUserID();
});
var ID_Curso;
var ID_Usuario;
var Precio;
var Escuela;
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
function GetUserID() {

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
            ID_Usuario = obj['ID'];


        })



}
function GetCursos() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 5);
    FoDatos.append('IDCurso', ID_Curso);

    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto
            var TipoCobro = obj[0]["TipoCobro"];
            Precio = obj[0]["Costo"];
            Escuela = obj[0]["Escuela"];

            document.getElementById("cursoNombre").innerHTML = "Curso: " + obj[0]["Título"];
            GetCategoriaCurso(obj[0]["ID"]);

            document.getElementById("fotocurso").src = "php/CursosFoto.php?id=" + obj[0]['ID'];

            if (TipoCobro == 0) { //Si el precio es por curso
                document.getElementById("costo").innerHTML = "Precio del curso: $" + obj[0]["Costo"];

            }
            if (TipoCobro == 1) { //Si el precio es por niveles
                document.getElementById("costo").innerHTML = "Precio: $" + obj[0]["Costo"] + " a partir del nivel " + obj[0]["NivelCobro"];;

            }



        })

}
function GetCategoriaCurso(ID) {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 4);
    FoDatos.append('IDCurso', ID);

    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto

            if (data != "[]") { //Si tiene categorias
                document.getElementById("Categorias").innerHTML = "Categorias: ";
            }

            for (var i in obj) {
                $("#Categorias").append(obj[i]['Nombre'] + " ")
            }


        })
}


formularioPagar.addEventListener("submit", e => {

    var formaPago = document.getElementById("FormaPago").value;


    e.preventDefault();


    var FoDatos = new FormData(); //Form artificial de HTML

    FoDatos.append('ID_Curso', ID_Curso);
    FoDatos.append('Precio', Precio);
    FoDatos.append('formaPago', formaPago);
    FoDatos.append('Escuela', Escuela);
    FoDatos.append('Estudiante', ID_Usuario);
    FoDatos.append('opc', 1);

    fetch('php/Pago.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data); //Imprimimos el texto
            if (data == 1) {
                alert("Se ha pagado el curso");
                Inscribirse();

            } else {
                alert("No se pudo realizar el pago");
            }


        })



});




function Inscribirse() {


    var FoDatos = new FormData(); //Form artificial de HTML
   
    FoDatos.append('Estudiante', ID_Usuario);
    FoDatos.append('ID_Curso', ID_Curso);
    FoDatos.append('Nivel', 1);
    FoDatos.append('YaPago', 1);
    FoDatos.append('Inscrito', 1);
    FoDatos.append('opc', 3);

    fetch('php/Inscripcion.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data); //Imprimimos el texto
            if (data == 1) {
                alert("¡Felicidades te has inscrito al curso!");


                window.location.href = "VerCurso.html?id=" + ID_Curso;



            } else {
                alert("No se pudo realizar la inscripción");
            }


        })

}