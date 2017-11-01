export class GameModel {
    constructor() {
        this.cardsFaces = [
            "white", "white",
            "black", "black",
            "red", "red",
            "blue", "blue",
            "orange", "orange",
            "green", "green",
            "fuchsia", "fuchsia",
            "pink", "pink",
        ];
    }

    shuffle(cards) {
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