import {GameController} from "./game/GameController";
import {ScoreController} from "./score/ScoreController";

export class App {
    constructor() {
        this.gameController = new GameController();
        this.scoreController = new ScoreController();
        this.container = document.getElementById('container');
    }

    run() {
        window.onhashchange = () => this.reference();
        window.location.hash = 'settings';
    }

    reference() {
        this.clearContainer();
        switch (window.location.hash) {
            case '#settings':
                this.gameController.runSettings();
                break;
            case '#game':
                this.gameController.runGame();
                break;
            case '#score':
                this.scoreController.run();
                break;
            default:
                this.gameController.runSettings();
                break;
        }
    }

    clearContainer() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }

}