const gameState = {
    flippedCards: [],
    lockBoard: false,
    moves: 0,
    matchesFound: 0,
    totalPairs: 0,
    isComplete: false
}

function resetGame(totalPairs) {
    gameState.flippedCards = [];
    gameState.lockBoard = false;
    gameState.moves = 0;
    gameState.matchesFound = 0;
    gameState.totalPairs = totalPairs;
    gameState.isComplete = false;
}

function handleCardClick(wrapper) {
    if (gameState.lockBoard) return;
    if (wrapper.classList.contains('flipped')) return;

    wrapper.classList.add('flipped');
    gameState.flippedCards.push(wrapper);
    gameState.moves++;

    if (gameState.flippedCards.length === 2) {
        gameState.lockBoard = true;

        const [first, second] = gameState.flippedCards;

        if (first.dataset.value === second.dataset.value) {
            gameState.matchesFound++;
            gameState.flippedCards = [];
            gameState.lockBoard = false;

            if (gameState.matchesFound === gameState.totalPairs) {
                gameState.isComplete = true;
                console.log(`Game complete in ${gameState.moves} moves!`);
            }
        } else {
            setTimeout(() => {
                first.classList.remove('flipped');
                second.classList.remove('flipped');
                gameState.flippedCards = [];
                gameState.lockBoard = false;
            }, 1000);
        }
    }
}