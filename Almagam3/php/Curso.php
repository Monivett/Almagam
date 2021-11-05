<?php
//Toma los datos de javascript y los manda a Class_User
require_once 'Class_Curso.php';
$curso = new Curso;

//recibe el json y lo tranforma a un arreglo
$postbody = file_get_contents( 'php://input' );
//Agarra el form que mando
$datos = json_decode( $postbody, true );
//Convierte en json los datos

//REGISTRO DEL CURSO
if ( $_POST['opc'] == 1 ) {
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $cantidadNivel = $_POST['cantidadNivel'];
    $TipoCobro = $_POST['TipoCobro'];
    $NivelPago = $_POST['NivelPago'];
    $precio = $_POST['precio'];
    $escuela = $_POST['escuela'];

    $file_tmpi = $_FILES['foto']['tmp_name'];
    // FILE: nombre, tmp_name: dirección, tipo y peso
    $file = file_get_contents( $file_tmpi );
    //file_get_contents: Agarra el contenido de esa dirección
    $blob = mysqli_real_escape_string( $curso->conexion, $file );
    //

    //Convertimos los datos en un json
    $json = [
        'titulo' => $titulo,
        'descripcion'=> $descripcion,
        'cantidadNivel'=> $cantidadNivel,
        'TipoCobro'=> $TipoCobro,
        'NivelPago' => $NivelPago,
        'precio'=> $precio,
        'escuela'=> $escuela
    ];

    $data = json_encode( $json );

    $result = $curso->Registrar( $data, $blob );
    echo $result;
}

//REGISTRAR LAS CATEGORIAS EN EL CURSO
if ( $_POST['opc'] == 2 ) {
    $cat = $_POST['cat'];

    //Convertimos los datos en un json
    $json = [
        'cat' => $cat
    ];

    $data = json_encode( $json );

    $result = $curso->RegistrarCatCurso( $data );
    echo $result;
}

//VER CURSOS
if ( $_POST['opc'] == 3 ) {

    $result = $curso -> getCursos();
    echo json_encode( $result );

}
//VER CATEGORÍAS DEL CURSO
if ( $_POST['opc'] == 4 ) {
    $IDCurso = $_POST['IDCurso'];

    //Convertimos los datos en un json
    $json = [
        'IDCurso' => $IDCurso
    ];

    $data = json_encode( $json );

    $result = $curso -> getCursosCategory( $data );
    echo json_encode( $result );

}
//VER CURSO CON ID
if ( $_POST['opc'] == 5 ) {
    $IDCurso = $_POST['IDCurso'];

    $json = [
        'IDCurso' => $IDCurso
    ];

    $data = json_encode( $json );
    $result = $curso -> getCursosID( $data );
    echo json_encode( $result );

}

//VER NIVEL CON ID
if ( $_POST['opc'] == 6 ) {
    $IDCurso = $_POST['IDCurso'];
    $Nivel = $_POST['Nivel'];
    $json = [
        'IDCurso' => $IDCurso,
        'Nivel' => $Nivel,
    ];

    $data = json_encode( $json );
    $result = $curso -> VerNivelCurso( $data );
    echo json_encode( $result );

}
//VER ARCHIVOS DEL NIVEL CON ID
if ( $_POST['opc'] == 7 ) {
    $IDNivel = $_POST['IDNivel'];

    $json = [
        'IDNivel' => $IDNivel
    ];

    $data = json_encode( $json );
    $result = $curso -> VerArchivosNivelCurso( $data );
    echo json_encode( $result );

}
//VER ULTIMO CURSO
if ( $_POST['opc'] == 8 ) {

    $result = $curso -> getLastCursos();
    echo json_encode( $result );

}
//BUSCAR CURSO
if ( $_POST['opc'] == 9 ) {
    $Busqueda = $_POST['Busqueda'];

    //Convertimos los datos en un json
    $json = [
        'Busqueda' => $Busqueda

    ];
    $data = json_encode( $json );
    $result = $curso -> BuscarCurso( $data );
    echo json_encode( $result );

}
//COMENTARIO
if ( $_POST['opc'] == 'C' ) {
    $ID_Estudiante = $_POST['ID_Estudiante'];
    $ID_Curso = $_POST['ID_Curso'];
    $comentario = $_POST['comentario'];
    $like = $_POST['like'];
    $json = [
        'ID_Estudiante' => $ID_Estudiante,
        'ID_Curso' => $ID_Curso,
        'comentario' => $comentario,
        'like' => $like

    ];
    $data = json_encode( $json );
    $result = $curso -> RegistrarComentario( $data );
    echo json_encode( $result );

}
//VER COMENTARIOS DEL CURSO
if ( $_POST['opc'] == 'A' ) {

    $ID_Curso = $_POST['ID_Curso'];

    $json = [

        'ID_Curso' => $ID_Curso

    ];
    $data = json_encode( $json );
    $result = $curso -> VerComentarios( $data );
    echo json_encode( $result );

}
//VER LIKES DEL CURSO
if ( $_POST['opc'] == 'B' ) {

    $ID_Curso = $_POST['ID_Curso'];

    $json = [

        'ID_Curso' => $ID_Curso

    ];
    $data = json_encode( $json );
    $result = $curso -> VerLikes( $data );
    echo json_encode( $result );

}
//VER DISLIKES DEL CURSO
if ( $_POST['opc'] == 'D' ) {

    $ID_Curso = $_POST['ID_Curso'];

    $json = [

        'ID_Curso' => $ID_Curso

    ];
    $data = json_encode( $json );
    $result = $curso -> VerDislikes( $data );
    echo json_encode( $result );

}

