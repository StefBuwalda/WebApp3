import {Game} from "../gameClasses/game.js";
import {GameRenderer} from "../gameClasses/gameRenderer.js";
import {config} from "/js/config.js.php";

export class EndlessController {
    constructor(game = new Game(4), renderer = null) {
        this.running = true;
        this.lastTime = null;
        this.game = game;
        this.renderer = renderer ?? new GameRenderer(this.game);

        this.resetState();
        this.bindUI();
    }

    resetState() {
        this.score = 0;
        this.health = 100;
        this.scalingDifficulty = 1;
        this.globalDifficulty = 50;
    }

    async setup() {
        this.game.generateCards(16);
        this.game.setOnAllPairsFound(() => this.handleLevelCompleted())
        this.game.setOnPairFound(() => this.handlePairFound());
        await this.renderer.setUpBoard();
        await this.retryPendingScore();
    }

    async retryPendingScore() {
        const raw = localStorage.getItem("pendingScore");
        if (!raw) return;

        const data = JSON.parse(raw)

        localStorage.removeItem("pendingScore");

        console.log("Retrying pending score...");

        fetch(`${config.apiBaseUrl}/game/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({score: data.score})
        }).catch((err) => (console.log(err)));
    }

    restartGame() {
        // hide game over screen
        this.renderer.hideGameOver();

        // reset game state
        this.resetState();

        this.game.cards = [];

        // rebuild game
        this.setup().then(
            () => this.start()
        );
    }

    bindUI() {
        const btn = document.getElementById("playAgainBtn");

        if (!btn) return;

        btn.onclick = () => {
            this.restartGame();
        };

        document.getElementById("uploadScoreBtn").onclick = () => {
            this.uploadScore();
        };
    }

    async uploadScore() {
        const score = this.score * -1;

        try {
            localStorage.setItem("pendingScore", JSON.stringify({
                score: score,
                timestamp: Date.now()
            }));

            const res = await fetch(`${config.apiBaseUrl}/game/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({score})
            });

            if (res.status === 401) {
                window.location.href = "/login";
                return;
            }

            if (!res.ok) {
                throw new Error("Upload failed");
            }

            localStorage.removeItem("pendingScore");

            console.log("Score uploaded");
        } catch (err) {
            console.error(err);
        }
    }

    handlePairFound = () => {
        this.score += 5;
        this.health += 20;
        if (this.health > 100) {
            this.health = 100;
        }
        this.game.checkForEnd();
    }

    handleLevelCompleted() {
        this.score += this.scalingDifficulty * (this.health);
        this.health = 100;
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
        this.health -= deltaTime / 1000 * this.scalingDifficulty * this.globalDifficulty;

        // Health can't go under 0.
        if (this.health <= 0) {
            this.gameOver();
        }
    }

    gameOver() {
        this.stop();
        this.renderer.showGameOver(this.score, [])
    }

    gameLoop() {
        if (!this.running) {
            return;
        }

        // Update health
        this.passiveHealthLoss();

        // Update continuous visuals
        this.renderer.updateVisual(this.health, this.score);

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