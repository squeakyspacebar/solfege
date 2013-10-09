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

// Initialize audio controls.
function init() {
  var audio = document.getElementById("voice");

  $("#menu-button").click(function() {
      audio.play();
  });

  $("#menu-button").blur(function() {
      audio.pause();
      audio.currentTime = 0;
  });
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

  // Set file as audio source.
  $("#voice").attr("src", "audio/" + toneFile);
}

// Remove answer feedback.
function remove() {
  $("#ring").removeClass("success failure");
  $("#menu-button").removeClass("success failure");
}

// Generate answer feedback for correct guesses.
function success() {
  remove();
  $("#ring").addClass("success");
  $("#menu-button").addClass("success");
}

// Generate answer feedback for incorrect guesses.
function failure() {
  remove();
  $("#ring").addClass("failure");
  $("#menu-button").addClass("failure");
}

// Generates a new scenario.
function guess() {
  var tone = getTone();
  setTone(tone);

  $("#menu-button").click(function() {
    $(".item a#" + tone).hover(success, remove);  
    $(".item a:not(#" + tone + ")").hover(failure, remove);
  });

  $("#menu-button").blur(function() {
    $(".item a").unbind("click");
  });
}

$(document).ready(function() {
  init();
  guess();
  $("#about-menu-handle").click(function() {
    $("#about-menu").toggleClass("open");
    $("#about-menu-handle").toggleClass("push-right");
  });
  $("#configuration-menu-handle").click(function() {
    $("#configuration-menu").toggleClass("open");
    $("#configuration-menu-handle").toggleClass("push-left");
  });
});
