import PopUp from "./components/pop-up.js";
import UserProfile from "./components/userProfile.js";
import Audio from "./components/audio.js";
import Game from "./game.js";

export default class View {
    constructor() {
        this.model = null;
        this.username = null;
        this.popUp = new PopUp();
        this.userProfile = new UserProfile();
        this.audio = new Audio();
        this.game = new Game();
        this.play();

        this.audio.onClick(value => this.saveAudioPermission(value));
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

        this.username = this.model.getUserData().username;
        this.game.init(this.username);
    }

    saveAudioPermission(value) {
        const userData = this.model.getUserData();
        userData.audioPermission = value;
        this.model.saveData('userData', JSON.stringify(userData));
    }

    play() {
        const btnPlay = document.getElementById('btn-play');

        btnPlay.addEventListener('click', () => {
            const menu = document.getElementById('menu');
            const main = document.getElementById('main');
            menu.classList.add('none');
            main.classList.remove('none');

            // Write user profile
            this.userProfile.write(this.username);

            // Starting audio...
            const audioPermission = this.model.getUserData().audioPermission;
            this.audio.play(audioPermission);
        });
    }
}