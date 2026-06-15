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


<script type="module">
    import { Game } from '/js/gameClasses/game.js';
    import { GameRenderer } from '/js/gameClasses/gameRenderer.js';

    const game = new Game(4);
    const renderer = new GameRenderer(game);

    await renderer.setUpBoard();
</script>

