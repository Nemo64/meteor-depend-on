meteor depend-on package
========================
This tiny package contains some functione that will help you create reactive
dependencies on things that natively do not support that.

dependOn.event(eventType, elements)
-----------------------------------
This method allows to easily create a dependency on a dom event.

A perfect example is the resize event of the browser:

```JavaScript
Template.myTemplate.helpers({

  windowHeight: function () {
    dependOn.event('resize', window);
    return $(window).height();
    // this helper now reactively returns the window height
  },
  
  scrollTop: function () {
    dependOn.event('scroll', document);
    return $(document).scrollTop();
    // this helper reactively returns the scrollTop of the document
  }
});
```

dependOn.animationFrame()
-------------------------
This method is usefull to update information depending with the refresh rate
of the screen. This is most usefull for animations which depend on time.

```JavaScript
Template.myTemplate.helpers({

  // here an example on how to implement a clock without ticks
  // these helpers all return the rotation in degrees and are reactive.

  secondHand: function () {
    dependOn.animationFrame();
    return $.now() / 1000 * 360;
  },
  
  minuteHand: function () {
    dependOn.animationFrame();
    return $.now() / 1000 / 60 * 360;
  },
  
  hourHand: function () {
    dependOn.animationFrame();
    return $.now() / 1000 / 60 / 60 * 360;
  },
});
```

The implementation uses jQuerys heavily production tested
[timer implementation](https://github.com/jquery/jquery/blob/2.1.1/src/effects.js#L597).
This also means that [jQuery.fx.off](http://api.jquery.com/jQuery.fx.off/) and
[jQuery.fx.interval](http://api.jquery.com/jQuery.fx.interval/) have an effect.
