const formularioNivel1 = document.getElementById('CrearNivel1');
const formularioNivel2 = document.getElementById('CrearNivel2');
const formularioNivel3 = document.getElementById('CrearNivel3');
const formularioNivel4 = document.getElementById('CrearNivel4');
const formularioNivel5 = document.getElementById('CrearNivel5');
var ID_NIVEL1;
var ID_NIVEL2;
var ID_NIVEL3;
var ID_NIVEL4;
var ID_NIVEL5;
$(document).ready(function () {
    getParameters();

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
    GetCurso();
    return parameters;
}
$(document).on('change', 'input[name="filevideo"]', function () {
    // this.files[0].size recupera el tamaño del archivo
    // alert(this.files[0].size);

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
            case 'mp4':
            case 'mov':
            case 'avi':
            case 'wmv': break;
            default:
                alert('Formato incorrecto para el vídeo');
                this.value = ''; // reset del valor
                this.files[0].name = '';
        }
    }
});
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

            var Niveles = obj[0]['CantidadNiveles'];
            if (Niveles == 1) {
                document.getElementById('Nivel2').style.display = 'none';
                document.getElementById('Nivel3').style.display = 'none';
                document.getElementById('Nivel4').style.display = 'none';
                document.getElementById('Nivel5').style.display = 'none';

                GetNivel(1);
            }
            if (Niveles == 2) {
                document.getElementById('Nivel3').style.display = 'none';
                document.getElementById('Nivel4').style.display = 'none';
                document.getElementById('Nivel5').style.display = 'none';

                GetNivel(1);
                GetNivel(2);
            }
            if (Niveles == 3) {
                document.getElementById('Nivel4').style.display = 'none';
                document.getElementById('Nivel5').style.display = 'none';

                GetNivel(1);
                GetNivel(2);
                GetNivel(3);
            }
            if (Niveles == 4) {
                document.getElementById('Nivel5').style.display = 'none';

                GetNivel(1);
                GetNivel(2);
                GetNivel(3);
                GetNivel(4);
            }
            if (Niveles == 5) {
                document.getElementById('Nivel5').style.display = 'none';

                GetNivel(1);
                GetNivel(2);
                GetNivel(3);
                GetNivel(4);
                GetNivel(5);
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

            document.getElementById("inputNameLevel" + i).value = obj[0]["Nombre"];
            document.getElementById("inputDescLevel" + i).value = obj[0]["Descripción"];
            document.getElementById('NombreVideo' + i).innerHTML = obj[0]["Nombre_Vídeo"];
            document.getElementById('NombreVideo' + i).href = obj[0]["Vídeo"];
            if (i == 1) {
                ID_NIVEL1 = obj[0]["ID_Nivel"];
                GetArchivos(obj[0]["ID_Nivel"], 1);
            }
            if (i == 2) {
                ID_NIVEL2 = obj[0]["ID_Nivel"];
                GetArchivos(obj[0]["ID_Nivel"], 2);
            }
            if (i == 3) {
                ID_NIVEL3 = obj[0]["ID_Nivel"];
                GetArchivos(obj[0]["ID_Nivel"], 3);
            }
            if (i == 4) {
                ID_NIVEL4 = obj[0]["ID_Nivel"];
                GetArchivos(obj[0]["ID_Nivel"], 4);
            }
            if (i == 5) {
                ID_NIVEL5 = obj[0]["ID_Nivel"];
                GetArchivos(obj[0]["ID_Nivel"], 5);
            }

        })

}
//MOSTRAMOS LOS ARCHIVOS
function GetArchivos(IDNivel, leveldiv) {



    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 7);
    FoDatos.append('IDNivel', IDNivel);

    fetch('php/Curso.php', { method: "POST", body: FoDatos }) //Función asincrona, manda los datos a User.php
        .then(response => {
            return response.text(); //Regresa tipo de dato texto
        })
        .then(data => {
            console.log(data);
            if (data != "[]") {
                var Jason = data;
                var obj = JSON.parse(Jason);
                console.log(obj); //Imprimimos el texto
                var div = document.getElementById("MaterialesAgregados" + leveldiv);


                for (var i in obj) {


                    var a = document.createElement('a');
                    a.setAttribute("href", obj[i]['Ruta']);
                    a.innerHTML = obj[i]['NombreArchivo'];

                    var btn = document.createElement('input');
                    btn.setAttribute("type", "file");
                    btn.setAttribute("id", leveldiv + "fileArch" + i);

                    var bt3 = document.createElement('btn');
                    bt3.setAttribute("type", "submit");
                    bt3.setAttribute("onclick", "EditarArchivos(" + leveldiv + "," + obj[i]['ID_Arch'] + "," + i + ");");
                    bt3.setAttribute("class", "btn btn-outline-primary");
                    bt3.innerHTML = "Cambiar Archivo";

                    var btn2 = document.createElement('btn');
                    btn2.setAttribute("onclick", "EliminarArchivos(" + obj[i]['ID_Arch'] + ");");
                    btn2.setAttribute("class", "btn btn-outline-danger");
                    btn2.innerHTML = "Eliminar Archivo";

                    var br = document.createElement('br');
                    var br2 = document.createElement('br');
                    var br3 = document.createElement('br');
                    var br4 = document.createElement('br');

                    div.appendChild(a);
                    div.appendChild(br);
                    div.appendChild(br2);
                    div.appendChild(btn);
                    div.appendChild(bt3);
                    div.appendChild(btn2);
                    div.appendChild(br3);
                    div.appendChild(br4);

                }
            }






        })
}
var Cursocreado = false;
var CategoriasCurso = false;
var NumArch1 = 2;
var NumArch2 = 2;
var NumArch3 = 2;
var NumArch4 = 2;
var NumArch5 = 2;
var Nivel = [false, false, false, false, false];



