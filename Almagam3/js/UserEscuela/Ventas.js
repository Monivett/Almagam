$(document).ready(function () {

    MostrarUser();
    GetCategories();

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
                GetCursosEscuela();
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

function GetCursosEscuela() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 6);
    FoDatos.append('ID_Escuela', ID_Usuario);

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
             cantidadNiveles = obj[i]['CantidadNiveles'];
                var tr = document.createElement('tr');
                tr.setAttribute("id", "fila" + i);

                var th = document.createElement('th');
                th.setAttribute("scope", "row");
                th.innerHTML = n;

                var td = document.createElement('td');
                td.innerHTML = obj[i]['Título'];


                div.appendChild(tr);
                tr.appendChild(th);
                tr.appendChild(td);


                GetInfoCursoVentas(obj[i]['ID'], i,cantidadNiveles);

                n ++;

            }


        })

}

function GetInfoCursoVentas(ID_Curso, i,Nivel) {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'B');
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



            var div = document.getElementById("fila" + i);

            var td = document.createElement('td');
            td.innerHTML = obj[0]['CantidadAlumnos'];

            var t2 = document.createElement('td');
            t2.innerHTML = obj[0]['Avance'] + "/"+ Nivel;

            var td3 = document.createElement('td');


            div.appendChild(td);
            div.appendChild(t2);
            div.appendChild(td3);

            if (obj[0]['Total'] != null) {
                td3.innerHTML = obj[0]['Total'];
            } else {
                td3.innerHTML = "Curso gratuito";
            }



        })
}
function BuscarCurso() {
    var BuscarCurso = document.getElementById('Buscador').value;
    window.location.href = "Principal.html?buscar=" + BuscarCurso;

}