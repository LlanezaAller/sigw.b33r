const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('styleComponents', () => {
  // Individual components style (for export!)
  gulp.src('./views/scss/*.scss')
    .pipe(sass({ includePaths: ['_/sass/'] }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
// Watch task
gulp.task('watch', () => {
  gulp.watch('./**/*.scss', ['styleComponents']);
});
