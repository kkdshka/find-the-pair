import {GameController} from "./game/GameController";
import {GameModel} from "./game/GameModel";
import {GameView} from "./game/GameView";
import {ScoreController} from "./controller/ScoreController";
import {SettingsController} from "./controller/SettingsController";

export class App {
    constructor() {
        this.settingsController = new SettingsController();
        this.gameController = new GameController(new GameView(), new GameModel());
        this.scoreController = new ScoreController();
    }

    run() {
        window.onhashchange = () => this.reference();
        window.location.hash = 'settings';
    }

    reference() {
        const container = document.getElementById('container');
        container.childNodes.forEach((child) => container.removeChild(child));
        switch (window.location.hash) {
            case '#settings':
                this.settingsController.run();
                break;
            case '#game':
                this.gameController.run();
                break;
            case '#score':
                this.scoreController.run();
                break;
            default:
                this.settingsController.run();
                break;
        }
    }

}