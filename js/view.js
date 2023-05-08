import PopUp from "./components/pop-up.js";
import UserProfile from "./components/userProfile.js";
import Audio from "./components/audio.js";

export default class View {
    constructor() {
        this.model = null;
        this.popUp = new PopUp();
        this.userProfile = new UserProfile();
        this.audio = new Audio();
        this.startGame();
    }

    setModel(model) {
        this.model = model;
    }

    async render() {
        const newUser = this.model.newUser();

        if (newUser) {
            const userData = await this.popUp.show();

            this.model.saveData('newUser', false);
            this.model.saveData('userData', JSON.stringify(userData));
        }
    }

    saveAudioPermission(value) {
        const userData = this.model.getUserData();
        userData.audioPermission = value;
        this.model.saveData('userData', JSON.stringify(userData));
    }

    startGame() {
        const btnPlay = document.getElementById('btn-play');

        btnPlay.addEventListener('click', () => {
            const startMenu = document.getElementById('start-menu');
            const game = document.getElementById('game');
            startMenu.classList.add('none');
            game.classList.remove('none');

            const username = this.model.getUserData().username;
            this.userProfile.write(username);

            const audioPermission = this.model.getUserData().audioPermission;
            this.audio.onClick(audioPermission, value => this.saveAudioPermission(value));
        });
    }
}