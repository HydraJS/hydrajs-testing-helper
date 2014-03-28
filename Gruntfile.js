module.exports = function (grunt) {

  var readOptionalJSON = function (filepath) {
      var data = {};
      try {
        data = grunt.file.readJSON(filepath);
      } catch (e) {}
      return data;
    },
    srcHintOptions = readOptionalJSON('.jshintrc'),
    fs = require('fs'),
    swig = require('swig');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      build: {
        src: [ "src/hydrajs-testing-helper.js" ],
        options: srcHintOptions
      }
    },
    karma: {
      unit: {
        configFile: 'config/karma.conf.js'
      },
      amd_unit: {
        configFile: 'config/amd-karma.conf.js'
      }
    },
    compress: {
      build: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'versions/',
        src: ['hydrajs-testing-helper.min.js'],
        dest: 'versions/'
      }
    },
    copy: {
      build: {
        files: [
          {expand: true, cwd: 'src/', src: ['hydrajs-testing-helper.js'], dest: 'versions/'}
        ]
      }
    },
    uglify: {
      options: {
        sourceMap: 'versions/hydrajs-testing-helper.min.map',
        sourceMappingURL: "hydrajs-testing-helper.min.map",
        banner: '/*! hydrajs-testing-helper.js v<%= pkg.version %> | Date:<%= grunt.template.today("yyyy-mm-dd") %> |' +
          ' License: https://raw.github.com/HydraJS/hydrajs-testing-helper/master/LICENSE|' +
          ' (c) 2009, 2014\n' +
          '//@ sourceMappingURL=hydrajs-testing-helper.min.map\n' +
          '*/\n',
        preserveComments: "some",
        report: "min",
        beautify: {
          ascii_only: true
        },
        compress: {
          hoist_funs: false,
          join_vars: false,
          loops: false,
          unused: false
        },
        mangle: {
          // saves some bytes when gzipped
          except: [ "undefined" ]
        }
      },
      build: {
        files: {
          'versions/hydrajs-testing-helper.min.js': ['src/hydrajs-testing-helper.js']
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('readme', 'Creates a README.md from template', function () {
    var done = this.async(),
    oREADMETemplate = swig.compileFile('templates/README.tpl');
    fs.stat('versions/hydrajs-testing-helper.min.js.gz', function (err, stats) {
      fs.writeFile('README.md', oREADMETemplate({
        version: grunt.file.readJSON('package.json').version,
        size: (stats.size / 1024).toFixed(2),
        description: grunt.file.readJSON('package.json').description,
        repository_type: grunt.file.readJSON('package.json').repository.type,
        repository_url: grunt.file.readJSON('package.json').repository.url.replace('https', 'git'),
        repository_shorten: grunt.file.readJSON('package.json').repository.url.replace('https://github.com/', '')
      }), function (err) {
        if (err) {
          throw err;
        }
        done();
      });
    });
  });
  grunt.registerTask('bower', 'Creates a bower.json from template', function () {
    var done = this.async(),
    oBowerTemplate = swig.compileFile('templates/bower.tpl');
    fs.stat('versions/hydrajs-testing-helper.min.js.gz', function (err, stats) {
      fs.writeFile('bower.json', oBowerTemplate({
        version: grunt.file.readJSON('package.json').version,
        size: (stats.size / 1024).toFixed(2),
        description: grunt.file.readJSON('package.json').description,
        repository_type: grunt.file.readJSON('package.json').repository.type,
        repository_url: grunt.file.readJSON('package.json').repository.url.replace('https', 'git'),
        repository_shorten: grunt.file.readJSON('package.json').repository.url.replace('https://github.com/', '')
      }), function (err) {
        if (err) {
          throw err;
        }
        done();
      });
    });
  });
  grunt.registerTask('component', 'Creates a component.json from template', function () {
    var done = this.async(),
    oComponentTemplate = swig.compileFile('templates/component.tpl');
    fs.stat('versions/hydrajs-testing-helper.min.js.gz', function (err, stats) {
      fs.writeFile('component.json', oComponentTemplate({
        version: grunt.file.readJSON('package.json').version,
        size: (stats.size / 1024).toFixed(2),
        description: grunt.file.readJSON('package.json').description,
        repository_type: grunt.file.readJSON('package.json').repository.type,
        repository_url: grunt.file.readJSON('package.json').repository.url.replace('https', 'git'),
        repository_shorten: grunt.file.readJSON('package.json').repository.url.replace('https://github.com/', '')
      }), function (err) {
        if (err) {
          throw err;
        }
        done();
      });
    });
  });

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'compress', 'copy', 'readme', 'bower', 'component', 'karma']);

};