$(document).ready(function () {
    getParameters();
    GetCategories();
    GetRol();
    if (BUSQUEDA == false) {
        GetCursos();
    }

    GetEscuelas();

});
var ID_Usuario;
var rol;
var nombreCat;
var BUSQUEDA = false;
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
                document.getElementById("btn_iniciar").style.display = 'none';
                document.getElementById("btn_registro").style.display = 'none';
            } else {
                document.getElementById("BtnPerfil").style.display = 'none';
                document.getElementById("btn_cerrar").style.display = 'none';
                document.getElementById("btn_iniciar").style.display = 'block';
                document.getElementById("btn_misCursos").style.display = 'none';
                document.getElementById("btn_mensajes").style.display = 'none';
                document.getElementById("btn_registro").style.display = 'block';
                document.getElementById("btn_cat").style.display = 'none';
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

            //MENU IZQUIERDO
            //Obtenemos el id del div de categorias
            var div = document.getElementById("categorias");
            //Creamos un h5
            var h5 = document.createElement('h5');
            h5.innerHTML = "Categorías"; //Escribimos categorias en h5
            div.appendChild(h5);

            //FOOTER
            var footer = document.getElementById("footerCat");

            //MOSTRAR LAS CATEGORIAS
            for (var i in obj) {
                //MENU IZQUIERDO
                var a = document.createElement('label');
                a.setAttribute("class", "form-text ");
                a.setAttribute("id", "categoryref");
                a.setAttribute("onclick", "GetCursosCategoria(" + obj[i]['ID'] + ");");
                a.innerHTML = obj[i]['Nombre'];
                div.appendChild(a);
                var br = document.createElement('br');
                div.appendChild(br);

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
            var a = document.createElement('label');
            a.setAttribute("class", "form-text ");
            a.setAttribute("id", "categoryref");
            a.setAttribute("onclick", "GetCursos()");
            a.innerHTML = "Todas";
            div.appendChild(a);
            var br = document.createElement('br');
            div.appendChild(br);
        })

}

function GetCursos() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 3);
    $("#cursos").empty();
    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto


            //Obtenemos el id del div de los cursos
            var div = document.getElementById("cursos");

            for (var i in obj) {

                var div2 = document.createElement('div');
                div2.setAttribute("class", "card d-inline-flex rounded shadow-lg m-3");
                div2.setAttribute("style", "width: 18rem;");

                var img = document.createElement('img');
                img.setAttribute("class", "card-img-top");
                img.setAttribute("src", "php/CursosFoto.php?id=" + obj[i]['ID']);
                img.setAttribute("alt", "Card image cap");

                var h5 = document.createElement('h5');
                h5.setAttribute("class", "card-title text-dark");
                h5.innerHTML = obj[i]['Título'];

                var div3 = document.createElement('div');
                div3.setAttribute("class", "card-body align-items-end");

                var small = document.createElement('small');
                small.setAttribute("class", "text-muted");
                small.setAttribute("id", "cursoCat" + i);
                GetCategoriaCurso(obj[i]['ID'], i);

                var p = document.createElement('p');
                p.setAttribute("class", "card-text");
                small.setAttribute("id", "cursoCat" + i);

                var p2 = document.createElement('p');
                p2.setAttribute("class", "card-text text-dark");
                p2.innerHTML = obj[i]['Descripción'];


                var btn = document.createElement('p');
                btn.setAttribute("class", "btn btn-success");
                btn.setAttribute("onclick", "getIdFormA(this.id);");
                btn.setAttribute("id", obj[i]['ID']);
                btn.innerHTML = "Ver curso";



                div.appendChild(div2);
                div2.appendChild(img);
                div2.appendChild(div3);
                div3.appendChild(h5);
                div3.appendChild(small);
                small.appendChild(p);
                div3.appendChild(p2);
                if (rol == 0) {
                    div3.appendChild(btn);
                }

            }


        })

}

