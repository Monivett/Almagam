const formularioNivel1 = document.getElementById('CrearNivel1');
const formularioNivel2 = document.getElementById('CrearNivel2');
const formularioNivel3 = document.getElementById('CrearNivel3');
const formularioNivel4 = document.getElementById('CrearNivel4');
const formularioNivel5 = document.getElementById('CrearNivel5');

$(document).on('change','input[name="filevideo"]',function(){
	// this.files[0].size recupera el tamaño del archivo
	// alert(this.files[0].size);
	
	var fileName = this.files[0].name;
	var fileSize = this.files[0].size;
               
	if(fileSize > 50000000){
		alert('El archivo es muy pesado');
		this.value = '';
		this.files[0].name = '';
	}else{
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

$(document).ready(function () {
    GetLastCurso();

});
var Cursocreado = false;
var CategoriasCurso = false;
var NumArch1 = 2;
var NumArch2 = 2;
var NumArch3 = 2;
var NumArch4 = 2;
var NumArch5 = 2;
var Nivel = [false, false, false, false, false];




function GetLastCurso() {
    var FoDatos = new FormData(); //Form de HTML
    FoDatos.append('opc', 8);

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
                Nivel = [false, true, true, true, true];
            }
            if (Niveles == 2) {
                document.getElementById('Nivel3').style.display = 'none';
                document.getElementById('Nivel4').style.display = 'none';
                document.getElementById('Nivel5').style.display = 'none';
                Nivel = [false, false, true, true, true];

            }
            if (Niveles == 3) {
                document.getElementById('Nivel4').style.display = 'none';
                document.getElementById('Nivel5').style.display = 'none';
                Nivel = [false, false, false, true, true];

            }
            if (Niveles == 4) {
                document.getElementById('Nivel5').style.display = 'none';
                Nivel = [false, false, false, false, true];

            }


        })

}

formularioNivel1.addEventListener("submit", e => {
    e.preventDefault();
    RegistrarNivel(1);


});
formularioNivel2.addEventListener("submit", e => {
    e.preventDefault();
    RegistrarNivel(2);
  

});

formularioNivel3.addEventListener("submit", e => {
    e.preventDefault();
    RegistrarNivel(3);
   
 
});
formularioNivel4.addEventListener("submit", e => {
    e.preventDefault();
    RegistrarNivel(4);
  

});
formularioNivel5.addEventListener("submit", e => {
    e.preventDefault();
    RegistrarNivel(5);
    

});

function RegistrarNivel(i) {
    //REGISTRAMOS LOS NIVELES
  

    var titulo = document.getElementById('inputNameLevel' + i).value;
    var descripcion = document.getElementById('inputDescLevel' + i).value;
    var NumNivel = i;



    var FoDatos = new FormData();

    FoDatos.append('titulo', titulo);
    FoDatos.append('descripcion', descripcion);
    FoDatos.append('NumeroNivel', NumNivel);
    FoDatos.append('Video', $("#inputFileLevel" + i)[0].files[0]);

  

    //REGISTRAMOS EL NIVEL

    FoDatos.append('opc', 1);

    fetch('php/Nivel.php', { method: "POST", body: FoDatos })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
            if (data == 1) {
                console.log("Se ha registrado el nivel correctamente" + i);
                document.getElementById('Nivel'+i).style.display = 'none';
                if (i == 1) { //Si es nivel 1

                    RegistrarArchivoNivel(1);
                    var n = 2;
                    for (var n; n < NumArch1; n++) {
                        RegistrarArchivoExtraNivel(n, 1);

                    }
                    Nivel[0]=true
                    TodoListo();
                }

                if (i == 2) { //Si es nivel 2

                    RegistrarArchivoNivel(2);
                    var n = 2;
                    for (var n; n < NumArch2; n++) {
                        RegistrarArchivoExtraNivel(n, 2);
                    }
                    Nivel[1]=true
                    TodoListo();
                }

                if (i == 3) { //Si es nivel 3


                    RegistrarArchivoNivel(3);
                    var n = 2;
                    for (var n; n < NumArch3; n++) {
                        RegistrarArchivoExtraNivel(n, 3);
                    }
                    Nivel[2]=true
                    TodoListo();
                }


                if (i == 4) { //Si es nivel 4


                    RegistrarArchivoNivel(4);
                    var n = 2;
                    for (var n; n < NumArch4; n++) {
                        RegistrarArchivoExtraNivel(n, 4);
                    }
                    Nivel[3]=true
                    TodoListo();
                }


                if (i == 5) { //Si es nivel 5

                    RegistrarArchivoNivel(5);
                    var n = 2;
                    for (var n; n < NumArch5; n++) {
                        RegistrarArchivoExtraNivel(n, 5);
                    }
                    Nivel[4]=true
                    TodoListo();
                }


                alert("Se ha registrado el nivel correctamente" + i);

            } else {
                alert("No se pudo registrar el nivel " + i);
            }


        })




}

function RegistrarArchivoNivel(i) {
    //REGISTRAMOS LOS NIVELES

    var FoDatos = new FormData();

    FoDatos.append('archivo', $("#ArchivoNivel" + i)[0].files[0]);

    //REGISTRAMOS LOS ARCHIVOS DEL NIVEL

    FoDatos.append('opc', 2);

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
function RegistrarArchivoExtraNivel(i, Nivel) {
    //REGISTRAMOS LOS NIVELES

    var FoDatos = new FormData();

    FoDatos.append('archivo', $("#Archivo" + i + "Nivel" + Nivel)[0].files[0]);

    //REGISTRAMOS LOS ARCHIVOS DEL NIVEL

    FoDatos.append('opc', 2);

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



function TodoListo(){
    if(Nivel[0]==true &&Nivel[1]==true &&Nivel[2]==true &&Nivel[3]==true &&Nivel[4]==true ){
        alert("El curso esta completo");
        window.location.href = "Principal.html"
    }
}