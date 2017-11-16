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
        this.gameView = new GameView(this.gameModel);
        this.stopwatch = new Stopwatch;
        this.stopwatchView = new StopwatchView(this.stopwatch);
    }

    runSettings() {
        this.settingsView.createSettings();
    }

    runGame() {
        this.stopwatchView.renderStopwatch();
        this.gameView.addLinks();
        const cards = this.gameModel.shuffleCards(this.gameView.prepareCards(
            this.gameModel.cardsFaces,
            this.gameModel.cardsBack,
            this.gameModel.fieldSize
        ));
        this.gameView.createField(
            cards,
            this.gameModel.fieldSize,
            this.gameModel.fieldColor,
        );
        this.stopwatchView.startStopwatch();
        this.gameView.onWin = () => {
            this.stopwatchView.stopWatch();
            const score = this.gameModel.calculateScore(this.gameView.clicks, this.stopwatch.pauseTime);
            this.gameView.renderWinForm(score);
            this.gameView.onSubmit = (name) => {
                const dataToSave = {
                    fieldSize: this.gameModel.fieldSize,
                    name: name,
                    date: (new Date()).toDateString(),
                    score: score
                };
                this.gameModel.saveScoreData(dataToSave);
            };
        };
    }
}