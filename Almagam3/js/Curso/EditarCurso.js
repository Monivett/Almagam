const formularioRegistro = document.getElementById('EditarCurso');
const inputs = document.querySelectorAll('#EditarCurso input');
var CantidadCheboxs = 0;
var ID_Curso;
var ID_Usuario;
var precio;
var gratis = false;
$(document).ready(function () {
    getParameters();

});
//Solo permite introducir números.
function soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 46 || key == 47 || key > 57) {
        //Usando la definición del DOM level 2, "return" NO funciona.
        e.preventDefault();
        alert("Ingresar solo números");
    }
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
    GetCurso();
    return parameters;
}
//OBTENER EL CURSO 
function GetCurso() {
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


            document.getElementById('inputName').value = obj[0]['Título'];
            document.getElementById('inputDesc').value = obj[0]['Descripción'];

            GetCategoriaCurso(obj[0]['ID']);


            if (obj[0]['Costo'] == 0) { //SI EL CURSO ES GRATIS
                cbox1 = document.getElementById("cbox1");
                cbox1.checked = true;
                esgratis();
            } else {
                document.getElementById('price').value = obj[0]['Costo'];
                esgratis();
            }



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

                for (var i in obj) {
                    for (var p = 0; p < CantidadCheboxs; p++) {
                        var input = document.getElementById('check_cat' + p).value;
                        if (obj[i]['Categoria'] == input) {
                            document.getElementById('check_cat' + p).checked = true;
                        }

                    }
                }


            }




        })
}


$(document).ready(function () {
    GetCategories();
    GetIDuser();
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

            //Obtenemos el id del div de categorias
            var div = document.getElementById("Checkcat");

            for (var i in obj) {
                var div2 = document.createElement('div');
                div2.setAttribute("class", "form-check");

                //Creamos un checkbox
                var input = document.createElement('input');
                input.setAttribute("class", "form-check-input");
                input.setAttribute("id", "check_cat" + i);
                input.setAttribute("name", "check_cat" + i);
                input.setAttribute("type", "checkbox");
                input.setAttribute("value", obj[i]['ID']);
                div2.appendChild(input);

                var label = document.createElement('label');
                label.setAttribute("class", "form-check-label");
                label.setAttribute("for", "check_cat");
                label.innerHTML = obj[i]['Nombre'];
                div2.appendChild(label);

                div.appendChild(div2);
                CantidadCheboxs++;
            }


        })

}
    //EDITAR EL CURSO
formularioRegistro.addEventListener("submit", e => {


  

    var titulo = document.getElementById('inputName').value;
    var descripcion = document.getElementById('inputDesc').value;






    e.preventDefault();
    var foto = $("#file")[0].files[0];
    var FoDatos = new FormData();
    FoDatos.append('ID_Curso', ID_Curso);
    FoDatos.append('titulo', titulo);
    FoDatos.append('descripcion', descripcion);
  
    FoDatos.append('escuela', ID_Usuario);
    if (foto != undefined) {
        FoDatos.append('foto', $("#file")[0].files[0]);
        FoDatos.append('opc', 'M');
    } else {
        FoDatos.append('foto', null);
        FoDatos.append('opc', 'N');
    }


    fetch('php/Curso.php', { method: "POST", body: FoDatos })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
            if (data == 1) {
                console.log("Se ha modificado el curso correctamente");

                EditarCategoriasCurso();

            } else {
                alert("No se pudo modificar el curso");
            }


        })



});

function EditarCategoriasCurso() {

    //EDITAMOS LAS CATEGORIAS DEL CURSO
    var i = 0;
    var selected = [];
    for (var p = 0; p <= CantidadCheboxs; p++) {
        $("input[id=check_cat" + p + "]:checked").each(function () {

            selected.push($(this).val());
            var cat = selected[i];

            var FoDatos = new FormData();

            FoDatos.append('cat', cat);
            FoDatos.append('curso', ID_Curso);
            FoDatos.append('opc', 4);

            fetch('php/Category.php', { method: "POST", body: FoDatos })
                .then(response => {
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                    if (data == '' || data == 1) {
                        console.log("Se ha actualizado las categorias correctamente");
                        FoDatos.append('cat', cat);
                        FoDatos.append('curso', ID_Curso);
                        FoDatos.append('opc', 5);
                        fetch('php/Category.php', { method: "POST", body: FoDatos })
                            .then(response => {
                                return response.text();
                            })
                            .then(data => {
                                console.log(data);
                                if(data==1){
                                    
                                    console.log("Se actualizaron las categorías")
                                }
                            })

                    } else {
                        console.log("No se pudo actualizar las categorias del curso");
                    }


                })

            i++;
        });
    }

    alert("Se ha modificado el curso correctamente");
    window.location.href = "EditarNiveles.html?id="+ID_Curso;

}

//MOSTRAR LA FOTO
document.getElementById('file').onchange = function (e) {//FUNCIÓN PARA PREVISUALIZAR LA IMAGEN

    let reader = new FileReader(); //Crea un obj para almacenar la imagen
    reader.readAsDataURL(e.target.files[0]); //Pasamos las propiedades de la imagen

    var fileName = this.files[0].name;
    var fileSize = this.files[0].size;

    if (fileSize > 50000000) {
        alert('El archivo es muy pesado');
        this.value = '';
        this.files[0].name = '';
    } else {
        // recuperamos la extensión del archivo
        var ext = fileName.split('.').pop();

        // Convertimos en minúscula porque 
        // la extensión del archivo puede estar en mayúscula
        ext = ext.toLowerCase();

        // console.log(ext);
        switch (ext) {
            case 'png':

                reader.onload = function () {//Cuando se cargue la imagen
                    let preview = document.getElementById('usuarioFoto'); //Relacion con el div usuario
                    Image = document.createElement('img');
                    Image.src = reader.result;//Accedemos a la propiedad del img
                    //Cambiamos el tamaño
                    Image.style.width = "550px";
                    Image.style.height = "550px";
                    preview.innerHTML = '';
                    preview.append(Image);
                };
                break;
            case 'jpg':

                reader.onload = function () {//Cuando se cargue la imagen
                    let preview = document.getElementById('usuarioFoto'); //Relacion con el div usuario
                    Image = document.createElement('img');
                    Image.src = reader.result;//Accedemos a la propiedad del img
                    //Cambiamos el tamaño
                    Image.style.width = "550px";
                    Image.style.height = "550px";
                    preview.innerHTML = '';
                    preview.append(Image);
                };
                break;
            case 'jpeg':

                reader.onload = function () {//Cuando se cargue la imagen
                    let preview = document.getElementById('usuarioFoto'); //Relacion con el div usuario
                    Image = document.createElement('img');
                    Image.src = reader.result;//Accedemos a la propiedad del img
                    //Cambiamos el tamaño
                    Image.style.width = "550px";
                    Image.style.height = "550px";
                    preview.innerHTML = '';
                    preview.append(Image);
                }; break;
            default:
                alert('Formato incorrecto para la imagen');
                this.value = ''; // reset del valor
                this.files[0].name = '';
        }
    }


}


