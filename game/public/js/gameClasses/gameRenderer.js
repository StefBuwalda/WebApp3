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

        for (let i = 0; i < pairs; i++) {
            const url = `https://cataas.com/cat?${i}`;
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
            const wrapper = document.createElement('div');
            wrapper.classList.add('card-wrapper');
            wrapper.dataset.value = url;        // ← add this
            wrapper.addEventListener('click', () => this.game.flipCard(wrapper))

            const card = document.createElement('div');
            card.classList.add('card');

            const front = document.createElement('div');
            front.classList.add('card-front');

            const img = document.createElement('img');
            img.src = url;
            img.alt = 'cat';
            img.style.cssText = 'width:100%; height:100%; object-fit:cover; display:block;';
            imgElements.push(img);

            const back = document.createElement('div');
            back.classList.add('card-back');
            back.appendChild(img);


            const backImg = document.createElement('img');
            backImg.src= 'Paw_Print.svg';
            backImg.alt = 'card front'



            front.appendChild(backImg);
            card.appendChild(front);
            card.appendChild(back);
            wrapper.appendChild(card);
            gameBoard.appendChild(wrapper);
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

}