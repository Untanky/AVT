/**
 * Slider class for easy access to html sliders
 * 
 * Basically wraps the html slider
 */
class Slider {

    _element

    /**
     * Creats a new slider wrapper
     * 
     * @param {*} id id of the slider element
     * @param {*} onInput called when the slider value changes 
     * @param {*} initialValue the initial value of the slider
     */
    constructor(id, onInput, initialValue = 0) {
        this._element = document.querySelector(id);
        this._element.value = initialValue;
        onInput(initialValue)
        this._element.addEventListener("input", () => { onInput(this._element.value) }, false);
    }
}

export default Slider;