document.getElementById("registerLogin").addEventListener("click", function() {
    document.getElementById("login_box").style.display = "none";
    document.getElementById("recover_box").style.display = "none";
    document.getElementById("register_box").style.display = "block";
})

document.getElementById("recoverLogin").addEventListener("click", function() {
    document.getElementById("login_box").style.display = "none";
    document.getElementById("recover_box").style.display = "block";
    document.getElementById("register_box").style.display = "none";
})

document.getElementById("loginRegister").addEventListener("click", function() {
    document.getElementById("login_box").style.display = "block";
    document.getElementById("recover_box").style.display = "none";
    document.getElementById("register_box").style.display = "none";
})

document.getElementById("loginRecover").addEventListener("click", function() {
    document.getElementById("login_box").style.display = "block";
    document.getElementById("recover_box").style.display = "none";
    document.getElementById("register_box").style.display = "none";
})

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    ingresar();
})

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    registrar();
})

$("#MostrarLogin").click(function () {
    let passwordInput = $('#passwordLogin'); 
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

$("#MostrarRegister").click(function () {
    let passwordInput = $('#passwordRegister'); 
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

$("#MostrarRegisterCon").click(function () {
    let passwordInput = $('#conPasswordRegister'); 
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

function ingresar(){
    var formData = new FormData(document.getElementById("loginForm"));
    console.log(formData);
    $.ajax({
        url: "../controllers/usuario.php?op=verificar",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,

        success: function(datos){
            data=JSON.parse(datos);
            console.log(data);
            var tipo = data.tipo;
            var msg = data.msg;
            if(tipo === 'success'){
                Notiflix.Notify.success(msg);
                setTimeout(() => {
                    window.location.href = "../../index.php";
                }, 2000);
            }else{
                Notiflix.Notify.failure(msg);
            }
        }
    });
}

function registrar(){
    var formData = new FormData(document.getElementById("registerForm"));
    var claveuno = document.querySelector("#passwordRegister").value;
    var clavedos = document.querySelector("#conPasswordRegister").value;
    console.log(formData)

    if(claveuno === clavedos){
        if(validarContraseña(claveuno)){
            $.ajax({
                url: "../controllers/usuario.php?op=insertar",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
        
                success: function(datos){
                    data=JSON.parse(datos);
                    console.log(data);
                    var tipo = data.tipo;
                    var msg = data.msg;
                    if(tipo === 'success'){
                        Notiflix.Notify.success(msg);
                        setTimeout(() => {
                            window.location.href = "./login.php";
                        }, 2000);
                    }else{
                        Notiflix.Notify.failure(msg);
                    }
                }
            });                   
        }else{
            Notiflix.Notify.warning("Contraseña demasiado debíl")
        }
    }else{
        Notiflix.Notify.warning("Las contraseñas deben ser iguales")
    }       
}

const sendData = async (data) => {
    return await fetch("../ajax/upload.php", {
        method: "POST",
        body: data
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}

function validarContraseña(contraseña) { 
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; 
    return regex.test(contraseña); 
}