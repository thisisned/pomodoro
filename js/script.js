var work_period = 25 * 60;
var break_period = 5 * 60;
var time_remaining = work_period;
var running = false;
var next_state = "Break";
var repeater;

$(document).ready(function(){

  timerDisplay(time_remaining);

  $("#start").click(countdown);
  $("#pause").click(pause);
  $("#reset").click(reset);

});

function countdown() {
  $("#paused").text("");
  if (next_state === "Break") {
    $("#status").text("Work Time");
  }
  if (running === false) {
    running = true;
    repeater = setInterval(decrease, 1000);
  }

  function decrease() {
    time_remaining--;
    timerDisplay(time_remaining);
    if (time_remaining === 0) {
      $("#status").text(next_state);
      switch (next_state) {
        case "Work Time":
        time_remaining = work_period;
        next_state = "Break";
        break;
        case "Break":
        time_remaining = break_period;
        next_state = "Work Time";
        break;
      }
    }
  }
}

function pause() {
  clearInterval(repeater);
  if (running === true) {
    $("#paused").text("PAUSED");
  }
  running = false;
}

function reset() {
  $("#paused").text("");
  clearInterval(repeater);
  running = false;
  time_remaining = work_period;
  next_state = "Break";
  timerDisplay(time_remaining);
  $("#status").text("");
}

function timerDisplay(seconds_left) {
  var minutes = Math.floor((seconds_left / 60) % 60);
  var seconds = Math.floor(seconds_left % 60);
  $("#minutes").text(("0" + minutes).slice(-2));
  $("#seconds").text(("0" + seconds).slice(-2));
  // document.title = minutes + ":" + seconds; // If you want the timer displayed in the tab title
}