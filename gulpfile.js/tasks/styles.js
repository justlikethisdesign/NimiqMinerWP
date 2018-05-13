var gulp                    = require('gulp');

var fs                      = require('fs');

var sass                    = require('gulp-sass'); // Gulp plugin for Sass compilation.
var minifycss               = require('gulp-uglifycss'); // Minifies CSS files.
var stripCssComments        = require('gulp-strip-css-comments');
var autoprefixer            = require('gulp-autoprefixer'); // Autoprefixing magic.
var mmq                     = require('gulp-merge-media-queries'); // Combine matching media queries

var sourcemaps              = require('gulp-sourcemaps');
var filter                  = require('gulp-filter');

var concat                  = require('gulp-concat'); 

var lineec                  = require('gulp-line-ending-corrector');

var config                  = require('../../gulpconfig');


// Get all scss / css and merge into one file
// save file in build folder

gulp.task('css', function() {
    
    // Get all scss files, turn to css
    return gulp.src( './' + config.bases.src + config.paths.css.baseSCSS )

        .pipe( sourcemaps.init() )
    
        .pipe( sass( {
            errLogToConsole: true,
            precision: 10
        } ).on('error', console.error.bind(console)) )
    
        .pipe( sourcemaps.write( { includeContent: false } ) )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
    
        .pipe( autoprefixer( config.autoprefixer_browser ) )
        .pipe( sourcemaps.write() )
        .pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
        .pipe( concat( config.paths.css.name + '.css' ) )
        .pipe( gulp.dest( './' + config.bases.dist ) )
    ;
    
});


gulp.task('css:dist', function() {
    return gulp.src( './' + config.bases.dist  )
        .pipe( filter( ['**/*.css'] ) ) // Filtering stream to only unminified css files
        .pipe( mmq( { log: true } ) ) // Merge Media Queries only for .min.css version.
        .pipe( minifycss( {
          maxLineLen: 10
        }))
        .pipe( stripCssComments( false ) )
        .pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
        .pipe( gulp.dest( './' + config.bases.dist ) )
    ;
});  