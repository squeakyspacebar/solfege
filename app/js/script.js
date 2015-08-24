'use strict';

// All the notes with accents must be given as flats.  This is because they are
// used to find the associated audio filenames where all accents are flat.
var keys = {
  'major' : {
    'c' : {
      'do' : 'c',
      're' : 'd',
      'mi' : 'e',
      'fa' : 'f',
      'so' : 'g',
      'la' : 'a',
      'ti' : 'b',
    },
    'g' : {
      'do' : 'g',
      're' : 'a',
      'mi' : 'b',
      'fa' : 'c',
      'so' : 'd',
      'la' : 'e',
      'ti' : 'gb',
    },
    'd' : {
      'do' : 'd',
      're' : 'e',
      'mi' : 'gb',
      'fa' : 'g',
      'so' : 'a',
      'la' : 'b',
      'ti' : 'db',
    },
    'a' : {
      'do' : 'a',
      're' : 'b',
      'mi' : 'db',
      'fa' : 'd',
      'so' : 'e',
      'la' : 'gb',
      'ti' : 'ab',
    },
    'e' : {
      'do' : 'e',
      're' : 'gb',
      'mi' : 'ab',
      'fa' : 'a',
      'so' : 'b',
      'la' : 'db',
      'ti' : 'eb',
    },
    'b' : {
      'do' : 'b',
      're' : 'db',
      'mi' : 'eb',
      'fa' : 'e',
      'so' : 'gb',
      'la' : 'ab',
      'ti' : 'bb',
    },
    'gb' : {
      'do' : 'gb',
      're' : 'ab',
      'mi' : 'bb',
      'fa' : 'b',
      'so' : 'db',
      'la' : 'eb',
      'ti' : 'f',
    },
    'db' : {
      'do' : 'db',
      're' : 'eb',
      'mi' : 'f',
      'fa' : 'gb',
      'so' : 'ab',
      'la' : 'bb',
      'ti' : 'c',
    },
    'ab' : {
      'do' : 'ab',
      're' : 'bb',
      'mi' : 'c',
      'fa' : 'db',
      'so' : 'eb',
      'la' : 'f',
      'ti' : 'g',
    },
    'eb' : {
      'do' : 'eb',
      're' : 'f',
      'mi' : 'g',
      'fa' : 'ab',
      'so' : 'bb',
      'la' : 'c',
      'ti' : 'g',
    },
    'bb' : {
      'do' : 'bb',
      're' : 'c',
      'mi' : 'd',
      'fa' : 'eb',
      'so' : 'f',
      'la' : 'g',
      'ti' : 'a',
    },
    'f' : {
      'do' : 'f',
      're' : 'g',
      'mi' : 'a',
      'fa' : 'bb',
      'so' : 'c',
      'la' : 'd',
      'ti' : 'e',
    },
  },
  'minor' : {
    'a' : {
      'do' : 'a',
      're' : 'b',
      'mi' : 'c',
      'fa' : 'd',
      'so' : 'e',
      'la' : 'f',
      'ti' : 'g'
    },
    'e' : {
      'do' : 'e',
      're' : 'gb',
      'mi' : 'g',
      'fa' : 'a',
      'so' : 'b',
      'la' : 'c',
      'ti' : 'd',
    },
    'b' : {
      'do' : 'b',
      're' : 'db',
      'mi' : 'd',
      'fa' : 'e',
      'so' : 'gb',
      'la' : 'g',
      'ti' : 'a',
    },
    'f#' : {
      'do' : 'gb',
      're' : 'ab',
      'mi' : 'a',
      'fa' : 'b',
      'so' : 'db',
      'la' : 'd',
      'ti' : 'e',
    },
    'c#' : {
      'do' : 'db',
      're' : 'eb',
      'mi' : 'e',
      'fa' : 'gb',
      'so' : 'ab',
      'la' : 'a',
      'ti' : 'b',
    },
    'g#' : {
      'do' : 'ab',
      're' : 'bb',
      'mi' : 'b',
      'fa' : 'db',
      'so' : 'eb',
      'la' : 'e',
      'ti' : 'gb',
    },
    'eb' : {
      'do' : 'eb',
      're' : 'f',
      'mi' : 'gb',
      'fa' : 'ab',
      'so' : 'bb',
      'la' : 'b',
      'ti' : 'db',
    },
    'bb' : {
      'do' : 'bb',
      're' : 'c',
      'mi' : 'db',
      'fa' : 'eb',
      'so' : 'f',
      'la' : 'g',
      'ti' : 'ab',
    },
    'f' : {
      'do' : 'f',
      're' : 'g',
      'mi' : 'ab',
      'fa' : 'bb',
      'so' : 'c',
      'la' : 'db',
      'ti' : 'eb',
    },
    'c' : {
      'do' : 'c',
      're' : 'd',
      'mi' : 'eb',
      'fa' : 'f',
      'so' : 'g',
      'la' : 'ab',
      'ti' : 'bb',
    },
    'g' : {
      'do' : 'g',
      're' : 'a',
      'mi' : 'bb',
      'fa' : 'c',
      'so' : 'd',
      'la' : 'eb',
      'ti' : 'f',
    },
    'd' : {
      'do' : 'd',
      're' : 'e',
      'mi' : 'f',
      'fa' : 'g',
      'so' : 'a',
      'la' : 'bb',
      'ti' : 'c',
    },
  },
};

