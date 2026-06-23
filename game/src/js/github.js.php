<?php header('Content-Type: application/javascript'); ?>

document.getElementById('github-btn').addEventListener('click', () => {
    window.open('<?= getenv('API_BASE_URL') ?>/connect/github', 'github-oauth', 'width=600,height=700');
});