function GetCategoriaCurso(ID, n) {
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
                $("#cursoCat" + n).append('<b>Categorias: </b>');
            }

            for (var i in obj) {
                $("#cursoCat" + n).append(obj[i]['Nombre'] + " ")
            }


        })
}
function GetEscuelas() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 5);

    fetch('php/User.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto

            //MENU IZQUIERDO
            //Obtenemos el id del div de Escuelas
            var div = document.getElementById("Escuelas");

            //MOSTRAR LAS ESCUELAS
            for (var i in obj) {
                //MENU IZQUIERDO
                var a = document.createElement('label');
                a.setAttribute("class", "form-text ");
                a.setAttribute("id", "categoryref");
                a.setAttribute("hover", "white");
                a.setAttribute("href", "");
                a.setAttribute("onclick", "GetCursosEscuela(" + obj[i]['ID'] + ");");
                a.innerHTML = obj[i]['Nombre'];
                div.appendChild(a);
                var br = document.createElement('br');
                div.appendChild(br);



            }
            var a = document.createElement('label');
            a.setAttribute("class", "form-text ");
            a.setAttribute("id", "categoryref");
            a.setAttribute("onclick", "GetCursos()");
            a.innerHTML = "Todas";
            div.appendChild(a);
            var br = document.createElement('br');
            div.appendChild(br);
        })

}

//CLICK AL BOTON DE VER CURSO
function getIdFormA(ID_Curso) {

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

            if (data == "[]") {//Si no hay inscripción
                window.location.href = "VerCostoCurso.html?id=" + ID_Curso;
            } else { //Si si esta inscrito
                Yatermino(ID_Curso);

            }
        })


}


//FILTRA CURSOS POR CATEGORÍAS

function GetCursosCategoria(ID_Cat) {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 3);
    FoDatos.append('ID_Cat', ID_Cat);

    fetch('php/Category.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto


            //Obtenemos el id del div de los cursos
            var div = document.getElementById("cursos");
            $("#cursos").empty();
            for (var i in obj) {

                var div2 = document.createElement('div');
                div2.setAttribute("class", "card d-inline-flex rounded shadow-lg m-3");
                div2.setAttribute("style", "width: 18rem;");

                var img = document.createElement('img');
                img.setAttribute("class", "card-img-top");
                img.setAttribute("src", "php/CursosFoto.php?id=" + obj[i]['ID']);
                img.setAttribute("alt", "Card image cap");

                var h5 = document.createElement('h5');
                h5.setAttribute("class", "card-title text-dark");
                h5.innerHTML = obj[i]['Título'];

                var div3 = document.createElement('div');
                div3.setAttribute("class", "card-body align-items-end");

                var small = document.createElement('small');
                small.setAttribute("class", "text-muted");
                small.setAttribute("id", "cursoCat" + i);
                GetCategoriaCurso(obj[i]['ID'], i);

                var p = document.createElement('p');
                p.setAttribute("class", "card-text");
                small.setAttribute("id", "cursoCat" + i);

                var p2 = document.createElement('p');
                p2.setAttribute("class", "card-text text-dark");
                p2.innerHTML = obj[i]['Descripción'];


                var btn = document.createElement('p');
                btn.setAttribute("class", "btn btn-success");
                btn.setAttribute("onclick", "getIdFormA(this.id);");
                btn.setAttribute("id", obj[i]['ID']);
                btn.innerHTML = "Ver curso";

                div.appendChild(div2);
                div2.appendChild(img);
                div2.appendChild(div3);
                div3.appendChild(h5);
                div3.appendChild(small);
                small.appendChild(p);
                div3.appendChild(p2);
                if (rol == 0) {
                    div3.appendChild(btn);
                }

            }


        })

}

//FILTRA CURSOS POR ESCUELAS

