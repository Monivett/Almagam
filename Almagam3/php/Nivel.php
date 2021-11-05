<?php
//Toma los datos de javascript y los manda a ClassVideo
require_once 'Class_Nivel.php';
$Nivel = new Nivel;

//REGISTRO DEL NIVEL
if ( $_POST['opc'] == 1 ) {
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $NumeroNivel = $_POST['NumeroNivel'];
    $file_name = $_FILES['Video']['name'];
    $file_temp = $_FILES['Video']['tmp_name'];
    $file_size = $_FILES['Video']['size'];

    if ( $file_size < 50000000 ) {
        $file = explode( '.', $file_name );
        $end = end( $file );
        $allowed_ext = array( 'avi', 'flv', 'wmv', 'mov', 'mp4' );
        if ( in_array( $end, $allowed_ext ) ) {
            $name = date( 'Ymd' ).time();
            $location = './../videos/'.$file_name.$name.'.'.$end;
            if ( move_uploaded_file( $file_temp, $location ) ) {
                $json = [
                    'titulo' => $titulo,
                    'descripcion'=> $descripcion,
                    'NumeroNivel'=> $NumeroNivel,
                    'location' =>  'videos/'.$file_name.$name.'.'.$end,
                    'nombreNivel' =>  $file_name,
                ];

                $data = json_encode( $json );

                $result = $Nivel -> Registrar( $data );
                echo $result;

            }
        } else {
            echo "<script>alert('Wrong video format')  
                window.location= './../Subirvideo.html'
                </script>";

        }
    } else {

        echo '<script language="javascript">alert("File too large to upload");</script>';

    }

}

//REGISTRO DE ARCHIVOS
if ( $_POST['opc'] == 2 ) {

    $file_name = $_FILES['archivo']['name'];
    $file_temp = $_FILES['archivo']['tmp_name'];
    $file_size = $_FILES['archivo']['size'];

    if ( $file_size < 50000000 ) {
        $file = explode( '.', $file_name );
        $end = end( $file );
        $allowed_ext = array( 'avi', 'flv', 'wmv', 'mov', 'mp4' );
        $PDF = array( 'pdf', 'docx', 'ppt', 'txt', 'pptx', 'zip', 'rar', 'php', 'js', 'java', 'css', 'html', 'cpp', 'htttp', 'html' );
        $imagenes = array( 'jpg', 'png', 'jpeg' );
        //Si es video
        if ( in_array( $end, $allowed_ext ) ) {
            $name = date( 'Ymd' ).time();
            $location = './../files/'.$file_name.$name.'.'.$end;
            if ( move_uploaded_file( $file_temp, $location ) ) {
                $json = [

                    'location' =>  'files/'.$file_name.$name.'.'.$end,
                    'nombre' =>  $file_name,
                    'tipo' => 'video'
                ];

                $data = json_encode( $json );

                $result = $Nivel -> RegistrarPDF( $data );
                echo $result;

            }
        }
        //Si es PDF
        if ( in_array( $end, $PDF ) ) {
            $name = date( 'Ymd' ).time();
            $location = './../files/'.$file_name.$name.'.'.$end;
            if ( move_uploaded_file( $file_temp, $location ) ) {
                $json = [

                    'location' =>  'files/'.$file_name.$name.'.'.$end,
                    'nombre' =>  $file_name,
                    'tipo' => 'Archivo'
                ];

                $data = json_encode( $json );

                $result = $Nivel -> RegistrarPDF( $data );
                echo $result;

            }

        }
        //Si es imagen
        if ( in_array( $end, $imagenes ) ) {

            $file_tmpi = $_FILES['archivo']['tmp_name'];
            // FILE: nombre, tmp_name: dirección, tipo y peso
            $file = file_get_contents( $file_tmpi );
            //file_get_contents: Agarra el contenido de esa dirección
            $blob = mysqli_real_escape_string( $Nivel->conexion, $file );
            //

            $name = date( 'Ymd' ).time();
            $location = './../files/'.$file_name.$name.'.'.$end;
            if ( move_uploaded_file( $file_temp, $location ) ) {
                $json = [

                    'location' =>  'files/'.$file_name.$name.'.'.$end,
                    'nombre' =>  $file_name,
                    'tipo' => 'Archivo'
                ];

                $data = json_encode( $json );

                $result = $Nivel -> RegistrarImagen( $data, $blob );
                echo $result;

            }

        }
    } else {
        echo "<script>alert('File too large to upload')
             
            window.location= './../Subirvideo.html'
            </script>";

    }

}

