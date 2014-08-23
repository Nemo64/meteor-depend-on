Tinytest.add("utx - dependOn - single element and event", function (test) {
  var element = document.createElement('div');
  
  var autorunCalls = 0;
  Deps.autorun(function () {
    autorunCalls++;
    
    if (autorunCalls < 3) {
      utx.dependOn(element, 'click');
    }
  });
  
  $(element).trigger('click');
  test.equal(autorunCalls, 2, 'expect a recompute after event');
  
  $(element).trigger('click');
  test.equal(autorunCalls, 3, 'event should still be chance dependency');
  
  $(element).trigger('click');
  test.equal(autorunCalls, 3, 'event is now inactive');
});


Tinytest.add("utx - dependOn - multiple elements and events", function (test) {
  var element1 = document.createElement('div');
  var element2 = document.createElement('div');
  var elements = [element1, element2];
  
  var autorunCalls = 0;
  Deps.autorun(function () {
    autorunCalls++;
    
    if (autorunCalls < 5) {
      utx.dependOn(elements, 'click keydown');
    } else if (autorunCalls < 7) {
      utx.dependOn(element2, 'click');
    }
  });
  
  $(element1).trigger('click');
  test.equal(autorunCalls, 2, 'element1 click triggers dependency');
  
  $(element2).trigger('click');
  test.equal(autorunCalls, 3, 'element2 click triggers dependency');
  
  $(element1).trigger('keydown');
  test.equal(autorunCalls, 4, 'element1 keydown triggers dependency');
  
  $(element2).trigger('keydown');
  test.equal(autorunCalls, 5, 'element2 keydown triggers dependency');
  
  $(element1).trigger('click');
  test.equal(autorunCalls, 5, 'event on element 1 is now inactive');
  
  $(element2).trigger('click');
  test.equal(autorunCalls, 6, 'event is still active on element2');
  
  $(element2).trigger('keydown');
  test.equal(autorunCalls, 6, 'element2 only lisstens for click right now');
  
  $(element2).trigger('click');
  test.equal(autorunCalls, 7, 'trigger a last click for autorun');
  
  $(element2).trigger('click');
  test.equal(autorunCalls, 7, 'now it shouldn\' trigger anymore on element2');
});
