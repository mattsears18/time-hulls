const gulp = require('gulp');
const gulpDocumentation = require('gulp-documentation');

export function watch() {
  gulp.watch('lib/*.js', gulp.parallel(defaultTasks))
}

export function documentation() {
  return gulp.src('./index.js')
    .pipe(gulpDocumentation('html'))
    .pipe(gulp.dest('docs'))
}

var defaultTasks = [
  documentation,
]

export default gulp.parallel(defaultTasks)
