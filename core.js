window.onload = () => {
    shuffle(cardsValues);
    createField();
};

const cardsValues = [
    "white", "white",
    "black", "black",
    "red", "red",
    "blue", "blue",
    "orange", "orange",
    "green", "green",
    "fuchsia", "fuchsia",
    "pink", "pink",
];

function shuffle(array) {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function createField(size = 4) {
    const cards = prepareCards();
    const table = document.getElementById('cards_field');
    for (let i = 0; i < size; i++) {
        const tr = document.createElement('tr');
        for (let i = 0; i < size; i++) {
            tr.appendChild(cards.shift());
        }
        table.appendChild(tr);
    }

    function prepareCards() {
        let flippedCards = [];
        let counter = 0;
        return cardsValues.map((value) => {
            const td = document.createElement('td');
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                if (card.className !== 'card flipped' && card.className !== 'card in-discard-pile'){
                    card.className += ' flipped';
                    flippedCards.push(value);
                }

                if (flippedCards.length > 1) {

                    if (flippedCards[0] === flippedCards[1]) {
                        discard();
                        counter ++;
                        win(counter);
                        flippedCards = [];
                    } else {
                        reverse();
                        flippedCards = [];
                    }
                }
                card.style.backgroundColor = value;
            };
            td.appendChild(card);
            return td;
        });
    }
}

function discard() {
    const cards = document.getElementsByClassName("flipped");
    setTimeout(function () {
        Array.from(cards).forEach(card => card.className = 'card in-discard-pile');
    }, 500);
}

function reverse() {
    const cards = document.getElementsByClassName("flipped");
    setTimeout(function () {
        Array.from(cards).forEach((card) => {
            card.className = 'card';
            card.style.backgroundColor = 'burlywood';
        });
    }, 500);
}

function win(counter) {
    if (counter === 8) {
        document.getElementById('text').innerHTML = "You win!";
    }
}