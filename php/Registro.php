<?php 
        $FraseSalt="QWERTY";
        $usuario = array();

        $usuario["usuario"] = $_POST["usuario"];
        $usuario["correo"] = $_POST["correo"];
        $usuario["nombres"] = $_POST["nombres"];
        $usuario["apellidos"] = $_POST["apellidos"];
        $usuario["departamento"] = $_POST["departamento"];
        $usuario["municipio"] = $_POST["municipio"];
        $usuario["Contrasena"] = md5($FraseSalt.$_POST["Contrasena"]);

        echo json_encode($usuario);
    ?>