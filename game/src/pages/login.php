<?php include __DIR__ . '/../partials/navbar.html.php';
?>

<div class="background">
    <div class="welcome_content">
        <h1>Hello and Welcome</h1>
        <h2> Had a rough day? Come play your favorite memory! </h2>

        <div class="choice-area">
            <a href="" class="button" > Register </a>
            <input type="checkbox" id="modal-toggle" class="modal-checkbox">
            <label for="modal-toggle" class="button-wrapper">
                <a class="button" type="open-btn">Login</a>
                </label>

            <div class="modal-overlay" id="myModal">
                <label for="modal-toggle" class="outside-close-area"></label>

                <div class="modal-content">
                    <label for="modal-toggle" class="close-btn">X</label>
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required>
                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required>
                    <button class="button" onclick="login()" > Log in </button>
                </div>

            </div>
        </div>
            <br>
            <img src="cats.png" alt="kitties in a row">
        </div>

</div>

<script>
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