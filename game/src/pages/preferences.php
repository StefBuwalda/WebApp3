<?php

$title = 'Voorkeuren';
$extraCss = ['/css/preferences.css'];
$requireAuth = true;

include __DIR__ . '/../partials/header.php';
?>
    <div class="page_tile">
        <h1>Voorkeuren</h1>

        <section>
            <h2>Spelvoorkeuren</h2>

            <label for="image-api">Favoriete plaatjes-API</label>
            <select id="image-api" name="image_api">
                <option value="cataas">Cataas (katten)</option>
                <option value="dog-ceo">Dog CEO (honden)</option>
            </select>

            <label for="color-found">Kleur gevonden kaartjes</label>
            <input type="color" id="color-found" name="color_found">

            <label for="color-closed">Kleur gesloten kaarten</label>
            <input type="color" id="color-closed" name="color_closed">

            <button id="btn-save-prefs">Voorkeuren opslaan</button>
            <p id="prefs-feedback" aria-live="polite"></p>
        </section>

        <section>
            <h2>E-mailadres wijzigen</h2>

            <label for="email">Nieuw e-mailadres</label>
            <input type="email" id="email" name="email" placeholder="jouw@email.nl">

            <button id="btn-save-email">E-mailadres opslaan</button>
            <p id="email-feedback" aria-live="polite"></p>
        </section>

        <script type="module" src="js/preferences.js.php"></script>
    </div>

<?php
include __DIR__ . '/../partials/footer.php'; ?>