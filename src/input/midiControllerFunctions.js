export default class ControllerBinding {

  constructor(manager,app,track1, track2) {
    this.app = app;
    this.track1 = track1;
    this.track2 = track2;
    this.basicValue127 = 1 / 127;
    this.basicValueEquilizer = 40 / 63;
    this.manager = manager;

    this.specialBindings(this.track1, this.track2);
    this.crossfader(this.app);
    this.track1Binding(this.track1);
    this.track2Binding(this.track2);
  }

  crossfader(app) {
    this.manager.midiMapping.put(6411, (value) => {
      app.onCrossfaderChanged(this.basicValue127 * value);
    });
  }

  specialBindings(track1, track2) {

  }

  // put: this.manager.midiMapping.put(buttonId + cmd , (value) => ...)
  track1Binding(track1) {

    //Play & Pause
    this.manager.midiMapping.put(199, (value) => {
      if (value == 127) {
        track1.audioPlayer.onPlayButtonClicked();
      }
    });

    //Stop
    this.manager.midiMapping.put(209, (value) => {
      if (value == 127) {
        track1.audioPlayer.onStopClicked();
      }
    });
    //Volume
    this.manager.midiMapping.put(4811,(value) => {
      track1.audioPlayer.onVolumeChanged(this.basicValue127 * value);
    })

    //up to 100hz
    this.manager.midiMapping.put(611,(value) => {
      track1.equalizer.onSliderChanged(0, this.midiToEquilizerValue(value));
    })

    //100hz - 250hz
    this.manager.midiMapping.put(1011,(value) => {
      track1.equalizer.onSliderChanged(1, this.midiToEquilizerValue(value));
    })

    //250hz - 800hz
    this.manager.midiMapping.put(1411,(value) => {
      track1.equalizer.onSliderChanged(2, this.midiToEquilizerValue(value));
    })

    //800hz - 5000hz
    this.manager.midiMapping.put(1811,(value) => {
      track1.equalizer.onSliderChanged(3, this.midiToEquilizerValue(value));
    })
    
    //5000hz - 8000hz
    this.manager.midiMapping.put(711,(value) => {
      track1.equalizer.onSliderChanged(4, this.midiToEquilizerValue(value));
    })
    
    //8000hz - 12000hz
    this.manager.midiMapping.put(1111,(value) => {
      track1.equalizer.onSliderChanged(5, this.midiToEquilizerValue(value));
    })

    //more than 12000hz
    this.manager.midiMapping.put(1511,(value) => {
      track1.equalizer.onSliderChanged(6, this.midiToEquilizerValue(value));
    })
  }

  track2Binding(track2) {

    //Play & Pause
    this.manager.midiMapping.put(319, (value) => {
      if (value == 127) {
        track2.audioPlayer.onPlayButtonClicked();
      }
    });

    //Stop
    this.manager.midiMapping.put(329, (value) => {
      if (value == 127) {
        track2.audioPlayer.onStopClicked();
      }
    });

    //Volume
    this.manager.midiMapping.put(5111,(value) => {
      track2.audioPlayer.onVolumeChanged(this.basicValue127 * value);
    })

    //up to 100hz
    this.manager.midiMapping.put(811,(value) => {
      track2.equalizer.onSliderChanged(0, this.midiToEquilizerValue(value));
    })

    //100hz - 250hz
    this.manager.midiMapping.put(1211,(value) => {
      track2.equalizer.onSliderChanged(1, this.midiToEquilizerValue(value));
    })

    //250hz - 800hz
    this.manager.midiMapping.put(1611,(value) => {
      track2.equalizer.onSliderChanged(2, this.midiToEquilizerValue(value));
    })

    //800hz - 5000hz
    this.manager.midiMapping.put(2011,(value) => {
        track2.equalizer.onSliderChanged(3, this.midiToEquilizerValue(value));
    })
    
    //5000hz - 8000hz
    this.manager.midiMapping.put(911,(value) => {
      track2.equalizer.onSliderChanged(4, this.midiToEquilizerValue(value));
    })
    
    //8000hz - 12000hz
    this.manager.midiMapping.put(1311,(value) => {
      track2.equalizer.onSliderChanged(5, this.midiToEquilizerValue(value));
    })

    //more than 12000hz
    this.manager.midiMapping.put(1711,(value) => {
      track2.equalizer.onSliderChanged(6, this.midiToEquilizerValue(value));
    })
  }

  //Can reduce code size for the binding of the Knobs (maybe for later use)
  bindKnobs(startKnobId, startSliderId, knobCount) {
    for(let i = startId;i < startId + knobCount; i++) {
      this.manager.midiMapping.put(startKnobId+ (i * 4),(value) => {
        track2.equalizer.onSliderChanged(startSliderId + i, this.midiToEquilizerValue(value));
      })
    }
  }
  
  midiToEquilizerValue(value) {
    if(value == 64) {
      return 0;
    } else {
      return (-40 + (this.basicValueEquilizer * value));
    } 
  }
}