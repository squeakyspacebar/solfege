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

var audio = document.getElementById("voice");

var finishedEvent = new Event("finished");

function init() {
  // Initialize audio controls.
  enableAudio();

  // Stops audio if the answer wheel is closed.
  $("#menu-button").on("focusout.stopaudio", function() {
    audio.pause();
    audio.currentTime = 0;
  });

  // Define menu handle behaviors.
  $("#about-menu-handle").on("click", function() {
    $("#about-menu-container").toggleClass("open");
    $("#about-menu-handle").toggleClass("slide-right");
  });

  $("#configuration-menu-handle").on("click", function() {
    $("#configuration-menu-container").toggleClass("open");
    $("#configuration-menu-handle").toggleClass("slide-left");
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

function enableAudio() {
  $("#menu-button").off("click.audio");
  $("#menu-button").on("click.audio", function() {
    audio.play();
  });
}

// Remove answer feedback.
function clear() {
  $("#menu-button").html("&#9834;");
  $("#ring").removeClass("success failure");
  $("#menu-button").removeClass("success failure");
}

// Generate answer feedback for correct guesses.
function success() {
  clear();
  $("#menu-button").html("&#x2713;");
  $("#ring").addClass("success");
  $("#menu-button").addClass("success");
  $("#menu-button").trigger("answered");
}

// Generate answer feedback for incorrect guesses.
function failure() {
  clear();
  $("#menu-button").html("&#x274c;");
  $("#ring").addClass("failure");
  $("#menu-button").addClass("failure");
  $("#menu-button").trigger("answered");
}

function focusout() {
  clear();
  $(document).one("click.audio", function() {
    enableAudio();
  });
}

// Generates a new scenario.
function generateScenario() {
  var tone = getTone();
  setTone(tone);

  $("#menu-button").on("click.answer", function() {
    $(".item")
      .on("click.answer.right", "a#" + tone, success)
      .on("click.answer.wrong", "a:not(#" + tone + ")", failure)
      .on("focusout.answer", focusout);
  });

  // Prevents audio from replaying when clicking on the answer wheel button
  // to reset the scenario.
  $("#menu-button").on("focusout.answer", function() {
    $("#menu-button").off("answered");
    $("#menu-button").on("answered", function() {
      $("#menu-button").off("click.audio");
      $("#menu-button").one("click.audio", function() {
        enableAudio();
      });
    });
  });
}

$(document).ready(function() {
  init();
});
