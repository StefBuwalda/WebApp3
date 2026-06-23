<?php

$title = 'Game';
$extraCss = ['/css/game.css', '/css/base.css'];

include __DIR__ . '/../partials/header.php';
?>

    <div id="body_remainder">
        <div id="page_grid">
            <div id="scoreContainer" class="page_tile">
                <span id="scoreLabel">Score:</span>
                <span id="score">0</span>
            </div>
            <div id="healthBarContainer" class="page_tile">
                <div id="healthBar"></div>
            </div>

            <div id="gameBoard" class="page_tile"></div>
        </div>
    </div>

    <div id="gameOverScreen" class="hidden">
        <div class="gameOverPanel">
            <h1>Game Over</h1>

            <div class="finalScore">
                Score: <span id="finalScore">0</span>
            </div>

            <h2>Top 5 Players</h2>
            <ol id="topPlayersList">
                <!-- filled dynamically -->
            </ol>

            <div class="gameOverButtons">
                <button id="uploadScoreBtn">Upload score</button>
                <button id="playAgainBtn">Play again</button>
            </div>
        </div>
    </div>

<?php
include __DIR__ . '/../partials/card.html'; ?>

    <script type="module">
        import {EndlessController} from '/js/gameControllers/EndlessController.js';

        window.controller = new EndlessController();
        window.controller.setup();
        window.controller.start();
    </script>

<?php
include __DIR__ . '/../partials/footer.php'; ?>