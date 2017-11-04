import {GameModel} from "./GameModel";
import {GameView} from "./GameView";
import {SettingsView} from '../settings/SettingsView';
import {Stopwatch} from "./Stopwatch";
import {StopwatchView} from "./StopwatchView";

export class GameController {
    constructor() {
        this.settingsView = new SettingsView;
        this.settingsView.onGameStarted = (settings) => {
            this.gameModel = new GameModel(settings.fieldSize, settings.fieldColor, settings.cardsBack);
        };
        this.gameView = new GameView;
        this.stopwatch = new Stopwatch;
        this.stopwatchView = new StopwatchView(this.stopwatch);
    }

    runSettings() {
        this.settingsView.addLink('Score');
        this.settingsView.createSettings();
    }

    runGame() {
        this.stopwatchView.renderStopwatch();
        this.gameView.addLink('Settings');
        this.gameView.addLink('Score');
        const cards = this.gameModel.shuffleCards(this.gameView.prepareCards(
            this.gameModel.cardsFaces,
            this.gameModel.cardsBack,
            this.gameModel.fieldSize
        ));
        this.gameView.setCardsListener(cards);
        this.gameView.createField(
            cards,
            this.gameModel.fieldSize,
            this.gameModel.fieldColor,
        );
        this.stopwatchView.startStopwatch();
        this.gameView.onWin = () => {
            this.stopwatchView.stopWatch();
        };
    }
}