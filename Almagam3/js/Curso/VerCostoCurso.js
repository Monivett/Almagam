
$(document).ready(function () {
    GetRol();
    getParameters();
    GetCursos();
    GetComentarios();
    GetLikes();
    GetDisikes();
});
var ID_Curso;
var ID_Usuario;
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
            var rol = obj['Rol'];
            ID_Usuario = obj['ID'];
            console.log(obj['Rol']);


            if (rol == 0) { //Si es rol: estudiante
                document.getElementById("perfilU").style.display = 'block';
                document.getElementById("perfilM").style.display = 'none';

            } else { //Si es rol: escuela
                document.getElementById("perfilU").style.display = 'none';
                document.getElementById("perfilM").style.display = 'block';

            }
            if (Jason != 0) { //Si esta logeado
                document.getElementById("BtnPerfil").style.display = 'block';
                document.getElementById("btn_cerrar").style.display = 'block';


            }

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
            var precio = obj[0]["Costo"];

            document.getElementById("cursoNombre").innerHTML = "Curso: " + obj[0]["Título"];
            GetCategoriaCurso(obj[0]["ID"]);
            document.getElementById("desc").innerHTML = obj[0]["Descripción"];
            document.getElementById("fotocurso").src = "php/CursosFoto.php?id=" + obj[0]['ID'];

            if (TipoCobro == 0) { //Si el precio es por curso
                if (precio == 0) { //Si el curso es gratis
                    document.getElementById("costo").innerHTML = "Precio del curso: Gratis";
                    document.getElementById("btn_subscribir").style.display = 'block';
                    document.getElementById("btn_subscribir").onclick = function () { Inscribirse(obj[0]['ID']); };
                } else {
                    document.getElementById("costo").innerHTML = "Precio del curso: $" + obj[0]["Costo"];
                    document.getElementById("btn_pagar").style.display = 'block';
                    document.getElementById("btn_pagar").onclick = function () { getIdFormA(obj[0]['ID']); };
                }

            }
            if (TipoCobro == 1) { //Si el precio es por niveles
                document.getElementById("costo").innerHTML = "Precio: $" + obj[0]["Costo"] + " a partir del nivel " + obj[0]["NivelCobro"];;
                document.getElementById("btn_subscribir").style.display = 'block';
                document.getElementById("btn_subscribir").onclick = function () { Inscribirse(obj[0]['ID']); };
            }


            document.getElementById("niveles").innerHTML = "Cantidad de niveles: " + obj[0]["CantidadNiveles"];

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
function GetComentarios() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'A');
    FoDatos.append('ID_Curso', ID_Curso);

    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto
            var div = document.getElementById('Comentarios');
            for (var i in obj) {

                var div2 = document.createElement('div');
                div2.setAttribute("class", "card w-75 mb-3");
                var div3 = document.createElement('div');
                div3.setAttribute("class", "card-body");
                var img = document.createElement('img');
                img.setAttribute("class", "img-thumbnail");
                img.setAttribute("width", "100px");
                img.setAttribute("src", "php/UsersFoto.php?id=" + obj[i]["ID"]);
                var h5 = document.createElement('h5');
                h5.setAttribute("class", "card-title");
                h5.innerHTML = obj[i]["Nombre"];
                var p = document.createElement('p');
                p.setAttribute("class", "card-text");
                p.innerHTML = obj[i]["Comentario"];

                div.appendChild(div2);
                div2.appendChild(div3);
                div3.appendChild(img);
                div3.appendChild(h5);
                div3.appendChild(p);
            }
        })

}
function GetLikes() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'B');
    FoDatos.append('ID_Curso', ID_Curso);

    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto
            var divL = document.getElementById('Likes');
            if (obj[0]["Likes"] == null) {
                divL.innerHTML = " Me gusta: 0";
            } else {
                divL.innerHTML = " Me gusta: " + obj[0]["Likes"];
            }

            var icon = document.createElement('i');
            icon.setAttribute("class", "fas fa-thumbs-up");
            divL.prepend(icon);
        })
}
function GetDisikes() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'D');
    FoDatos.append('ID_Curso', ID_Curso);

    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto
            var divL = document.getElementById('Dislikes');
            if (obj[0]["DisLikes"] == null) {
                divL.innerHTML = " No me gusta: 0";
            }
            else {
                divL.innerHTML = " No me gusta: " + obj[0]["DisLikes"];
            }

            var icon = document.createElement('i');
            icon.setAttribute("class", "fas fa-thumbs-down");
            divL.prepend(icon);
        })
}
function getIdFormA(obj) {

    window.location.href = "PagarCurso.html?id=" + obj;
}
//Inscribirse
function Inscribirse(ID_Curso) {
    var FoDatos = new FormData(); //Form artificial de HTML

    FoDatos.append('Estudiante', ID_Usuario);
    FoDatos.append('ID_Curso', ID_Curso);
    FoDatos.append('Nivel', 1);
    FoDatos.append('YaPago', 0);
    FoDatos.append('Inscrito', 1);
    FoDatos.append('opc', 2);

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
function BuscarCurso() {
    var BuscarCurso = document.getElementById('Buscador').value;
    window.location.href = "Principal.html?buscar=" + BuscarCurso;

}