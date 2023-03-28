window.addEventListener('load', () => {
    const audioPermission = document.getElementById('audio-permission');
    
    function getPermission() {
        const btnX = document.getElementById('btn-x');

        audioPermission.classList.add('visible');
        btnX.addEventListener('click', () => {
            audioPermission.classList.remove('visible');
        });
    }

    function soundSong() {
        const audio = document.getElementById('audio');
        const btnSong = document.getElementsByClassName('btn-song');
        const iconSound = btnSong[1].firstElementChild;
        
        for (let i = 0; i < btnSong.length; i++) {
            const btn = btnSong[i];
            btn.addEventListener('click', () => {
                if (btn.classList.contains('listening')) {
                    audio.pause();
                } else {
                    if (i == 0) {
                        audioPermission.classList.remove('visible');
                    }
                    audio.play();
                }
                btnSong[1].classList.toggle('listening')
                iconSound.classList.toggle('muted')
            });
        }
    }

    function startGame() {
        const btnPlay = document.getElementById('btn-play');
        btnPlay.addEventListener('click', () => {
            const startMenu = document.getElementById('start-menu');
            const game = document.getElementById('game');
    
            startMenu.classList.add('none');
            game.classList.remove('none')
        });        
    }

    getPermission();
    soundSong();
    startGame();
});