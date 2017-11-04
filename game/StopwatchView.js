export class StopwatchView {
    constructor(stopwatch) {
        this.stopwatch = stopwatch;
        this.container = document.getElementById('container');
    }

    renderStopwatch() {
        const stopwatch = document.createElement('div');
        stopwatch.id = 'stopwatch';
        stopwatch.className = 'stopwatch';
        this.container.appendChild(stopwatch);
        const blocker = document.createElement('div');
        blocker.id = 'blocker';
        blocker.className = 'blocker';
        blocker.style.display = 'none';
        this.container.appendChild(blocker);
        this.blocker = blocker;
        this.addWatch(stopwatch);
        this.addPauseButton(stopwatch);
    }

    addWatch(parent) {
        const div = document.createElement('div');
        div.id = 'time';
        this.time = div;
        parent.appendChild(div);
    }

    addPauseButton(parent) {
        const button = document.createElement('input');
        button.type = 'button';
        button.value = 'pause';
        button.className = 'pause';
        button.onclick = () => {
            if (button.className === 'pause') {
                button.className = 'resume';
                this.pauseStopwatch();
                this.blocker.style.display = 'block';
            }
            else {
                button.className = 'pause';
                this.startStopwatch();
                this.blocker.style.display = 'none';
            }
        };
        parent.appendChild(button);
    }

    update() {
        this.time.innerHTML = this.stopwatch.toString();
    }

    startStopwatch() {
        this.clocktimer = setInterval(() => this.update(), 1000);
        this.stopwatch.start();
    }

    pauseStopwatch() {
        this.stopwatch.pause();
        clearInterval(this.clocktimer);
    }

    stopWatch() {
        this.pauseStopwatch();
        this.update();
    }
}