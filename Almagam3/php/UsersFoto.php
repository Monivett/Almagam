<?php

require_once 'Connection.php';

header( 'content_type: image/jpeg' );

class User extends conexion {

    function ObtenFoto() {
        $id = $_GET['id'];
        $query = "Call Proc_Usuario( 'B', '  $id', '0',0,'0',
            '0', '0','0',0);";
        $datos = parent::ObtenerFotosUser( $query );
        //Si se agrego
        echo $datos;

    }
}
$user = new User;
$result = $user -> ObtenFoto();

?>