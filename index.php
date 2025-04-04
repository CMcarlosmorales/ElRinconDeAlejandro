<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="./src/img/favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="./src/styles/index.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <title>PELIFLIXX</title>

</head>

<body>

    <?php include './src/pages/header.php'; ?>

    <main class="main-content"></main>

    <?php include './src/pages/login.php'; ?>

</body>
<script type="module" src="./src/js/app.js"></script>
<script type="module"src="./src/js/api.js"></script>
<script type="module" src="./src/js/navigation.js"></script>
<script type="module" src="./src/js/header.js"></script>
<script type="module" src="./src/js/applogin.js"></script>


<script>
    const userLogged = <?= isset($_SESSION['usuario']) ? 'true' : 'false' ?>;
    const userData = <?= isset($_SESSION['usuario']) ?
     json_encode($_SESSION['usuario']) : 'null' ?>;
</script>

</html>