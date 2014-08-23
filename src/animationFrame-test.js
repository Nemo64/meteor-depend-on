Tinytest.add("DependOn - animationFrame - basic", function (test) {
  
  var autorunCalls = 0;
  Deps.autorun(function () {
    autorunCalls++;
    
    if (autorunCalls < 3) {
      DependOn.animationFrame();
    }
  });
  
  // Because the javascript interpreter is busy, we don't have to worry
  // about the normal animation function beeing called.
  // Also because this implementation debends on jQuery, i expect it
  // to work when the code of this library works.
  
  // 1 initial call because autorun runs immediately
  test.equal(autorunCalls, 1, "should not be called yet");
  
  jQuery.fx.tick(); // it's your turn jQuery...
  test.equal(autorunCalls, 2, "expect animation to be called");
  
  jQuery.fx.tick();
  test.equal(autorunCalls, 3, "the animation still runs");
  
  jQuery.fx.tick();
  test.equal(autorunCalls, 3, "removed dependency");
  
  // the animation should now be gone!
});

Tinytest.add("DependOn - animationFrame - multiple", function (test) {
  
  var autorunCalls = 0;
  Deps.autorun(function () {
    autorunCalls++;
    
    if (autorunCalls < 4) {
      DependOn.animationFrame();
    }
  });
  
  Deps.autorun(function () {
    autorunCalls++;
    
    if (autorunCalls < 3) {
      DependOn.animationFrame();
    }
  });
  
  // 2 initial calls because autorun runs immediately
  test.equal(autorunCalls, 2, "should not be called yet");
  
  jQuery.fx.tick();
  test.equal(autorunCalls, 4, "both dependencies should be called");
  
  jQuery.fx.tick();
  test.equal(autorunCalls, 5, "only one dependency should be called");
  
  jQuery.fx.tick();
  test.equal(autorunCalls, 5, "silence");
  
  // the animation should now be gone!
});
