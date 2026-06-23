import {Game} from "../gameClasses/game.js";
import {GameRenderer} from "../gameClasses/gameRenderer.js";

export class EndlessController {
    constructor(game = new Game(4), renderer = null) {
        this.score = 0;
        this.scalingDifficulty = 1;
        this.globalDifficulty = 5;
        this.running = true;
        this.lastTime = null;
        this.game = game;
        this.renderer = renderer ?? new GameRenderer(this.game);
    }

    async setup() {
        this.game.generateCards(16);
        this.game.setOnDeath(() => {
            this.stop();
            console.log(this.score);
        });
        this.game.setOnAllPairsFound(() => this.handleLevelCompleted())
        this.game.setOnPairFound(() => this.handlePairFound());
        await this.renderer.setUpBoard();
    }

    handlePairFound = () => {
        this.score += 5;
        this.game.health += 20;
        if (this.game.health > 100) {
            this.game.health = 100;
        }
        this.game.checkForEnd();
    }

    handleLevelCompleted() {
        this.score += this.scalingDifficulty * (this.game.health);
        this.scalingDifficulty++;
        console.log("Resetting level");
        this.game.reset();
        this.renderer.setUpBoard();
    }

    passiveHealthLoss() {
        // If game is locked pause health loss.
        if (this.game.locked) {
            this.lastTime = performance.now();
            return;
        }

        var currentTime = performance.now();
        this.lastTime = this.lastTime ?? currentTime; // If lastTime is null (i.e. initialization) reset it.
        var deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.game.health -= deltaTime / 1000 * this.scalingDifficulty * this.globalDifficulty;

        // Health can't go under 0.
        if (this.game.health <= 0) {
            // DEATH
            this.stop();
        }
    }

    gameLoop() {
        if (!this.running) {
            return;
        }

        // Update health
        this.passiveHealthLoss();

        // Update continuous visuals
        this.renderer.updateVisual(this.score);

        // Create loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    start() {
        this.running = true;
        this.game.locked = false;
        this.gameLoop();
    }

    stop() {
        this.running = false;
        this.game.locked = true;
        this.lastTime = null;
    }
}