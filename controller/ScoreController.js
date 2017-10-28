export class ScoreController {
    run() {
        const container = document.getElementById('container');
        const links = document.createElement('div');
        links.id = 'links';
        container.appendChild(links);

        const settingsLink = document.createElement('a');
        settingsLink.href = '#settings';
        settingsLink.textContent = 'Settings';
        links.appendChild(settingsLink);

        return console.log('score controller works');
    }
}