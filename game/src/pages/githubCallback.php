<?php
$token = htmlspecialchars($_GET['token'] ?? '', ENT_QUOTES, 'UTF-8');

$title = 'Authenticating...';
$extraCss = [];

include __DIR__ . '/../partials/header.php';
?>

    <script>
        const token = <?= json_encode($token) ?>;

        if (token) {
            localStorage.setItem('jwt', token);
            window.location.href = '/';
        } else {
            window.location.href = '/login';
        }
    </script>

<?php include __DIR__ . '/../partials/footer.php'; ?>