export const TimerFunction = (callback, delay) => {

    let timerId, startTimer, remainingTime = delay;

    this.pause = () => {
        window.clearTimeout(timerId);
        timerId = null;
        remainingTime -= Date.now() - startTimer;
    };

    this.resume = () => {
        if (state != 2) return;
        state = 3;
        window.setTimeout(this.timeoutCallback, remainingTime);
    };

    this.timeoutCallback = () => {
        if (timerId) return;
        startTimer = Date.now();
        timerId = window.setTimeout(callback, remainingTime);
    };
    this.resume();
};
