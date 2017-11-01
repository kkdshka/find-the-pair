export class GameController {
    constructor(gameView, gameModel) {
        this.gameView = gameView;
        this.gameModel = gameModel;
    }

    run() {
            this.gameView.addLink('Settings');
            this.gameView.addLink('Score');
            const cardsFaces = this.gameModel.shuffle(this.gameModel.cardsFaces);
            const cards = this.gameView.prepareCards(cardsFaces);
            this.gameView.setCardsListener(cards);
            this.gameView.createField(cards);
    }
}