<?php
//Toma los datos de javascript y los manda a Class_User
require_once 'Class_Pago.php';
$pago = new Pago;

//recibe el json y lo tranforma a un arreglo
$postbody = file_get_contents( 'php://input' );
//Agarra el form que mando
$datos = json_decode( $postbody, true );
//Convierte en json los datos

//Registra el pago
if ( $_POST['opc'] == 1 ) {
    header( 'Content-Type: application/json' );
    $ID_Curso = $_POST['ID_Curso'];
    $Precio = $_POST['Precio'];
    $formaPago = $_POST['formaPago'];
    $Escuela = $_POST['Escuela'];
    $Estudiante = $_POST['Estudiante'];

    $json = [
        'ID_Curso' => $ID_Curso,
        'Precio' => $Precio,
        'formaPago' => $formaPago,
        'Escuela' => $Escuela,
        'Estudiante' => $Estudiante

    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $pago->Pagar( $pasa );
    echo json_encode( $result );
}
//Obtener si el estudiante pagó
if ( $_POST['opc'] == 2 ) {
    header( 'Content-Type: application/json' );
    $ID_Estudiante = $_POST['ID_Estudiante'];
    $ID_Curso = $_POST['ID_Curso'];
    $json = [
        'ID_Estudiante' => $ID_Estudiante,
        'ID_Curso' => $ID_Curso

    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $pago->VerPago( $pasa );
    echo json_encode( $result );
}

?>