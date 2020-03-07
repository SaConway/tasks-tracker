import { Howl } from "howler";

export const timerStore = {
  state: {
    output: {
      status: "off",
      hours: "00",
      minutes: "40",
      countdown: null,
      progress: 0
    },
    sound: null,
    worker: null
  },
  startTimer() {
    this.state.output.status = "on";

    const timer =
      Number(this.state.output.hours) * 60 * 60 +
      Number(this.state.output.minutes) * 60;

    this.state.worker = new Worker("timer.js");
    const data = { type: "start", timer };

    this.state.worker.postMessage(data);

    this.state.worker.onmessage = function(event) {
      this.state.output.countdown = event.data.countdown;
      this.state.output.progress = event.data.progress;
      document.title = event.data.countdown;

      if (event.data.finished) {
        this.timerFinished();
      }
    }.bind(this);
  },
  stopTimer() {
    this.state.output.status = "off";

    this.state.output.countdown = null;
    this.state.output.progress = 0;
    this.resetTitle();

    if (this.state.worker != null) {
      const data = { type: "stop" };
      this.state.worker.postMessage(data);
      this.state.worker.terminate();
      this.state.worker = null;
    }

    if (this.state.sound != null) {
      this.state.sound.stop();
    }
  },
  pauseTimer() {
    this.state.output.status = "pause";

    const data = { type: "pause" };
    this.state.worker.postMessage(data);
  },
  resumeTimer() {
    this.state.output.status = "on";

    const data = { type: "resume" };
    this.state.worker.postMessage(data);
  },
  playSound() {
    var counter = 0;

    this.state.sound = new Howl({
      src: [require("../assets/alarm.mp3")],
      loop: true,
      onend: function() {
        if (++counter === 4) this.stopTimer();
      }.bind(this)
    });

    this.state.sound.play();
  },
  timerFinished() {
    this.state.output.status = "finished";

    this.state.worker.terminate();
    this.state.worker = null;

    this.resetTitle();
    this.playSound();
  },
  resetTitle() {
    document.title = "Minimal Productivity Apps";
  }
};
