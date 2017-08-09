var work_period = 25;
var break_period = 5;
var time_remaining = work_period * 60;
var running = false;
var resetted = true;
var next_state = "Break Time!";
var repeater;

var audio = new Audio("assets/ding.mp3");

$(document).ready(function() {
  timerDisplay(time_remaining);
  $("#start").click(countdown);
  $("#pause").click(pause);
  $("#reset").click(reset);
});

$(".work-minus").click(function(){
  if (resetted && work_period > 1) {
  work_period--;
  time_remaining = work_period * 60;
  timerDisplay(time_remaining);
  $(".work-num").html(work_period);
  }
})

$(".work-plus").click(function(){
  if (resetted && work_period < 100) {
  work_period++;
  time_remaining = work_period * 60;
  timerDisplay(time_remaining);
  $(".work-num").html(work_period);
  }
})

$(".break-minus").click(function(){
  if (resetted && break_period > 1) {
  break_period--;
  $(".break-num").html(break_period);
  }
})

$(".break-plus").click(function(){
  if (resetted && break_period < 100) {
  break_period++;
  $(".break-num").html(break_period);
  }
})

function countdown() {
  resetted = false;
  $("#settings").addClass("inactive");
  $("#paused").text("");
  if (next_state === "Break Time!") {
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
      audio.play();
      switch (next_state) {
        case "Work Time":
          time_remaining = work_period * 60;
          next_state = "Break Time!";
          break;
        case "Break Time!":
          time_remaining = break_period * 60;
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
  resetted = true;
  $("#settings").removeClass("inactive");
  time_remaining = work_period * 60;
  next_state = "Break Time!";
  timerDisplay(time_remaining);
  $("#status").text("");
}

function timerDisplay(seconds_left) {
  var minutes = Math.floor(seconds_left / 60 % 60);
  var seconds = Math.floor(seconds_left % 60);
  $("#minutes").text(("0" + minutes).slice(-2));
  $("#seconds").text(("0" + seconds).slice(-2));
  // document.title = minutes + ":" + seconds; // If you want the timer displayed in the tab title
}
