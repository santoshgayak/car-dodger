class Audio{
    constructor(musicFile){
        this.audio = document.createElement("audio");
        this.musicFile = musicFile;
        this.audio.src = this.musicFile;
        this.audio.type = "audio/mpeg";
        this.audio.loop = true;
    }
    playAudio(){
        this.audio.play(); 
    }
    stopPlayingAudio(){
        console.log(" stopping Audio again.......")
        this.audio.pause();
        this.audio.currentTime = 0;

    }
     stopLooping(){
        this.audio.loop = false;
    }

}