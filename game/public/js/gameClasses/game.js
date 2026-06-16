import { Card } from "/js/gameClasses/card.js";
export class Game {
    constructor(columns, cards = []) {
        this.cols = columns;
        this.cards = cards;
        this.flippedCards = [];
        this.locked = false;
    }

    flipCard(card){
        // Check if locked or already flipped
        if (this.locked || card.flipped){
            return;
        }

        // Flip card and add to list
        card.flip();
        this.flippedCards.push(card);

        // Check flipped pair
        if (this.flippedCards.length === 2) {
            this.locked = true; // Lock the game

            const [first, second] = this.flippedCards; // Get both cards

            if (first.checkMatch(second)) {
                first.match();
                second.match();
            } else {
                setTimeout(() => {
                    first.flip();
                    second.flip();
                }, 1000);
            }
            this.flippedCards = [];
            this.locked = false;
        }
    }

    generateCards(amount){
        let start = this.cards.length;

        for (let i = 0; i < amount; i++) {
            this.cards.push(new Card(start + i));
        }
    }
}