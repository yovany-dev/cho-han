export default class Audio {
    constructor() {
        this.audio = document.getElementById('audio');
    }

    onClick(audioPermission, callback) {
        const btnSound = document.getElementById('btn-sound');
        const iconSound = document.getElementById('icon-sound');

        if (audioPermission) {
            this.audio.play();
            iconSound.classList.remove('muted');
        }

        btnSound.addEventListener('click', () => {
            if (iconSound.classList.contains('muted')) {
                this.audio.play();
                callback(true);

            } else {
                this.audio.pause();
                callback(false);
            }

            iconSound.classList.toggle('muted');
        });
    }
}