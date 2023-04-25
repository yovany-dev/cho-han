import Model from "./model.js";
import View from "./view.js"

window.addEventListener('load', () => {
    const model = new Model();
    const view = new View();

    model.setView(view);
    view.setModel(model);
    view.render();
})