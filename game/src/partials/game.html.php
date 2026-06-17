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
    import { EndlessController } from '/js/gameControllers/EndlessController.js';
    window.controller = new EndlessController();
    window.controller.setup();
    window.controller.start();
</script>

