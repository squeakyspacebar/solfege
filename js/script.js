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

function init() {
  // Initialize audio controls.
  enableAudio();

  // Stops audio if the answer wheel is closed.
  $("#menu-button").on("focusout.stopaudio", function() {
    stopAudio();
    enableAudio();
  });

  // Define menu handle behaviors.
  $("#about-menu-handle").on("click", function(e) {
    e.preventDefault();
    $("#about-menu-container").toggleClass("open");
    $("#about-menu-handle").toggleClass("slide-right");
  });

  $("#configuration-menu-handle").on("click", function(e) {
    e.preventDefault();
    $("#configuration-menu-container").toggleClass("open");
    $("#configuration-menu-handle").toggleClass("slide-left");
  });

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
  var deferredChain = $.Deferred(),
    off = deferredChain.done(function() {
      $("#menu-button").off("click.audio");
    }),
    on = off.done(function() {
      $("#menu-button").on("click.audio", function() {
        stopAudio();
        audio.play();
      });
    });
  deferredChain.resolve();
}

function stopAudio() {
  var deferredChain = $.Deferred(),
    pause = deferredChain.done(function() {
      audio.pause();
    }),
    reset = pause.done(function() {
      // For Chrome compatibility.
      // Setting the currentTime property doesn't work.
      audio.src = audio.src;
    });
  deferredChain.resolve();
}

// Remove answer feedback.
function clear() {
  $("#ring").removeClass("success failure");
  $("#menu-button").removeClass("success failure");
}

// Generate answer feedback for correct guesses.
function success() {
  $("#menu-button").html("&#10003;");
  $("#ring").addClass("success");
  $("#menu-button").addClass("success");
  deactivateMenu();
  generateScenario();
}

// Generate answer feedback for incorrect guesses.
function failure() {
  $("#menu-button").html("&#10060;");
  $("#ring").addClass("failure");
  $("#menu-button").addClass("failure");
}

function activateMenu(tone) {
  enableAudio();
  $("#menu-button").on("click", function(e) {
    e.preventDefault();
    var deferredChain = $.Deferred(),
      reset = deferredChain.done(function() {
        console.log("RESET MENU!");
        clear();
        $("#menu-button").html("&#9834;");
      }),
      activate = reset.done(function() {
        console.log("OPEN MENU!");
        $("#menu-button").focus();
        $("#menu-button").trigger("activate");
      });
    deferredChain.resolve();
  });
  $("#menu-button").on("activate", function() {
    $(".item").off();
    $(".item")
      .one("click", "a", function(e) {
        e.preventDefault();
        console.log("ANSWER!");
      })
      .one("click.answer.right", "a#" + tone, success)
      .one("click.answer.wrong", "a:not(#" + tone + ")", failure);
  });
}

function deactivateMenu() {
  $("#menu-button").off();
}

// Generates a new scenario.
function generateScenario() {
  var deferredChain = $.Deferred(),
    get = deferredChain.then(function() {
      return getTone();
    }),
    set = get.done(function(tone) {
      setTone(tone);
    }),
    finished = set.done(function(tone) {
      activateMenu(tone);
    });
  deferredChain.resolve();
}

$(document).ready(function() {
  init();
});
