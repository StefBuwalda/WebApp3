<?php
header('Content-Type: application/javascript');
?>
async function registerAccount() {
    const username = document.getElementById('uname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('psw').value;
    const confirm = document.getElementById('psw-confirm').value;
    const errorEl = document.getElementById('register-error');
    const API_BASE = <?= json_encode(getenv('API_BASE_URL')) ?>;

    errorEl.style.display = 'none';
    errorEl.textContent = '';

    if (password !== confirm) {
        errorEl.textContent = 'Passwords do not match.';
        errorEl.style.display = 'block';
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/memory/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password}),
        });

        if (response.status !== 201) {
            const data = await response.json().catch(() => ({}));
            errorEl.textContent = data.message ?? `Registration failed (${response.status}).`;
            errorEl.style.display = 'block';
            return;
        }

        window.location.href = '/login';
    } catch (err) {
        errorEl.textContent = 'Could not reach the server. Please try again.';
        errorEl.style.display = 'block';
    }
}