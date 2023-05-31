import UserProfile from "/js/components/userProfile.js";

export default class Game {
    constructor() {
        this.username = null;
        this.diamonds = null;
        this.bet = null;
        this.diceOne = null;
        this.diceTwo = null;
        this.UserProfile = new UserProfile();
    }

    async getDiamonds() {
        console.log('Get diamonds');
        const username = this.username;
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
        this.diamonds = jsonData.diamonds;

        return response.status;
    }

    message(msg) {
        const message = document.getElementById('message-diamonds');
        message.className = msg;

        setTimeout(() => {
            message.className = '';
        }, 3000);
    }

    randomNumber() {
        return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    }

    randomDice() {
        this.diceOne = this.randomNumber();
        this.diceTwo = this.randomNumber();
    }

    removeAnimationClass(element) {
        element.classList.remove('animation');
    }

    addAnimationClass(element) {
        element.classList.add('animation');
    }

    async upgradeData(win) {
        const url = '/php/update_data.php';
        const username = this.username;
        const bet = this.bet;

        const data = {
            username,
            win,
            bet
        }
        const init = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(url, init);
        return response.status;
    }

    upgradeDiamondsAndGamesWon(status) {
        let win = false;

        if (status == 'cho' || status == 'han') {
            win = true;
        }

        return this.upgradeData(win);
    }

    showResults(status) {
        const elementShowResults = document.getElementById('show-results');
        elementShowResults.classList.add('show');

        // Dice
        const diceOne = document.querySelector('.dice-1');
        const diceTwo = document.querySelector('.dice-2');

        diceOne.style.backgroundImage = "url('/assets/imgs/dados/"+this.diceOne+".png')";
        diceTwo.style.backgroundImage = "url('/assets/imgs/dados/"+this.diceTwo+".png')";

        // Message
        const titleResults = document.getElementById('title-results');
        const sum = this.diceOne + this.diceTwo;
        titleResults.innerText = 'Obtuviste un ' + sum;

        const diamondsResults = document.getElementById('diamonds-results');
        if (status == 'cho' || status == 'han') {
            diamondsResults.innerText = '+' + this.bet;
            diamondsResults.style.color = '#f2f2f2';

        } else {
            diamondsResults.innerText = '-' + this.bet;
            diamondsResults.style.color = '#dd2424';
        }

        // Update data
        this.upgradeDiamondsAndGamesWon(status)
        .then(res => {
            if (res == 200) {
                this.UserProfile.write(this.username);
            }
        });

        // Animation
        const containerDice = document.getElementById('container-dice');
        const messageResults = document.getElementById('message-results');
        const buttonsResults = document.getElementById('buttons-results');
        
        // Add classes to animate elements
        setTimeout(() => {
            this.addAnimationClass(containerDice);
            this.addAnimationClass(messageResults);
            this.addAnimationClass(buttonsResults);
        }, 100);

        // Buttons
        buttonsResults.addEventListener('click', e => {
            e.preventDefault();
            e.stopImmediatePropagation();
            const element = e.target;

            if (element && !element.classList.contains('buttons-results')) {
                // Remove classes to animate elements
                this.removeAnimationClass(containerDice);
                this.removeAnimationClass(messageResults);
                this.removeAnimationClass(buttonsResults);

                elementShowResults.classList.remove('show');

                const elementGetBet = document.getElementById('get-bet');

                this.getDiamonds()
                .then(res => {
                    if (res == 200) {
                        elementGetBet.classList.remove('hide');
                    }
                });

                if (element.matches('.button-back-to-menu')) {
                    const menu = document.getElementById('menu');
                    const main = document.getElementById('main');
                    menu.classList.remove('none');
                    main.classList.add('none');
                }
            }
        })
    }

    validate(option) {
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

    choHan() {
        console.log('Cho | Han');
        const elementChoHan = document.getElementById('cho-han');
        elementChoHan.classList.add('show');

        setTimeout(() => {
            const containerButtons = document.getElementById('container-buttons');
            this.addAnimationClass(containerButtons);

            containerButtons.addEventListener('click', e => {
                e.preventDefault();
                e.stopImmediatePropagation();
                const element = e.target;
                
                if (element && !element.classList.contains('container-buttons')) {
                    elementChoHan.classList.remove('show');
                    this.removeAnimationClass(containerButtons);

                    const btnCho = element.classList.contains('button-cho');
                    if (btnCho) {
                        this.validate('cho');
                    }

                    const btnHan = element.classList.contains('button-han');
                    if (btnHan) {
                        this.validate('han');
                    }
                }
            });
        }, 6000);
    }

    getBet() {
        console.log('Bet');
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

            } else if (inputDiamonds.value > this.diamonds) {
                this.message('insufficient-diamonds');

            } else {
                this.bet = inputDiamonds.value;
                const elementGetBet = document.getElementById('get-bet');
                elementGetBet.classList.add('hide');

                this.choHan();
            }
        });
    }

    init(username) {
        console.log('init');
        this.username = username;

        this.getDiamonds()
        .then(res => {
            if (res == 200) {
                this.getBet();
            }
        });
    }
}