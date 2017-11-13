export class GameView {
    constructor() {
        this.container = document.getElementById('container');
        this.flippedCards = [];
        this.cardPairsOnTable = 0;
        this.clicks = 0;
    }

    createField(cards, size = 4, color = 'bisque') {
        this.cardPairsOnTable = ( size * size ) / 2;
        const table = document.createElement('table');
        table.className = `cards-field ${color}`;
        table.id = 'cards-field';
        table.style.backgroundColor = color;
        this.container.appendChild(table);
        for (let i = 0; i < size; i++) {
            const tr = document.createElement('tr');
            for (let i = 0; i < size; i++) {
                const td = document.createElement('td');
                td.appendChild(cards.shift());
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }

    prepareCards(cardsFaces, cardsBack = 'burlywood', fieldSize = 4) {
        const cardsAmount = fieldSize * fieldSize;
        const faces = cardsFaces.splice(0, (cardsAmount / 2));
        const allCardFaces = faces.concat(faces);
        return allCardFaces.map((cardFace) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.cardFace = cardFace;
            card.dataset.cardBack = cardsBack;
            card.style.backgroundColor = cardsBack;
            return card;
        });
    }

    setCardsListener(cards) {
        cards.forEach((card) => {
            card.onclick = () => {
                this.clicks++;
                if (card.className !== 'card flipped' && card.className !== 'card in-discard-pile') {
                    this.flip(card);
                    this.flippedCards.push(card);
                }
                if (this.flippedCards.length > 1) {
                    if (this.flippedCards[0].getAttribute('data-card-face') === this.flippedCards[1].getAttribute('data-card-face')) {
                        this.discard(this.flippedCards);
                        this.cardPairsOnTable--;
                        this.checkWin();
                        this.flippedCards = [];
                    } else {
                        this.reverse(this.flippedCards);
                        this.flippedCards = [];
                    }
                }
            };
        });
    }

    flip(card) {
        card.className += ' flipped';
        card.style.backgroundColor = card.getAttribute('data-card-face');
    }

    discard(cards) {
        setTimeout(function () {
            cards.forEach(card => card.className = 'card in-discard-pile');
        }, 500);
    }

    reverse(cards) {
        setTimeout(function () {
            cards.forEach((card) => {
                card.className = 'card';
                card.style.backgroundColor = card.getAttribute('data-card-back');
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

    renderWinForm(score) {
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
            this.onSubmit(name.value);
            window.location.hash = 'settings';
        };

        form.appendChild(win);
        form.appendChild(name);
        form.appendChild(result);
        form.appendChild(submit);
        this.container.appendChild(form);
    }

    addP() {
        return document.createElement('p');
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
}
