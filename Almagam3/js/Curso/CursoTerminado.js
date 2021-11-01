const formularioComentario = document.getElementById('Comentario');
$(document).ready(function () {
    GetRol();
    getParameters();
    GetNivel(1);
    GetCursos(ID_Curso);

});
var ID_Curso;
var pago;
var ID_Usuario;
var NivelActual;
var IDNivelActual;
var NivelProgreso; //Nivel en el que va el estudiante
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
            if (data != "[]") {

            }


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
var NivelCobro;
var cantidadNiveles;
var FormaCobro;
//MOSTRAMOS LOS CURSOS
function GetCursos() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 5);
    FoDatos.append('IDCurso', ID_Curso);

    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            $("#btnNivel").empty();
            console.log(data);
            var Jason = data;
            if (data != "[]") {
                ActualizarFecha();
                GetComentarios();
                GetLikes();
                GetDisikes();
                GetComentariosUser();
            }
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto
            cantidadNiveles = obj[0]["CantidadNiveles"];
            FormaCobro = obj[0]["TipoCobro"];
            NivelCobro = obj[0]["NivelCobro"];
            document.getElementById("cursoNombre").innerHTML = "Curso: " + obj[0]["Título"];
            var div = document.getElementById("btnNivel");

            for (var i = 1; i <= cantidadNiveles; i++) {
                var div2 = document.createElement('div');
                div2.setAttribute("class", "card   rounded shadow-lg w-100 ");
                div2.setAttribute("style", "width: 20rem;");
                div2.setAttribute("onclick", "GetNivel(" + i + ")");
                div2.setAttribute("id", "BotonNivel" + i);
                var div3 = document.createElement('div');
                div3.setAttribute("class", "card-body  justify-content-center text-center ");

                var a = document.createElement('btn');
                a.setAttribute("class", "form-text text-muted text-decoration-none");
                a.setAttribute("id", "btn_Nivel" + i);
                a.innerHTML = 'Nivel ' + i + " ";
                var icon = document.createElement('i');
                icon.setAttribute("class", "fas fa-check-circle");
                icon.setAttribute("id", "complete");
                a.appendChild(icon);
                div.appendChild(div2);
                div2.appendChild(div3);
                div3.appendChild(a);

            }




        })

}
//MOSTRAMOS EL NIVEL
function GetNivel(i) {

    $("#videoExtra").empty();
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 6);
    FoDatos.append('IDCurso', ID_Curso);
    FoDatos.append('Nivel', i);

    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto

            document.getElementById("NombreNivel").innerHTML = obj[0]["Nombre"];
            document.getElementById("NumeroNivel").innerHTML = "Nivel " + obj[0]["NúmeroNivel"];
            document.getElementById("Descripcion").innerHTML = obj[0]["Descripción"];
            document.getElementById('Nivelvideo').src = obj[0]["Vídeo"];
            NivelActual = obj[0]["NúmeroNivel"];
            IDNivelActual = obj[0]["ID_Nivel"];
            //Agregamos el 1er video a los videos extras
            var divideo = document.getElementById("videoExtra");
            var btn = document.createElement('btn');
            btn.setAttribute("class", "btn btn-outline-light w-50 mb-3");
            btn.setAttribute("type", 'submit');

            btn.setAttribute("onclick", "changeVideo('" + obj[0]['Vídeo'] + "');");
            btn.innerHTML = "Parte 1";
            var br = document.createElement('br');
            divideo.appendChild(btn);
            divideo.appendChild(br);

            GetArchivos(obj[0]["ID_Nivel"]);
        })

}
//MOSTRAMOS LOS ARCHIVOS
function GetArchivos(IDNivel) {
    var existeArchivo = false


    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 7);
    FoDatos.append('IDNivel', IDNivel);

    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto
            var div = document.getElementById("Materiales");
            var video = 2
            $("#Materiales").empty();

            var h2 = document.createElement('h5');


            div.appendChild(h2);
            for (var i in obj) {
                if (obj[i]['Tipo'] == '  Archivo') {
                    existeArchivo = true;
                    var a = document.createElement('a');
                    a.setAttribute("class", "form-text");
                    a.setAttribute("href", obj[i]['Ruta']);
                    a.innerHTML = obj[i]['NombreArchivo'];

                    var br = document.createElement('br');
                    div.appendChild(a);
                    div.appendChild(br);


                }
                if (obj[i]['Tipo'] == '  video') {
                    var divideo = document.getElementById("videoExtra");

                    var btn = document.createElement('btn');
                    btn.setAttribute("class", "btn btn-outline-light w-50 mb-3");
                    btn.setAttribute("type", 'submit');
                    ruta = obj[i]['Ruta'];
                    btn.setAttribute("onclick", "changeVideo('" + obj[i]['Ruta'] + "');");
                    btn.innerHTML = "Parte " + video;

                    var br = document.createElement('br');
                    divideo.appendChild(btn);
                    divideo.appendChild(br);
                    video++;
                    existeVideos = true;


                }

            }
            if (existeArchivo == true) {
                h2.innerHTML = "Materiales del Nivel ";
            }





        })
}
//MOSTRAMOS LOS COMENTARIOS DEL CURSO
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
            $("#Comentarios").empty();
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
//MOSTRAMOS LOS LIKES DEL CURSO
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
//MOSTRAMOS LOS DISLIKES DEL CURSO
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

//CHECAMOS SI EL USUARIO YA COMENTÓ EL CURSO
function GetComentariosUser() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'E');
    FoDatos.append('ID_Curso', ID_Curso);
    FoDatos.append('ID_Estudiante', ID_Usuario);

    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto
            if (data != "[]") { //Si el usuario YA comentó
                document.getElementById("btnlikes").style.display = 'none';
                document.getElementById("comentar").style.display = 'none';
               var Calif =  document.getElementById("Calificacion");
               Calif.innerHTML = "Calificación del cusro";
            }
        })

}



//CAMBIAMOS EL VIDEO AL DAR CLICK A OTROS VIDEOS
function changeVideo(ruta) {

    document.getElementById('Nivelvideo').src = ruta;
}

//ACTUALIZAMOS LA FECHA ACCEDIDA
function ActualizarFecha() {
    //CHECAMOS SI HAY INSCRIPCIÓN EN ESE CURSO
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 7);
    FoDatos.append('ID_Estudiante', ID_Usuario);
    FoDatos.append('ID_Curso', ID_Curso);
    fetch('php/Inscripcion.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto

            if (data == 1) {
                console.log("Se actualizó la fecha");
            }


        })


}

//COMENTARIO

formularioComentario.addEventListener("submit", e => {



    var comentario = document.getElementById('txt_Comment').value;
    var like = $('input:radio[name=like]:checked').val();


    if (like == "like") {
        like = 1;
    } else {
        like = 0;
    }

    e.preventDefault();

    var FoDatos = new FormData(); //Form artificial de HTML

    FoDatos.append('comentario', comentario);
    FoDatos.append('like', like);
    FoDatos.append('ID_Estudiante', ID_Usuario);
    FoDatos.append('ID_Curso', ID_Curso);
    FoDatos.append('opc', 'C');

    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data); //Imprimimos el texto
          
                alert("Gracias por su opinión");
                GetComentariosUser();
                GetComentarios();
        })


});


//Barra de navegación
function BuscarCurso() {
    var BuscarCurso = document.getElementById('Buscador').value;
    window.location.href = "Principal.html?buscar=" + BuscarCurso;

}

function Diploma(){
    window.location.href = "VerCertificado.html?id=" + ID_Curso;

}