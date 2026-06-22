<!DOCTYPE html>
<html lang="en">
<head>
    <script src="/js/fetch.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example page</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/navbar.css">
    <link rel="stylesheet" href="/css/card.css">
    <link rel="stylesheet" href="/css/healthbar.css">
    <link rel="stylesheet" href="/css/home.css"
</head>

<body>

<?php

include __DIR__ . '/../partials/navbar.html.php'; ?>

<main class="background">
    <div class="welcome_content">
        <h1 class="welcome-subtitle">Register</h1>

        <form class="register-content" onsubmit="event.preventDefault(); registerAccount();">
            <div class="form-group">
                <label for="uname"><b>Username</b></label>
                <input type="text" id="uname" placeholder="Enter Username" name="uname" required>
            </div>

            <div class="form-group">
                <label for="email"><b>E-mail</b></label>
                <input type="email" id="email" placeholder="Enter email" name="email" required>
            </div>

            <div class="form-group">
                <label for="psw"><b>Password</b></label>
                <input type="password" id="psw" placeholder="Enter Password" name="psw" required>
            </div>

            <div class="form-group">
                <label for="psw-confirm"><b>Re-enter password</b></label>
                <input type="password" id="psw-confirm" placeholder="Confirm Password" name="psw_confirm" required>
            </div>

            <p id="register-error" class="error-message" style="display:none;color:red;"></p>

            <button type="submit" class="button button-login">Create account</button>
        </form>
    </div>
</main>

<script src="js/registerAccount.js.php"></script>

</body>


</html>
