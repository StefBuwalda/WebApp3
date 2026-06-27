<?php
header('Content-Type: application/javascript');
?>

const API_BASE = <?= json_encode(getenv('API_BASE_URL')) ?>;

const errorEl = document.getElementById('login-error');
errorEl.classList.remove('visible');

function showError(msg) {
    errorEl.textContent = msg;
    errorEl.classList.add('visible');
}

async function login(e) {
    e.preventDefault();

    const btn = document.getElementById('login-btn');
    btn.disabled = true;
    btn.textContent = 'Logging in...';

    try {
        const response = await fetch(`${API_BASE}/memory/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: document.getElementById('uname').value,
                password: document.getElementById('psw').value,
            })
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem('jwt', data.token);
            window.location.href = "/";
        } else {
            showError('Login failed: ' + (data.message ?? JSON.stringify(data)));
        }
    } catch (err) {
        showError('Could not reach the server. Please try again.');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Log in';
    }
}

document.getElementById('login-form').addEventListener('submit', login);