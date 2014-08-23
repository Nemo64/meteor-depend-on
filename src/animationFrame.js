var dependency = new Deps.Dependency();
var timerAttached = false;

/**
 * The timer function which will be called for each frame.
 */
var timer = function () {
  dependency.changed();
  // flush so the dependants run immediately
  // this way hasDependents can be used to check if the timer should be removed.
  Deps.flush();
  // if a falsy value is returned jQuery removes the timer
  return timerAttached = dependency.hasDependents();
};

dependOn.animationFrame = function () {
  dependency.depend();
  
  if (! timerAttached) {
    jQuery.timers.push(timer);
    timerAttached = true;
    jQuery.fx.start();
  }
}
