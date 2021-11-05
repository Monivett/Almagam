<?php

require_once 'Connection.php';

class Curso extends conexion {

    public function Registrar ( $json, $blob ) {

        $datos = json_decode( $json, true );

        $titulo = $datos['titulo'];
        $descripcion = $datos['descripcion'];
        $cantidadNivel = $datos['cantidadNivel'];
        $TipoCobro = $datos['TipoCobro'];
        $NivelPago = $datos['NivelPago'];
        $precio = $datos['precio'];
        $escuela = $datos['escuela'];

        $query = "Call Proc_Curso( 'I',0,' $titulo', '$precio', '  $cantidadNivel',$TipoCobro,' $NivelPago',' $descripcion ', 0, '$blob', ' $escuela ');";
        $verificacion = parent::rowsAfectados( $query );
        //Si se agrego

        if ( $verificacion == 1 ) {
            $success = 'success';
            return  1 ;
        } else {
            $success = 'fail';
            return  parent::Error();
        }
        ;
    }

    public function RegistrarCatCurso ( $json ) {

        $datos = json_decode( $json, true );

        $cat = $datos['cat'];

        $query = "Call Proc_CursoCat( 'I', '$cat','0');";
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

    public function getCursos() {
        $query = "Call Proc_Curso( 'S', '0', '0','0','0','0','0', '0','0','0','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function getCursosCategory( $json ) {
        $datos = json_decode( $json, true );

        $IDCurso = $datos['IDCurso'];
        $query = "Call Proc_CursoCat( 'S', '$IDCurso','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function getCursosID( $json ) {
        $datos = json_decode( $json, true );

        $IDCurso = $datos['IDCurso'];
        $query = "Call Proc_Curso( 'A', '$IDCurso', '0','0','0','0','0','0', '0','0','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function VerNivelCurso ( $json ) {

        $datos = json_decode( $json, true );

        $IDCurso = $datos['IDCurso'];
        $Nivel = $datos['Nivel'];

        $query = "Call Proc_Curso( 'B', '$IDCurso', '0','0',' $Nivel ', '0','0', '0','0','0','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function VerArchivosNivelCurso ( $json ) {

        $datos = json_decode( $json, true );

        $IDNivel = $datos['IDNivel'];

        $query = "Call Proc_ArchNivel( 'S', '0', '0','  0 ',' 0','0','0','$IDNivel');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function getLastCursos() {
        $query = "Call Proc_Curso( 'E', '0','0', '0','0','0','0', '0','0','0','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function BuscarCurso( $json ) {
        $datos = json_decode( $json, true );

        $Busqueda = $datos['Busqueda'];
        $query = "Call Proc_Curso( 'G',0,' $Busqueda', '0', '0',0,'0','0 ', 0, '0', ' 0 ');";
        $datos = parent::obtenerDatos( $query );
        return ( $datos );
    }

    public function RegistrarComentario ( $json ) {

        $datos = json_decode( $json, true );

        $ID_Estudiante = $datos['ID_Estudiante'];
        $ID_Curso = $datos['ID_Curso'];
        $comentario = $datos['comentario'];
        $like = $datos['like'];

        $query = "Call Proc_Comentario( 'I', $like,' $comentario','$ID_Estudiante','$ID_Curso');";
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

    public function VerComentarios ( $json ) {

        $datos = json_decode( $json, true );

        $ID_Curso = $datos['ID_Curso'];

        $query = "Call Proc_Comentario( 'S', 0,' 0','0','$ID_Curso');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function VerLikes( $json ) {

        $datos = json_decode( $json, true );

        $ID_Curso = $datos['ID_Curso'];

        $query = "Call Proc_Comentario( 'L', 0,' 0','0','$ID_Curso');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function VerDislikes( $json ) {

        $datos = json_decode( $json, true );

        $ID_Curso = $datos['ID_Curso'];

        $query = "Call Proc_Comentario( 'D', 0,' 0','0','$ID_Curso');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function VerComentariosUser ( $json ) {

        $datos = json_decode( $json, true );

        $ID_Curso = $datos['ID_Curso'];
        $ID_Estudiante = $datos['ID_Estudiante'];

        $query = "Call Proc_Comentario( 'A', 0,' 0','$ID_Estudiante ','$ID_Curso');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function MejoresCursos() {
        $query = "Call Proc_Curso( 'C', '0', '0','0','0','0','0', '0','0','0','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function CursosRecientes() {
        $query = "Call Proc_Curso( 'H', '0', '0','0','0','0','0', '0','0','0','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function CursosMasVendidos() {
        $query = "Call Proc_Curso( 'J', '0', '0','0','0','0','0', '0','0','0','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function CursosFechas($json) {
        
        $datos = json_decode( $json, true );

        $fecha1 = $datos['fecha1'];
        $fecha2 = $datos['fecha2'];

        $query = "Call Proc_BuscarCursoFecha( 'S', '$fecha1', '$fecha2');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }
    public function CursosUnaFecha($json) {
        
        $datos = json_decode( $json, true );

        $fecha1 = $datos['fecha1'];
      

        $query = "Call Proc_BuscarCursoFecha( 'A', '$fecha1', '0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }
    public function BajaCurso($json) {
        
        $datos = json_decode( $json, true );

        $ID_Curso = $datos['ID_Curso'];
      

        $query = "Call Proc_Curso( 'D', '$ID_Curso', '0','0','0','0','0', '0','0','0','0');";
        $verificacion = parent::rowsAfectados( $query );
        

        if ( $verificacion == 1 ) {
            $success = 'success';
            return  1 ;
        } else {
            $success = 'fail';
            return  parent::Error();
        }

        
    }
    public function ActivarCurso($json) {
        
        $datos = json_decode( $json, true );

        $ID_Curso = $datos['ID_Curso'];
      

        $query = "Call Proc_Curso( 'K', '$ID_Curso', '0','0','0','0','0', '0','0','0','0');";
        $verificacion = parent::rowsAfectados( $query );
        

        if ( $verificacion == 1 ) {
            $success = 'success';
            return  1 ;
        } else {
            $success = 'fail';
            return  parent::Error();
        }

        
    }
    public function EditarCursos ( $json, $blob ) {

        $datos = json_decode( $json, true );
        $ID_Curso = $datos['ID_Curso'];
        $titulo = $datos['titulo'];
        $descripcion = $datos['descripcion'];
     
   

        $query = "Call Proc_Curso( 'U',' $ID_Curso',' $titulo', '0', '  0',0,' 0',' $descripcion ', 0, '$blob', ' 0 ');";
        $verificacion = parent::rowsAfectados( $query );
        //Si se agrego

        if ( $verificacion == 1 ) {
            $success = 'success';
            return  1 ;
        } else {
            $success = 'fail';
            return  parent::Error();
        }
        ;
    }
    public function EditarCursosSinFoto ( $json ) {

        $datos = json_decode( $json, true );
        $ID_Curso = $datos['ID_Curso'];
        $titulo = $datos['titulo'];
        $descripcion = $datos['descripcion'];
     
   

        $query = "Call Proc_Curso( 'U',' $ID_Curso',' $titulo', '0', '  0',0,' 0',' $descripcion ', 0, 'null', ' 0 ');";
        $verificacion = parent::rowsAfectados( $query );
        //Si se agrego

        if ( $verificacion == 1 ) {
            $success = 'success';
            return  1 ;
        } else {
            $success = 'fail';
            return  parent::Error();
        }
        ;
    }
}

?>