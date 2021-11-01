<?php

require_once 'Connection.php';

class Inscripcion extends conexion {

    public function Inscribirse ( $json ) {

        $datos = json_decode( $json, true );

        $Estudiante = $datos['Estudiante'];
        $ID_Curso = $datos['ID_Curso'];
        $Nivel = $datos['Nivel'];
        $YaPago = $datos['YaPago'];
        $Inscrito = $datos['Inscrito'];

        $query = "Call Proc_Inscripcion( 'I', '0', ' $Estudiante','$ID_Curso','  $Nivel ', '0',  $YaPago, $Inscrito);";

        $verificacion = parent::rowsAfectados( $query );

        if ( $verificacion == 1 ) {
            $success = 'success';
            return 1;
        } else {
            $success = 'fail';
            return  parent::Error();
        };

    }

    public function VerInscripcion ( $json ) {

        $datos = json_decode( $json, true );

        $ID_Estudiante = $datos['ID_Estudiante'];
        $ID_Curso = $datos['ID_Curso'];
        $query = "Call Proc_Inscripcion( 'S', '0', ' $ID_Estudiante','$ID_Curso',' 0 ', '0', '0','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }
    public function ActualizaPago ( $json ) {

        $datos = json_decode( $json, true );

        $ID_Estudiante = $datos['ID_Estudiante'];
        $ID_Curso = $datos['ID_Curso'];
        $query = "Call Proc_Inscripcion( 'U', '0', ' $ID_Estudiante','$ID_Curso',' 0 ', '0', '0','0');";
      
        $verificacion = parent::rowsAfectados( $query );

        if ( $verificacion == 1 ) {
            $success = 'success';
            return 1;
        } else {
            $success = 'fail';
            return  parent::Error();
        };

        return ( $datos );
    }
    public function ActualizaNivel ( $json ) {

        $datos = json_decode( $json, true );

        $ID_Estudiante = $datos['ID_Estudiante'];
        $ID_Curso = $datos['ID_Curso'];
        $ID_Nivel = $datos['ID_Nivel'];
        $query = "Call Proc_Inscripcion( 'N', '0', ' $ID_Estudiante','$ID_Curso','  $ID_Nivel  ', '0', '0','0');";
      
        $verificacion = parent::rowsAfectados( $query );

        if ( $verificacion == 1 ) {
            $success = 'success';
            return  $verificacion ;
        } else {
            $success = 'fail';
            return  parent::Error();
        };

        return ( $datos );
    }
    public function ActualizaTerminacionCurso ( $json ) {

        $datos = json_decode( $json, true );

        $ID_Estudiante = $datos['ID_Estudiante'];
        $ID_Curso = $datos['ID_Curso'];
     
        $query = "Call Proc_Inscripcion( 'T', '0', ' $ID_Estudiante','$ID_Curso','  0  ', '0', '0','0');";
      
        $verificacion = parent::rowsAfectados( $query );

        if ( $verificacion == 1 ) {
            $success = 'success';
            return  $verificacion ;
        } else {
            $success = 'fail';
            return  parent::Error();
        };

        return ( $datos );
    }
    public function VerNumNivel ( $json ) {

        $datos = json_decode( $json, true );

        $ID_Estudiante = $datos['ID_Estudiante'];
        $ID_Curso = $datos['ID_Curso'];
        $query = "Call Proc_Inscripcion( 'A', '0', ' $ID_Estudiante','$ID_Curso',' 0 ', '0', '0','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }
    public function ActualizarFecha ( $json ) {

        $datos = json_decode( $json, true );

        $ID_Estudiante = $datos['ID_Estudiante'];
        $ID_Curso = $datos['ID_Curso'];
        $query = "Call Proc_Inscripcion( 'B', '0', ' $ID_Estudiante','$ID_Curso',' 0 ', '0', '0','0');";
      
        $verificacion = parent::rowsAfectados( $query );

        if ( $verificacion == 1 ) {
            $success = 'success';
            return 1;
        } else {
            $success = 'fail';
            return  parent::Error();
        };

      
    }
}

?>