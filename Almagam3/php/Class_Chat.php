<?php

require_once 'Connection.php';

class Chat extends conexion {

    public function Enviar ( $json ) {

        $datos = json_decode( $json, true );

        $Enviador = $datos['Enviador'];
        $Recibidor = $datos['Recibidor'];
        $msg = $datos['msg'];

        $query = "Call Proc_Chats( 'I','$Recibidor','$Enviador','$msg');";
        $verificacion = parent::rowsAfectados( $query );

        if ( $verificacion == 1 ) {
            $success = 'success';
            return 1;
        } else {
            $success = 'fail';
            return  parent::Error();
        }
        ;
    }

    public function GetChats( $json ) {
        $datos = json_decode( $json, true );
        $Recibidor = $datos['Recibidor'];
        $Enviador = $datos['Enviador'];

        $query = "Call Proc_Chats( 'S','$Recibidor','$Enviador','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function BuscaEstudiantes( $json ) {

        $datos = json_decode( $json, true );

        $Nombre = $datos['Nombre'];

        $query = "Call Proc_Chats( 'E','0','0','$Nombre');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function BuscaEscuelas( $json ) {

        $datos = json_decode( $json, true );

        $Nombre = $datos['Nombre'];

        $query = "Call Proc_Chats( 'A','0','0','$Nombre');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }
}

?>