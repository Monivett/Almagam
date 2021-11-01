$(document).ready(function () {
    getParameters();
    MostrarUser();
    GetCategories();
    GetCursos();
    GetTotalCurso();
});

var ID_Usuario;
var ID_Curso;
var cantidadNiveles;
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

            console.log(obj['Nombre']);
            ID_Usuario = obj['ID'];
            if (data != "[]") {
                GetAlumnos();
            }


        })


}
function GetCategories() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 2);

    fetch('php/Category.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto


            //FOOTER
            var footer = document.getElementById("footerCat");

            //MOSTRAR LAS CATEGORIAS
            for (var i in obj) {

                //FOOTER

                var ul = document.createElement('ul');
                ul.setAttribute("class", "col-4 mt-2 list-unstyled");

                var btn = document.createElement('button');
                btn.setAttribute("type", "button");
                btn.setAttribute("class", "btn btn-dark mt-2 mb-2");
                btn.innerHTML = obj[i]['Nombre'];
                footer.appendChild(btn);
                var br = document.createElement('br');
                footer.appendChild(ul);
                ul.appendChild(btn);


            }


        })

}

function GetAlumnos() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'G');
    FoDatos.append('ID_User', ID_Curso);

    fetch('php/User.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto


            //Obtenemos el id del div de los cursos
            var div = document.getElementById("ventas");
            $("#ventas").empty();
            n = 1;
            for (var i in obj) {

                var tr = document.createElement('tr');
                tr.setAttribute("id", "fila" + i);

                var th = document.createElement('th');
                th.setAttribute("scope", "row");
                th.innerHTML = n;

                var td = document.createElement('td');
                td.innerHTML = obj[i]['Nombre'];

                var td2 = document.createElement('td');
                td2.innerHTML = obj[i]['FechaIngreso'];

                var td3 = document.createElement('td');
                td3.innerHTML = obj[i]['NúmeroNivel'] + "/" + cantidadNiveles;

                var td4 = document.createElement('td');
                td4.innerHTML = obj[i]['Monto'];

                var td5 = document.createElement('td');
                td5.innerHTML = obj[i]['FormaPago'];

                div.appendChild(tr);
                tr.appendChild(th);
                tr.appendChild(td);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);

                // GetInfoCursoVentas(obj[i]['ID'], i,cantidadNiveles);

                n++;

            }


        })

}

function GetTotalCurso() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'H');
    FoDatos.append('ID_User', ID_Curso);

    fetch('php/User.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto



            var div = document.getElementById("total");

            div.innerHTML = "Total de ingresos por el curso: "+obj[0]['Total'];
         



        })
}

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



            }
            var btn = document.getElementById('btn_nombre');
            btn.innerHTML = obj[0]['Título'];
            cantidadNiveles = obj[0]['CantidadNiveles'];


        })

}
function BuscarCurso() {
    var BuscarCurso = document.getElementById('Buscador').value;
    window.location.href = "Principal.html?buscar=" + BuscarCurso;

}