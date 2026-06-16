export class GameRenderer {
    constructor(game) {
        this.game = game;
    }

    async setUpBoard(){
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
        for (const i in cards) {
            var element = this.createCard(catIds.at(i >> 1))
            cards[i].setElement(element);
            gameBoard.appendChild(element);
        }
    }

    async getUniqueCats(n){
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