export class SettingsController {
    run() {
        const container = document.getElementById('container');
        const links = document.createElement('div');
        links.id = 'links';
        container.appendChild(links);

        const gameLink = document.createElement('a');
        gameLink.href = '#game';
        gameLink.textContent = 'Start';
        links.appendChild(gameLink);

        const scoreLink = document.createElement('a');
        scoreLink.href = '#score';
        scoreLink.textContent = 'Score';
        links.appendChild(scoreLink);

        return console.log('settings controller works');
    }
}