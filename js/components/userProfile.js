export default class UserProfile {

    write(data) {
        const avatar = document.getElementById('avatar');
        const name = document.getElementById('name');
        const gamesWon = document.getElementById('games-won');
        const diamonds = document.getElementById('diamonds');

        avatar.style.backgroundImage = "url('assets/imgs/profile-pictures/"+data.profilePicture+".jpg')";
        name.innerText = data.username;
        gamesWon.innerText = data.gamesWon;
        diamonds.innerText = data.diamonds;
    }
}