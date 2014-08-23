Package.describe({
  summary: "Create dependencies on events and other things.",
  version: "1.0.1",
  git: "https://github.com/Nemo64/meteor-depend-on.git",
  githubUrl: "https://github.com/Nemo64/meteor-depend-on.git"
});

Package.on_use(function(api) {
  api.versionsFrom("METEOR-CORE@0.9.0-atm");
  api.use([
    'underscore',
    'deps',
    'jquery'
  ]);

  api.add_files([
    'src/dependOn.js'
  ]);
  api.add_files([
    'src/event.js',
    'src/animationFrame.js'
  ], 'client');
  
  api.export(['DependOn']);
});

Package.on_test(function (api) {
  api.use(["nemo64:depend-on", 'tinytest', 'test-helpers', 'jquery']);
  api.add_files([]);
  api.add_files([
    'src/event-test.js',
    'src/animationFrame-test.js'
  ], 'client');
});
