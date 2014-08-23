meteor depend-on package
========================
This tiny package contains some functione that will help you create reactive
dependencies on things that natively do not support that.

dependOn.event(eventType, elements)
-----------------------------------
This method allows to easily create a dependency on a dom event.

A perfect example is the resize event of the browser:

```JavaScript
Deps.autorun(function () {
  dependOn.event('resize', window);
  var height = $(window).height();
  // do something with height
});
```

