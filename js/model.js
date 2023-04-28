export default class Model {
    constructor() {
        this.view = null;
        this.localStorage = window.localStorage;
    }

    setView(view) {
        this.view = view;
    }

    saveData(key, value) {
        this.localStorage.setItem(key, value);
    }

    readData(item) {
        return this.localStorage.getItem(item);
    }

    getUserData() {
        return JSON.parse(this.readData('userData'));
    }

    newUser() {
        const newUser = this.readData('newUser');
        let value = false;

        if (newUser === null) {
            value = true;
        }

        return value;
    }
}