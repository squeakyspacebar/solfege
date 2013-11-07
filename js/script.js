function Note(syllable, octave) {
  this.name = configuration.activeKey[syllable];
  this.syllable = syllable;
  this.octave = octave;
}

// All the notes with accents must be given as flats.  This is because they are
// used to find the associated audio filenames where all accents are flat.
var keys = {
  "major" : {
    "c" : {
      "do" : "c",
      "re" : "d",
      "mi" : "e",
      "fa" : "f",
      "so" : "g",
      "la" : "a",
      "ti" : "b",
    },
    "g" : {
      "do" : "g",
      "re" : "a",
      "mi" : "b",
      "fa" : "c",
      "so" : "d",
      "la" : "e",
      "ti" : "gb",
    },
    "d" : {
      "do" : "d",
      "re" : "e",
      "mi" : "gb",
      "fa" : "g",
      "so" : "a",
      "la" : "b",
      "ti" : "db",
    },
    "a" : {
      "do" : "a",
      "re" : "b",
      "mi" : "db",
      "fa" : "d",
      "so" : "e",
      "la" : "gb",
      "ti" : "ab",
    },
    "e" : {
      "do" : "e",
      "re" : "gb",
      "mi" : "ab",
      "fa" : "a",
      "so" : "b",
      "la" : "db",
      "ti" : "eb",
    },
    "b" : {
      "do" : "b",
      "re" : "db",
      "mi" : "eb",
      "fa" : "e",
      "so" : "gb",
      "la" : "ab",
      "ti" : "bb",
    },
    "f#" : {
      "do" : "gb",
      "re" : "ab",
      "mi" : "bb",
      "fa" : "b",
      "so" : "db",
      "la" : "eb",
      "ti" : "f",
    },
    "db" : {
      "do" : "db",
      "re" : "eb",
      "mi" : "f",
      "fa" : "gb",
      "so" : "ab",
      "la" : "bb",
      "ti" : "c",
    },
    "ab" : {
      "do" : "ab",
      "re" : "bb",
      "mi" : "c",
      "fa" : "db",
      "so" : "eb",
      "la" : "f",
      "ti" : "g",
    },
    "eb" : {
      "do" : "eb",
      "re" : "f",
      "mi" : "g",
      "fa" : "ab",
      "so" : "bb",
      "la" : "c",
      "ti" : "g",
    },
    "bb" : {
      "do" : "bb",
      "re" : "c",
      "mi" : "d",
      "fa" : "eb",
      "so" : "f",
      "la" : "g",
      "ti" : "a",
    },
    "f" : {
      "do" : "f",
      "re" : "g",
      "mi" : "a",
      "fa" : "bb",
      "so" : "c",
      "la" : "d",
      "ti" : "e",
    },
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
  "activeSyllables" : {
    "do" : true,
    "re" : true,
    "mi" : false,
    "fa" : true,
    "so" : false,
    "la" : true,
    "ti" : true,
  },
  "activeOctaves" : {
    1 : true,
    2 : true,
    3 : true,
    4 : true,
    5 : true,
    6 : true,
    7 : true,
  },
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

// Determines the octave.
function getOctave(octaves) {
  return octaves[Math.floor(Math.random() * octaves.length)];
}

// Determines the syllable.
function getSyllable(syllables) {
  return syllables[Math.floor(Math.random() * syllables.length)];
}

// Finds the proper audio file and sets it to play.
function setNote(note) {
  var filename = note.name + note.octave + ".ogg";
  // Set the proper file as the audio source.
  $("#voice").attr("src", "audio/" + filename);
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

function activateMenu(note) {
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
      .one("click.answer.right", "a#" + note.syllable, success)
      .one("click.answer.wrong", "a:not(#" + note.syllable + ")", failure);
  });
}

function deactivateMenu() {
  $("#menu-button").off();
}

// Generates a new scenario.
function generateScenario() {
  var syllables = new Array();
  var octaves = new Array();

  for (var octave in configuration.activeOctaves) {
    if(configuration.activeOctaves[octave]) {
      octaves.push(octave);
    }
  }

  var deferredChain = $.Deferred(),
    get = deferredChain.then(function() {
      for (var syllable in configuration.activeSyllables) {
        if(configuration.activeSyllables[syllable]) {
          syllables.push(syllable);
        }
      }

      for (var octave in configuration.activeOctaves) {
        if(configuration.activeOctaves[octave]) {
          octaves.push(octave);
        }
      }

      var selectedSyllable = getSyllable(syllables);
      var selectedOctave = getOctave(octaves);

      return new Note(selectedSyllable, selectedOctave);
    }),
    set = get.done(function(note) {
      setNote(note);
    }),
    finished = set.done(function(note) {
      console.log(note);
      activateMenu(note);
    });
  deferredChain.resolve();
}

$(document).ready(function() {
  init();
});
