<?php

    require_once 'Connection.php';
    
    class Nivel extends conexion{

        public function Registrar ($json){
     

            $datos = json_decode($json,true);
        
            $titulo = $datos["titulo"];
            $descripcion = $datos["descripcion"];
            $NumeroNivel = $datos["NumeroNivel"];
            $location = $datos["location"];
           

                        $query = "Call Proc_Nivel( 'I', '$NumeroNivel', '$location',' $titulo',' $descripcion','0');";
                    
                        $verificacion = parent::rowsAfectados($query); 

                        if($verificacion == 1){
                            $success="success";
                            return 1;
                        }else{
                            $success="fail";
                            return  parent::Error();
                        };
                    
           
           
        } 
    
        public function RegistrarPDF ($json){
     

            $datos = json_decode($json,true);
  
            $location = $datos["location"];
            $nombre = $datos["nombre"];
            $tipo = $datos["tipo"];

                        $query = "Call Proc_ArchNivel( 'I', '0', '$location','  $nombre ','  $tipo','0','0');";
                        $verificacion = parent::rowsAfectados($query); 
                        if($verificacion == 1){
                            $success="success";
                            return 1;
                        }else{
                            $success="fail";
                            return  parent::Error();
                        };
        } 

        public function RegistrarImagen ($json,$blob){
     

            $datos = json_decode($json,true);
  
            $location = $datos["location"];
            $nombre = $datos["nombre"];
            $tipo = $datos["tipo"];

                        $query = "Call Proc_ArchNivel( 'I', '$blob', '$location','  $nombre ','  $tipo','0','0');";
                        $verificacion = parent::rowsAfectados($query); 
                        if($verificacion == 1){
                            $success="success";
                            return 1;
                        }else{
                            $success="fail";
                            return  parent::Error();
                        };
        } 
    
        public function VerNivelCurso ($json){
     

            $datos = json_decode($json,true);
  
            $IDCurso = $datos["IDCurso"];
            $Nivel = $datos["Nivel"];

            $query = "Call Proc_Curso( 'B', '$IDCurso', '0','0',' $Nivel ',
            '0', '0','0','0','0');";
            $datos = parent::obtenerDatos($query); 
            return ($datos);
        } 
    
    
    }
       
  
?>