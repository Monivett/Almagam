<?php

         require_once 'Connection.php';
        
        header("content_type: image/jpeg");

         class Curso extends conexion{

        function ObtenFoto(){
            $id = $_GET['id'];
            $query = "Call Proc_Curso( 'F', '$id', '0','0','0','0','0', '0','0','0','0');";
            $datos = parent::ObtenerFotosCurso($query); //Si se agrego
         echo $datos;
      
         }
        }
        $curso = new Curso;
        $result = $curso -> ObtenFoto();
       

      
 
?>