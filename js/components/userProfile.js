export default class UserProfile {

    async userData(username) {
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
        return jsonData;
    }

    write(username) {
        const avatar = document.getElementById('avatar');
        const name = document.getElementById('name');
        const gamesWon = document.getElementById('games-won');
        const diamonds = document.getElementById('diamonds');

        this.userData(username)
        .then(data => {
            avatar.style.backgroundImage = "url('/assets/imgs/profile-pictures/"+data.profilePicture+".jpg')";
            name.innerText = data.username;
            gamesWon.innerText = data.gamesWon;
            diamonds.innerText = data.diamonds;
        });
    }
}