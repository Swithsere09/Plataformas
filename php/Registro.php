<?php 
        $FraseSalt="QWERTY";
        $usuario = array();

        if(isset($_POST["usuario"]) && isset($_POST["correo"]) && isset($_POST["nombres"]) && isset($_POST["apellidos"]) && isset($_POST["departamento"])
        && isset($_POST["municipio"])){
            $usuario["usuario"] = $_POST["usuario"];
            $usuario["correo"] = $_POST["correo"];
            $usuario["nombres"] = $_POST["nombres"];
            $usuario["apellidos"] = $_POST["apellidos"];
            $usuario["departamento"] = $_POST["departamento"];
            $usuario["municipio"] = $_POST["municipio"];
        }

        $usuario["Contrasena"] = md5($FraseSalt.$_POST["Contrasena"]);

        echo json_encode($usuario);
    ?>