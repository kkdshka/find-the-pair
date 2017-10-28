export class GameController {
    run() {
        const container = document.getElementById('container');
        const links = document.createElement('div');
        links.id = 'links';
        container.appendChild(links);

        const settingsLink = document.createElement('a');
        settingsLink.href = '#settings';
        settingsLink.textContent = 'Settings';
        links.appendChild(settingsLink);

        const scoreLink = document.createElement('a');
        scoreLink.href = '#score';
        scoreLink.textContent = 'Score';
        links.appendChild(scoreLink);

        return console.log('game controller works');
    }
}