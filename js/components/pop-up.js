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

    async validateUsername(username) {
        const url = '/php/validate_username.php';
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
        return jsonData.res;
    }

    saveNewUser(username) {
        const url = '/php/save_new_user.php';
        const data = {
            username,
            score: 0
        }
        const init = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(url, init);
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

                this.validateUsername(username)
                .then(value => {
                    if (value == 'empty-name') {
                        this.message(value)

                    } else if (value == 'long-name') {
                        this.message(value);

                    } else if (value == 'name-exists') {
                        this.message(value);

                    } else if (value == 'save-data') {
                        this.hideOrShowPopUp(popUpGetUsername);
                        resolve(username);
                    }
                });
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
        this.saveNewUser(username);

        return {
            audioPermission,
            username,
            profilePicture
        }
    }
}