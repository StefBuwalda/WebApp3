import {config} from "/js/config.js.php";

export class GameRenderer {
    constructor(game) {
        this.game = game;
        this.preferences = null;
    }

    async setUpBoard() {
        await this.loadPreferences();
        this.applyColorPreferences();
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
        var imgs = await this.getUniqueImages(pairs);

        // Get cards and set URLs
        var cards = this.game.cards
        for (const card of cards) {
            var element = this.createCard(imgs.at(card.id >> 1))
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

    async loadPreferences() {
        try {
            const response = await fetch(`${config.apiBaseUrl}/player/preferences`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            this.preferences = await response.json();
        } catch (err) {
            console.error('loadPreferences:', err);
            this.preferences = {};
        }
    }

    applyColorPreferences() {
        const prefs = this.preferences;

        const root = document.documentElement;

        if (prefs.color_found) {
            root.style.setProperty('--card-back-color', prefs.color_found);
        }

        if (prefs.color_closed) {
            root.style.setProperty('--card-front-color', prefs.color_closed);
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

    async getUniqueImages(n) {
        const api = this.preferences?.preferred_api ?? 'cataas';
        console.log();
        const unique = new Set();
        const results = [];

        for (let i = 0; i < n; i++) {
            let img;

            do {
                img = await this.fetchImage(api);
            } while (unique.has(img.id));

            unique.add(img.id);
            results.push(img);
        }

        return results;
    }

    async fetchImage(api) {
        switch (api) {
            case 'dog-ceo': {
                const res = await fetch('https://dog.ceo/api/breeds/image/random');
                const data = await res.json();

                return {
                    id: data.message,
                    url: data.message
                };
            }

            case 'cataas':
            default: {
                const res = await fetch('https://cataas.com/cat?json=true');
                const data = await res.json();

                return {
                    id: data.id,
                    url: data.url
                };
            }
        }
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

    createCard(img) {
        const template = document.getElementById('card-template');
        if (!template) {
            throw new Error('Missing #card-template in the DOM');
        }

        const wrapper = template.content.firstElementChild.cloneNode(true);
        wrapper.addEventListener('click', () => this.game.flipCard(wrapper.card));

        const backImg = wrapper.querySelector('.card-back img');
        backImg.src = `${img.url}`;

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