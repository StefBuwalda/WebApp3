export class Game {
    constructor(columns) {
        this.cols = columns;
        this.cards = 16;
        this.flippedCards = [];
        this.locked = false;
    }

    flipCard(card){
        if (this.locked){
            return;
        }
        if (card.classList.contains('flipped')) return;

        card.classList.add('flipped');
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.locked = true;

            const [first, second] = this.flippedCards;

            if (first.dataset.value === second.dataset.value) {
                this.flippedCards = [];
                this.locked = false;
            } else {
                setTimeout(() => {
                    first.classList.remove('flipped');
                    second.classList.remove('flipped');
                    this.flippedCards = [];
                    this.locked = false;
                }, 1000);
            }
        }
    }

}