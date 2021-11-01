var ID_Curso;
var pago;
var ID_Usuario;
var NivelActual;
var IDNivelActual;
var NivelProgreso; //Nivel en el que va el estudiante
var NivelCobro;
var cantidadNiveles;
var FormaCobro;
$(document).ready(function () {
    GetRol();
    getParameters();
    GetNivel(1);

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
                PagoHecho();
                Avance();
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
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto
            if (data != "[]") {
                ActualizarFecha();
                GetComentarios();


            }
            cantidadNiveles = obj[0]["CantidadNiveles"];
            if (cantidadNiveles == NivelProgreso) {
                Yatermino();
            }
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
                if (i <= NivelProgreso) {

                    a.appendChild(icon);
                }

                div.appendChild(div2);
                div2.appendChild(div3);
                div3.appendChild(a);
                if (FormaCobro == 1) { //Si el cobro es por nivel
                    //SI EL USUARIO NO PAGO

                    if (pago == 0) {
                        if (i >= NivelCobro) { //BLOQUEA LOS NIVELES A PARTIR DEL NIVEL A COBRAR

                            document.getElementById("BotonNivel" + i).style.backgroundColor = '#CBCBCB  ';
                            document.getElementById("BotonNivel" + i).onclick = function () { NivelesPagados() };
                        }
                    }
                }

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


//CAMBIAMOS EL VIDEO AL DAR CLICK A OTROS VIDEOS
function changeVideo(ruta) {

    document.getElementById('Nivelvideo').src = ruta;
}

//MOSTRAMOS LOS NIVELES QUE NO SE HAN PAGADO 
function NivelesPagados() {
    var respuesta = confirm("Favor de realizar el pago del curso completo")

    if (respuesta)
        window.location.href = "PagarCurso.html?id=" + ID_Curso;
}

//VERIFICAR SI EL ESTUDIANTE PAGO POR LOS NIVELES
function PagoHecho() {
    //CHECAMOS SI HAY INSCRIPCIÓN EN ESE CURSO
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 1);
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
            pago = obj[0]["YaPago"]
            if (data != "[]") {
                GetCursos();
            }


        })


}
//VER AVANCE DE ESTUDIANTE
function Avance() {
    //CHECAMOS SI HAY INSCRIPCIÓN EN ESE CURSO
    var FoDatos = new FormData();
    FoDatos.append('opc', 6);
    FoDatos.append('ID_Estudiante', ID_Usuario);
    FoDatos.append('ID_Curso', ID_Curso);
    fetch('php/Inscripcion.php', { method: "POST", body: FoDatos })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto

            if (data != "[]") {//Si hay algun dato
                NivelProgreso = obj[0]["NúmeroNivel"];
            }

        })


}
//FUNCIÓN PARA CUANDO TERMINE EL CURSO
function Yatermino() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 5);
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

                alert("Felicidades has completado el curso");
                window.location.href = "CursoTerminado.html?id=" + ID_Curso;

            }
        })
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

//REGISTRAR EL AVANCE DEL ESTUDIANTE
$("#Nivelvideo").bind('ended', function () { //Cuando complete el video se actualiza el nivel
    if (NivelProgreso < NivelActual || NivelProgreso == undefined) {



        var FoDatos = new FormData(); //Form de HTML
        FoDatos.append('opc', 4);
        FoDatos.append('ID_Estudiante', ID_Usuario);
        FoDatos.append('ID_Curso', ID_Curso);
        FoDatos.append('ID_Nivel', IDNivelActual);

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
                    Avance();
                    alert("Felicidades has completado el nivel " + NivelActual);
                    GetCursos(ID_Curso);

                }
            })
    }
});



//Barra de navegación
function BuscarCurso() {
    var BuscarCurso = document.getElementById('Buscador').value;
    window.location.href = "Principal.html?buscar=" + BuscarCurso;

}