function GetCursosEscuela(ID_Escuela) {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 6);
    FoDatos.append('ID_Escuela', ID_Escuela);

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
            var div = document.getElementById("cursos");
            $("#cursos").empty();
            for (var i in obj) {

                var div2 = document.createElement('div');
                div2.setAttribute("class", "card d-inline-flex rounded shadow-lg m-3");
                div2.setAttribute("style", "width: 18rem;");

                var img = document.createElement('img');
                img.setAttribute("class", "card-img-top");
                img.setAttribute("src", "php/CursosFoto.php?id=" + obj[i]['ID']);
                img.setAttribute("alt", "Card image cap");

                var h5 = document.createElement('h5');
                h5.setAttribute("class", "card-title text-dark");
                h5.innerHTML = obj[i]['Título'];

                var div3 = document.createElement('div');
                div3.setAttribute("class", "card-body align-items-end");

                var small = document.createElement('small');
                small.setAttribute("class", "text-muted");
                small.setAttribute("id", "cursoCat" + i);
                GetCategoriaCurso(obj[i]['ID'], i);

                var p = document.createElement('p');
                p.setAttribute("class", "card-text");
                small.setAttribute("id", "cursoCat" + i);

                var p2 = document.createElement('p');
                p2.setAttribute("class", "card-text text-dark");
                p2.innerHTML = obj[i]['Descripción'];


                var btn = document.createElement('p');
                btn.setAttribute("class", "btn btn-success");
                btn.setAttribute("onclick", "getIdFormA(this.id);");
                btn.setAttribute("id", obj[i]['ID']);
                btn.innerHTML = "Ver curso";

                div.appendChild(div2);
                div2.appendChild(img);
                div2.appendChild(div3);
                div3.appendChild(h5);
                div3.appendChild(small);
                small.appendChild(p);
                div3.appendChild(p2);
                if (rol == 0) {
                    div3.appendChild(btn);
                }

            }


        })

}

//FILTRA MEJORES CURSOS

function MejoresCursos() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'F');


    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto


            //Obtenemos el id del div de los cursos
            var div = document.getElementById("cursos");
            $("#cursos").empty();
            for (var i in obj) {

                var div2 = document.createElement('div');
                div2.setAttribute("class", "card d-inline-flex rounded shadow-lg m-3");
                div2.setAttribute("style", "width: 18rem;");

                var img = document.createElement('img');
                img.setAttribute("class", "card-img-top");
                img.setAttribute("src", "php/CursosFoto.php?id=" + obj[i]['ID']);
                img.setAttribute("alt", "Card image cap");

                var h5 = document.createElement('h5');
                h5.setAttribute("class", "card-title text-dark");
                h5.innerHTML = obj[i]['Título'];

                var div3 = document.createElement('div');
                div3.setAttribute("class", "card-body align-items-end");

                var small = document.createElement('small');
                small.setAttribute("class", "text-muted");
                small.setAttribute("id", "cursoCat" + i);
                GetCategoriaCurso(obj[i]['ID'], i);

                var p = document.createElement('p');
                p.setAttribute("class", "card-text");
                small.setAttribute("id", "cursoCat" + i);

                var p2 = document.createElement('p');
                p2.setAttribute("class", "card-text text-dark");
                p2.innerHTML = obj[i]['Descripción'];


                var btn = document.createElement('p');
                btn.setAttribute("class", "btn btn-success");
                btn.setAttribute("onclick", "getIdFormA(this.id);");
                btn.setAttribute("id", obj[i]['ID']);
                btn.innerHTML = "Ver curso";

                div.appendChild(div2);
                div2.appendChild(img);
                div2.appendChild(div3);
                div3.appendChild(h5);
                div3.appendChild(small);
                small.appendChild(p);
                div3.appendChild(p2);
                if (rol == 0) {
                    div3.appendChild(btn);
                }

            }


        })

}
//FILTRA CURSOS MÁS RECIENTES 

