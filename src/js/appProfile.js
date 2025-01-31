document.getElementById("miCuentaBtn").addEventListener("click", function () {
    document.getElementById("miCuenta").style.display = "block";
    document.getElementById("miCuentaBtn").classList.remove("focus");
    document.getElementById("miClaveBtn").classList.remove("focus");
    document.getElementById("miCuentaBtn").classList.add("focus");
    document.getElementById("miClave").style.display = "none";

})

document.getElementById("miClaveBtn").addEventListener("click", function () {
    document.getElementById("miCuenta").style.display = "none";
    document.getElementById("miClave").style.display = "block";
    document.getElementById("miCuentaBtn").classList.remove("focus");
    document.getElementById("miClaveBtn").classList.remove("focus");
    document.getElementById("miClaveBtn").classList.add("focus");
})

$("#MostrarClaveUno").click(function () {
    let passwordInput = $('#claveVieja');
    let tipo = passwordInput.attr('type');
    let icono = $(this).find('i');
    if (tipo === 'password') {
        passwordInput.attr('type', 'text');
        icono.removeClass('bi-eye-fill').addClass('bi-eye-slash-fill');
    } else {
        passwordInput.attr('type', 'password');
        icono.removeClass('bi-eye-slash-fill').addClass('bi-eye-fill');
    }
})

$("#MostrarClaveDos").click(function () {
    let passwordInput = $('#claveNueva');
    let tipo = passwordInput.attr('type');
    let icono = $(this).find('i');
    if (tipo === 'password') {
        passwordInput.attr('type', 'text');
        icono.removeClass('bi-eye-fill').addClass('bi-eye-slash-fill');
    } else {
        passwordInput.attr('type', 'password');
        icono.removeClass('bi-eye-slash-fill').addClass('bi-eye-fill');
    }
})

$("#MostrarClaveTres").click(function () {
    let passwordInput = $('#claveNuevaConf');
    let tipo = passwordInput.attr('type');
    let icono = $(this).find('i');
    if (tipo === 'password') {
        passwordInput.attr('type', 'text');
        icono.removeClass('bi-eye-fill').addClass('bi-eye-slash-fill');
    } else {
        passwordInput.attr('type', 'password');
        icono.removeClass('bi-eye-slash-fill').addClass('bi-eye-fill');
    }
})

$("#actualizarBtn").on("click", function (e) {
    e.preventDefault();
    Actualizar();
})

$("#btnClaveGuardar").on("click", function (e) {
    e.preventDefault();
    ActualizarClave();
})

$("#cerrarSesionBtn").on("click", function (e) {
    e.preventDefault();
    Salir();
})

$("#eliminarCuentaBtn").on("click", function (e) {
    e.preventDefault();
    Eliminar();
})

fetch('../controllers/usuario.php?op=mostrar').then(response => response.json()).then(data => {
    document.getElementById("nombreUpgrade").value = data[0].nombre;
    document.getElementById("tipoUpgrade").value = data[0].tipo_documento;
    document.getElementById("nroUpgrade").value = data[0].nro_documento;
    document.getElementById("telefonoUpgrade").value = data[0].telefono;
    document.getElementById("correoUpgrade").value = data[0].correo;
})
    .catch(error => console.error('Error:', error));



function Actualizar() {
    var formData = new FormData(document.getElementById("miCuenta"));
    console.log(formData)

    Notiflix.Confirm.show(
        'Confirmación',
        '¿Seguro que desea actualizar sus datos?',
        'Si',
        'No',
        function okCb() {
            $.ajax({
                url: "../controllers/usuario.php?op=actualizar",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,

                success: function (datos) {
                    data = JSON.parse(datos);
                    console.log(data);
                    var tipo = data.tipo;
                    var msg = data.msg;
                    if (tipo === 'success') {
                        Notiflix.Notify.success(msg);
                        setTimeout(() => {
                            window.location.href = "./profile.php";
                        }, 2000);
                    } else {
                        Notiflix.Notify.failure(msg);
                    }
                }
            });
        },
        function cancelCb() {

        }
    );
}

function ActualizarClave() {
    var formData = new FormData(document.getElementById("miClave"));
    var claveUno = document.getElementById("claveNueva").value;
    var claveDos = document.getElementById("claveNuevaConf").value;
    var claveVieja = document.getElementById("claveVieja").value;
    console.log(formData);
    if (claveVieja === "" || claveUno === "" || claveDos === "") {
        Notiflix.Notify.warning("Complete los campos");
    } else {
        if (claveUno === claveDos) {
            if (validarContraseña(claveUno)) {
                Notiflix.Confirm.show(
                    'Confirmación',
                    '¿Seguro que desea actualizar su contraseña?',
                    'Si',
                    'No',
                    function okCb() {
                        $.ajax({
                            url: "../controllers/usuario.php?op=actualizarClave",
                            type: "POST",
                            data: formData,
                            contentType: false,
                            processData: false,

                            success: function (datos) {
                                data = JSON.parse(datos);
                                console.log(data);
                                var tipo = data.tipo;
                                var msg = data.msg;
                                if (tipo === 'success') {
                                    Notiflix.Notify.success(msg);
                                    setTimeout(() => {
                                        window.location.href = "./profile.php";
                                    }, 2000);
                                } else {
                                    Notiflix.Notify.failure(msg);
                                }
                            }
                        });
                    },
                    function cancelCb() {

                    }
                );
            } else {
                Notiflix.Notify.warning("Contraseña debil");
            }
        } else {
            Notiflix.Notify.warning("Las claves deben ser iguales");
        }
    }
}

function Eliminar() {
    Notiflix.Confirm.show(
        'Confirmación',
        '¿Seguro que desea eliminar su cuenta?',
        'Si',
        'No',
        function okCb() {
            $.post("../controllers/usuario.php?op=eliminar" , function(e){
                data = JSON.parse(e);

                if(data.tipo === 'success'){
                    Notiflix.Notify.success(data.msg);
                    setTimeout(() => {
                        window.location.href = "../../index.php";
                    }, 2000);
                }else{
                    Notiflix.Notify.failure(data.msg);
                }
			});
            $.ajax({
                url: "../controllers/usuario.php?op=eliminar",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,

                success: function (datos) {
                    data = JSON.parse(datos);
                    console.log(data);
                    var tipo = data.tipo;
                    var msg = data.msg;
                    if (tipo === 'success') {
                        Notiflix.Notify.success(msg);
                        setTimeout(() => {
                            window.location.href = "../../index.php";
                        }, 2000);
                    } else {
                        Notiflix.Notify.failure(msg);
                    }
                }
            });
        },
        function cancelCb() {

        }
    )

}

function Salir() {
    Notiflix.Confirm.show(
        'Confirmación',
        '¿Seguro que desea salir?',
        'Si',
        'No',
        function okCb() {
            $.post("../controllers/usuario.php?op=salir" , function(e){
                data = JSON.parse(e);

				Notiflix.Notify.success(data.msg);
				setTimeout(() => {
                    window.location.href = "../../index.php";
                }, 2000);
			});
        },
        function cancelCb() {

        }
    )

}

function validarContraseña(contraseña) {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(contraseña);
}