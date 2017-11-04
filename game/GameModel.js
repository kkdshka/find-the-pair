export class GameModel {
    constructor(size = '4 x 4', color = 'beige', cardsBack = 'burlywood') {
        this.cardsFaces = [
            "white", "black", "red", "blue",
            "orange", "green", "fuchsia", "pink",
            "gold",
        ];
        this.fieldSize = size.substr(0, 1);
        this.fieldColor = color;
        this.cardsBack = cardsBack;
    }

    shuffleCards(cards) {
        let m = cards.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = cards[m];
            cards[m] = cards[i];
            cards[i] = t;
        }
        return cards;
    }
}