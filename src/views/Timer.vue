<template>
  <div class="container">
    <button v-if="status != 'off'" @click="stopTimer">Stop</button>

    <button v-if="status == 'on'" @click="pauseTimer" class="pause-timer" key="pause-btn">Pause</button>
    <button v-else-if="status == 'pause'" @click="resumeTimer">Resume</button>

    <template v-if="status == 'off'">
      <input
        class="start-timer"
        v-model="hours"
        maxlength="2"
        autofocus
        @input="periodChange"
        @keyup.enter="startTimer"
      />
      <span class="time-period">h</span>

      <input v-model="minutes" maxlength="2" @input="periodChange" @keyup.enter="startTimer" />
      <span class="time-period">m</span>

      <button @click="startTimer" class="start-timer" key="start-btn">Start</button>
    </template>

    <template v-if="countdown != null">
      <p class="countdown">{{ countdown }}</p>

      <div class="progress">
        <div class="bar" :style="{ width: progress + '%' }"></div>
      </div>
    </template>
  </div>
</template>

<script>
import { Howl } from "howler";

export default {
  data: function() {
    return {
      hours: "00",
      minutes: "40",
      countdown: null,
      sound: null,
      status: "off",
      progress: 0,
      worker: null
    };
  },
  methods: {
    startTimer() {
      this.status = "on";

      const timer = Number(this.hours) * 60 * 60 + Number(this.minutes) * 60;

      this.worker = new Worker("timer.js");
      const data = { type: "start", timer };
      this.worker.postMessage(data);

      this.worker.onmessage = function(event) {
        this.countdown = event.data.countdown;
        document.title = event.data.countdown;
        this.progress = event.data.progress;

        if (event.data.finished) {
          this.timerFinished();
        }
      }.bind(this);
    },
    timerFinished() {
      this.status = "finished";

      this.worker.terminate();
      this.worker = null;

      this.resetTitle();
      this.playSound();
    },
    stopTimer() {
      this.status = "off";

      this.countdown = null;
      this.progress = 0;
      this.resetTitle();

      if (this.worker != null) {
        const data = { type: "stop" };
        this.worker.postMessage(data);
        this.worker.terminate();
        this.worker = null;
      }

      if (this.sound != null) {
        this.sound.stop();
      }
    },
    pauseTimer() {
      this.status = "pause";

      const data = { type: "pause" };
      this.worker.postMessage(data);
    },
    resumeTimer() {
      this.status = "on";

      const data = { type: "resume" };
      this.worker.postMessage(data);
    },
    playSound() {
      var counter = 0;

      this.sound = new Howl({
        src: [require("../assets/alarm.mp3")],
        loop: true,
        onend: function() {
          if (++counter === 4) this.stopTimer();
        }.bind(this)
      });

      this.sound.play();
    },
    periodChange() {
      this.hours = this.hours.replace(/[^\d]+/g, "");
      this.minutes = this.minutes.replace(/[^\d]+/g, "");
    },
    resetTitle() {
      document.title = "Minimal Productivity Apps";
    }
  }
};
</script>

<style scoped>
button {
  color: var(--accent-color);
  width: 7rem;
  margin-right: 1rem;
  padding: 1rem;
  font-size: var(--normal-font-size);
  border: 1px solid var(--accent-color);
  border-radius: var(--border-radius);
}

input {
  background-color: var(--accent-color);
  padding: 1rem;
  border: 1px solid var(--accent-color);
  border-radius: var(--border-radius);
  font-size: var(--normal-font-size);
  color: var(--bg-color);
  width: 5rem;
  text-align: center;
}

p.countdown {
  color: var(--accent-color);
  font-size: 4rem;
  letter-spacing: 0.5rem;
  text-align: center;
  margin-top: 8rem;
  animation: fade-in 0.5s ease-in;
}

span.time-period {
  color: var(--accent-color);
  font-size: var(--normal-font-size);
  vertical-align: middle;
  margin-right: 2rem;
  margin-left: 1rem;
}

span.time-period:last-of-type {
  margin-right: 4rem;
}

.progress {
  height: 15px;
  width: 40%;
  margin: auto;
  border-radius: var(--border-radius);
  background-color: var(--accent-color);
  overflow-x: hidden;
  animation: fade-in 0.5s ease-in;
}

.bar {
  height: 15px;
  background-color: var(--primary-color);
  transition: width 0.1s linear;
}

@media (max-width: 1000px) {
  p.countdown {
    font-size: 3rem;
  }
  .progress {
    width: 80%;
  }
  button.start-timer {
    display: block;
    margin-top: 2rem;
  }
}
</style>