function CursosRecientes() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'G');


    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto


            //Obtenemos el id del div de los cursos
            var div = document.getElementById("cursos");
            $("#cursos").empty();
            for (var i in obj) {

                var div2 = document.createElement('div');
                div2.setAttribute("class", "card d-inline-flex rounded shadow-lg m-3");
                div2.setAttribute("style", "width: 18rem;");

                var img = document.createElement('img');
                img.setAttribute("class", "card-img-top");
                img.setAttribute("src", "php/CursosFoto.php?id=" + obj[i]['ID']);
                img.setAttribute("alt", "Card image cap");

                var h5 = document.createElement('h5');
                h5.setAttribute("class", "card-title text-dark");
                h5.innerHTML = obj[i]['Título'];

                var div3 = document.createElement('div');
                div3.setAttribute("class", "card-body align-items-end");

                var small = document.createElement('small');
                small.setAttribute("class", "text-muted");
                small.setAttribute("id", "cursoCat" + i);
                GetCategoriaCurso(obj[i]['ID'], i);

                var p = document.createElement('p');
                p.setAttribute("class", "card-text");
                small.setAttribute("id", "cursoCat" + i);

                var p2 = document.createElement('p');
                p2.setAttribute("class", "card-text text-dark");
                p2.innerHTML = obj[i]['Descripción'];


                var btn = document.createElement('p');
                btn.setAttribute("class", "btn btn-success");
                btn.setAttribute("onclick", "getIdFormA(this.id);");
                btn.setAttribute("id", obj[i]['ID']);
                btn.innerHTML = "Ver curso";

                div.appendChild(div2);
                div2.appendChild(img);
                div2.appendChild(div3);
                div3.appendChild(h5);
                div3.appendChild(small);
                small.appendChild(p);
                div3.appendChild(p2);
                if (rol == 0) {
                    div3.appendChild(btn);
                }

            }


        })

}
//FILTRA CURSOS MÁS VENDIDOS

