export default class Game {
    constructor(username) {
        this.username = username;
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
                    resolve(inputDiamonds.value);
                }
            });
        });

    }

    async init() {
        const amountDiamonds = await this.getDiamonds(this.username);
        const bet = await this.getBet(amountDiamonds);
    }
}