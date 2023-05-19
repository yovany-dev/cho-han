export default class Game {
    constructor(username) {
        this.keepPlaying = true;
        this.username = username;
        this.bet = null;
        this.diceOne = null;
        this.diceTwo = null;
    }

    async getDiamonds(username) {
        const url = '/php/user_data.php';
        const data = {
            username
        }
        const init = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(url, init);
        const jsonData = await response.json();
        return jsonData.diamonds;
    }

    message(msg) {
        const message = document.getElementById('message-diamonds');
        message.className = msg;

        setTimeout(() => {
            message.className = '';
        }, 3000);
    }

    getBet(amountDiamonds) {
        return new Promise(resolve => {
            const inputDiamonds = document.getElementById('input-diamonds');
            const btnMinus = document.getElementById('btn-minus');
            const btnPlus = document.getElementById('btn-plus');
            const btnBet = document.getElementById('btn-bet');
    
            btnMinus.addEventListener('click', () => {
                if (inputDiamonds.value > 1) {
                    inputDiamonds.value--;
                }
            });
    
            btnPlus.addEventListener('click', () => {
                inputDiamonds.value++;
            });
    
            btnBet.addEventListener('click', () => {
                if (inputDiamonds.value.length === 0 || inputDiamonds.value == 0) {
                    this.message('enter-amount');
    
                } else if (inputDiamonds.value > amountDiamonds) {
                    this.message('insufficient-diamonds');
    
                } else {
                    // Bet
                    this.bet = inputDiamonds.value;
                    resolve(true);
                }
            });
        });

    }

    randomNumber() {
        return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    }

    randomDice() {
        this.diceOne = this.randomNumber();
        this.diceTwo = this.randomNumber();
    }

    showResults(status) {
        const elementShowResults = document.getElementById('show-results');
        elementShowResults.classList.add('show');
        setTimeout(() => {
            const diceOne = document.querySelector('.dice-1');
            diceOne.classList.add('animation');

            setTimeout(() => {
                const diceTwo = document.querySelector('.dice-2');
                diceTwo.classList.add('animation');
            }, 500);

            setTimeout(() => {
                const messageResults = document.getElementById('message-results');

                messageResults.classList.add('animation');
            }, 1000);

            setTimeout(() => {
                const buttonsResults = document.getElementById('buttons-results');
                buttonsResults.classList.add('animation');
            }, 1500);
        }, 100);
    }

    game(option) {
        this.randomDice();

        if (
            option == 'cho' &&
            (this.diceOne + this.diceTwo) % 2 === 0
        ) {
            // Cho
            this.showResults(option);

        } else if (
            option == 'han' &&
            (this.diceOne + this.diceTwo) % 2 !== 0
        ) {
            // Han
            this.showResults(option);

        } else {
            // Game over
            this.showResults('game-over');
        }
    }

    getAnswer() {
        const elementGetAnswer = document.getElementById('get-answer');
        const btnCho = document.getElementById('btn-cho');
        const btnHan = document.getElementById('btn-han');
        
        elementGetAnswer.classList.add('show');
        setTimeout(() => {
            const containerButtons = document.getElementById('container-buttons');
            containerButtons.classList.add('animation');

            btnCho.addEventListener('click', () => {
                elementGetAnswer.classList.remove('show');
                this.game('cho');
            });

            btnHan.addEventListener('click', () => {
                elementGetAnswer.classList.remove('show');
                this.game('han');
            });
        }, 6000);
    }

    async init() {
        const getBet = document.getElementById('get-bet');
        const amountDiamonds = await this.getDiamonds(this.username);
        const continueBet = await this.getBet(amountDiamonds);

        if (continueBet) {
            getBet.classList.add('hide');
            this.getAnswer();
        }
    }
}