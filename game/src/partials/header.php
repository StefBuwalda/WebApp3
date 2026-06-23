<?php

// Optional: pass $title and $extraCss from the page before including
$title = $title ?? 'My App';
$extraCss = $extraCss ?? [];
$requireAuth = $requireAuth ?? false;
$requireGuest = $requireGuest ?? false;
?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <?php
        if ($requireAuth): ?>
            <script>
                if (!localStorage.getItem('jwt')) window.location.href = '/login';
            </script>
        <?php
        endif; ?>

        <?php
        if ($requireGuest): ?>
            <script>
                if (localStorage.getItem('jwt')) window.location.href = '/';
            </script>
        <?php
        endif; ?>

        <script src="/js/fetch.js"></script>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?= htmlspecialchars($title) ?></title>

        <?php
        foreach ($extraCss as $css): ?>
            <link rel="stylesheet" href="<?= htmlspecialchars($css) ?>">
        <?php
        endforeach; ?>

        <!-- Common CSS always loaded -->
        <link rel="stylesheet" href="/css/style.css">
        <link rel="stylesheet" href="/css/navbar.css">
        <link rel="stylesheet" href="/css/card.css">
        <link rel="stylesheet" href="/css/healthbar.css">
        <link rel="stylesheet" href="/css/home.css">
    </head>
    <body>
<?php
include __DIR__ . '/navbar.html.php'; ?>