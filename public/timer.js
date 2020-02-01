var intervalRef;
var originalTimer;
var timer;
var pause = false;

onmessage = event => {
  switch (event.data.type) {
    case "start":
      timer = Number(event.data.timer);
      originalTimer = timer;
      startTimer();
      break;
    case "stop":
      pause = false;
      clearInterval(intervalRef);
      break;
    case "pause":
      pause = true;
      break;
    case "resume":
      pause = false;
      break;
  }
};

startTimer = () => {
  intervalRef = setInterval(_ => {
    if (!pause) {
      let hours = Math.floor(timer / 3600);
      let minutes = Math.floor((timer % 3600) / 60);
      let seconds = Math.floor((timer % 3600) % 60);

      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      const countdown = hours + ":" + minutes + ":" + seconds;
      const progress = 100 - (timer / originalTimer) * 100;
      let data = { countdown, progress };

      postMessage(data);

      timer -= 0.05;

      if (timer < 0) {
        clearInterval(intervalRef);
        data.finished = true;
        postMessage(data);
      }
    }
  }, 50);
};
