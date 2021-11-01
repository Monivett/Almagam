<?php
//Toma los datos de javascript y los manda a Class_User
require_once 'Class_Category.php';
$category = new Category;

//recibe el json y lo tranforma a un arreglo
    $postbody = file_get_contents("php://input"); //Agarra el form que mando 
    $datos = json_decode($postbody,true); //Convierte en json los datos

    //REGISTRO
    if($_POST['opc']==1){
        $Nombre=$_POST['Nombre'];
        $Descp=$_POST['Descp'];
        $UsuarioCreacion=$_POST['UsuarioCreacion'];
 
        $json = [
            "Nombre" => $Nombre,
            "Descripción"=> $Descp,
            "UsuarioCreacion"=> $UsuarioCreacion,
           
        ];

        $pasa = json_encode($json); //Convierte en json
        
        $result = $category->Registrar($pasa);
        echo $result;
    }



    //Obtener categorias
    if ($_POST['opc'] == 2) {
        header('Content-Type: application/json');
        $result = $category -> getCategories();
        echo json_encode($result);
    
    }

      //EDITAR PERFIL
      if($_POST['opc']==4){
        $id=$_POST['ID'];
        $nombre=$_POST['nombre'];
        $correo=$_POST['correo'];
        $genero=$_POST['genero'];
        $contrasena=$_POST['contrasena'];
        $fechanac=$_POST['fechanac'];
      

        $file_tmpi = $_FILES['foto']['tmp_name']; // FILE: nombre, tmp_name: dirección, tipo y peso 
        $file = file_get_contents( $file_tmpi);//file_get_contents: Agarra el contenido de esa dirección
        $blob =mysqli_real_escape_string($user->conexion,$file); //

        $json = [
            "ID" => $id,
            "nombre" => $nombre,
            "correo"=> $correo,
            "genero"=> $genero,
            "contrasena"=> $contrasena,
            "fechanac"=> $fechanac,
           
        ];

        $pasa = json_encode($json); //Convierte en json
        
        $result = $user->EditarPerfil($pasa, $blob);
        echo $result;
    }
  

?>