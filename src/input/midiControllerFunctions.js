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
    this.trackBinding(this.track1);
    this.trackBinding(this.track2);
  }

  crossfader(app) {
    this.manager.midiMapping.put(64, (value) => {
      app.onCrossfaderChanged(this.basicValue127 * value);

    });
  }

  specialBindings(track1, track2) {

  }

  trackBinding(track) {

    //Play & Pause
    this.manager.midiMapping.put(19, (value) => {
      if (value == 127) {
        track.audioPlayer.onPlayButtonClicked();
      }
    });

    //Stop
    this.manager.midiMapping.put(20, (value) => {
      if (value == 127) {
        track.audioPlayer.onStopClicked();
      }
    });
    //Volume
    this.manager.midiMapping.put(48,(value) => {
      track.audioPlayer.onVolumeChanged(this.basicValue127 * value);
    })

    //up to 100hz
    this.manager.midiMapping.put(6,(value) => {
      track.equalizer.onSliderChanged(0, this.midiToEquilizerValue(value));
    })

    //100hz - 250hz
    this.manager.midiMapping.put(10,(value) => {
      track.equalizer.onSliderChanged(1, this.midiToEquilizerValue(value));
    })

    //250hz - 800hz
    this.manager.midiMapping.put(14,(value) => {
      track.equalizer.onSliderChanged(2, this.midiToEquilizerValue(value));
    })

    //800hz - 5000hz
    this.manager.midiMapping.put(18,(value) => {
      track.equalizer.onSliderChanged(3, this.midiToEquilizerValue(value));
    })
    
    //5000hz - 8000hz
    this.manager.midiMapping.put(7,(value) => {
      track.equalizer.onSliderChanged(4, this.midiToEquilizerValue(value));
    })
    
    //8000hz - 12000hz
    this.manager.midiMapping.put(11,(value) => {
      track.equalizer.onSliderChanged(5, this.midiToEquilizerValue(value));
    })

    //more than 12000hz
    this.manager.midiMapping.put(15,(value) => {
      track.equalizer.onSliderChanged(6, this.midiToEquilizerValue(value));
    })
  }

  track1Binding(track1) {

    //Play & Pause
    this.manager.midiMapping.put(19, (value) => {
      if (value == 127) {
        track1.audioPlayer.onPlayButtonClicked();
      }
    });

    //Stop
    this.manager.midiMapping.put(20, (value) => {
      if (value == 127) {
        track1.audioPlayer.onStopClicked();
      }
    });
    //Volume
    this.manager.midiMapping.put(48,(value) => {
      track1.audioPlayer.onVolumeChanged(this.basicValue127 * value);
    })

    //up to 100hz
    this.manager.midiMapping.put(6,(value) => {
      track1.equalizer.onSliderChanged(0, this.midiToEquilizerValue(value));
    })

    //100hz - 250hz
    this.manager.midiMapping.put(10,(value) => {
      track1.equalizer.onSliderChanged(1, this.midiToEquilizerValue(value));
    })

    //250hz - 800hz
    this.manager.midiMapping.put(14,(value) => {
      track1.equalizer.onSliderChanged(2, this.midiToEquilizerValue(value));
    })

    //800hz - 5000hz
    this.manager.midiMapping.put(18,(value) => {
      track1.equalizer.onSliderChanged(3, this.midiToEquilizerValue(value));
    })
    
    //5000hz - 8000hz
    this.manager.midiMapping.put(7,(value) => {
      track1.equalizer.onSliderChanged(4, this.midiToEquilizerValue(value));
    })
    
    //8000hz - 12000hz
    this.manager.midiMapping.put(11,(value) => {
      track1.equalizer.onSliderChanged(5, this.midiToEquilizerValue(value));
    })

    //more than 12000hz
    this.manager.midiMapping.put(15,(value) => {
      track1.equalizer.onSliderChanged(6, this.midiToEquilizerValue(value));
    })
  }

  track2Binding(track2) {

    //Play & Pause
    this.manager.midiMapping.put(31, (value) => {
      if (value == 127) {
        track2.audioPlayer.onPlayButtonClicked();
      }
    });

    //Stop
    this.manager.midiMapping.put(32, (value) => {
      if (value == 127) {
        track2.audioPlayer.onStopClicked();
      }
    });

    //Volume
    this.manager.midiMapping.put(51,(value) => {
      track2.audioPlayer.onVolumeChanged(this.basicValue127 * value);
    })

    //up to 100hz
    this.manager.midiMapping.put(8,(value) => {
      track2.equalizer.onSliderChanged(0, this.midiToEquilizerValue(value));
    })

    //100hz - 250hz
    this.manager.midiMapping.put(12,(value) => {
      track2.equalizer.onSliderChanged(1, this.midiToEquilizerValue(value));
    })

    //250hz - 800hz
    this.manager.midiMapping.put(16,(value) => {
      track2.equalizer.onSliderChanged(2, this.midiToEquilizerValue(value));
    })

    //800hz - 5000hz
    this.manager.midiMapping.put(20,(value) => {
      track2.equalizer.onSliderChanged(3, this.midiToEquilizerValue(value));
    })
    
    //5000hz - 8000hz
    this.manager.midiMapping.put(9,(value) => {
      track2.equalizer.onSliderChanged(4, this.midiToEquilizerValue(value));
    })
    
    //8000hz - 12000hz
    this.manager.midiMapping.put(13,(value) => {
      track2.equalizer.onSliderChanged(5, this.midiToEquilizerValue(value));
    })

    //more than 12000hz
    this.manager.midiMapping.put(17,(value) => {
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