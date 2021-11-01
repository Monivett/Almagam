<?php
//Toma los datos de javascript y los manda a Class_Category
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

      //Obtener cursos en base a su categoria
      if($_POST['opc']==3){
        header('Content-Type: application/json');
        $ID_Cat=$_POST['ID_Cat'];
       
        $json = [
            "ID_Cat" => $ID_Cat
           
        ];

        $pasa = json_encode($json); //Convierte en json
        
        $result = $category->getCursoCategories($pasa);
        echo json_encode($result);
    }
  

?>