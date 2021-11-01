<?php

require_once 'Connection.php';

class Pago extends conexion {

    public function Pagar ( $json ) {

        $datos = json_decode( $json, true );

        $ID_Curso = $datos['ID_Curso'];
        $Precio = $datos['Precio'];
        $formaPago = $datos['formaPago'];
        $Escuela = $datos['Escuela'];
        $Estudiante = $datos['Estudiante'];

        $query = "Call Proc_Pago( 'I', '$formaPago', '$Precio',' $Escuela',' $ID_Curso','$Estudiante');";

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

    public function VerPago ( $json ) {

        $datos = json_decode( $json, true );

        $ID_Estudiante = $datos['ID_Estudiante'];
        $ID_Curso = $datos['ID_Curso'];
        $query = "Call Proc_Pago( 'S', '0', '0',' 0',' $ID_Curso','$ID_Estudiante');";

        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

}

?>