# Solfège Ear Trainer

## Introduction

The title pretty much strikes at the heart of the project's practical purpose.  It is an ear training tool, particularly for piano students.  If I obtain solid sets of sound samples in the future, I may expand the tool to be configurable with multiple types of voices.  The project was conceived primarily to help me catch up with "state of the art" (bleeding edge in some cases, because I was definitely cut a few times) standards, techniques, and libraries, as well as improve my front-end design and development experience.  Also, since my significant other is a piano instructor, I wanted to try a project we could both discuss.

The principles driving the design of the tool are a minimalist visual aesthetic as well as a minimal JavaScript requirement which was admittedly quite artificial - I wanted to try to push the envelope in terms of implementing behavioral aspects with CSS.  Although I would argue largely in favor of the increasingly creaky standard model for the separation of concerns between HTML, CSS, and JavaScript, this was an experimental project.

## Implementation

Links to the following sources can also be found in the site page itself under the *Credit* section.

### Techniques

The CSS radial menu technique at the heart of the interface was taken from [Ana Tudor through a StackOverflow answer](http://dabblet.com/gist/3979221/cb69c5e8ccf0745fff2c94b47b27b108931f1a15).  The sliding menus are taken from [Blueprints on Codrops](http://tympanus.net/Blueprints/SlidePushMenus/), and the accordion menus are taken from [Valeriu Timbuc at Designmodo](http://designmodo.com/css3-accordion-menu/).

### Libraries

The [jQuery](http://jquery.com/) is primarily limited to managing the tone generation and unfortunately, the profile view behavior.  I used [Modernizr](http://modernizr.com/) to detect the orientation media query for profile views.  To reduce the amount of static image content that I would have to serve, manage, and design around, I used [Font Awesome](http://fontawesome.io) for my icons.

### Audio

The audio was obtained via [the University of Iowa Electronic Music Studios website](http://theremin.music.uiowa.edu/index.html).
