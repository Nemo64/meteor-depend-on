meteor depend-on package
========================
This tiny package contains some utility functions that will help you create reactive
dependencies on things that natively do not support it, like dom/jquery events.

Installation
------------
With meteor >= 0.9
```
meteor add nemo64:depend-on
```
With meteor < 0.9 and meteorite
```
mrt add depend-on
```

DependOn.event(eventType, elements)
-----------------------------------
This method allows to easily create a dependency on a dom event.

A perfect example is the resize event of the browser:

```JavaScript
Template.myTemplate.helpers({

  windowHeight: function () {
    DependOn.event('resize', window);
    return $(window).height();
    // this helper now reactively returns the window height
  },
  
  scrollTop: function () {
    DependOn.event('scroll', document);
    return $(document).scrollTop();
    // this helper reactively returns the scrollTop of the document
  },
  
  windowHasFocus: function () {
    DependOn.event('focus blur', window);
    return document.hasFocus();
    // tells if the window is currently active
  },
  
  // there are a ton of more usefull examples, feel free to add some ;)
});
```

DependOn.animationFrame()
-------------------------
This method is usefull to update information depending with the refresh rate
of the screen. This is most usefull for animations which depend on time.

```JavaScript
Template.myTemplate.helpers({

  // here an example on how to implement a clock without ticks
  // these helpers all return the rotation in degrees and are reactive.

  secondHand: function () {
    DependOn.animationFrame();
    return $.now() / 1000 / 60 % 1 * 360;
  },
  
  minuteHand: function () {
    DependOn.animationFrame();
    return $.now() / 1000 / 60 / 60 % 1 * 360;
  },
  
  hourHand: function () {
    DependOn.animationFrame();
    return $.now() / 1000 / 60 / 60 / 24 % 1 * 360;
  },
});
```

The implementation uses jQuerys heavily production tested
[timer implementation](https://github.com/jquery/jquery/blob/2.1.1/src/effects.js#L597).
This also means that [jQuery.fx.off](http://api.jquery.com/jQuery.fx.off/) and
[jQuery.fx.interval](http://api.jquery.com/jQuery.fx.interval/) have an effect.
