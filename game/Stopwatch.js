export class Stopwatch  {
    constructor() {
        this.startTime = 0;	// Time of last start / resume. (0 if not running)
        this.pauseTime = 0;	// Time on the clock when last stopped in milliseconds
    }

    now() {
        return (new Date()).getTime();
    };

    // Start or resume
    start() {
        this.startTime = this.startTime ? this.startTime : this.now();
    };

    pause() {
        this.pauseTime = this.startTime ? this.pauseTime + this.now() - this.startTime : this.pauseTime;
        this.startTime = 0;
    };

    reset() {
        this.pauseTime = this.startTime = 0;
    };

    getTime() {
        return this.pauseTime + (this.startTime ? this.now() - this.startTime : 0);
    };

    toString() {
        let time = this.getTime();

        const hours = Math.floor( time / (60 * 60 * 1000) );
        time = time % (60 * 60 * 1000);
        const min = Math.floor( time / (60 * 1000) );
        time = time % (60 * 1000);
        const sec = Math.floor( time / 1000 );

        return this.pad(hours, 2) + ':' + this.pad(min, 2) + ':' + this.pad(sec, 2);
    }

    pad(num, size) {
        let s = "0000" + num;
        return s.substr(s.length - size);
    }
}