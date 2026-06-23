import {Card} from "/js/gameClasses/card.js";

export class Game {
    constructor(columns, cards = []) {
        this.cols = columns;
        this.cards = cards;
        this.flippedCards = [];
        this.locked = true;
        this.pairs = 0;
    }

    setOnPairFound(callable) {
        this.onPairFound = callable;
    }

    setOnAllPairsFound(callable) {
        this.onAllPairsFound = callable;
    }

    flipCard(card) {
        // Check if locked or already flipped
        if (this.locked || card.flipped) {
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
                // Pair found
                this.pairs++;
                first.match();
                second.match();
                if (this.onPairFound) this.onPairFound();
                this.flippedCards = [];
                this.locked = false;
            } else {
                setTimeout(() => {
                    first.flip();
                    second.flip();

                    this.flippedCards = [];
                    this.locked = false;
                }, 1000);
            }
        }
    }

    checkForEnd() {
        console.log("Checking for full board");
        if (this.cards.length >> 1 === this.pairs) {
            this.onAllPairsFound();
        }
    }

    generateCards(amount) {
        let start = this.cards.length;

        for (let i = 0; i < amount; i++) {
            this.cards.push(new Card(start + i));
        }
    }

    reset() {
        this.locked = true;
        this.pairs = 0;
        for (const card of this.cards) {
            if (card.flipped) {
                card.flip();
            }
        }
        setTimeout(() => {
            this.locked = false;
        }, 1000);
    }
}