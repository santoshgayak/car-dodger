class GameAudio {

    isMuted = false;

    static gameAudio = {
        start: "./assets/audio/alex-morgan-car-car-music-545487.mp3",
        background: "./assets/audio/aenjoytrips-car-changing-gears-sound-188962.mp3",
        end:"./assets/audio/alex-morgan-car-car-music-545487.mp3",
        collision: "./assets/audio/u-mgq59j5ayf-sound-effect-car-crash-394903_hozLuvL7.mp3",
        heartPop: "./assets/audio/universfield-bubble-pop-06-351337.mp3",
        coinCollection: "./assets/audio/mixkit-fairy-arcade-sparkle-866_4jncl9xk.wav",
        engine: "./assets/audio/dragon-studio-car-engine-372477.mp3"
    };
 
    constructor(type){
        this.audio = document.createElement("audio");
        this.audio.src = GameAudio.gameAudio[type];
        this.audio.type = "audio/mpeg";
        this.audio.loop = true;
    }
    playAudio(){
        if(this.isMuted === true ) return;
        //this.audio.play(); 
    }

    stopPlayingAudio(){
        this.audio.pause();
        this.audio.currentTime = 0;
    }
     stopLooping(){
        this.audio.loop = false;
    }

}