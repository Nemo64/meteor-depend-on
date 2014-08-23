Package.describe({
  summary: "meteor dependency utilities",
  version: "0.0.0",
  githubUrl: "https://github.com/Nemo64/meteor-depend-on.git"
});

Package.on_use(function(api) {
  api.use([
    'underscore',
    'deps',
    'jquery'
  ]);

  api.add_files([
    'src/dependOn.js',
  ]);
  api.add_files([
    'src/deps/event.js'
  ], 'client');
  
  api.export(['dependOn']);
});

Package.on_test(function (api) {
  api.use(['depend-on', 'tinytest', 'test-helpers', 'jquery']);
  api.add_files([]);
  api.add_files([
    'src/deps/event-test.js'
  ], 'client');
});
