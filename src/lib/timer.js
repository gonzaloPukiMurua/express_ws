class Timer{
    constructor(request, time){
        this.interval = setInterval(request, time);
    }
    pause(){
        clearInterval(this.interval);
    }
}