formularioNivel1.addEventListener("submit", e => {
    e.preventDefault();
    EditarNivel(1, ID_NIVEL1);


});
formularioNivel2.addEventListener("submit", e => {
    e.preventDefault();
    EditarNivel(2, ID_NIVEL2);


});

formularioNivel3.addEventListener("submit", e => {
    e.preventDefault();
    EditarNivel(3, ID_NIVEL3);


});
formularioNivel4.addEventListener("submit", e => {
    e.preventDefault();
    EditarNivel(4, ID_NIVEL5);


});
formularioNivel5.addEventListener("submit", e => {
    e.preventDefault();
    EditarNivel(5);


});

function EditarNivel(i, id_nivel) {
    //EDITAMOS LOS NIVELES


    var titulo = document.getElementById('inputNameLevel' + i).value;
    var descripcion = document.getElementById('inputDescLevel' + i).value;

    var FoDatos = new FormData();
    var foto = $("#inputFileLevel" + i)[0].files[0];
    FoDatos.append('titulo', titulo);
    FoDatos.append('descripcion', descripcion);

    FoDatos.append('ID_NIVEL', id_nivel);
    if (foto != undefined) {
        FoDatos.append('Video', $("#inputFileLevel" + i)[0].files[0]);
        FoDatos.append('opc', 4);
    } else {

        FoDatos.append('opc', 5);
    }

    //EDITAMOS EL NIVEL

    fetch('php/Nivel.php', { method: "POST", body: FoDatos })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
            if (data == 1) {
                alert("Se ha modificado el nivel " + i + "correctamente");
               
                if (i == 1) { //Si es nivel 1

                    RegistrarArchivoNivel(1,id_nivel);
                    var n = 2;
                    for (var n; n < NumArch1; n++) {
                        RegistrarArchivoExtraNivel(n, 1,id_nivel);

                    }
                    Nivel[0] = true

                }

                if (i == 2) { //Si es nivel 2

                    RegistrarArchivoNivel(2,id_nivel);
                    var n = 2;
                    for (var n; n < NumArch2; n++) {
                        RegistrarArchivoExtraNivel(n, 2,id_nivel);
                    }
                    Nivel[1] = true
                  
                }

                if (i == 3) { //Si es nivel 3


                    RegistrarArchivoNivel(3,id_nivel);
                    var n = 2;
                    for (var n; n < NumArch3; n++) {
                        RegistrarArchivoExtraNivel(n, 3,id_nivel);
                    }
                    Nivel[2] = true
                 
                }


                if (i == 4) { //Si es nivel 4


                    RegistrarArchivoNivel(4,id_nivel,id_nivel);
                    var n = 2;
                    for (var n; n < NumArch4; n++) {
                        RegistrarArchivoExtraNivel(n, 4,id_nivel);
                    }
                    Nivel[3] = true
                   
                }


                if (i == 5) { //Si es nivel 5

                    RegistrarArchivoNivel(5,id_nivel);
                    var n = 2;
                    for (var n; n < NumArch5; n++) {
                        RegistrarArchivoExtraNivel(n, 5,id_nivel);
                    }
                    Nivel[4] = true
                
                }


                console.log("Se ha registrado el nivel"+ i+" correctamente");

            } else {
                alert("No se pudo registrar el nivel " + i);
            }


        })




}