function CursosMasVendidos() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'H');


    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto


            //Obtenemos el id del div de los cursos
            var div = document.getElementById("cursos");
            $("#cursos").empty();
            for (var i in obj) {

                var div2 = document.createElement('div');
                div2.setAttribute("class", "card d-inline-flex rounded shadow-lg m-3");
                div2.setAttribute("style", "width: 18rem;");

                var img = document.createElement('img');
                img.setAttribute("class", "card-img-top");
                img.setAttribute("src", "php/CursosFoto.php?id=" + obj[i]['ID']);
                img.setAttribute("alt", "Card image cap");

                var h5 = document.createElement('h5');
                h5.setAttribute("class", "card-title text-dark");
                h5.innerHTML = obj[i]['Título'];

                var div3 = document.createElement('div');
                div3.setAttribute("class", "card-body align-items-end");

                var small = document.createElement('small');
                small.setAttribute("class", "text-muted");
                small.setAttribute("id", "cursoCat" + i);
                GetCategoriaCurso(obj[i]['ID'], i);

                var p = document.createElement('p');
                p.setAttribute("class", "card-text");
                small.setAttribute("id", "cursoCat" + i);

                var p2 = document.createElement('p');
                p2.setAttribute("class", "card-text text-dark");
                p2.innerHTML = obj[i]['Descripción'];


                var btn = document.createElement('p');
                btn.setAttribute("class", "btn btn-success");
                btn.setAttribute("onclick", "getIdFormA(this.id);");
                btn.setAttribute("id", obj[i]['ID']);
                btn.innerHTML = "Ver curso";

                div.appendChild(div2);
                div2.appendChild(img);
                div2.appendChild(div3);
                div3.appendChild(h5);
                div3.appendChild(small);
                small.appendChild(p);
                div3.appendChild(p2);
                if (rol == 0) {
                    div3.appendChild(btn);
                }

            }


        })

}
//BUSQUEDA DE CURSOS
function BuscarCurso() {
    var BuscarCurso = document.getElementById('Buscador').value;
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 9);
    FoDatos.append('Busqueda', BuscarCurso);

    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto


            //Obtenemos el id del div de los cursos
            var div = document.getElementById("cursos");
            $("#cursos").empty();
            for (var i in obj) {

                var div2 = document.createElement('div');
                div2.setAttribute("class", "card d-inline-flex rounded shadow-lg m-3");
                div2.setAttribute("style", "width: 18rem;");

                var img = document.createElement('img');
                img.setAttribute("class", "card-img-top");
                img.setAttribute("src", "php/CursosFoto.php?id=" + obj[i]['ID']);
                img.setAttribute("alt", "Card image cap");

                var h5 = document.createElement('h5');
                h5.setAttribute("class", "card-title text-dark");
                h5.innerHTML = obj[i]['Título'];

                var div3 = document.createElement('div');
                div3.setAttribute("class", "card-body align-items-end");

                var small = document.createElement('small');
                small.setAttribute("class", "text-muted");
                small.setAttribute("id", "cursoCat" + i);
                GetCategoriaCurso(obj[i]['ID'], i);

                var p = document.createElement('p');
                p.setAttribute("class", "card-text");
                small.setAttribute("id", "cursoCat" + i);

                var p2 = document.createElement('p');
                p2.setAttribute("class", "card-text text-dark");
                p2.innerHTML = obj[i]['Descripción'];


                var btn = document.createElement('p');
                btn.setAttribute("class", "btn btn-success");
                btn.setAttribute("onclick", "getIdFormA(this.id);");
                btn.setAttribute("id", obj[i]['ID']);
                btn.innerHTML = "Ver curso";

                div.appendChild(div2);
                div2.appendChild(img);
                div2.appendChild(div3);
                div3.appendChild(h5);
                div3.appendChild(small);
                small.appendChild(p);
                div3.appendChild(p2);
                if (rol == 0) {
                    div3.appendChild(btn);
                }

            }


        })

}
//BUSQUEDA DE CURSOS A TRAVES DE OTRA PAGINA
function BuscarCursoPage(BuscarCurso) {

    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 9);
    FoDatos.append('Busqueda', BuscarCurso);

    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto


            //Obtenemos el id del div de los cursos
            var div = document.getElementById("cursos");
            $("#cursos").empty();
            for (var i in obj) {

                var div2 = document.createElement('div');
                div2.setAttribute("class", "card d-inline-flex rounded shadow-lg m-3");
                div2.setAttribute("style", "width: 18rem;");

                var img = document.createElement('img');
                img.setAttribute("class", "card-img-top");
                img.setAttribute("src", "php/CursosFoto.php?id=" + obj[i]['ID']);
                img.setAttribute("alt", "Card image cap");

                var h5 = document.createElement('h5');
                h5.setAttribute("class", "card-title text-dark");
                h5.innerHTML = obj[i]['Título'];

                var div3 = document.createElement('div');
                div3.setAttribute("class", "card-body align-items-end");

                var small = document.createElement('small');
                small.setAttribute("class", "text-muted");
                small.setAttribute("id", "cursoCat" + i);
                GetCategoriaCurso(obj[i]['ID'], i);

                var p = document.createElement('p');
                p.setAttribute("class", "card-text");
                small.setAttribute("id", "cursoCat" + i);

                var p2 = document.createElement('p');
                p2.setAttribute("class", "card-text text-dark");
                p2.innerHTML = obj[i]['Descripción'];


                var btn = document.createElement('p');
                btn.setAttribute("class", "btn btn-success");
                btn.setAttribute("onclick", "getIdFormA(this.id);");
                btn.setAttribute("id", obj[i]['ID']);
                btn.innerHTML = "Ver curso";

                div.appendChild(div2);
                div2.appendChild(img);
                div2.appendChild(div3);
                div3.appendChild(h5);
                div3.appendChild(small);
                small.appendChild(p);
                div3.appendChild(p2);
                if (rol == 0) {
                    div3.appendChild(btn);
                }

            }


        })

}

function getParameters() {
    var buscar;
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
    buscar = parameters["buscar"];
    if (buscar != undefined) {
        BUSQUEDA = true;
        BuscarCursoPage(buscar);
    }






}

//CHECAMOS SI EL USUARIO YA TERMINO EL CURSO
function Yatermino(ID_Curso) {
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
            if (obj[0]["YaTermino"] == 1) {


                window.location.href = "CursoTerminado.html?id=" + ID_Curso;

            } else {
                window.location.href = "VerCurso.html?id=" + ID_Curso;
            }
        })
}
















