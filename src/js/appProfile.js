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

document.getElementById("btnClaveGuardar").addEventListener("click", (e) => {
    e.preventDefault();
    ActualizarClave();
});

fetch('../controllers/usuario.php?op=mostrar').then(response => response.json()).then(data => {
    document.getElementById("nombreUpgrade").value = data[0].nombre;
    document.getElementById("tipoUpgrade").value = data[0].tipo_documento; 
    document.getElementById("nroUpgrade").value = data[0].nro_documento; 
    document.getElementById("telefonoUpgrade").value = data[0].telefono; 
    document.getElementById("correoUpgrade").value = data[0].correo;  
}) 
.catch(error => console.error('Error:', error));



function Actualizar(){
    var formData = new FormData(document.getElementById("miCuenta"));
    console.log(formData)

    fetch('../controllers/usuario.php?op=actualizar', { 
        method: 'POST', 
        body: formData 
    }) 
    .then(response => response.text()) 
    .then(data => console.log(data)) 
    .catch(error => console.error('Error:', error));                        
}

function ActualizarClave(){
    var formData = new FormData(document.getElementById("miClave"));
    var claveUno = document.getElementById("claveNueva").value;
    var claveDos = document.getElementById("claveNuevaConf").value;
    console.log(formData);
    if(claveUno === claveDos){
        if(validarContraseña(claveUno)){
            fetch('../controllers/usuario.php?op=actualizarClave', { 
                method: 'POST', 
                body: formData 
            }) 
            .then(response => response.text()) 
            .then(data => console.log(data)) 
            .catch(error => console.error('Error:', error));  
        }else{
            console.log("Contraseña debil");
        }
    }else{
        console.log("Las claves deben ser iguales");
    }
}

function Eliminar(){
    fetch('../controllers/usuario.php?op=eliminar') 
    .then(response => response.text()) 
    .then(data => console.log(data)) 
    .catch(error => console.error('Error:', error)); 
}

function Salir(){
    fetch('../controllers/usuario.php?op=salir') 
    .then(response => response.text()) 
    .then(data => console.log(data)) 
    .catch(error => console.error('Error:', error)); 
}

function validarContraseña(contraseña) { 
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; 
    return regex.test(contraseña); 
}