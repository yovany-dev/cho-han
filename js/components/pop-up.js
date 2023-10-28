 export default class PopUp {
    constructor() {
        this.containerPopUp = document.getElementById('container-pop-up');
        this.audio = document.getElementById('audio');
    }

    hideOrShowPopUp(popUp) {
        popUp.classList.toggle('visible');
    }

    getAudioPermission() {
        return new Promise(resolve => {
            let audioPermission = false;
            const popUpGetPermission = document.getElementById('get-permission');

            this.containerPopUp.classList.add('visible');
            this.hideOrShowPopUp(popUpGetPermission);

            popUpGetPermission.addEventListener('click', e => {
                const clickedElement = e.target;

                if (clickedElement.classList.contains('btn-allow')) {
                    this.audio.play();
                    audioPermission = true;
                }
                if (audioPermission || clickedElement.classList.contains('btn-no')) {
                    this.hideOrShowPopUp(popUpGetPermission);
                    resolve(audioPermission);
                }
            });
        });
    }

    message(msg) {
        const elementMessage = document.getElementById('message');
        elementMessage.className = 'message '+msg;
    }

    // Convert name to a valid format
    formatForName(name) {
        if (name.trim() != '') {
            name = name.trim();
            return name[0].toUpperCase() + name.slice(1).toLowerCase();
        }
        return '';
    }

    getUsername() {
        return new Promise(resolve => {
            const popUpGetUsername = document.getElementById('get-username');
            const btnAccept = document.getElementById('btn-accept-username');

            this.hideOrShowPopUp(popUpGetUsername);
            btnAccept.addEventListener('click', () => {
                let username = document.getElementById('input-name').value;
                username = this.formatForName(username);

                if (username.length === 0) {
                    this.message('empty-name');
                } else if (username.length > 8) {
                    this.message('long-name');
                } else {
                    this.hideOrShowPopUp(popUpGetUsername);
                    resolve(username);
                }
            });
        });
    }

    getProfilePicture() {
        return new Promise(resolve => {
            const popUpProfilePicture = document.getElementById('profile-picture');
            const containerImage = document.getElementById('container-imgs');
            const imgs = containerImage.children;
            const btnAccept = document.getElementById('btn-accept-pp');
    
            this.hideOrShowPopUp(popUpProfilePicture);
            containerImage.addEventListener('click', e => {
                const imgClicked = e.target;
    
                if (imgClicked.classList.contains('img')) {
                    for (const img of imgs) {
                        if (!imgClicked.classList.contains('selected') && img.classList.contains('selected')) {
                            img.classList.remove('selected');
                        }
                    }
                    imgClicked.classList.add('selected');
                }
            });

            btnAccept.addEventListener('click', () => {
                for (const img of imgs) {
                    if (img.classList.contains('selected')) {
                        this.containerPopUp.classList.remove('visible');
                        resolve(img.classList.item(1));
                    }
                }
            });
        });
    }

    async show() {
        const audioPermission = await this.getAudioPermission();
        const username = await this.getUsername();
        const profilePicture = await this.getProfilePicture();

        return {
            audioPermission,
            username,
            profilePicture,
            gamesWon: 0,
            diamonds: 200
        }
    }
}