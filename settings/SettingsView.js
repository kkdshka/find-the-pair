export class SettingsView {
    constructor() {
        this.container = document.getElementById('container');
    }

    createSettings() {
        this.createSelect('field-size', 'Choose field size', ['4 x 4', '6 x 6', '8 x 8', '10 x 10', '12 x 12']);
        this.createSelect('field-color', 'Choose game field color', ['bisque', 'aquamarine']);
        this.createSelect('cards-back', 'Choose cards back', ['burlywood', 'indigo']);
        this.createSubmit();
    }

    addLink(link) {
        const a = document.createElement('a');
        a.href = '#' + link.toLowerCase();
        a.textContent = link;
        this.container.appendChild(a);
    }

    //options should be array of strings
    createSelect(id, title, options) {
        const select = document.createElement('select');
        select.id = id;
        const opt = document.createElement('option');
        opt.innerHTML = title;
        options.forEach((option) => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.innerHTML = option;
            select.appendChild(opt);
        });
        this.container.appendChild(select);
    }

    createSubmit() {
        const submit = document.createElement('input');
        submit.type = 'submit';
        submit.id = 'submit';
        submit.onclick = () => {
            const settings = {
                fieldSize: document.getElementById('field-size').value,
                fieldColor: document.getElementById('field-color').value,
                cardsBack: document.getElementById('cards-back').value
            };
            this.onGameStarted(settings);
            window.location.hash = 'game';
        }
        this.container.appendChild(submit);
    }
}