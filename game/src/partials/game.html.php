<!-- General Grid  -->
<div id="page_wrapper">
    <div id="page_content">
        <div id="area1">
            <div id="healthBar">
            </div>
        </div>

        <!-- Game area-->
        <div id="gameBoard">
        </div>
    </div>
</div>

<?php include __DIR__ . '/card.html'; ?>

<script type="module">
    import { Game } from '/js/gameClasses/game.js';
    import { GameRenderer } from '/js/gameClasses/gameRenderer.js';

    window.game = new Game(4);
    window.game.generateCards(16);

    window.renderer = new GameRenderer(window.game);
    await window.renderer.setUpBoard();
</script>

