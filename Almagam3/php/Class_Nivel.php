<?php

require_once 'Connection.php';

class Nivel extends conexion {

    public function Registrar ( $json ) {

        $datos = json_decode( $json, true );

        $titulo = $datos['titulo'];
        $descripcion = $datos['descripcion'];
        $NumeroNivel = $datos['NumeroNivel'];
        $location = $datos['location'];
        $nombreNivel = $datos['nombreNivel'];

        $query = "Call Proc_Nivel( 'I', '$NumeroNivel', '$location','$nombreNivel',' $titulo',' $descripcion','0');";

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

    public function RegistrarPDF ( $json ) {

        $datos = json_decode( $json, true );

        $location = $datos['location'];
        $nombre = $datos['nombre'];
        $tipo = $datos['tipo'];

        $query = "Call Proc_ArchNivel( 'I', '0','0', '$location','  $nombre ','  $tipo','0','0');";
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

    public function RegistrarImagen ( $json, $blob ) {

        $datos = json_decode( $json, true );

        $location = $datos['location'];
        $nombre = $datos['nombre'];
        $tipo = $datos['tipo'];

        $query = "Call Proc_ArchNivel( 'I', '0','$blob', '$location','  $nombre ','  $tipo','0','0');";
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

    public function VerNivelCurso ( $json ) {

        $datos = json_decode( $json, true );

        $IDCurso = $datos['IDCurso'];
        $Nivel = $datos['Nivel'];

        $query = "Call Proc_Curso( 'B', '$IDCurso', '0','0',' $Nivel ',
            '0', '0','0','0','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function EditarNivel ( $json ) {

        $datos = json_decode( $json, true );

        $titulo = $datos['titulo'];
        $descripcion = $datos['descripcion'];
        $location = $datos['location'];
        $nombreNivel = $datos['nombreNivel'];
        $ID_NIVEL = $datos['ID_NIVEL'];

        $query = "Call Proc_Nivel( 'U', '0', '$location','$nombreNivel',' $titulo',' $descripcion',' $ID_NIVEL');";

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
    public function EditarArchivosNivel ( $json ) {

        $datos = json_decode( $json, true );

        $id_archivo = $datos['id_archivo'];
        $location = $datos['location'];
        $nombre = $datos['nombre'];
        $id_archivo = $datos['id_archivo'];
        $tipo = $datos['tipo'];

        $query = "Call Proc_ArchNivel( 'U', '$id_archivo','0', '$location','  $nombre ','  $tipo','0','0');";

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
    public function EliminarArchivosNivel ( $json ) {

        $datos = json_decode( $json, true );

        $id_archivo = $datos['id_archivo'];
     

        $query = "Call Proc_ArchNivel( 'D', '$id_archivo','0', '0','  0 ',' 0','0','0');";

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
    public function AñadirArchivos ( $json ) {

        $datos = json_decode( $json, true );
        $id_nivel = $datos['id_nivel'];
        $location = $datos['location'];
        $nombre = $datos['nombre'];
        $tipo = $datos['tipo'];

        $query = "Call Proc_ArchNivel( 'A', '0','0', '$location','  $nombre ','  $tipo','0',' $id_nivel ');";
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
    public function AñadirArchivosFoto ( $json, $blob ) {

        $datos = json_decode( $json, true );

        $location = $datos['location'];
        $nombre = $datos['nombre'];
        $tipo = $datos['tipo'];

        $query = "Call Proc_ArchNivel( 'A', '0','$blob', '$location','  $nombre ','  $tipo','0',' $id_nivel ');";
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
}

?>