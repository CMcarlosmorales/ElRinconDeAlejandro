document.getElementById("registerLogin").addEventListener("click", function(e) {
    document.getElementById("login_box").style.display = "none";
    document.getElementById("recover_box").style.display = "none";
    document.getElementById("register_box").style.display = "block";
})

document.getElementById("recoverLogin").addEventListener("click", function(e) {
    document.getElementById("login_box").style.display = "none";
    document.getElementById("recover_box").style.display = "block";
    document.getElementById("register_box").style.display = "none";
})

document.getElementById("loginRegister").addEventListener("click", function(e) {
    document.getElementById("login_box").style.display = "block";
    document.getElementById("recover_box").style.display = "none";
    document.getElementById("register_box").style.display = "none";
})

document.getElementById("loginRecover").addEventListener("click", function(e) {
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

function ingresar(){
    var logina = document.querySelector("#emailLogin").value;
	var clavea = document.querySelector("#passwordLogin").value;

    if(logina != '' && clavea != ''){
        const xhr = new XMLHttpRequest();
        xhr.open("POST","../controllers/usuario.php?op=verificar");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status === 200){
                const data = xhr.responseText;
                console.log(data);

                if(data){
                    console.log(data);
                    //limpiar();
                    window.location.href = "../../index.php";
                }else{
                    console.log(data);
                }
            }else{
                console.log("Error al intentar iniciar sesion");
            }
        }
        xhr.send("logina=" + encodeURIComponent(logina) + "&clavea=" + encodeURIComponent(clavea));
    }else{
        console.log("Debe rellenar todos los datos");
    }
}

function registrar(){
    var formData = new FormData(document.getElementById("registerForm"));
    var claveuno = document.querySelector("#passwordRegister").value;
    var clavedos = document.querySelector("#conPasswordRegister").value;
    console.log(formData)

    if(claveuno === clavedos){
        if(validarContraseña(claveuno)){
            fetch('../controllers/usuario.php?op=insertar', { 
                method: 'POST', 
                body: formData 
            }) 
            .then(response => 
                response.text(),
                console.log("Registro exitoso"),
                document.getElementById("login_box").style.display = "block",
                document.getElementById("recover_box").style.display = "none",
                document.getElementById("register_box").style.display = "none",
            ) 
            .then(data => console.log(data)) 
            .catch(error => console.error('Error:', error));                    
        }else{
            console.log("Contraseña demasiado debíl")
        }
    }else{
        console.log("Las contraseñas deben ser iguales")
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