function RegistrarArchivoNivel(i,id_nivel) {
    //REGISTRAMOS LOS NIVELES

    var FoDatos = new FormData();

    FoDatos.append('archivo', $("#ArchivoNivel" + i)[0].files[0]);

    FoDatos.append('id_nivel',id_nivel);

    FoDatos.append('opc', 8);

    fetch('php/Nivel.php', { method: "POST", body: FoDatos })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
            if (data == 1) {
                console.log("Se ha registrado los archivos del correctamente" + i);


            } else {
                console.log("No se pudo registrar el archivo del nivel" + i);
            }


        })

}

function EditarArchivos(leveldiv, id_archivo, i) {
    //EDITAMOS LOS ARCHIVOS DE LOS NIVELES


    var FoDatos = new FormData();

    var file = $("#" + leveldiv + "fileArch" + i + "")[0].files[0];
    FoDatos.append('id_archivo', id_archivo);
    FoDatos.append('file', file);
    FoDatos.append('opc', 6);


    //REGISTRAMOS EL NIVEL



    fetch('php/Nivel.php', { method: "POST", body: FoDatos })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
            if (data == 1) {
                console.log("Se ha modificado el archivo correctamente");

            } else {
                alert("No se pudo modificar el archivo");
            }


        })




}
function EliminarArchivos(id_archivo) {
    //EDITAMOS LOS ARCHIVOS DE LOS NIVELES


    var FoDatos = new FormData();

    FoDatos.append('id_archivo', id_archivo);
    FoDatos.append('opc', 7);

    fetch('php/Nivel.php', { method: "POST", body: FoDatos })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
            if (data == 1) {
                alert("Se ha borrado el archivo correctamente");

            } else {
                alert("No se pudo borrar el archivo");
            }


        })




}

function AgregarArchivos(i) {
    var archivo = 0;
    if (i == 1) {
        archivo = NumArch1
    }
    if (i == 2) {
        archivo = NumArch2
    }
    if (i == 3) {
        archivo = NumArch3
    }
    if (i == 4) {
        archivo = NumArch4
    }
    if (i == 5) {
        archivo = NumArch5
    }

    var div = document.getElementById("Subir" + i);
    var br = document.createElement('br');
    div.appendChild(br);
    var input = document.createElement('input');
    input.setAttribute("type", "file");
    input.setAttribute("class", "form-control-file");
    input.setAttribute("id", "Archivo" + archivo + "Nivel" + i);
    div.appendChild(input);
    div.appendChild(br);
    archivo++;
    if (i == 1) {
        NumArch1 = archivo
    }
    if (i == 2) {
        NumArch2 = archivo
    }
    if (i == 3) {
        NumArch3 = archivo
    }
    if (i == 4) {
        NumArch4 = archivo
    }
    if (i == 5) {
        NumArch5 = archivo
    }
    archivo = 0;
}
function RegistrarArchivoExtraNivel(i, Nivel,id_nivel) {
    //REGISTRAMOS LOS NIVELES

    var FoDatos = new FormData();

    FoDatos.append('archivo', $("#Archivo" + i + "Nivel" + Nivel)[0].files[0]);

    FoDatos.append('id_nivel',id_nivel);

    FoDatos.append('opc', 8);



    fetch('php/Nivel.php', { method: "POST", body: FoDatos })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
            if (data == 1) {
                console.log("Se ha registrado los archivos del correctamente" + i);


            } else {
                console.log("No se pudo registrar el archivo del nivel" + i);
            }


        })

}


