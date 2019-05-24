const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpDocumentation = require('gulp-documentation');

export function documentation(cb) {
  gulp
    .src('./index.js')
    .pipe(gulpDocumentation('html'))
    .pipe(gulp.dest('docs'));
  cb();
}

export function compress(cb) {
  gulp
    .src('lib/**/*.js')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
  cb();
}

const defaultTasks = [documentation, compress];

export function watch() {
  gulp.watch('lib/*.js', gulp.parallel(defaultTasks));
}

export default gulp.parallel(defaultTasks);

//
// gulp.task('minify', () => {
//   return gulp.src('src/**/*.js')
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(uglify())
//     // [...]
// });