// Configuration for enabling/disabling which notes are allowed.
var configuration = {
  'audioDirectory': '@@audioDirectory',
  'activeKey' : keys.major.c,
  'activeSyllables' : {
    'do' : true,
    're' : true,
    'mi' : false,
    'fa' : true,
    'so' : false,
    'la' : true,
    'ti' : true,
  },
  'activeOctaves' : {
    1 : true,
    2 : true,
    3 : true,
    4 : true,
    5 : true,
    6 : true,
    7 : true,
  },
};

// Retrieves a reference to *the* audio source of the application.
var audio = document.getElementById('voice');

/**
 * Represents a generated note.
 *
 * @class
 */
function Note (syllable, octave) {
  this.name = configuration.activeKey[syllable];
  this.syllable = syllable;
  this.octave = octave;
  this.filename = configuration.audioDirectory + this.name + this.octave + '.ogg';
}

/**
 * Determines/selects the octave.
 *
 * @param {Object[]} octaves - An array of available octaves to select from.
 */
function getOctave (octaves) {
  return octaves[Math.floor(Math.random() * octaves.length)];
}

/**
 * Determines/selects the syllable.
 *
 * @param {Object[]} syllables - An array of the available syllables to select from.
 */
function getSyllable (syllables) {
  return syllables[Math.floor(Math.random() * syllables.length)];
}

/**
 * Finds the proper audio file for the given note and sets it as a source.
 *
 * @param {Object} - The Note object to find the corresponding audio source for.
 */
function setNote (note) {
  // Set the proper file as the audio source.
  $('#voice').attr('src', note.filename);
}

/**
 * Stops the currently playing tone.
 */
function stopAudio () {
  var deferredChain = $.Deferred();
  deferredChain
    .done(function () {
      audio.pause();
    })
    .done(function () {
      // For Chrome compatibility.
      // Setting the currentTime property doesn't work.
      audio.src = audio.src;
    });
  deferredChain.resolve();
}

/**
 * Plays the current tone.
 */
function enableAudio () {
  var deferredChain = $.Deferred();
  deferredChain
    .done(function () {
      $('#menu-button').off('click.audio');
    })
    .done(function () {
      $('#menu-button').on('click.audio', function () {
        stopAudio();
        audio.play();
      });
    });
  deferredChain.resolve();
}

/**
 * Configures display of the information menu handle based on orientation.
 */
function aboutHandleToggle () {
  if(Modernizr.mq('only screen and (orientation: landscape)')) {
     if($('#about-menu-toggle').prop('checked')) {
      $('#about-menu-handle i')
        .removeClass('fa-angle-double-right')
        .addClass('fa-angle-double-left');
    } else {
      $('#about-menu-handle i')
        .removeClass('fa-angle-double-left')
        .addClass('fa-angle-double-right');
    }
  } else if(Modernizr.mq('only screen and (orientation: portrait)')) {
    if($('#about-menu-toggle').prop('checked')) {
      $('#about-menu-handle i')
        .removeClass('fa-angle-double-down')
        .addClass('fa-angle-double-up');
    } else {
      $('#about-menu-handle i')
        .removeClass('fa-angle-double-up')
        .addClass('fa-angle-double-down');
    }
  }
}

/**
 * Configures display of the configuration menu handle based on orientation.
 */
function configurationHandleToggle () {
  if(Modernizr.mq('only screen and (orientation: landscape)')) {
    if($('#configuration-menu-toggle').prop('checked')) {
      $('#configuration-menu-handle i')
        .removeClass('fa-angle-double-left')
        .addClass('fa-angle-double-right');
    } else {
      $('#configuration-menu-handle i')
        .removeClass('fa-angle-double-right')
        .addClass('fa-angle-double-left');
    }
  } else if(Modernizr.mq('only screen and (orientation: portrait)')) {
    if($('#configuration-menu-toggle').prop('checked')) {
      $('#configuration-menu-handle i')
        .removeClass('fa-angle-double-up')
        .addClass('fa-angle-double-down');
    } else {
      $('#configuration-menu-handle i')
        .removeClass('fa-angle-double-down')
        .addClass('fa-angle-double-up');
    }
  }
}

/**
 * Checks whether the display of the menu handles need to be updated.
 */
function updateHandles () {
  aboutHandleToggle();
  configurationHandleToggle();
}

/**
 * Remove visual answer feedback from the screen.
 */
function clear () {
  $('#ring').removeClass('success failure');
  $('#menu-button').removeClass('success failure');
  $('#menu-button i').removeClass();
}

/**
 * Generate visual answer feedback for correct guesses.
 */
function success () {
  clear();
  $('#menu-button i').addClass('fa fa-check');
  $('#ring').addClass('success');
  $('#menu-button').addClass('success');
}

