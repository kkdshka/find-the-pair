export class ScoreModel {
    loadData() {
        return JSON.parse(localStorage.getItem('score')) || [];
    }
}