<?php
//Toma los datos de javascript y los manda a Class_Chat
require_once 'Class_Chat.php';
$chat = new Chat;

//recibe el json y lo tranforma a un arreglo
$postbody = file_get_contents( 'php://input' );
//Agarra el form que mando
$datos = json_decode( $postbody, true );
//Convierte en json los datos

//ENVIAR MENSAJES
if ( $_POST['opc'] == 1 ) {
    $Enviador = $_POST['Enviador'];
    $Recibidor = $_POST['Recibidor'];
    $msg = $_POST['msg'];

    $json = [
        'Enviador' => $Enviador,
        'Recibidor'=> $Recibidor,
        'msg'=> $msg,

    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $chat->Enviar( $pasa );
    echo $result;
}

//MOSTRAR CHATS
if ( $_POST['opc'] == 2 ) {
    $Enviador = $_POST['Enviador'];
    $Recibidor = $_POST['Recibidor'];

    $json = [
        'Enviador' => $Enviador,
        'Recibidor'=> $Recibidor

    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $chat->GetChats( $pasa );
    echo json_encode ( $result );
}

//BUSCA LOS ESTUDIANTES
if ( $_POST['opc'] == 3 ) {
    $Nombre = $_POST['Nombre'];
    $json = [
        'Nombre' => $Nombre

    ];
    $pasa = json_encode( $json );
    $result = $chat->BuscaEstudiantes( $pasa );
    echo json_encode( $result );
}

//BUSCA LOS ESCUELAS
if ( $_POST['opc'] == 4 ) {
    $Nombre = $_POST['Nombre'];
    $json = [
        'Nombre' => $Nombre

    ];
    $pasa = json_encode( $json );
    $result = $chat->BuscaEscuelas( $pasa );
    echo json_encode( $result );
}

?>