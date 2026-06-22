<?php
header('Content-Type: application/javascript');
?>

const API_BASE = <?= json_encode(getenv('API_BASE_URL')) ?>;

async function login(e) {
    e.preventDefault();

    const btn = document.getElementById('login-btn');
    btn.disabled = true;
    btn.textContent = 'Logging in...';

    const username = document.getElementById('uname').value;
    const password = document.getElementById('psw').value;

    const response = await fetch(`${API_BASE}/memory/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem('jwt', data.token);
        window.location.href = "/";
    } else {
        alert('Login failed:\n\n' + JSON.stringify(data, null, 2));
        btn.disabled = false;
        btn.textContent = 'Log in';
    }
}

document.getElementById('login-form').addEventListener('submit', login);