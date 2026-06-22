<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="/css/login.css">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/navbar.css">
    <link rel="stylesheet" href="/css/card.css">
    <link rel="stylesheet" href="/css/healthbar.css">
    <link rel="stylesheet" href="/css/home.css"

</head>

<body>

<?php
include __DIR__ . '/../partials/navbar.html.php'; ?>

<div class="welcome_content">
    <div id="loginGroup">
        <h1>Hello and Welcome</h1>
        <p class="welcome-subtitle">Had a rough day? Come play your favorite memory!</p>

        <div class="choice-area">
            <a href="/register" class="button">Register</a>

            <input type="checkbox" id="modal-toggle" class="modal-checkbox">
            <label for="modal-toggle" class="button-wrapper">
                <span class="button">Login</span>
            </label>

            <div class="modal-overlay" id="myModal">
                <label for="modal-toggle" class="outside-close-area"></label>

                <form class="modal-content" onsubmit="event.preventDefault(); login();">
                    <label for="modal-toggle" class="close-btn">&times;</label>

                    <div class="form-group">
                        <label for="uname"><b>Username</b></label>
                        <input type="text" id="uname" placeholder="Enter Username" name="uname" required>
                    </div>

                    <div class="form-group">
                        <label for="psw"><b>Password</b></label>
                        <input type="password" id="psw" placeholder="Enter Password" name="psw" required>
                    </div>

                    <button type="submit" class="button button-submit">Log in</button>
                </form>
            </div>
        </div>
    </div>


    <img src="cats.png" id="loginCats" alt="kitties in a row">
</div>

<script src="/js/login.js.php">
</script>

</body>


</html>