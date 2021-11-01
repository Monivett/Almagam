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
                GetCursosEscuela(ID_Usuario);
                GetTotalVentas();
                GetVentasEfectivo();
                GetVentasTransferencia();
                GetVentasTarjeta();
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
            var div = document.getElementById("TabCursos2");
            $("#TabCursos2").empty();
            for (var i in obj) {

            
                var div1 = document.createElement('div');
                div1.setAttribute("class", "card d-inline-flex m-3");
                div1.setAttribute("style", "width: 100%;");

                var div2 = document.createElement('div');
                div2.setAttribute("class", "card-body");


                var div3 = document.createElement('div');
                div3.setAttribute("class", "row mb-3");


                var div4 = document.createElement('div');
                div4.setAttribute("class", "col-md-8");

                var div5 = document.createElement('div');
                div5.setAttribute("class", "card-body text-center");
                var h4 = document.createElement('h4');
                h4.setAttribute("class", "card-text text-dark mb-3");
                h4.innerHTML = obj[i]['Título'];


                var btn = document.createElement('btn');
                btn.setAttribute("class", "btn btn-success flex-grow-1 mr-2");
                btn.innerHTML = "Ver ventas";
                btn.setAttribute("onclick", "getIdFormA(this.id);");
                btn.setAttribute("id", obj[i]['ID']);
                
        
                div.appendChild(div1);
                div1.appendChild(div2);
                div2.appendChild(div3);
                div3.appendChild(div4);
                div4.appendChild(div5);
                div5.appendChild(h4);
                div5.appendChild(btn);
              

         


            }


        })

}
function GetTotalVentas() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'C');
    FoDatos.append('ID_User', ID_Usuario);

    fetch('php/User.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto



            var total = document.getElementById("TOTAL");
            if( obj[0]["Total"]!=null){
                total.innerHTML = "Total Ingreso por todos los Cursos: " + obj[0]["Total"];
            }else{
                total.innerHTML = "Total Ingreso por todos los Cursos: $0";
            }
          


        })
}
function GetVentasEfectivo() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'D');
    FoDatos.append('ID_User', ID_Usuario);

    fetch('php/User.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto



            var total = document.getElementById("EFECTIVO");
            if( obj[0]["Total"]!=null){
                total.innerHTML = "Total de Pago Con Efectivo: " + obj[0]["Total"];
            }else{
                total.innerHTML = "Total de Pago Con Efectivo: $0";
            }
          


        })
}
function GetVentasTransferencia() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'E');
    FoDatos.append('ID_User', ID_Usuario);

    fetch('php/User.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto



            var total = document.getElementById("TRANSFERENCIA");
            if( obj[0]["Total"]!=null){
                total.innerHTML = "Total de Pago Con Transferencia: " + obj[0]["Total"];
            }else{
                total.innerHTML = "Total de Pago Con Transferencia:  $0";
            }
          


        })
}
function GetVentasTarjeta() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 'F');
    FoDatos.append('ID_User', ID_Usuario);

    fetch('php/User.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            var Jason = data;
            var obj = JSON.parse(Jason);
            console.log(obj); //Imprimimos el texto



            var total = document.getElementById("TARJETA");
            if( obj[0]["Total"]!=null){
                total.innerHTML = "Total de Pago Con Tarjeta: " + obj[0]["Total"];
            }else{
                total.innerHTML = "Total de Pago Con Tarjeta: $0";
            }
          


        })
}
function BuscarCurso() {
    var BuscarCurso = document.getElementById('Buscador').value;
    window.location.href = "Principal.html?buscar=" + BuscarCurso;

}

//CLICK AL BOTON DE VER CURSO
function getIdFormA(ID_Curso) {

    
                window.location.href = "VentasDetalle.html?id=" + ID_Curso;
      

}
