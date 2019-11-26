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
     * @param {HTMLElement} id id of the slider element
     * @param {EventHandler} onInput called when the slider value changes 
     * @param {Number} initialValue the initial value of the slider
     */
    constructor(element, onInput, initialValue = 0) {
        this._element = element;
        this._element.value = initialValue;
        onInput(initialValue)
        this._element.addEventListener("input", () => { onInput(this._element.value) }, false);
    }
}

export default Slider;