//MUESTRA LOS NIVELES DEL CURSO
if ( $_POST['opc'] == 3 ) {
    $IDCurso = $_POST['IDCurso'];
    $Nivel = $_POST['Nivel'];
    $json = [
        'IDCurso' => $IDCurso,
        'Nivel' => $Nivel
    ];

    $data = json_encode( $json );
    $result = $Nivel -> VerNivelCurso( $data );
    echo json_encode( $data );
}
//EDITAR EL NIVEL
if ( $_POST['opc'] == 4 ) {
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $ID_NIVEL = $_POST['ID_NIVEL'];
    $file_name = $_FILES['Video']['name'];
    $file_temp = $_FILES['Video']['tmp_name'];
    $file_size = $_FILES['Video']['size'];

    if ( $file_size < 50000000 ) {
        $file = explode( '.', $file_name );
        $end = end( $file );
        $allowed_ext = array( 'avi', 'flv', 'wmv', 'mov', 'mp4' );
        if ( in_array( $end, $allowed_ext ) ) {
            $name = date( 'Ymd' ).time();
            $location = './../videos/'.$file_name.$name.'.'.$end;
            if ( move_uploaded_file( $file_temp, $location ) ) {
                $json = [
                    'titulo' => $titulo,
                    'descripcion'=> $descripcion,
                    'location' =>  'videos/'.$file_name.$name.'.'.$end,
                    'nombreNivel' =>  $file_name,
                    'ID_NIVEL' =>  $ID_NIVEL
                ];

                $data = json_encode( $json );

                $result = $Nivel -> EditarNivel( $data );
                echo $result;

            }
        } else {
            echo "<script>alert('Wrong video format')  
                window.location= './../Subirvideo.html'
                </script>";

        }
    } else {

        echo '<script language="javascript">alert("File too large to upload");</script>';

    }

}
//EDITAR ARCHIVO DEL NIVEL
if ( $_POST['opc'] == 5 ) {
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $ID_NIVEL = $_POST['ID_NIVEL'];

    $json = [
        'titulo' => $titulo,
        'descripcion'=> $descripcion,
        'location' =>  'null',
        'nombreNivel' =>  'null',
        'ID_NIVEL' =>  $ID_NIVEL
    ];

    $data = json_encode( $json );

    $result = $Nivel -> EditarNivel( $data );
    echo $result;

}
//EDITAR EL ARCHIVO EXTRA DEL NIVEL
if ( $_POST['opc'] == 6 ) {

    $id_archivo = $_POST['id_archivo'];
    $file_name = $_FILES['file']['name'];
    $file_temp = $_FILES['file']['tmp_name'];
    $file_size = $_FILES['file']['size'];

    if ( $file_size < 50000000 ) {
        $file = explode( '.', $file_name );
        $end = end( $file );
        $allowed_ext = array( 'avi', 'flv', 'wmv', 'mov', 'mp4' );
        $PDF = array( 'pdf', 'docx', 'ppt', 'txt', 'pptx', 'zip', 'rar', 'php', 'js', 'java', 'css', 'html', 'cpp', 'htttp', 'html' );
        $imagenes = array( 'jpg', 'png', 'jpeg' );
        //Si es video
        if ( in_array( $end, $allowed_ext ) ) {
            $name = date( 'Ymd' ).time();
            $location = './../files/'.$file_name.$name.'.'.$end;
            if ( move_uploaded_file( $file_temp, $location ) ) {
                $json = [

                    'location' =>  'files/'.$file_name.$name.'.'.$end,
                    'nombre' =>  $file_name,
                    'id_archivo' => $id_archivo,
                    'tipo' => 'video'
                ];

                $data = json_encode( $json );

                $result = $Nivel -> EditarArchivosNivel( $data );
                echo $result;

            }
        }
        //Si es PDF
        if ( in_array( $end, $PDF ) ) {
            $name = date( 'Ymd' ).time();
            $location = './../files/'.$file_name.$name.'.'.$end;
            if ( move_uploaded_file( $file_temp, $location ) ) {
                $json = [

                    'location' =>  'files/'.$file_name.$name.'.'.$end,
                    'nombre' =>  $file_name,
                    'id_archivo' => $id_archivo,
                    'tipo' => 'Archivo'
                ];

                $data = json_encode( $json );

                $result = $Nivel -> EditarArchivosNivel( $data );
                echo $result;

            }

        }
        //Si es imagen
        if ( in_array( $end, $imagenes ) ) {

            $file_tmpi = $_FILES['archivo']['tmp_name'];
            // FILE: nombre, tmp_name: dirección, tipo y peso
            $file = file_get_contents( $file_tmpi );
            //file_get_contents: Agarra el contenido de esa dirección
            $blob = mysqli_real_escape_string( $Nivel->conexion, $file );
            //

            $name = date( 'Ymd' ).time();
            $location = './../files/'.$file_name.$name.'.'.$end;
            if ( move_uploaded_file( $file_temp, $location ) ) {
                $json = [

                    'location' =>  'files/'.$file_name.$name.'.'.$end,
                    'nombre' =>  $file_name,
                    'id_archivo' => $id_archivo,
                    'tipo' => 'Archivo'
                ];

                $data = json_encode( $json );

                $result = $Nivel -> EditarArchivosNivel( $data, $blob );
                echo $result;

            }

        }
    } else {
        echo "<script>alert('File too large to upload')
             
            window.location= './../Subirvideo.html'
            </script>";

    }


}
//ELIMINAR ARCHIVOS
if ( $_POST['opc'] == 7 ) {

    $id_archivo = $_POST['id_archivo'];
  
    $json = [
        'id_archivo' => $id_archivo
    ];

    $data = json_encode( $json );

    $result = $Nivel -> EliminarArchivosNivel( $data );
    echo $result;


}

