var gulp                    = require('gulp');

var lineec                  = require('gulp-line-ending-corrector'); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings)

var filter                  = require('gulp-filter');
var changed                 = require('gulp-changed');

var concat                  = require('gulp-concat'); // Concatenates JS files
var pump                    = require('pump');
var uglify                  = require('gulp-uglify'); // Minifies JS files

var config                  = require('../../gulpconfig');


// Concat js files for build

gulp.task( 'js', function() {
    return gulp.src( './src/**' )
        .pipe( filter( '**/*.js' ) ) 
        .pipe( concat( config.paths.js.name + '.js' ) )
        .pipe( lineec() )
        .pipe( gulp.dest( './' + config.bases.dist ) );
});


// Minify concat files

gulp.task( 'js:dist', function(cb) {
    pump([
        gulp.src( './' + config.bases.dist + '*.js' ),
        uglify(),
        lineec(), // Consistent Line Endings for non UNIX systems.
        gulp.dest( './' + config.bases.dist ),
    ],
    cb
  );
});