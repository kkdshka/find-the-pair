export class GameView {
    constructor() {
        this.container = document.getElementById('container');
        this.flippedCards = [];
        this.cardPairsOnTable = 0;
    }

    createField(cards, size = 4) {
        this.cardPairsOnTable = ( size * size ) / 2;
        const table = document.createElement('table');
        table.className = "cards_field";
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

    prepareCards(cardsFaces) {
        return cardsFaces.map((cardFace) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.cardFace = cardFace;
            return card;
        });
    }

    setCardsListener(cards) {
        cards.forEach((card) => {
            card.onclick = () => {
                if (card.className !== 'card flipped' && card.className !== 'card in-discard-pile') {
                    this.flip(card);
                    this.flippedCards.push(card);
                }
                if (this.flippedCards.length > 1) {
                    if (this.flippedCards[0].getAttribute('data-card-face') === this.flippedCards[1].getAttribute('data-card-face')) {
                        this.discard(this.flippedCards);
                        this.cardPairsOnTable--;
                        this.win();
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
                card.style.backgroundColor = 'burlywood';
            });
        }, 500);
    }

    win() {
        if (this.cardPairsOnTable === 8) {
            const text = document.createElement('span');
            text.innerHTML = "You win!";
            this.container.appendChild(text);
        }
    }

    addLink(link) {
        const a = document.createElement('a');
        a.href = '#' + link.toLowerCase();
        a.textContent = link;
        this.container.appendChild(a);
    }
}