//REGISTRO DE ARCHIVOS EXTRAS
if ( $_POST['opc'] == 8 ) {
    $id_nivel = $_POST['id_nivel'];
    $file_name = $_FILES['archivo']['name'];
    $file_temp = $_FILES['archivo']['tmp_name'];
    $file_size = $_FILES['archivo']['size'];

    if ( $file_size < 50000000 ) {
        $file = explode( '.', $file_name );
        $end = end( $file );
        $allowed_ext = array( 'avi', 'flv', 'wmv', 'mov', 'mp4' );
        $PDF = array( 'pdf', 'docx', 'ppt', 'txt', 'pptx', 'zip', 'rar', 'php', 'js', 'java', 'css', 'html', 'cpp', 'htttp', 'html' );
        $imagenes = array( 'jpg', 'png', 'jpeg' );
        //Si es video
        if ( in_array( $end, $allowed_ext ) ) {
            $name = date( 'Ymd' ).time();
            $location = './../files/'.$file_name.$name.'.'.$end;
            if ( move_uploaded_file( $file_temp, $location ) ) {
                $json = [

                    'location' =>  'files/'.$file_name.$name.'.'.$end,
                    'nombre' =>  $file_name,
                    'tipo' => 'video',
                    'id_nivel' => $id_nivel
                ];

                $data = json_encode( $json );

                $result = $Nivel -> AñadirArchivos( $data );
                echo $result;

            }
        }
        //Si es PDF
        if ( in_array( $end, $PDF ) ) {
            $name = date( 'Ymd' ).time();
            $location = './../files/'.$file_name.$name.'.'.$end;
            if ( move_uploaded_file( $file_temp, $location ) ) {
                $json = [

                    'location' =>  'files/'.$file_name.$name.'.'.$end,
                    'nombre' =>  $file_name,
                    'tipo' => 'Archivo',
                    'id_nivel' => $id_nivel
                ];

                $data = json_encode( $json );

                $result = $Nivel -> AñadirArchivos( $data );
                echo $result;

            }

        }
        //Si es imagen
        if ( in_array( $end, $imagenes ) ) {

            $file_tmpi = $_FILES['archivo']['tmp_name'];
            // FILE: nombre, tmp_name: dirección, tipo y peso
            $file = file_get_contents( $file_tmpi );
            //file_get_contents: Agarra el contenido de esa dirección
            $blob = mysqli_real_escape_string( $Nivel->conexion, $file );
            //

            $name = date( 'Ymd' ).time();
            $location = './../files/'.$file_name.$name.'.'.$end;
            if ( move_uploaded_file( $file_temp, $location ) ) {
                $json = [

                    'location' =>  'files/'.$file_name.$name.'.'.$end,
                    'nombre' =>  $file_name,
                    'tipo' => 'Archivo',
                    'id_nivel' => $id_nivel
                ];

                $data = json_encode( $json );

                $result = $Nivel -> AñadirArchivosFoto( $data, $blob );
                echo $result;

            }

        }
    } else {
        echo "<script>alert('File too large to upload')
             
            window.location= './../Subirvideo.html'
            </script>";

    }

}
?>