<?php
//Toma los datos de javascript y los manda a Class_User
require_once 'Class_User.php';
$user = new User;

//recibe el json y lo tranforma a un arreglo
$postbody = file_get_contents( 'php://input' );
//Agarra el form que mando
$datos = json_decode( $postbody, true );
//Convierte en json los datos

//REGISTRO
if ( $_POST['opc'] == 1 ) {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $genero = $_POST['genero'];
    $contrasena = $_POST['contrasena'];
    $fechanac = $_POST['fechanac'];
    $rol = $_POST['rol'];

    $file_tmpi = $_FILES['foto']['tmp_name'];
    // FILE: nombre, tmp_name: dirección, tipo y peso
    $file = file_get_contents( $file_tmpi );
    //file_get_contents: Agarra el contenido de esa dirección
    $blob = mysqli_real_escape_string( $user->conexion, $file );
    //

    $json = [
        'nombre' => $nombre,
        'correo'=> $correo,
        'genero'=> $genero,
        'contrasena'=> $contrasena,
        'fechanac'=> $fechanac,
        'rol'=> $rol

    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $user->Registrar( $pasa, $blob );
    echo $result;
}

//LOGIN
if ( $_POST['opc'] == 2 ) {

    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    $json = [
        'correo'=> $correo,
        'contrasena'=> $contrasena,
    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $user -> Login( $pasa );
    echo $result;

}

//Obtener datos del usuario
if ( $_POST['opc'] == 3 ) {

    $result = $user -> getPerfilUsuario();
    echo json_encode( $result );

}

//EDITAR PERFIL
if ( $_POST['opc'] == 4 ) {
    $id = $_POST['ID'];
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $genero = $_POST['genero'];
    $contrasena = $_POST['contrasena'];
    $fechanac = $_POST['fechanac'];

    $file_tmpi = $_FILES['foto']['tmp_name'];
    // FILE: nombre, tmp_name: dirección, tipo y peso
    $file = file_get_contents( $file_tmpi );
    //file_get_contents: Agarra el contenido de esa dirección
    $blob = mysqli_real_escape_string( $user->conexion, $file );
    //

    $json = [
        'ID' => $id,
        'nombre' => $nombre,
        'correo'=> $correo,
        'genero'=> $genero,
        'contrasena'=> $contrasena,
        'fechanac'=> $fechanac,

    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $user->EditarPerfil( $pasa, $blob );
    echo $result;
}

//MUESTRA LAS ESCUELAS
if ( $_POST['opc'] == 5 ) {

    $result = $user->getEscuelas();
    echo json_encode( $result );
}

//Obtener cursos en base a su escuela
if ( $_POST['opc'] == 6 ) {
    header( 'Content-Type: application/json' );
    $ID_Escuela = $_POST['ID_Escuela'];

    $json = [
        'ID_Escuela' => $ID_Escuela

    ];

    $pasa = json_encode( $json );
    //Convierte en json

    $result = $user->getCursoEscuela( $pasa );
    echo json_encode( $result );
}

//MUESTRA LOS ESTUDIANTES
if ( $_POST['opc'] == 7 ) {

    $result = $user->getEstudiantes();
    echo json_encode( $result );
}

//PERFIL ESTUDIANTES
if ( $_POST['opc'] == 8 ) {

    $ID_User = $_POST['ID_User'];
    $json = [
        'ID_User' => $ID_User

    ];
    $pasa = json_encode( $json );
    $result = $user->PerfilEstudiante( $pasa );
    echo json_encode( $result );
}

//CERTIFICADO
if ( $_POST['opc'] == 9 ) {

    $ID_User = $_POST['ID_User'];
    $ID_Curso = $_POST['ID_Curso'];
    $json = [
        'ID_User' => $ID_User,
        'ID_Curso' => $ID_Curso

    ];
    $pasa = json_encode( $json );
    $result = $user->Certificado( $pasa );
    echo json_encode( $result );
}

//NOMBRE DE LA ESCUELA
if ( $_POST['opc'] == 'A' ) {

    $ID_User = $_POST['ID_User'];

    $json = [
        'ID_User' => $ID_User

    ];
    $pasa = json_encode( $json );
    $result = $user->GetNombreEscuela( $pasa );
    echo json_encode( $result );
}

//PERFIL DE ESCUELA ( VENTAS )
if ( $_POST['opc'] == 'B' ) {

    $ID_User = $_POST['ID_User'];
    $json = [
        'ID_User' => $ID_User

    ];
    $pasa = json_encode( $json );
    $result = $user->PerfilEscuelaVentas( $pasa );
    echo json_encode( $result );
}
//PERFIL DE ESCUELA ( TOTAL )
if ( $_POST['opc'] == 'C' ) {

    $ID_User = $_POST['ID_User'];
    $json = [
        'ID_User' => $ID_User

    ];
    $pasa = json_encode( $json );
    $result = $user->PerfilEscuelaTotalVentas( $pasa );
    echo json_encode( $result );
}
//PERFIL DE ESCUELA ( TOTAL: EFECTIVO )
if ( $_POST['opc'] == 'D' ) {

    $ID_User = $_POST['ID_User'];
    $json = [
        'ID_User' => $ID_User

    ];
    $pasa = json_encode( $json );
    $result = $user->PerfilEscuelaTotalEfectivo( $pasa );
    echo json_encode( $result );
}
//PERFIL DE ESCUELA ( TOTAL: TRANSFERENCIA )
if ( $_POST['opc'] == 'E' ) {

    $ID_User = $_POST['ID_User'];
    $json = [
        'ID_User' => $ID_User

    ];
    $pasa = json_encode( $json );
    $result = $user->PerfilEscuelaTotalTransferencia( $pasa );
    echo json_encode( $result );
}
//PERFIL DE ESCUELA ( TOTAL: TARJETA )
if ( $_POST['opc'] == 'F' ) {

    $ID_User = $_POST['ID_User'];
    $json = [
        'ID_User' => $ID_User

    ];
    $pasa = json_encode( $json );
    $result = $user->PerfilEscuelaTotalTarjeta( $pasa );
    echo json_encode( $result );
}
//PERFIL DE ESCUELA ( VENTAS DETALLE: ALUMNOS )
if ( $_POST['opc'] == 'G' ) {

    $ID_User = $_POST['ID_User'];
    $json = [
        'ID_User' => $ID_User

    ];
    $pasa = json_encode( $json );
    $result = $user->PerfilEscuelaVentasDetalle( $pasa );
    echo json_encode( $result );
}
//PERFIL DE ESCUELA ( VENTAS DETALLE: TOTAL CURSO )
if ( $_POST['opc'] == 'H' ) {

    $ID_User = $_POST['ID_User'];
    $json = [
        'ID_User' => $ID_User

    ];
    $pasa = json_encode( $json );
    $result = $user->PerfilEscuelaVentasTotalCurso( $pasa );
    echo json_encode( $result );
}
?>