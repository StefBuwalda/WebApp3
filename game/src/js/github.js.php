<?php header('Content-Type: application/javascript'); ?>

document.getElementById('github-btn').addEventListener('click', () => {
    window.location.href=('<?= getenv('API_BASE_URL') ?>/connect/github');
});