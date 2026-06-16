export class Card {
    constructor(id) {
        this.id = id;
        this.flipped = false;
        this.matched = false;
    }

    flip() {
        if (this.flipped){
            this.flipped = false;
            this.element.classList.remove('flipped');
        }
        else{
            this.flipped = true;
            this.element.classList.add('flipped');
        }
    }

    match() {
        this.matched = true;
    }

    checkMatch(other) {
        // Divide by 2 which equals to pairId and check, bitshift is more efficient.
        console.log(this.id, other.id)
        console.log(this.id >> 1, other.id >> 1);
        return (this.id >> 1) === (other.id >> 1);
    }

    setElement(element){
        this.element = element;

        // set reference for clicks
        element.card = this;
    }
}