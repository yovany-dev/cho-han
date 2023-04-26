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

    newUser() {
        const newUser = this.readData('newUser');
        let value = false;

        if (newUser === null) {
            this.saveData('newUser', false);
            value = true;
        }

        return value;
    }
}