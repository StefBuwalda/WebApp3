import {config} from "/js/config.js.php";

export class GameRenderer {
    constructor(game) {
        this.game = game;
    }

    async setUpBoard() {
        // Get board
        let gameBoard = document.getElementById('gameBoard');
        if (!gameBoard) {
            console.error('Element #gameBoard not found.');
            return;
        }

        // Reset board
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${this.game.cols}, 1fr)`;

        var pairs = this.game.cards.length >> 1;

        // Get N // 2 image URLs
        var catIds = await this.getUniqueCats(pairs);

        // Get cards and set URLs
        var cards = this.game.cards
        for (const card of cards) {
            var element = this.createCard(catIds.at(card.id >> 1))
            card.setElement(element);
        }

        // Add cards in random order
        const renderOrder = [...cards];
        this.shuffle(renderOrder);
        this.shuffle(renderOrder);
        for (const card of renderOrder) {
            gameBoard.appendChild(card.element);
        }
    }

    hideGameOver() {
        document.getElementById("gameOverScreen").classList.add("hidden");
    }

    updateVisual(health, score) {
        var bar = document.getElementById("healthBar");
        bar.style.width = `${health}%`;

        var scoreEl = document.getElementById("score");
        scoreEl.textContent = Math.round(score);
    }

    async getUniqueCats(n) {
        var uniqueCats = new Set();
        for (let i = 0; i < n; i++) {
            let cat;

            do {
                const response = await fetch('https://cataas.com/cat?json=true');
                cat = await response.json();
            } while (uniqueCats.has(cat.id));

            uniqueCats.add(cat.id);
        }
        return [...uniqueCats];
    }

    async showGameOver(score) {
        document.getElementById("finalScore").textContent = score;

        // show immediately
        document.getElementById("gameOverScreen").classList.remove("hidden");

        // show placeholder while loading
        const list = document.getElementById("topPlayersList");
        list.innerHTML = "<li>Loading...</li>";

        // fetch in background
        this.fetchTopPlayers()
            .then(topPlayers => {
                this.renderTopPlayers(topPlayers);
            })
            .catch(() => {
                list.innerHTML = "<li>Failed to load leaderboard</li>";
            });
    }

    async fetchTopPlayers() {
        const res = await fetch(`${config.apiBaseUrl}/memory/top-scores`);

        if (!res.ok) {
            throw new Error("Failed to fetch top players");
        }

        return await res.json();
    }

    renderTopPlayers(topPlayers) {
        const list = document.getElementById("topPlayersList");
        list.innerHTML = "";

        topPlayers.slice(0, 5).forEach(p => {
            const li = document.createElement("li");
            li.textContent = `${p.username} - ${-1 * p.score}`;
            list.appendChild(li);
        });
    }

    createCard(catId) {
        const template = document.getElementById('card-template');
        if (!template) {
            throw new Error('Missing #card-template in the DOM');
        }

        const wrapper = template.content.firstElementChild.cloneNode(true);
        wrapper.addEventListener('click', () => this.game.flipCard(wrapper.card));

        const backImg = wrapper.querySelector('.card-back img');
        backImg.src = `https://cataas.com/cat/${catId}`;

        return wrapper;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

}