let flippedCard = []
let lockBoard = false;

wrapper = document.createElement('div');
wrapper.classList.add('card-wrapper');

function handleCardClick(wrapper) {
    if (lockBoard) return;
    if (wrapper.classList.contains('flipped')) return;

    wrapper.classList.add('flipped');
    flippedCard.push(wrapper);
    if (flippedCard.length === 2) {
        lockBoard = true;

        const [first, second] = flippedCard;

        if (first.dataset.value === second.dataset.value) {
            flippedCard = [];
            lockBoard = false;
        } else {
            setTimeout(() => {
                first.classList.remove('flipped');
                second.classList.remove('flipped');
                flippedCard = [];
                lockBoard = false;
            }, 1000);
        }
    }
}