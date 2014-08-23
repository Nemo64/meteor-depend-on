/**
 * This variable stores all existing dependencies.
 * The key is the event it listenes to.
 * The value contains the element the event listenes to and the dependency
 *
 * @var Object.<string, Array.<{
 *   eventType: string
 *   element: DOMElement,
 *   dep: Deps.Dependency,
 *   callback: Function
 * }>>
 */
var dependencies = {};

/**
 * Depends on a single event on a single element.
 * The element can be everything that jQuery eats for dinner (like a div).
 * The type is a string to identify the event (like "click").
 * It may also contain jQuery namespaces if required (like "click.foobar").
 *
 * @param {Element} element
 * @param {string}  eventType
 */
var dependOnEvent = function (eventType, element) {
  var eventDependencies = dependencies[eventType];
  if (eventDependencies == null) {
    eventDependencies = dependencies[eventType] = [];
  }
  
  var dependency = _.findWhere(eventDependencies, { element: element });
  if (dependency == null) {
    
    dependency = {
      eventType: eventType,
      element: element,
      depObj: new Deps.Dependency(),
      callback: function (e) {
        // Don't use the context here, as this function
        // will be passed as event listener. Therefor
        // the context is the element, not this object.
        dependency.depObj.changed();
        Deps.flush();
        
        if (! dependency.depObj.hasDependents()) {
          removeDependency(dependency);
        }
      }
    };
    
    // register event and dependency
    eventDependencies.push(dependency);
    $(element).on(eventType, dependency.callback);
  }
  
  // now cast the magic spell...
  dependency.depObj.depend();
}

/**
 * Removes the dependency and the event that belongs to it.
 *
 * @param {Object} dependency
 */
var removeDependency = function (dependency) {
  var eventDependencies = dependencies[dependency.eventType];
  var index = _.indexOf(eventDependencies, dependency);
  
  $(dependency.element).off(dependency.eventType, dependency.callback);
  
  if (index >= 0) {
    eventDependencies.splice(index, 1);
    
  } else if (window.console) {
    // This should never happen as it's only called if the event still exists.
    console.error("failed to remove event dependency, not found", dependency);
  }
}

// Expression from jquery to make sure it works exactly the same.
// see: https://github.com/jquery/jquery/blob/2.1.1/src/var/rnotwhite.js#L2
// and: https://github.com/jquery/jquery/blob/2.1.1/src/event.js#L81
var rnotwhite = /\S+/g;

dependOn.event = function (eventTypes, elements) {
  eventTypes = (eventTypes || '').match(rnotwhite) || [];
  _.each($(elements), function (element) {
    _.each(eventTypes, function (eventType) {
      dependOnEvent(eventType, element);
    });
  });
};
