
const formularioRegistro = document.getElementById('RegistrarCat'); //ACCEDEMOS AL FORMULARIO
const inputs = document.querySelectorAll('input'); //ACCEDEMOS A TODOS LOS INPUTS DEL REGISTRO
var ID_Usuario;


$(document).ready(function () {

    GetIDuser();

});

    formularioRegistro.addEventListener("submit", e => {

      

        var nombre = document.getElementById('inputName').value;
        var descripcion = document.getElementById('inputDescription').value;
      
        e.preventDefault();
       
            var FoDatos = new FormData(); //Form artificial de HTML

            FoDatos.append('Nombre', nombre);
            FoDatos.append('Descp', descripcion);
            FoDatos.append('UsuarioCreacion', ID_Usuario);
            FoDatos.append('opc', 1);

            fetch('php/Category.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
                .then(response => {
                    return response.text(); //Regresa tipo de dato texto
                })
                .then(data => {
                    console.log(data); //Imprimimos el texto
                    if(data ==1){
                        alert("Se ha agregado la categoría: "+nombre);
                    }else{
                        alert("No se pudo registrar la categoría");
                    }
                formularioRegistro.reset();

                })

    
    });


    function GetIDuser() {

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