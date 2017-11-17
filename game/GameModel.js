export class GameModel {
    constructor(size = '4 x 4', color = 'beige', cardsBack = 'pastel') {
        this.cardsFaces = this.generateCardsFaces();
        this.fieldSize = size.split(' ')[0];
        this.fieldColor = color;
        this.cardsBack = this.parseCardsBack(cardsBack);
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

    generateCardsFaces() {
        let cardsFaces = [];
        for(let i = 1; i < 73; i++) {
            const cardFace = `./data/cardFaces/cardFace${this.pad(i, 2)}.png`;
            cardsFaces.push(cardFace);
        }
        return cardsFaces;
    }

    parseCardsBack(cardsBack) {
        switch(cardsBack) {
            case 'blue':
                return './data/cardBacks/cardBack01.jpg';
                break;
            case 'rose':
                return './data/cardBacks/cardBack02.jpg';
                break;
            case 'pastel':
                return './data/cardBacks/cardBack03.jpg';
                break;
            default:
                return './data/cardBacks/cardBack03.jpg';
                break;
        }
    }

    saveScoreData(scoreData) {
        const allScoresData = JSON.parse(localStorage.getItem('score')) || [];
        allScoresData.push(scoreData);
        localStorage.setItem('score', JSON.stringify(allScoresData));
    }

    calculateScore(clicks, time) {
        return Math.round(Math.pow(10, this.fieldSize) / ((clicks / 2) * (time / 1000)));
    }

    pad(num, size) {
        let s = "0000" + num;
        return s.substr(s.length - size);
    }
}