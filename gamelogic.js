let flippedCard = []
let lockBoard = false;


wrapper.addEventListener('click', () =>{
    if (lockBoard) return;
    if (wrapper.classList.contains('flipped')) return;

    wrapper.classList.add('flipped');
    flippedCard.push(wrapper);

    if (flipped.length == 2) {
        lockBoard = true;

        const [first, second] = flippedCards;

        if (first.dataset.value == second.dataset.value) {
            flippedCards = [];
            lockBoard = false;
        } else {
            setTimeout(() => {
                first.classList.remove('flipped');
                second.classList.remove('flipped');
                flippedCards = [];
                lockBoard = false;
            }, 1000);
        }
    }
})