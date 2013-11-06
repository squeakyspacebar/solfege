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

// All the notes with accents must be given as flats.  This is because they are
// used to find the associated audio filenames where all accents are flat.
var keys = {
  "major" : {
    "c"  : ["c", "d", "e", "f", "g", "a", "b"],
    "g"  : ["g", "a", "b", "c", "d", "e", "gb"],
    "d"  : ["d", "e", "gb", "g", "a", "b", "db"],
    "a"  : ["a", "b", "db", "d", "e", "gb", "ab"],
    "e"  : ["e", "gb", "ab", "a", "b", "db", "eb"],
    "b"  : ["b", "db", "eb", "e", "gb", "ab", "bb"],
    "f#" : ["gb", "ab", "bb", "b", "db", "eb", "f"],
    "db" : ["db", "eb", "f", "gb", "ab", "bb", "c"],
    "ab" : ["ab", "bb", "c", "db", "eb", "f", "g"],
    "eb" : ["eb", "f", "g", "ab", "bb", "c", "g"],
    "bb" : ["bb", "c", "d", "eb", "f", "g", "a"],
    "f"  : ["f", "g", "a", "bb", "c", "d", "e"],
  },
  "minor" : {
    "a"  : ["a", "b", "c", "d", "e", "f", "g"],
    "e"  : ["e", "gb", "g", "a", "b", "c", "d"],
    "b"  : ["b", "db", "d", "e", "gb", "g", "a"],
    "f#" : ["gb", "ab", "a", "b", "db", "d", "e"],
    "c#" : ["db", "eb", "e", "gb", "ab", "a", "b"],
    "g#" : ["ab", "bb", "b", "db", "eb", "e", "gb"],
    "d#" : ["eb", "f", "gb", "ab", "bb", "b", "db"],
    "bb" : ["bb", "c", "db", "eb", "f", "g", "ab"],
    "f"  : ["f", "g", "ab", "bb", "c", "db", "eb"],
    "c"  : ["c", "d", "eb", "f", "g", "ab", "bb"],
    "g"  : ["g", "a", "bb", "c", "d", "eb", "f"],
    "d"  : ["d", "e", "f", "g", "a", "bb", "c"],
  },
};

var configuration = {
  "activeKey" : keys.major.c,
  "activeOctaves" : {
    1 : true,
    2 : true,
    3 : true,
    4 : true,
    5 : true,
    6 : true,
    7 : true,
    8 : true,
  }
}

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
    $("#about-menu-handle").toggleClass("open");
  });

  $("#configuration-menu-handle").on("click", function(e) {
    e.preventDefault();
    $("#configuration-menu-container").toggleClass("open");
    $("#configuration-menu-handle").toggleClass("open");
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
        clear();
        $("#menu-button").html("&#9834;");
      }),
      activate = reset.done(function() {
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
