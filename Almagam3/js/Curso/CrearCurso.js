const formularioRegistro = document.getElementById('CrearCurso');
const inputs = document.querySelectorAll('#CrearCurso input');



var ID_Usuario;
var precio;
var gratis = false;
//Solo permite introducir números.
function soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 46 || key == 47 || key > 57) {
        //Usando la definición del DOM level 2, "return" NO funciona.
        e.preventDefault();
        alert("Ingresar solo números");
    }
}
$(document).on('change', 'input[type="file"]', function () {
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
            case 'png':
            case 'jpg':
            case 'jpeg': break;
            default:
                alert('Formato incorrecto para la imagen');
                this.value = ''; // reset del valor
                this.files[0].name = '';
        }
    }
});

//CHECKBOX GRATIS
$(document).on('change', 'input[type="checkbox"]', function () {
    var checkBox = document.getElementById("cbox1");
    const rbs = document.querySelectorAll('input[name="TipoCobro"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }


    if (checkBox.checked == true) {
        gratis = true;
        document.getElementById('divTipocobro').style.display = 'none';
        document.getElementById('nivelcobro').style.display = 'none';
        document.getElementById('divprecio').style.display = 'none';
    } else {
        gratis = false;
        document.getElementById('divTipocobro').style.display = 'block';

        document.getElementById('divprecio').style.display = 'block';
        if (selectedValue == 'option1') {
            document.getElementById('nivelcobro').style.display = 'none'
        }
        if (selectedValue == 'option2') {
            document.getElementById('nivelcobro').style.display = 'block'
        }
    }

});

$(document).ready(function () {
    GetCategories();
    GetIDuser();
    document.getElementById('2').style.display = 'none'
    document.getElementById('3').style.display = 'none'
    document.getElementById('4').style.display = 'none'
    document.getElementById('5').style.display = 'none'
    document.getElementById('nivelcobro').style.display = 'none'

    //CAMBIO DEL RADIO BUTTON
    $('input[type=radio][name=TipoCobro]').change(function () {
        if (this.value == 'option1') {
            document.getElementById('nivelcobro').style.display = 'none'
        }
        else if (this.value == 'option2') {
            document.getElementById('nivelcobro').style.display = 'block'
        }
    });


    //CAMBIO DEL COMBOX
    $("select[name=CantidadNivel]").change(function () {
        if ($('select[name=CantidadNivel]').val() == 1) {
            document.getElementById('2').style.display = 'none'
            document.getElementById('3').style.display = 'none'
            document.getElementById('4').style.display = 'none'
            document.getElementById('5').style.display = 'none'



        }
        if ($('select[name=CantidadNivel]').val() == 2) {
            document.getElementById('2').style.display = 'block'
            document.getElementById('3').style.display = 'none'
            document.getElementById('4').style.display = 'none'
            document.getElementById('5').style.display = 'none'


        }
        if ($('select[name=CantidadNivel]').val() == 3) {
            document.getElementById('2').style.display = 'block'
            document.getElementById('3').style.display = 'block'
            document.getElementById('4').style.display = 'none'
            document.getElementById('5').style.display = 'none'


        }
        if ($('select[name=CantidadNivel]').val() == 4) {
            document.getElementById('2').style.display = 'block'
            document.getElementById('3').style.display = 'block'
            document.getElementById('4').style.display = 'block'
            document.getElementById('5').style.display = 'none'


        }
        if ($('select[name=CantidadNivel]').val() == 5) {
            document.getElementById('2').style.display = 'block'
            document.getElementById('3').style.display = 'block'
            document.getElementById('4').style.display = 'block'
            document.getElementById('5').style.display = 'block'


        }

    });





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
                input.setAttribute("id", "check_cat");
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
            }


        })

}

formularioRegistro.addEventListener("submit", e => {

    //REGISTRAMOS EL CURSO

    var titulo = document.getElementById('inputName').value;
    var descripcion = document.getElementById('inputDesc').value;
    var cantidadNivel = document.getElementById("CantidadNivel");
    var cantidadNivelselected = cantidadNivel.options[cantidadNivel.selectedIndex].text;

    if (gratis == true) {
        precio = 0;
        TipoCobro = 0;
        NivelPagoselected = 1;
    } else {
        precio = document.getElementById('price').value;
        var TipoCobro = $('input:radio[name=TipoCobro]:checked').val();
        var NivelPago = document.getElementById("NivelPago");
        var NivelPagoselected = NivelPago.options[NivelPago.selectedIndex].text;

        if (TipoCobro == "option1") {
            TipoCobro = 0;
            NivelPagoselected = 1;
        } else {
            TipoCobro = 1;
        }
    }

  


    e.preventDefault();

    var FoDatos = new FormData();

    FoDatos.append('titulo', titulo);
    FoDatos.append('descripcion', descripcion);
    FoDatos.append('cantidadNivel', cantidadNivelselected);
    FoDatos.append('TipoCobro', TipoCobro);
    FoDatos.append('NivelPago', NivelPagoselected);
    FoDatos.append('precio', precio);
    FoDatos.append('escuela', ID_Usuario);
    FoDatos.append('foto', $("#file")[0].files[0]);

    //REGISTRAMOS EL CURSO

    FoDatos.append('opc', 1);

    fetch('php/Curso.php', { method: "POST", body: FoDatos })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data);
            if (data == 1) {
                alert("Se ha registrado el curso correctamente");

                RegistrarCategoriasCurso();

            } else {
                alert("No se pudo registrar el curso");
            }


        })



});

function RegistrarCategoriasCurso() {

    //REGISTRAMOS LAS CATEGORIAS DEL CURSO
    var i = 0;
    var selected = [];
    $("input[id=check_cat]:checked").each(function () {

        selected.push($(this).val());
        var cat = selected[i];

        var FoDatos = new FormData();
        //REGISTRAMOS EL CURSO
        FoDatos.append('cat', cat);
        FoDatos.append('opc', 2);

        fetch('php/Curso.php', { method: "POST", body: FoDatos })
            .then(response => {
                return response.text();
            })
            .then(data => {
                console.log(data);
                if (data == 1) {
                    console.log("Se ha registrado las categorias correctamente");
                    window.location.href = "CrearNivel.html";

                } else {
                    console.log("No se pudo registrar el curso");
                }


            })

        i++;
    });



}

//MOSTRAR LA FOTO
document.getElementById('file').onchange = function (e) {//FUNCIÓN PARA PREVISUALIZAR LA IMAGEN
    let reader = new FileReader(); //Crea un obj para almacenar la imagen
    reader.readAsDataURL(e.target.files[0]); //Pasamos las propiedades de la imagen

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
}


