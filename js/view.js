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

    render() {
        const isNewUser = this.model.isNewUser();
        this.popUp.show(isNewUser)
        .then(res => console.log(res));
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