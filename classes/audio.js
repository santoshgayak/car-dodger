class Audio{
    constructor(musicFile){
        this.audio = document.createElement("audio");
        this.musicFile = musicFile;
        this.audio.src = this.musicFile;
        this.audio.type = "audio/mpeg";
        this.audio.loop = false;

    }
    playAudio(){
        //this.audio.play(); 
    }
    stopPlayingAudio(){
        console.log(" called")
        this.audio.pause();
    }
     stopLooping(){
        this.audio.loop = false;
    }

}