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
