Package.describe({
  summary: "meteor utility belt",
  version: "0.0.0",
  githubUrl: "https://github.com/Nemo64/meteor-utx.git"
});

Package.on_use(function(api) {
  api.use([
    'underscore',
    'deps',
    'jquery'
  ]);

  api.add_files([
    'src/utx.js',
  ]);
  api.add_files([
    'src/deps/dependOn.js'
  ], 'client');
  
  api.export(['utx']);
});

Package.on_test(function (api) {
  api.use(['utx', 'tinytest', 'test-helpers', 'jquery']);
  api.add_files([]);
  api.add_files([
    'src/deps/dependOn-test.js'
  ], 'client');
});
