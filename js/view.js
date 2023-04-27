import PopUp from "./components/pop-up.js";

export default class View {
    constructor() {
        this.model = null;
        this.popUp = new PopUp();
        this.btnPlay = document.getElementById('btn-play');
        this.btnPlay.onclick = this.startGame();
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

    startGame() {
        this.btnPlay.addEventListener('click', () => {
            const startMenu = document.getElementById('start-menu');
            const game = document.getElementById('game');
            startMenu.classList.add('none');
            game.classList.remove('none')
        });        
    }
}