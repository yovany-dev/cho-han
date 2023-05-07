export default class UserProfile {

    write(userData) {
        const username = document.getElementById('name');
        const topScore = document.getElementById('top-score');
        const gamesWon = document.getElementById('games-won');

        username.innerText = userData.username;
        topScore.innerText = userData.topScore;
        gamesWon.innerText = userData.gamesWon;
    }
}