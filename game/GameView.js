export class GameView {
    constructor(gameModel) {
        this.gameModel = gameModel;
        this.container = document.getElementById('container');
        this.flippedCards = [];
        this.cardPairsOnTable = 0;
        this.clicks = 0;
    }

    createField(cards, fieldSize, fieldColor) {
        this.cardPairsOnTable = ( fieldSize * fieldSize ) / 2;
        const table = document.createElement('table');
        table.className = `cards-field ${fieldColor}`;
        table.id = 'cards-field';
        table.style.backgroundColor = fieldColor;
        this.container.appendChild(table);
        for (let i = 0; i < fieldSize; i++) {
            const tr = document.createElement('tr');
            for (let i = 0; i < fieldSize; i++) {
                const td = document.createElement('td');
                td.appendChild(cards.shift());
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }

    prepareCards(cardsFaces, cardsBack, fieldSize) {
        const cardsAmount = fieldSize * fieldSize;
        const faces = cardsFaces.splice(0, (cardsAmount / 2));
        const allCardFaces = faces.concat(faces);
        return allCardFaces.map((cardFace) => {
            const card = this.createCard(cardFace, cardsBack);
            this.setCardSize(card, fieldSize);
            return card;
        });
    }

    createCard(cardsFace, cardsBack) {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'card-wrapper';

        const flipper = document.createElement('div');
        flipper.className = 'flipper';
        flipper.dataset.cardName = cardsFace;
        flipper.onclick = () => {
            this.onClickCard(flipper);
        };

        const cardBack = document.createElement('div');
        cardBack.className = 'card back';
        const cardFace = document.createElement('div');
        cardFace.className = 'card face';

        const cardBackImage = document.createElement('img');
        cardBackImage.src = cardsBack;
        const cardFaceImage = document.createElement('img');
        cardFaceImage.src = cardsFace;

        cardBack.appendChild(cardBackImage);
        cardFace.appendChild(cardFaceImage);
        flipper.appendChild(cardBack);
        flipper.appendChild(cardFace);
        cardWrapper.appendChild(flipper);
        return cardWrapper;
    }

    setCardSize(card, fieldSize) {
        switch (fieldSize) {
            case '2':
            case '4':
                card.className += ' large';
                break;
            case '6':
            case '8':
                card.className += ' medium';
                break;
            case '10':
            case '12':
                card.className += ' small';
                break;
            default:
                card.className += ' medium';
                break;
        }
    }

    onClickCard(flipper) {
        this.clicks++;
        if (flipper.className !== 'flipper flipped' && flipper.className !== 'flipper in-discard-pile') {
            this.flip(flipper);
            this.flippedCards.push(flipper);
        }
        if (this.flippedCards.length > 1) {
            if (this.flippedCards[0].getAttribute('data-card-name') === this.flippedCards[1].getAttribute('data-card-name')) {
                this.discard(this.flippedCards);
                this.cardPairsOnTable--;
                this.checkWin();
                this.flippedCards = [];
            } else {
                this.reverse(this.flippedCards);
                this.flippedCards = [];
            }
        }
    }

    flip(card) {
        card.className += ' flipped';
    }

    discard(cards) {
        this.reverse(cards);
        setTimeout(function () {
            cards.forEach(card => {
                card.className = 'move';
                card.className += ' in-discard-pile';
            });
        }, 550);
    }

    reverse(cards) {
        setTimeout(function () {
            cards.forEach((card) => {
                card.className = 'flipper';
            });
        }, 500);
    }

    checkWin() {
        if (this.cardPairsOnTable === 0) {
            const blocker = document.getElementById('blocker');
            blocker.style.display = 'block';
            this.onWin();
        }
    }

    renderWinForm(score, errorMessage = '') {
        const form = document.createElement('div');
        form.className = 'win-form';

        const win = document.createElement('b');
        win.innerHTML = 'You win!';


        const name = document.createElement('input');
        name.type = 'text';
        name.placeholder = 'Enter your name';

        const result = document.createElement('b');
        result.innerHTML = `Your score: ${score}`;

        const submit = document.createElement('input');
        submit.type = 'submit';
        submit.className = 'submit';
        submit.value = 'Save score';
        submit.onclick = () => {
            if (name.value) {
                this.onSubmit(name.value);
                window.location.hash = 'settings';
            }
            else {
                this.renderWinForm(score, 'Enter your name!');
            }
        };

        form.appendChild(win);
        if (errorMessage) {
            const error = this.createErrorMessage(errorMessage);
            form.appendChild(error);
        }
        form.appendChild(name);
        form.appendChild(result);
        form.appendChild(submit);
        this.container.appendChild(form);
    }

    addLinks() {
        const links_wrapper = document.createElement('div');
        links_wrapper.className = 'links-wrapper';
        this.container.appendChild(links_wrapper);

        const settings_link = document.createElement('a');
        settings_link.className = 'link';
        settings_link.href = '#settings';
        settings_link.textContent = 'Settings';

        const score_link = document.createElement('a');
        score_link.className = 'link';
        score_link.href = '#score';
        score_link.textContent = 'Score';

        links_wrapper.appendChild(settings_link);
        links_wrapper.appendChild(score_link);
    }

    createErrorMessage(message = 'Error') {
        const error = document.createElement('div');
        error.innerHTML = message;
        error.className = 'error';
        return error;
    }
}
