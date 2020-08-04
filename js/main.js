const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    contrasena: /^.{4,12}$/ // 4 a 12 digitos.
}

const campos = {
    usuario: false,
    correo: false,
    nombres: false,
    apellidos: false,
    contrasena: false,
    departamento: false
}

const validarFormulario = (e) => {
    // console.log(e.target.name);
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, e.target.name);
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, e.target.name);
            break;
        case "nombres":
            validarCampo(expresiones.nombre, e.target, e.target.name);
            break;
        case "apellidos":
            validarCampo(expresiones.apellido, e.target, e.target.name);
            break;
        case "Contrasena":
            validarCampo(expresiones.contrasena, e.target, e.target.name);
            ValidarContrasena2();
            break;
        case "Contrasena2":
            ValidarContrasena2();
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

const ValidarContrasena2 = () => {
    const inputPassword1 = document.getElementById('Contrasena');
    const inputPassword2 = document.getElementById('Contrasena2');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__contrasena2`).classList.remove('formulario__grupo-correcto');
        document.getElementById(`grupo__contrasena2`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__contrasena2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__contrasena2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__contrasena2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['contrasena'] = false;
    } else {
        document.getElementById(`grupo__contrasena2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__contrasena2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__contrasena2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__contrasena2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__contrasena2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['contrasena'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!campos.usuario || !campos.correo || !campos.nombres || !campos.apellidos || !campos.contrasena) {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    } else {
        Procesamiento();
    }
});

function revision() {
    var ciudades = [["Leticia"], ["Medellín", "Envigado", "Sabaneta", "Bello"], ["Arauca", "Arauquita", "Saravena"], ["Barranquilla"], ["Cartagena"], ["Tunja"], ["Manizales"], ["Florencia"], ["Yopal"], ["Popayan"], ["Valledupar"], ["Quibdo"], ["Monteria"], ["Bogota", "Bituima", "Chipaque", "Ubaque", "Cota"], ["Inirida"], ["San Jose del Guaviare"], ["Neiva"], ["Rioacha"], ["Santa Marta", "Algarrobo", "Concordia"], ["Villavicencio"], ["Pasto"], ["Cucuta"], ["Mocoa"], ["Armenia"], ["Pereira", "Dosquebradas", "La Virginia", "Santa Rosa De Cabal"], ["San Andres"], ["Bucaramanga"], ["Sincelejo"], ["Ibague"], ["Cali", "Buga", "Palmira", "Cartago"], ["Mitu"], ["Puerto Carreño"]];

    var arreglo;
    var departamentos = document.getElementById("departamento");
    var municipios = document.getElementById("municipio");
    arreglo = ciudades[departamentos.value];
    municipios.innerHTML = "";

    for (var i = 0; i < arreglo.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = ciudades[departamentos.value][i];
        municipios.appendChild(option);
    }
}

function Procesamiento() {
    fetch('../php/registro.php', {
        method: 'post',
        body: new FormData(formulario)
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        CargaLocalStorage(json);
    }).catch(function (err) {
        // Ocurrio un error
    });
}

function CargaLocalStorage(json) {
    localStorage.setItem("usuario", JSON.stringify(json));
    location.href = "Login.html";
}