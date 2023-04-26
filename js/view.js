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
        const data = await this.popUp.show(newUser);

        this.model.saveData('newUser', false);
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