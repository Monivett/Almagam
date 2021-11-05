<?php

require_once 'Connection.php';

class Category extends conexion {

    public function Registrar ( $json ) {

        $datos = json_decode( $json, true );

        $Nombre = $datos['Nombre'];
        $Descripción = $datos['Descripción'];
        $UsuarioCreacion = $datos['UsuarioCreacion'];

        $query = "Call Proc_Category( 'I','$Nombre','$Descripción','$UsuarioCreacion');";
        $verificacion = parent::rowsAfectados( $query );

        if ( $verificacion == 1 ) {
            $success = 'success';
            return 1;
        } else {
            $success = 'fail';
            return 0;
        }
        ;
    }

    public function getCategories() {
        $query = "Call Proc_Category( 'S','0','0','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function getCursoCategories( $json ) {
        $datos = json_decode( $json, true );

        $ID_Cat = $datos['ID_Cat'];
        $query = "Call Proc_CursoCat( 'A','$ID_Cat','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }
    public function EditarCatCurso ( $json ) {

        $datos = json_decode( $json, true );

        $cat = $datos['cat'];
        $curso = $datos['curso'];

        $query = "Call Proc_CursoCat( 'U', '$cat',' $curso');";
        $verificacion = parent::rowsAfectados( $query );
        //Si se agrego

        if ( $verificacion == 1 ) {
            $success = 'success';
            return 1;
        } else {
            $success = 'fail';
            return  parent::Error();
        }
        ;
    }
    public function RegistrarCatCurso ( $json ) {

        $datos = json_decode( $json, true );

        $cat = $datos['cat'];
        $curso = $datos['curso'];

        $query = "Call Proc_CursoCat( 'Z', '$cat',' $curso');";
        $verificacion = parent::rowsAfectados( $query );
        //Si se agrego

        if ( $verificacion == 1 ) {
            $success = 'success';
            return 1;
        } else {
            $success = 'fail';
            return  parent::Error();
        }
        ;
    }
}

?>