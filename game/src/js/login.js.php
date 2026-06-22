<?php
header('Content-Type: application/javascript');
?>

const API_BASE = <?= json_encode(getenv('API_BASE_URL')) ?>;

async function login() {
    const response = await fetch(`${API_BASE}/memory/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: 'Chantal', password: 'chantal'})
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem('jwt', data.token);
        alert('Login successful!\n\n' + JSON.stringify(data, null, 2));
    } else {
        alert('Login failed:\n\n' + JSON.stringify(data, null, 2));
    }
}
