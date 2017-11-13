import {ScoreModel} from "./ScoreModel";
import {ScoreView} from "./ScoreView";

export class ScoreController {
    constructor() {
        this.scoreModel = new ScoreModel();
        this.scoreView = new ScoreView();
        this.container = document.getElementById('container')
    }

    run() {
        const scoreData = this.scoreModel.loadData();
        this.scoreView.renderScorePage(scoreData);
        this.scoreView.onChangeFilter = (size) => {
            this.clearContainer();
            this.scoreView.renderScorePage(scoreData, size.substr(0, 1));
        };
    }

    clearContainer() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }
}