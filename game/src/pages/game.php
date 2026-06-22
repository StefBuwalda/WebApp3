<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example page</title>
    <link rel="stylesheet" href="/css/game.css">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/navbar.css">
    <link rel="stylesheet" href="/css/card.css">
    <link rel="stylesheet" href="/css/healthbar.css">
    <link rel="stylesheet" href="/css/home.css"
    <link rel="stylesheet" href="/css/base.css">
</head>

<body>

<?php
include __DIR__ . '/../partials/navbar.html.php'; ?>

<div id="body_remainder">
    <div id="page_grid">
        <div id="healthBarContainer" class="page_tile">
            <div id="healthBar">

            </div>
        </div>
        
        <div id="gameBoard" class="page_tile">

        </div>
    </div>
</div>

<?php
// Card template
include __DIR__ . '/../partials/card.html'; ?>

</body>

<script type="module">
    import {EndlessController} from '/js/gameControllers/EndlessController.js';

    window.controller = new EndlessController();
    window.controller.setup();
    window.controller.start();
</script>


</html>
