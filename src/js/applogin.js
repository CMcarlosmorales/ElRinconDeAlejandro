function toggleAuthModal() {
    const modal = document.getElementById('modalAuth');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const tabType = e.target.dataset.tab;
        
        
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        
      
        e.target.classList.add('active');
        document.getElementById(`${tabType}Form`).classList.add('active');
    });
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
   //login
    console.log('Login submitted');
});

document.getElementById('registroForm').addEventListener('submit', (e) => {
    e.preventDefault();
    //registro
    var data = document.getElementById("registroForm");
    var formData = new FormData(data);

    var nombre = document.getElementById("nombreRegistro").value;
    var correo = document.getElementById("emailRegistro").value;
    var clave = document.getElementById("passwordRegistro").value;

    if(nombre !== "" && correo !== "" && clave !== ""){
        fetch("src/controllers/login.php?op=insertar" , {
            method: "post",
            body: formData
        })
        .then(response => response.text())
        .then(datos => {
            data = JSON.parse(datos);
            if(data.tipo === "success"){
                alert(data.msg);
                toggleAuthModal();
            }else{
                alert(data.msg);
            }
        })
        .catch(error => {
            console.error("Error: ", error)
        })
    } else {
        alert("Debe llenar todos los campos");
    }

    console.log('Registro submitted');
});