<?php

session_start();
$foto = $_SESSION["Foto"];
header("content_type: image/jpeg");
echo $foto;
?>