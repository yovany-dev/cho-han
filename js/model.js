export default class Model {
    constructor() {
        this.view = null;
    }

    setView(view) {
        this.view = view;
    }

    isNewUser() {
        return true;
    }
}