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
    "gb" : {
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
    "a" : {
      "do" : "a",
      "re" : "b",
      "mi" : "c",
      "fa" : "d",
      "so" : "e",
      "la" : "f",
      "ti" : "g"
    },
    "e" : {
      "do" : "e",
      "re" : "gb",
      "mi" : "g",
      "fa" : "a",
      "so" : "b",
      "la" : "c",
      "ti" : "d",
    },
    "b" : {
      "do" : "b",
      "re" : "db",
      "mi" : "d",
      "fa" : "e",
      "so" : "gb",
      "la" : "g",
      "ti" : "a",
    },
    "f#" : {
      "do" : "gb",
      "re" : "ab",
      "mi" : "a",
      "fa" : "b",
      "so" : "db",
      "la" : "d",
      "ti" : "e",
    },
    "c#" : {
      "do" : "db",
      "re" : "eb",
      "mi" : "e",
      "fa" : "gb",
      "so" : "ab",
      "la" : "a",
      "ti" : "b",
    },
    "g#" : {
      "do" : "ab",
      "re" : "bb",
      "mi" : "b",
      "fa" : "db",
      "so" : "eb",
      "la" : "e",
      "ti" : "gb",
    },
    "eb" : {
      "do" : "eb",
      "re" : "f",
      "mi" : "gb",
      "fa" : "ab",
      "so" : "bb",
      "la" : "b",
      "ti" : "db",
    },
    "bb" : {
      "do" : "bb",
      "re" : "c",
      "mi" : "db",
      "fa" : "eb",
      "so" : "f",
      "la" : "g",
      "ti" : "ab",
    },
    "f" : {
      "do" : "f",
      "re" : "g",
      "mi" : "ab",
      "fa" : "bb",
      "so" : "c",
      "la" : "db",
      "ti" : "eb",
    },
    "c" : {
      "do" : "c",
      "re" : "d",
      "mi" : "eb",
      "fa" : "f",
      "so" : "g",
      "la" : "ab",
      "ti" : "bb",
    },
    "g" : {
      "do" : "g",
      "re" : "a",
      "mi" : "bb",
      "fa" : "c",
      "so" : "d",
      "la" : "eb",
      "ti" : "f",
    },
    "d" : {
      "do" : "d",
      "re" : "e",
      "mi" : "f",
      "fa" : "g",
      "so" : "a",
      "la" : "bb",
      "ti" : "c",
    },
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

function Note(syllable, octave) {
  this.name = configuration.activeKey[syllable];
  this.syllable = syllable;
  this.octave = octave;
  this.filename = this.name + this.octave + ".ogg";
}

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

  // Refreshes the scenario if a configuration change has occurred.
  $("#configuration-menu").on("config-update", "input", function() {
    generateScenario();
  });

  // Read initial configuration state when the script is run.
  var initKey = ($("input[name='key']").attr("value")).split("-");
  configuration.activeKey = keys[initKey[1]][initKey[0]];
  var initSyllables = $("#syllables input");
  initSyllables.each(function() {
    configuration.activeSyllables[$(this).attr("value")] =
      $(this).prop("checked");
  });
  var initOctaves = $("#octaves input");
  initOctaves.each(function() {
    configuration.activeOctaves[$(this).attr("value")] =
      $(this).prop("checked");
  });

  // Updates configuration when the inputs change.
  $("input[name='key']").on("change", function(e) {
    var key = ($(e.target).attr("value")).split("-");
    configuration.activeKey = keys[key[1]][key[0]];
    console.log(key[0] + " " + key[1]);
    key.trigger("config-update");
  });
  $("#syllables").on("change", "input[type='checkbox']", function(e) {
    var checkbox = $(e.target);
    configuration.activeSyllables[checkbox.attr("value")] = 
      checkbox.prop("checked");
    checkbox.trigger("config-update");
  });
  $("#octaves").on("change", "input[type='checkbox']", function(e) {
    var checkbox = $(e.target);
    configuration.activeOctaves[checkbox.attr("value")] = 
      checkbox.prop("checked");
    checkbox.trigger("config-update");
  });

  console.log(initKey[0] + " " + initKey[1]);

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

// Finds the proper audio file for the given note and sets it as a source.
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

// Sets the radial menu feedback for the scenario.
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

  var deferredChain = $.Deferred(),
    get = deferredChain.then(function() {
      // Gets an array of the active syllables.
      for(var syllable in configuration.activeSyllables) {
        if(configuration.activeSyllables[syllable]) {
          syllables.push(syllable);
        }
      }

      // Gets an array of active octaves.
      for(var octave in configuration.activeOctaves) {
        if(configuration.activeOctaves[octave]) {
          octaves.push(octave);
        }
      }

      // Selects a syllable and octave from the previously generated arrays.
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
