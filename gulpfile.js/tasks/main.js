var gulp = require('gulp');

gulp.task('default', ['js', 'css', 'browser-sync']);

gulp.task('dist', ['js:dist', 'css:dist']);