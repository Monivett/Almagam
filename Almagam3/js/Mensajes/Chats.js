const formularioChat = document.getElementById('Enviar');
$(document).ready(function () {

    GetRol();
    GetCategories();

});
var ID_Usuario;
var Recibidor;
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
                GetEscuelas();
                document.getElementById("perfilU").style.display = 'block';
                document.getElementById("perfilM").style.display = 'none';

            } else { //Si es rol: escuela
                GetEstudiantes();
                document.getElementById("perfilU").style.display = 'none';
                document.getElementById("perfilM").style.display = 'block';
                document.getElementById("btn_misCursos").onclick =  function() {location.href = "PerfilMaestro.html";}
            }
            if (Jason != 0) { //Si esta logeado
                document.getElementById("BtnPerfil").style.display = 'block';
                document.getElementById("btn_cerrar").style.display = 'block';
          
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
            var div = document.getElementById("User_Chats");
            $("#User_Chats").empty();
            //MOSTRAR LAS ESCUELAS
            for (var i in obj) {
                //MENU IZQUIERDO
                var li = document.createElement('li');
                li.setAttribute("class", "left clearfix");
                var nombre = obj[i]["Nombre"];
                li.setAttribute("onclick", "ChangeChat(" + obj[i]["ID"] + ",'" + nombre + "')");
                var span = document.createElement('span');
                span.setAttribute("class", "chat-img pull-left");
                var img = document.createElement('img');
                img.setAttribute("src", "php/UsersFoto.php?id=" + obj[i]["ID"]);
                img.setAttribute("alt", "User Avatar");
                img.setAttribute("class", "img-circle");
                var div2 = document.createElement('div');
                div2.setAttribute("class", "chat-body clearfix");
                var div3 = document.createElement('div');
                div3.setAttribute("class", "header_sec");
                var strong = document.createElement('strong');
                strong.setAttribute("class", "primary-font");
                strong.innerHTML = obj[i]["Nombre"];

                div.appendChild(li);
                li.appendChild(span);
                span.appendChild(img);
                li.appendChild(div2);
                div2.appendChild(div3);
                div3.appendChild(strong);

            }

        })

}
function GetEstudiantes() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 7);

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
            var div = document.getElementById("User_Chats");
            $("#User_Chats").empty();
            //MOSTRAR LAS ESCUELAS
            for (var i in obj) {
                //MENU IZQUIERDO
                var li = document.createElement('li');
                li.setAttribute("class", "left clearfix");
                var nombre = obj[i]["Nombre"];
                li.setAttribute("onclick", "ChangeChat(" + obj[i]["ID"] + ",'" + nombre + "')");
                var span = document.createElement('span');
                span.setAttribute("class", "chat-img pull-left");
                var img = document.createElement('img');
                img.setAttribute("src", "php/UsersFoto.php?id=" + obj[i]["ID"]);
                img.setAttribute("alt", "User Avatar");
                img.setAttribute("class", "img-circle");
                var div2 = document.createElement('div');
                div2.setAttribute("class", "chat-body clearfix");
                var div3 = document.createElement('div');
                div3.setAttribute("class", "header_sec");
                var strong = document.createElement('strong');
                strong.setAttribute("class", "primary-font");
                strong.innerHTML = obj[i]["Nombre"];

                div.appendChild(li);
                li.appendChild(span);
                span.appendChild(img);
                li.appendChild(div2);
                div2.appendChild(div3);
                div3.appendChild(strong);

            }

        })

}
function BuscarCurso() {
    var BuscarCurso = document.getElementById('Buscador').value;
    window.location.href = "Principal.html?buscar=" + BuscarCurso;

}
function ChangeChat(RecibID, i) {
    Recibidor = RecibID;

    document.getElementById('ChatFoto').src = "php/UsersFoto.php?id=" + RecibID;
    document.getElementById('ChatUsername').innerHTML = i;
    GetChats(RecibID)
}
function GetChats(Recibidor) {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('Enviador', ID_Usuario);
    FoDatos.append('Recibidor', Recibidor);
    FoDatos.append('opc', 2);

    fetch('php/Chat.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
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
            var div = document.getElementById("Chats");
            $("#Chats").empty();
            //MOSTRAR LAS ESCUELAS
            for (var i in obj) {
                //CHAR IZQUIERDO
                if (obj[i]["Recibidor"] == ID_Usuario) {
                    var li = document.createElement('li');
                    li.setAttribute("class", "left clearfix");
                    var span = document.createElement('span');
                    span.setAttribute("class", "chat-img pull-left");
                    var img = document.createElement('img');
                    img.setAttribute("src", "php/UsersFoto.php?id=" + Recibidor);

                    img.setAttribute("alt", "User Avatar");
                    img.setAttribute("class", "img-circle");
                    var div2 = document.createElement('div');
                    div2.setAttribute("class", "chat-body clearfix");
                    var p = document.createElement('p');
                    p.innerHTML = obj[i]["Mensaje"];
                    var div3 = document.createElement('div');
                    div3.setAttribute("class", "chat_time pull-right");
                    div3.innerHTML = obj[i]["Fecha"];

                    div.appendChild(li);
                    li.appendChild(span);
                    span.appendChild(img);
                    li.appendChild(div2);
                    div2.appendChild(p);
                    div2.appendChild(div3);
                } else {
                    var li = document.createElement('li');
                    li.setAttribute("class", "left clearfix admin_chat");
                    var span = document.createElement('span');
                    span.setAttribute("class", "chat-img1 pull-right");
                    var img = document.createElement('img');
                    img.setAttribute("src", "php/PerfilFoto.php");
                    img.setAttribute("alt", "User Avatar");
                    img.setAttribute("class", "img-circle");
                    var div2 = document.createElement('div');
                    div2.setAttribute("class", "chat-body clearfix");
                    var p = document.createElement('p');
                    p.setAttribute("style", "background-color: #4ec070");
                    p.innerHTML = " " + obj[i]["Mensaje"];
                    var div3 = document.createElement('div');
                    div3.setAttribute("class", "chat_time pull-left");
                    div3.innerHTML = obj[i]["Fecha"];

                    div.appendChild(li);
                    li.appendChild(span);
                    span.appendChild(img);
                    li.appendChild(div2);
                    div2.appendChild(p);
                    div2.appendChild(div3);
                }

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

//BUSCAR USUARIOS

$(document).on('change', 'input[name="Search"]', function () {
   if(rol==0){ //Si el usuario es estudiante
    BuscarEscuelas();
   }else{ //Si el usuario es maestro
    BuscarEstudiantes();
   }
});

function BuscarEstudiantes() {

    var buscar = document.getElementById('buscar').value;


    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 3);
    FoDatos.append('Nombre', buscar);

    fetch('php/Chat.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
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
            var div = document.getElementById("User_Chats");
            $("#User_Chats").empty();
            //MOSTRAR LAS ESCUELAS
            for (var i in obj) {
                //MENU IZQUIERDO
                var li = document.createElement('li');
                li.setAttribute("class", "left clearfix");
                var nombre = obj[i]["Nombre"];
                li.setAttribute("onclick", "ChangeChat(" + obj[i]["ID"] + ",'" + nombre + "')");
                var span = document.createElement('span');
                span.setAttribute("class", "chat-img pull-left");
                var img = document.createElement('img');
                img.setAttribute("src", "php/UsersFoto.php?id=" + obj[i]["ID"]);
                img.setAttribute("alt", "User Avatar");
                img.setAttribute("class", "img-circle");
                var div2 = document.createElement('div');
                div2.setAttribute("class", "chat-body clearfix");
                var div3 = document.createElement('div');
                div3.setAttribute("class", "header_sec");
                var strong = document.createElement('strong');
                strong.setAttribute("class", "primary-font");
                strong.innerHTML = obj[i]["Nombre"];

                div.appendChild(li);
                li.appendChild(span);
                span.appendChild(img);
                li.appendChild(div2);
                div2.appendChild(div3);
                div3.appendChild(strong);

            }

        })

}
function BuscarEscuelas() {

    var buscar = document.getElementById('buscar').value;


    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 4);
    FoDatos.append('Nombre', buscar);

    fetch('php/Chat.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
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
            var div = document.getElementById("User_Chats");
            $("#User_Chats").empty();
            //MOSTRAR LAS ESCUELAS
            for (var i in obj) {
                //MENU IZQUIERDO
                var li = document.createElement('li');
                li.setAttribute("class", "left clearfix");
                var nombre = obj[i]["Nombre"];
                li.setAttribute("onclick", "ChangeChat(" + obj[i]["ID"] + ",'" + nombre + "')");
                var span = document.createElement('span');
                span.setAttribute("class", "chat-img pull-left");
                var img = document.createElement('img');
                img.setAttribute("src", "php/UsersFoto.php?id=" + obj[i]["ID"]);
                img.setAttribute("alt", "User Avatar");
                img.setAttribute("class", "img-circle");
                var div2 = document.createElement('div');
                div2.setAttribute("class", "chat-body clearfix");
                var div3 = document.createElement('div');
                div3.setAttribute("class", "header_sec");
                var strong = document.createElement('strong');
                strong.setAttribute("class", "primary-font");
                strong.innerHTML = obj[i]["Nombre"];

                div.appendChild(li);
                li.appendChild(span);
                span.appendChild(img);
                li.appendChild(div2);
                div2.appendChild(div3);
                div3.appendChild(strong);

            }

        })

}
formularioChat.addEventListener("submit", e => {



    var msg = document.getElementById('txt_Mensaje').value;

    e.preventDefault();


    var FoDatos = new FormData(); //Form artificial de HTML

    FoDatos.append('Recibidor', Recibidor);
    FoDatos.append('Enviador', ID_Usuario);
    FoDatos.append('msg', msg);

    FoDatos.append('opc', 1);

    fetch('php/Chat.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data); //Imprimimos el texto
            if (data == 1) {
                console.log("Se envió el mensaje");
                formularioChat.reset();
                GetChats(Recibidor);
            } else {
                alert("Error: No se pudo mandar el mensaje");
            }


        })

});
