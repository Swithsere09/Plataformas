const formulario = document.getElementById('formulario');

function Procesamiento() {
    let usuario = localStorage.getItem("usuario");
    console.log("0");
    if (usuario) {
        console.log("1");
        fetch('../php/registro.php', {
            method: 'post',
            body: new FormData(formulario)
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            ValidacionDatos(json);
        }).catch(function (err) {
            console.log("error");
        });
    }
}

function ValidacionDatos(json) {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log("entro...");
    if (usuario.Contrasena == json.Contrasena) {
        console.log("entro");
        //location.href = "Principal.html";
    } else {
        alert("Clave incorrecta");
    }
}