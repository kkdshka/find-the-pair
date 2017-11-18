export class ScoreView {
    constructor() {
        this.container = document.getElementById('container');
    }

    renderScorePage(scoreData, size = '2') {
        this.renderLink();
        this.renderFilters();
        this.renderScoreTable();
        this.renderScoreData(scoreData, size);
    }

    renderLink() {
        const links_wrapper = document.createElement('div');
        links_wrapper.className = 'links-wrapper';
        this.container.appendChild(links_wrapper);

        const settings_link = document.createElement('a');
        settings_link.className = 'link';
        settings_link.href = '#settings';
        settings_link.textContent = 'Settings';

        links_wrapper.appendChild(settings_link);
    }

    renderFilters(possibleSizes = ['2 x 2', '4 x 4', '6 x 6', '8 x 8', '10 x 10', '12 x 12']) {
        const filtersWrapper = document.createElement('div');
        filtersWrapper.className = 'filters-wrapper';

        possibleSizes.forEach((size) => {
            const filter = document.createElement('span');
            filter.className = 'filter';
            filter.innerHTML = size;
            filter.onclick = () => {
                this.onChangeFilter(size);
            };
            filtersWrapper.appendChild(filter);
        });

        this.container.appendChild(filtersWrapper);
    }

    renderScoreTable() {
        const scoreTableWrapper = document.createElement('div');
        scoreTableWrapper.className = 'score-table-wrapper';

        const scoreTable = document.createElement('table');
        scoreTable.className = 'score-table';
        scoreTable.id = 'score-table';

        const caption = document.createElement('caption');
        caption.className = 'score-caption';
        caption.innerHTML = 'Best scores';

        const tableRow = document.createElement('tr');

        const nameHeader = document.createElement('th');
        nameHeader.innerHTML = 'Name';
        nameHeader.className = 'cell';
        const scoreHeader = document.createElement('th');
        scoreHeader.innerHTML = 'Score';
        scoreHeader.className = 'cell';
        const dateHeader = document.createElement('th');
        dateHeader.innerHTML = 'Date';
        dateHeader.className = 'cell';

        tableRow.appendChild(nameHeader);
        tableRow.appendChild(scoreHeader);
        tableRow.appendChild(dateHeader);
        scoreTable.appendChild(tableRow);
        scoreTable.appendChild(caption);
        scoreTableWrapper.appendChild(scoreTable);
        this.container.appendChild(scoreTableWrapper);
    }

    renderScoreData(scoreData, fieldSize) {
        const filteredData = scoreData.filter((element) => {
            return element.fieldSize === fieldSize;
        });

        const sortedData = filteredData.sort(this.compare);

        const table = document.getElementById('score-table');
        sortedData.forEach((data) => {
            const tableRow = document.createElement('tr');

            const name = document.createElement('td');
            name.innerHTML = data.name;
            name.className = 'cell';
            const score = document.createElement('td');
            score.innerHTML = data.score;
            score.className = 'cell';
            const date = document.createElement('td');
            date.innerHTML = data.date;
            date.className = 'cell';

            tableRow.appendChild(name);
            tableRow.appendChild(score);
            tableRow.appendChild(date);
            table.appendChild(tableRow);
        });
    }

    compare(scoreData1, scoreData2) {
        if(scoreData1.score > scoreData2.score) {
            return -1;
        }
        if(scoreData1.score < scoreData2.score) {
            return 1;
        }
        if(scoreData1.score === scoreData2.score) {
            return 0;
        }
    }
}