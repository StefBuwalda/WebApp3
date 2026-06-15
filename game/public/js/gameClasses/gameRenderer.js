export class GameRenderer {
    constructor(game) {
        this.game = game;
    }

    async setUpBoard(){
        let gameBoard = document.getElementById('gameBoard');
        if (!gameBoard) {
            console.error('Element #gameBoard not found.');
            return;
        }

        const pairs = this.game.cards / 2;
        const imageUrls = [];
        const usedIds = new Set();

        for (let i = 0; i < pairs; i++) {
            let cat;

            do {
                const response = await fetch('https://cataas.com/cat?json=true');
                cat = await response.json();
            } while (usedIds.has(cat.id));

            usedIds.add(cat.id);

            const url = `https://cataas.com/cat/${cat.id}`;
            imageUrls.push(url, url);
        }

        // Fisher-Yates shuffle
        for (let i = imageUrls.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [imageUrls[i], imageUrls[j]] = [imageUrls[j], imageUrls[i]];
        }

        // --- Build cards (hidden until loaded) ---
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${this.game.cols}, 1fr)`;

        const imgElements = [];

        imageUrls.forEach((url) => {
            gameBoard.appendChild(this.createCard(url, imgElements));
        });

        // --- Wait for all images to load ---
        // Deduplicate: only wait for unique URLs (pairs share the same cached request)
        const uniqueImgs = imgElements.filter((img, idx, arr) =>
            arr.findIndex(other => other.src === img.src) === idx
        );

        await Promise.all(uniqueImgs.map(img =>
            new Promise(resolve => {
                if (img.complete) return resolve();
                img.onload = resolve;
                img.onerror = resolve; // don't hang on a failed load
            })
        ));
    }

    createCard(url, imgElements) {
        const template = document.getElementById('card-template');
        if (!template) {
            throw new Error('Missing #card-template in the DOM');
        }

        const wrapper = template.content.firstElementChild.cloneNode(true);
        wrapper.dataset.value = url;
        wrapper.addEventListener('click', () => this.game.flipCard(wrapper));

        const backImg = wrapper.querySelector('.card-back img');
        backImg.src = url;
        imgElements.push(backImg);

        return wrapper;
    }

}