export class SettingsView {
    constructor() {
        this.container = document.getElementById('container');
    }

    createSettings() {
        this.addLink('Score');
        const settingsWrapper = document.createElement('div');
        settingsWrapper.className = 'settings-wrapper';
        this.createSelect(settingsWrapper, 'field-size', 'Choose field size', ['2 x 2', '4 x 4', '6 x 6', '8 x 8', '10 x 10', '12 x 12']);
        this.createSelect(settingsWrapper, 'field-color', 'Choose game field color', ['bisque', 'aquamarine']);
        this.createSelect(settingsWrapper, 'cards-back', 'Choose cards back', ['burlywood', 'indigo']);
        this.createSubmit(settingsWrapper);

        this.container.appendChild(settingsWrapper);
    }

    addLink(link) {
        const a = document.createElement('a');
        a.className = 'link';
        a.href = '#' + link.toLowerCase();
        a.textContent = link;
        this.container.appendChild(a);
    }

    createTitle(title) {
        const choose = document.createElement('b');
        choose.innerHTML = `${title}: `;
        select.appendChild(choose);
    }

    //options should be array of strings
    createSelect(settingsWrapper, id, title, options) {
        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'select-wrapper';
        const choose = document.createElement('b');
        choose.innerHTML = `${title}: `;
        const select = document.createElement('select');
        select.id = id;
        select.className = 'select';
        options.forEach((option) => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.innerHTML = option;
            select.appendChild(opt);
        });

        selectWrapper.appendChild(choose);
        selectWrapper.appendChild(select);
        settingsWrapper.appendChild(selectWrapper);
    }

    createSubmit(wrapper) {
        const submit = document.createElement('input');
        submit.type = 'submit';
        submit.className = 'submit';
        submit.value = 'Start game';
        submit.onclick = () => {
            const settings = {
                fieldSize: document.getElementById('field-size').value,
                fieldColor: document.getElementById('field-color').value,
                cardsBack: document.getElementById('cards-back').value
            };
            this.onGameStarted(settings);
            window.location.hash = 'game';
        }
        wrapper.appendChild(submit);
    }
}