//VER SI EL USUARIO YA COMENTÓ
if ( $_POST['opc'] == 'E' ) {
    $ID_Estudiante = $_POST['ID_Estudiante'];
    $ID_Curso = $_POST['ID_Curso'];

    $json = [
        'ID_Estudiante' => $ID_Estudiante,
        'ID_Curso' => $ID_Curso

    ];
    $data = json_encode( $json );
    $result = $curso -> VerComentariosUser( $data );
    echo json_encode( $result );

}
//VER MEJORES CURSOS
if ( $_POST['opc'] == 'F' ) {

    $result = $curso -> MejoresCursos();
    echo json_encode( $result );

}
//VER CURSOS MÁS RECIENTES
if ( $_POST['opc'] == 'G' ) {

    $result = $curso -> CursosRecientes();
    echo json_encode( $result );

}
//VER CURSOS MÁS VENDIDOS
if ( $_POST['opc'] == 'H' ) {

    $result = $curso -> CursosMasVendidos();
    echo json_encode( $result );

}
//VER CURSOS RANGO DE FECHAS
if ( $_POST['opc'] == 'I' ) {
    $fecha1 = $_POST['fecha1'];
    $fecha2 = $_POST['fecha2'];
    $json = [

        'fecha1' => $fecha1,
        'fecha2' => $fecha2,

    ];
    $data = json_encode( $json );
    $result = $curso -> CursosFechas( $data );
    echo json_encode( $result );

}
//VER CURSOS UNA FECHA
if ( $_POST['opc'] == 'J' ) {
    $fecha1 = $_POST['fecha1'];

    $json = [

        'fecha1' => $fecha1

    ];
    $data = json_encode( $json );
    $result = $curso -> CursosUnaFecha( $data );
    echo json_encode( $result );

}
//DAR DE BAJA CURSO
if ( $_POST['opc'] == 'K' ) {
    $ID_Curso = $_POST['ID_Curso'];

    $json = [

        'ID_Curso' => $ID_Curso

    ];
    $data = json_encode( $json );
    $result = $curso -> BajaCurso( $data );
    echo json_encode( $result );

}
//ACTIVAR CURSO
if ( $_POST['opc'] == 'L' ) {
    $ID_Curso = $_POST['ID_Curso'];

    $json = [

        'ID_Curso' => $ID_Curso

    ];
    $data = json_encode( $json );
    $result = $curso -> ActivarCurso( $data );
    echo json_encode( $result );

}
//EDITAR  CURSO
if ( $_POST['opc'] == 'M' ) {
    $ID_Curso = $_POST['ID_Curso'];
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
  


    $file_tmpi = $_FILES['foto']['tmp_name'];
    // FILE: nombre, tmp_name: dirección, tipo y peso
    $file = file_get_contents( $file_tmpi );
    //file_get_contents: Agarra el contenido de esa dirección
    $blob = mysqli_real_escape_string( $curso->conexion, $file );
    //

    //Convertimos los datos en un json
    $json = [
        'ID_Curso' => $ID_Curso,
        'titulo' => $titulo,
        'descripcion'=> $descripcion,
      
    ];

    $data = json_encode( $json );

    $result = $curso->EditarCursos( $data, $blob );
    echo $result;
}
//EDITAR  CURSO
if ( $_POST['opc'] == 'N' ) {
    $ID_Curso = $_POST['ID_Curso'];
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
   
    //Convertimos los datos en un json
    $json = [
        'ID_Curso' => $ID_Curso,
        'titulo' => $titulo,
        'descripcion'=> $descripcion,
       
    ];

    $data = json_encode( $json );

    $result = $curso->EditarCursosSinFoto( $data );
    echo $result;
}
?>