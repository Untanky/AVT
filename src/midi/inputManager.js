export default class InputManager {
    constructor() {
        navigator.requestMIDIAccess().then(this.onMidiDevice.bind(this));
        window.addEventListener('keyup', this.onKeyboardEvent.bind(this));
    
        this.midiMapping = new Map();
        this.keyboardMapping = new Map();
    }

    onMidiDevice(access) {
        const inputs = access.inputs.values();
        const outputs = access.outputs.values();

        for (const input of inputs) {
            console.log(input);
            input.onmidimessage = this.onMidiEvent.bind(this);
        }
    }

    onMidiEvent(event) {
        let cmd = event.data[0] >> 4;
        let channel = event.data[0] & 0xf;
        let btnID = event.data[1];
        let value = event.data[2];

        console.log(`cmd: ${cmd}, channel: ${channel}, btnID: ${btnID}, value: ${value}`);

        if (this.midiMapping.has(btnID)) {
            const callbackFn = this.midiMapping.get(btnID);
            callbackFn(value);
        }
    }

    onKeyboardEvent(event) {
        let key = event.key;

        console.log(`key: ${key}`);

        if (this.keyboardMapping.has(key)) {
            const callbackFn = this.keyboardMapping.get(key);
            callbackFn();
        }
    }

    mapMidi(btnID, callbackFn) {
        this.midiMapping.set(btnID, callbackFn);
    }

    mapKeyboard(btnName, callbackFn) {
        this.keyboardMapping.set(btnName, callbackFn);
    }
}
