export default class Audio {
    constructor() {
        this.audio = document.getElementById('audio');
        this.iconSound = document.getElementById('icon-sound');
    }

    play(audioPermission) {
        if (audioPermission) {
            this.audio.play();
            this.iconSound.classList.remove('muted');
        }
    }

    onClick(callback) {
        const btnSound = document.getElementById('btn-sound');

        btnSound.addEventListener('click', () => {
            if (this.iconSound.classList.contains('muted')) {
                this.audio.play();
                callback(true);

            } else {
                this.audio.pause();
                callback(false);
            }

            this.iconSound.classList.toggle('muted');
        });
    }
}