$(document).ready(function () {

    MostrarUser();
    GetCategories();

});
var ID_Usuario;
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
            document.getElementById("name").innerHTML = obj['Nombre'];
            document.getElementById("fecha").innerHTML = obj['FechaNacimiento'];
            document.getElementById("correo").innerHTML = obj['Email'];
            document.getElementById("fechaR").innerHTML = obj['FechaRegistro'];

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
            var div = document.getElementById("venta");
            $("#venta").empty();
            for (var i in obj) {
                var div3 = document.createElement('div');
                div3.setAttribute("class", "row");

                var div4 = document.createElement('div');
                div4.setAttribute("class", "col-md-4");
                var img = document.createElement('img');
                img.setAttribute("class", "card-img-top img-thumbnail");
                img.setAttribute("src", "php/CursosFoto.php?id=" + obj[i]['Curso']);
                img.setAttribute("alt", "Card image cap");

                var div5 = document.createElement('div');
                div5.setAttribute("class", "col-md-8");

                var div7 = document.createElement('div');
                div7.setAttribute("class", "card-body text-center");
                var h4 = document.createElement('h4');
                h4.setAttribute("class", "card-text text-dark mb-3");
                h4.innerHTML = obj[i]['Título'];


                var div8 = document.createElement('div');
                div8.setAttribute("class", "card-body");
                var h5 = document.createElement('h5');
                h5.setAttribute("class", "card-text text-dark mb-3");
                var nivel = obj[i]['Nivel'];
                if (nivel == null) {
                    nivel = 0;
                }
                h5.innerHTML = "Tu Avance actual en el curso es: " + nivel + "/" + obj[i]['CantidadNiveles'];
                var p = document.createElement('p');
                p.setAttribute("class", "card-text");
                var small = document.createElement('small');
                small.setAttribute("class", "text-muted");
                small.innerHTML = "Fecha de inscipcion:  " + obj[i]['FechaIngreso'];
                var p2 = document.createElement('p');
                p2.setAttribute("class", "card-text");
                var small2 = document.createElement('small');
                small2.setAttribute("class", "text-muted");
                small2.innerHTML = "Última Fecha que ingresó:  " + obj[i]['FechaReciente'];

                div.appendChild(div2);
                div2.appendChild(div3);
                div3.appendChild(div4);
                div4.appendChild(img);
                div3.appendChild(div5);
                div5.appendChild(div7);
                div7.appendChild(h4);
                div7.appendChild(h4);
                div5.appendChild(div8);
                div8.appendChild(h5);
                div8.appendChild(p);
                p.appendChild(small);
                div8.appendChild(p2);
                p2.appendChild(small2);

                if (obj[i]['FechaTerminación'] != null) {
                    var p3 = document.createElement('p');
                    p3.setAttribute("class", "card-text");
                    var small3 = document.createElement('small');
                    small3.setAttribute("class", "text-muted");
                    small3.innerHTML = "Fecha de terminación:  " + obj[i]['FechaTerminación'];
                    div8.appendChild(p3);
                    p3.appendChild(small3);
                }
                var btn = document.createElement('btn');
                btn.setAttribute("class", "btn btn-outline-success flex-grow-1 mr-2");
                btn.setAttribute("onclick", "getIdFormA(this.id);");
                btn.setAttribute("id", obj[i]['Curso']);
                btn.innerHTML = "Ir al curso ";
                div8.appendChild(btn);

            }


        })

}
function BuscarCurso() {
    var BuscarCurso = document.getElementById('Buscador').value;
    window.location.href = "Principal.html?buscar=" + BuscarCurso;

}