/**
 * Generate visual answer feedback for incorrect guesses.
 */
function failure () {
  clear();
  $('#menu-button i').addClass('fa fa-times');
  $('#ring').addClass('failure');
  $('#menu-button').addClass('failure');
}

/**
 * Sets the radial menu visual feedback for the scenario.
 */
function activateMenu (note) {
  enableAudio();
  $('#menu-button').on('activate', function () {
    $('.item').off();
    $('.item')
      .one('click', 'a', function (event) {
        event.preventDefault();
      })
      .one('click.answer.right', 'a#' + note.syllable, function (event) {
        $(event.delegateTarget).trigger('answer.correct');
      })
      .one('click.answer.wrong', 'a:not(#' + note.syllable + ')', function (event) {
        $(event.delegateTarget).trigger('answer.incorrect');
      });
  });
  $('#menu-button').on('click', function (event) {
    event.preventDefault();
    var deferredChain = $.Deferred();
      deferredChain.done(function () {
        clear();
        $('#menu-button i').addClass('fa fa-play-circle');
      })
      .done(function() {
        $('#menu-button').focus();
        $('#menu-button').trigger('activate');
      });
    deferredChain.resolve();
  });
}

/**
 * Disables the radial menu.
 */
function deactivateMenu() {
  $('#menu-button').off();
}

/**
 * Generates a new scenario.
 */
function generateScenario() {
  var syllables = [];
  var octaves = [];

  var deferredChain = $.Deferred();
  deferredChain
    .then(function () {
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
    }).then(function (note) {
      setNote(note);

      return note;
    }).then(function (note) {
      activateMenu(note);
    });
  deferredChain.resolve();
}

/**
 * Initializes the entire application.
 */
function init () {
  // Portrait orientation sliding menu handling.
  if(Modernizr.mq('only screen and (orientation: landscape)')) {
    $('#about-menu-toggle').on('change', function () {
      updateHandles();
    });
    $('#configuration-menu-toggle').on('change', function () {
      updateHandles();
    });
  } else if(Modernizr.mq('only screen and (orientation: portrait)')) {
    // Change the orientation of the handle arrows to vertical.
    $('#about-menu-handle i')
      .removeClass()
      .addClass('fa fa-angle-double-down');
    $('#configuration-menu-handle i')
      .removeClass()
      .addClass('fa fa-angle-double-up');

    // Since the portrait mode menus take up the entire window, it's necessary
    // to make them mutually exclusive in this case.  These handlers close the
    // other menu if it is currently open.
    $('#about-menu-toggle').on('change', function () {
      if(this.checked) {
        if($('#configuration-menu-toggle').prop('checked')) {
          $('#configuration-menu-toggle').prop('checked', false);
        }
      }
      updateHandles();
    });
    $('#configuration-menu-toggle').on('change', function () {
      if(this.checked) {
        if($('#about-menu-toggle').prop('checked')) {
          $('#about-menu-toggle').prop('checked', false);
        }
      }
      updateHandles();
    });
  }

  // Initialize audio controls.
  enableAudio();

  // Stops audio if the answer wheel is closed.
  $('#menu-button')
    .on('focusout.stopaudio', function () {
      stopAudio();
      enableAudio();
    });

  $('#menu')
    .on('answer.correct', function (event) {
      var deferredChain = $.Deferred();
      deferredChain
        .done(function () {
          success();
          // Prevent weird input scenarios.
          deactivateMenu();
        })
        .done(function () {
          generateScenario();
        });
      deferredChain.resolve();
    })
    .on('answer.incorrect', function (event) {
      failure();
    });

  // Refreshes the scenario if a configuration change has occurred.
  $('#configuration-menu').on('config-update', 'input', function () {
    generateScenario();
  });

  // Read initial configuration state when the script is run.
  var initKey = ($('input[name="key"]').attr('value')).split('-');
  configuration.activeKey = keys[initKey[1]][initKey[0]];
  var initSyllables = $('#syllables input');
  initSyllables.each(function () {
    configuration.activeSyllables[$(this).attr('value')] =
      $(this).prop('checked');
  });
  var initOctaves = $('#octaves input');
  initOctaves.each(function () {
    configuration.activeOctaves[$(this).attr('value')] =
      $(this).prop('checked');
  });

  // Updates configuration when the inputs change.
  $('input[name="key"]').on('change', function (event) {
    var key = ($(event.target).attr('value')).split('-');
    configuration.activeKey = keys[key[1]][key[0]];
    key.trigger('config-update');
  });
  $('#syllables').on('change', 'input[type="checkbox"]', function (event) {
    var checkbox = $(event.target);
    configuration.activeSyllables[checkbox.attr('value')] = checkbox.prop('checked');
    checkbox.trigger('config-update');
  });
  $('#octaves').on('change', 'input[type="checkbox"]', function (event) {
    var checkbox = $(event.target);
    configuration.activeOctaves[checkbox.attr('value')] = checkbox.prop('checked');
    checkbox.trigger('config-update');
  });

  // Initialize first scenario.
  generateScenario();
}

$(document).ready(function() {
  init();
});
