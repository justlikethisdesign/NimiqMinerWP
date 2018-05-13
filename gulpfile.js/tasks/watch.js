var gulp         = require('gulp');

var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload; 

var config       = require('../../gulpconfig');

// Keep everything synced in the browser
gulp.task( 'browser-sync', function() {
    browserSync.init( config.browsersync );
    gulp.start('watch');
});

gulp.task( 'watch', function() {
    gulp.watch( './' + config.paths.php.watch, reload );
    gulp.watch( './' + config.bases.src + config.paths.css.watch, [ 'css:stream' ] ); 
    gulp.watch( './' + config.bases.src + config.paths.js.watch, [ 'js:stream' ] ); 
});

gulp.task('css:stream',['css'], function() {
	return gulp.src( './' + config.paths.dist + '/' + config.paths.css.watch )
		.pipe(browserSync.stream({'match': '**/*.css'}));
});

gulp.task('js:stream',['js'], function() {
	return gulp.src( './' + config.paths.dist + '/' + config.paths.js.watch )
		.pipe(browserSync.stream({'match': '**/*.js'}));
});