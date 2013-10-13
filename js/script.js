// Used to determine which audio file to load for each tone.
var toneMap = {
  "do" : "c4.ogg",
  "re" : "d4.ogg",
  "mi" : "e4.ogg",
  "fa" : "f4.ogg",
  "so" : "g4.ogg",
  "la" : "a4.ogg",
  "ti" : "b4.ogg",
};

var finishedEvent = new Event("finished");

function init() {
  // Initialize audio controls.
  var audio = document.getElementById("voice");

  $("#menu-button").click(function() {
      audio.play();
  });

  $("#menu-button").blur(function() {
      audio.pause();
      audio.currentTime = 0;
  });

  // Define menu handle behaviors.
  $("#about-menu-handle").on("click", function() {
    $("#about-menu-container").toggleClass("open");
    $("#about-menu-handle").toggleClass("push-right");
  });

  $("#configuration-menu-handle").on("click", function() {
    $("#configuration-menu-container").toggleClass("open");
    $("#configuration-menu-handle").toggleClass("push-left");
  });

  // Generate a new scenario if current one is indicated as finished.
  document.addEventListener("finished", function(e) {
    clear();
    generateScenario();
  }, false);

  // Initialize first scenario.
  generateScenario();
}

// Generates the tone.
function getTone() {
  // Select a tone from the map at random.
  var tones = Object.keys(toneMap);
  var numberOfTones = tones.length;
  var tone = tones[Math.floor(Math.random() * numberOfTones)];
  
  return tone;
}

// Takes a tone, finds its file via the tone map, and sets the file to play.
function setTone(tone) {
  // Determine audio file to load.
  var toneFile = toneMap[tone];

  // Set the proper file as the audio source.
  $("#voice").attr("src", "audio/" + toneFile);
}

// Remove answer feedback.
function clear() {
  $("#ring").removeClass("success failure");
  $("#menu-button").removeClass("success failure");
}

// Generate answer feedback for correct guesses.
function success(e) {
  e.preventDefault;
  clear();
  $("#ring").addClass("success");
  $("#menu-button").addClass("success");
}

// Generate answer feedback for incorrect guesses.
function failure(e) {
  e.preventDefault;
  clear();
  $("#ring").addClass("failure");
  $("#menu-button").addClass("failure");
}

// Generates a new scenario.
function generateScenario() {
  var tone = getTone();
  setTone(tone);

  $("#menu-button").on("click", function() {
    $(".item")
      .on("click", "a#" + tone, success)
      .on("focusout", clear);
    $(".item")
      .on("click", "a:not(#" + tone + ")", failure)
      .on("focusout", clear);
  });

  $("#menu-button").blur(function() {
    $(".item a").off("click");
  });
}

$(document).ready(function() {
  init();
});
