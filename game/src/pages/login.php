<?php include __DIR__ . '/../partials/navbar.html.php'; ?>

<main class="background">
    <div class="welcome_content">
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

        <img src="cats.png" alt="kitties in a row">
    </div>
</main>
<script>
    const dialog = document.getElementById('login-dialog');
    document.getElementById('open-modal-btn').addEventListener('click', () => dialog.showModal());
    document.getElementById('close-modal-btn').addEventListener('click', () => dialog.close());

    const API_BASE = <?= json_encode($_ENV['API_BASE_URL']) ?>;

    async function login() {
        const response = await fetch(`${API_BASE}/memory/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'Chantal', password: 'chantal' })
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem('jwt', data.token);
            alert('Login successful!\n\n' + JSON.stringify(data, null, 2));
        } else {
            alert('Login failed:\n\n' + JSON.stringify(data, null, 2));
        }
    }
</script>