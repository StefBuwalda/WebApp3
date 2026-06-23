const API_BASE = <?= json_encode(getenv('API_BASE_URL')) ?>;

function setFeedback(elementId, message, isError = false) {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.style.color = isError ? 'red' : 'green';
}

async function loadPreferences() {
    try {
        const response = await fetch(`${API_BASE}/player/preferences`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const prefs = await response.json();

        if (prefs.preferred_api) {
            document.getElementById('image-api').value = prefs.preferred_api;
        }
        if (prefs.color_found) {
            document.getElementById('color-found').value = prefs.color_found;
        }
        if (prefs.color_closed) {
            document.getElementById('color-closed').value = prefs.color_closed;
        }
    } catch (err) {
        setFeedback('prefs-feedback', 'Kon voorkeuren niet laden.', true);
        console.error('loadPreferences:', err);
    }
}

async function loadEmail() {
    try {
        const response = await fetch(`${API_BASE}/player/email`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        if (data) {
            document.getElementById('email').value = data;
        }
    } catch (err) {
        setFeedback('email-feedback', 'Kon e-mailadres niet laden.', true);
        console.error('loadEmail:', err);
    }
}

// ── Save preferences ──────────────────────────────────────────────────────────

async function savePreferences() {
    const payload = {
        api: document.getElementById('image-api').value,
        color_found: document.getElementById('color-found').value,
        color_closed: document.getElementById('color-closed').value,
    };

    try {
        const response = await fetch(`${API_BASE}/player/preferences`, {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        if (response.status === 204) {
            setFeedback('prefs-feedback', 'Voorkeuren opgeslagen!');
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (err) {
        setFeedback('prefs-feedback', 'Opslaan mislukt.', true);
        console.error('savePreferences:', err);
    }
}

async function saveEmail() {
    const email = document.getElementById('email').value.trim();

    if (!email) {
        setFeedback('email-feedback', 'Vul een e-mailadres in.', true);
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/player/email`, {
            method: 'PUT',
            body: JSON.stringify({email}),
        });

        if (response.status === 204) {
            setFeedback('email-feedback', 'E-mailadres opgeslagen!');
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (err) {
        setFeedback('email-feedback', 'Opslaan mislukt.', true);
        console.error('saveEmail:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    loadEmail();

    document.getElementById('btn-save-prefs').addEventListener('click', savePreferences);
    document.getElementById('btn-save-email').addEventListener('click', saveEmail);
});