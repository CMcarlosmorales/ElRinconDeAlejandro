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
    console.log('Registro submitted');
});