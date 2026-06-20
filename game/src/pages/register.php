<?php include __DIR__ . '/../partials/navbar.html.php'; ?>

<main class="background">
    <div class="welcome_content">
        <h1 class="welcome-subtitle">Register</h1>

        <form class="register-content" onsubmit="event.preventDefault(); registerAccount();">
            <div class="form-group">
                <label for="fname"><b>Name</b></label>
                <input type="text" id="fname" placeholder="Enter Name" name="fname" required>
            </div>

            <div class="form-group">
                <label for="email"><b>E-mail</b></label>
                <input type="email" id="email" placeholder="Enter email" name="email" required>
            </div>

            <div class="form-group">
                <label for="uname"><b>Username</b></label>
                <input type="text" id="uname" placeholder="Enter Username" name="uname" required>
            </div>

            <div class="form-group">
                <label for="psw"><b>Password</b></label>
                <input type="password" id="psw" placeholder="Enter Password" name="psw" required>
            </div>

            <div class="form-group">
                <label for="psw-confirm"><b>Re-enter password</b></label>
                <input type="password" id="psw-confirm" placeholder="Confirm Password" name="psw_confirm" required>
            </div>

            <button type="submit" class="button button-login">Create account</button>
        </form>
    </div>
</main>