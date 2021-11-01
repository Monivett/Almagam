<?php
//Toma los datos de javascript y los manda a Class_User
require_once 'Class_Inscripcion.php';
$inscripcion = new Inscripcion;

//recibe el json y lo tranforma a un arreglo
$postbody = file_get_contents( 'php://input' );
//Agarra el form que mando
$datos = json_decode( $postbody, true );
//Convierte en json los datos

//Obtener si hay alguna inscripcion
if ( $_POST['opc'] == 1 ) {
    header( 'Content-Type: application/json' );
    $ID_Estudiante = $_POST['ID_Estudiante'];
    $ID_Curso = $_POST['ID_Curso'];
    $json = [
        'ID_Estudiante' => $ID_Estudiante,
        'ID_Curso' => $ID_Curso

    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $inscripcion->VerInscripcion( $pasa );
    echo json_encode( $result );
}

//Realizar la inscripción
if ( $_POST['opc'] == 2 ) {
    header( 'Content-Type: application/json' );
    $Estudiante = $_POST['Estudiante'];
    $ID_Curso = $_POST['ID_Curso'];
    $Nivel = $_POST['Nivel'];
    $YaPago = $_POST['YaPago'];
    $Inscrito = $_POST['Inscrito'];

    $json = [
        'Estudiante' => $Estudiante,
        'ID_Curso' => $ID_Curso,
        'Nivel' => $Nivel,
        'YaPago' => $YaPago,
        'Inscrito' => $Inscrito
    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $inscripcion->Inscribirse( $pasa );
    echo json_encode( $result );
}

//Actualiza el pago del estudiante
if ( $_POST['opc'] == 3 ) {
    header( 'Content-Type: application/json' );
    $ID_Estudiante = $_POST['ID_Estudiante'];
    $ID_Curso = $_POST['ID_Curso'];
    $json = [
        'ID_Estudiante' => $ID_Estudiante,
        'ID_Curso' => $ID_Curso

    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $inscripcion->ActualizaPago( $pasa );
    echo json_encode( $result );
}
//Actualiza el nivel del estudiante
if ( $_POST['opc'] == 4 ) {
    header( 'Content-Type: application/json' );
    $ID_Estudiante = $_POST['ID_Estudiante'];
    $ID_Curso = $_POST['ID_Curso'];
    $ID_Nivel = $_POST['ID_Nivel'];
    $json = [
        'ID_Estudiante' => $ID_Estudiante,
        'ID_Curso' => $ID_Curso,
        'ID_Nivel' => $ID_Nivel

    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $inscripcion->ActualizaNivel( $pasa );
    echo json_encode( $result );
}
//Actualiza si el estudiante ya termino
if ( $_POST['opc'] == 5 ) {
    header( 'Content-Type: application/json' );
    $ID_Estudiante = $_POST['ID_Estudiante'];
    $ID_Curso = $_POST['ID_Curso'];
   
    $json = [
        'ID_Estudiante' => $ID_Estudiante,
        'ID_Curso' => $ID_Curso,
   

    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $inscripcion->ActualizaTerminacionCurso( $pasa );
    echo json_encode( $result );
}
//CHECA EL NUMERO DE NIVEL EN EL QUE VA EL ESTUDIANTE
if ( $_POST['opc'] == 6 ) {
    header( 'Content-Type: application/json' );
    $ID_Estudiante = $_POST['ID_Estudiante'];
    $ID_Curso = $_POST['ID_Curso'];
    $json = [
        'ID_Estudiante' => $ID_Estudiante,
        'ID_Curso' => $ID_Curso

    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $inscripcion->VerNumNivel( $pasa );
    echo json_encode( $result );
}
//ACTUALIZA LA FECHA ACCEDIDA
if ( $_POST['opc'] == 7 ) {
    header( 'Content-Type: application/json' );
    $ID_Estudiante = $_POST['ID_Estudiante'];
    $ID_Curso = $_POST['ID_Curso'];
    $json = [
        'ID_Estudiante' => $ID_Estudiante,
        'ID_Curso' => $ID_Curso

    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $inscripcion->ActualizarFecha( $pasa );
    echo json_encode( $result );
}
?>