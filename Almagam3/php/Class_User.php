<?php

require_once 'Connection.php';

session_start();

class User extends conexion {

    public function Registrar ( $json, $blob ) {

        $datos = json_decode( $json, true );

        $nombre = $datos['nombre'];
        $correo = $datos['correo'];
        $genero = $datos['genero'];
        $contrasena = $datos['contrasena'];
        $fechanac = $datos['fechanac'];
        $rol = $datos['rol'];

        $query = "Call Proc_Usuario( 'I', '0', '$nombre',$genero,'$fechanac',
            '$blob', '$correo','$contrasena',$rol);";
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

    public function Login ( $json ) {

        $datos = json_decode( $json, true );

        $correo = $datos['correo'];
        $contrasena = $datos['contrasena'];

        $query = "Call Proc_Login( '$correo','$contrasena');";
        $datos = parent::ObtenerUsuario( $query );
        //Si se agrego

        return $datos;
    }

    public function getPerfilUsuario() {
        header( 'Content-Type: application/json' );
        if ( isset( $_SESSION['ID'] ) ) {
            $ID = $_SESSION['ID'];
            $nombre = $_SESSION['Nombre'];
            $genero = $_SESSION['Género'];
            $fechaNac = $_SESSION['FechaNacimiento'];
            $correo = $_SESSION['Email'];
            $password = $_SESSION['Contraseña'];
            $fechaRegistro = $_SESSION['FechaRegistro'];
            $fechaMod = $_SESSION['FechaMod'];
            $rol = $_SESSION['Rol'];

            $json = [
                'ID' => $ID,
                'Nombre' => $nombre,
                'Género'=> $genero,
                'FechaNacimiento'=> $fechaNac,
                'Email'=> $correo,
                'Contraseña'=> $password, //Esto es ilegal eh
                'FechaRegistro'=> $fechaRegistro,
                'FechaMod'=> $fechaMod,
                'Rol'=> $rol

            ];
            return $json;
        } else {
            $success = 0;
            return $success;
        }
    }

    public function EditarPerfil ( $json, $blob ) {

        $datos = json_decode( $json, true );
        $id = $datos['ID'];
        $nombre = $datos['nombre'];
        $correo = $datos['correo'];
        $genero = $datos['genero'];
        $contrasena = $datos['contrasena'];
        $fechanac = $datos['fechanac'];

        $query = "Call Proc_Usuario( 'U', '$id', '$nombre',$genero,'$fechanac',
        '$blob', '$correo','$contrasena','0');";
        $verificacion = parent::rowsAfectados( $query );
        //Si se agrego

        if ( $verificacion == 1 ) {
            $success = 'success';
            return $success;
        } else {
            $success = 'fail';
            return  parent::Error();
        }
        ;
    }

    public function getEstudiantes() {

        $query = "Call Proc_Usuario( 'C', '0', '0',0,'0', '0', '0','0',0);";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function getEscuelas() {

        $query = "Call Proc_Usuario( 'A', '0', '0',0,'0', '0', '0','0',0);";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function getCursoEscuela( $json ) {
        $datos = json_decode( $json, true );

        $ID_Escuela = $datos['ID_Escuela'];
        $query = "Call Proc_CursoCat( 'B','$ID_Escuela');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function PerfilEstudiante( $json ) {
        $datos = json_decode( $json, true );

        $ID_User = $datos['ID_User'];
        $query = "Call Proc_Perfil( 'A', '   $ID_User');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function Certificado ( $json ) {

        $datos = json_decode( $json, true );

        $ID_User = $datos['ID_User'];
        $ID_Curso = $datos['ID_Curso'];
        $query = "Call Proc_Inscripcion( 'Z', '0', ' $ID_User','$ID_Curso',' 0 ', '0', '0','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function GetNombreEscuela ( $json ) {

        $datos = json_decode( $json, true );

        $ID_User = $datos['ID_User'];
        $query = "Call Proc_Inscripcion( 'Y', '$ID_User', ' 0','0',' 0 ', '0', '0','0');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function PerfilEscuelaVentas( $json ) {
        $datos = json_decode( $json, true );

        $ID_User = $datos['ID_User'];
        $query = "Call Proc_Perfil( 'B', '   $ID_User');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function PerfilEscuelaTotalVentas( $json ) {
        $datos = json_decode( $json, true );

        $ID_User = $datos['ID_User'];
        $query = "Call Proc_Perfil( 'C', '   $ID_User');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }
    public function PerfilEscuelaTotalEfectivo( $json ) {
        $datos = json_decode( $json, true );

        $ID_User = $datos['ID_User'];
        $query = "Call Proc_Perfil( 'D', '   $ID_User');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }
    public function PerfilEscuelaTotalTransferencia( $json ) {
        $datos = json_decode( $json, true );

        $ID_User = $datos['ID_User'];
        $query = "Call Proc_Perfil( 'E', '   $ID_User');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }
    public function PerfilEscuelaTotalTarjeta( $json ) {
        $datos = json_decode( $json, true );

        $ID_User = $datos['ID_User'];
        $query = "Call Proc_Perfil( 'F', '   $ID_User');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function PerfilEscuelaVentasDetalle( $json ) {
        $datos = json_decode( $json, true );

        $ID_User = $datos['ID_User'];
        $query = "Call Proc_Perfil( 'G', '   $ID_User');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }

    public function PerfilEscuelaVentasTotalCurso( $json ) {
        $datos = json_decode( $json, true );

        $ID_User = $datos['ID_User'];
        $query = "Call Proc_Perfil( 'H', '   $ID_User');";
        $datos = parent::obtenerDatos( $query );

        return ( $datos );
    }
}

?>