<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./src/styles/index.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <title>El Rincón de Alejandro</title>
</head>

<body>

    <?php include './src/pages/header.php'; ?>

    <main class="main-content"></main>

    <?php include './src/pages/login.php'; ?>

</body>
<script src="./src/js/api.js"></script>
<script src="./src/js/navigation.js"></script>
<script src="./src/js/header.js"></script>
<script src="./src/js/applogin.js"></script>

</html>