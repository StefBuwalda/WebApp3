<?php

$title = 'Voorkeuren';
$extraCss = ['/css/preferences.css'];
$requireAuth = true;

include __DIR__ . '/../partials/header.php';
?>
    <div class="page_tile" id="preferences">
        <div class="preferences_content">
        <h1>Voorkeuren</h1>
            <hr>
            <h2>Spelvoorkeuren</h2>

            <label for="image-api">Plaatjes kaarten</label>
            <select id="image-api" name="image_api">
                <option value="cataas">Cataas (katten)</option>
                <option value="dog-ceo">Dog CEO (honden)</option>
            </select>

        <section id="color_content">
           <div class="color_picker">
               <input type="color" id="color-found" name="color_found">
               <label for="color-found">Kleur gevonden kaarten</label>
           </div>

           <div class="color_picker">
               <input type="color" id="color-closed" name="color_closed">
               <label for="color-closed">Kleur gesloten kaarten</label>
           </div>
        </section>

            <button class="button" id="btn-save-prefs">Voorkeuren opslaan</button>
            <p id="prefs-feedback" aria-live="polite"></p>

            <h2>E-mailadres wijzigen</h2>

            <label for="email">Nieuw e-mailadres</label>
            <input type="email" id="email" name="email" placeholder="jouw@email.nl">

            <button class="button" id="btn-save-email">E-mailadres opslaan</button>
            <p id="email-feedback" aria-live="polite"></p>


        <script type="module" src="js/preferences.js.php"></script>
    </div>
    </div>

<?php
include __DIR__ . '/../partials/footer.php'; ?>