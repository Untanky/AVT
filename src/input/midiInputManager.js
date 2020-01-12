export default class InputManager {
  constructor(midiMapping) {
      navigator.requestMIDIAccess().then(this.onMidiDevice.bind(this));
  
      this.midiMapping = midiMapping;
  }

  onMidiDevice(access) {
      const inputs = access.inputs.values();

      for (const input of inputs) {
          input.onmidimessage = this.onMidiEvent.bind(this);
      }
  }

  onMidiEvent(event) {
      let cmd = event.data[0] >> 4;
      let channel = event.data[0] & 0xf;
      let btnID = event.data[1];
      let value = event.data[2];

      console.log(`cmd: ${cmd}, channel: ${channel}, btnID: ${btnID}, value: ${value}`);

        if (this.midiMapping.containsKey(btnID)) {
          const callbackFn = this.midiMapping.get(btnID);
          callbackFn(value);
        }
  }
}
