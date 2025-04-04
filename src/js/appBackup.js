const observer = new MutationObserver(() => {
    const dbActionsBtn = document.getElementById('dbActionsBtn');
    const dbActionsMenu = document.getElementById('dbActionsMenu');
    const backupBtn = document.getElementById('backupBtn');
    const restoreBtn = document.getElementById('restoreBtn');
    const restoreModal = document.getElementById('restoreModal');
    const closeRestoreModal = document.getElementById('closeRestoreModal');
    const confirmRestoreBtn = document.getElementById('confirmRestoreBtn');
    const backupFileInput = document.getElementById('backupFileInput');

    if (dbActionsBtn && dbActionsMenu && backupBtn && restoreBtn && restoreModal && closeRestoreModal && confirmRestoreBtn && backupFileInput) {
        dbActionsBtn.addEventListener('click', function () {
            dbActionsMenu.style.display = dbActionsMenu.style.display === 'block' ? 'none' : 'block';
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function (e) {
            if (!dbActionsBtn.contains(e.target) && !dbActionsMenu.contains(e.target)) {
                dbActionsMenu.style.display = 'none';
            }
        });

        // Mostrar modal de restauración
        restoreBtn.addEventListener('click', function () {
            dbActionsMenu.style.display = 'none';
            restoreModal.style.display = 'flex';
        });

        // Cerrar modal de restauración
        closeRestoreModal.addEventListener('click', function () {
            restoreModal.style.display = 'none';
        });

        // Confirmar restauración
        confirmRestoreBtn.addEventListener('click', function () {
            if (!backupFileInput.files.length) {
                alert('Por favor selecciona un archivo de respaldo');
                return;
            }

            const file = backupFileInput.files[0];
            restaurarRespaldo(file);
            restoreModal.style.display = 'none';
        });

        // Deja de observar una vez que los elementos están disponibles
        observer.disconnect();
    }

});

observer.observe(document.body, { childList: true, subtree: true });