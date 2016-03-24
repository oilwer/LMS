//require gulp && gulp-less node modules
var gulp = require('gulp');
var less = require('gulp-less');

// all paths we're working with
var paths = {
  watchDirs: [ // directories to watch
    './less/**/*.less'
  ],
  lessInput: [ // directories to compile LESS from
    // './less/**/*.less'
    './less/all.less'
  ],
  cssOutput: './www/css' // directory to compile CSS to
};

// a gulp task to compile LESS -> CSS
gulp.task('build-css-from-less', [], function() {
  // chaining a gulp process together and return it
  return gulp
    .src(paths.lessInput) // the source for all files
    .pipe(less()) // the compiler we're using
    .pipe(gulp.dest(paths.cssOutput)); // the output for all files
});

function reportChange() {
  console.log("LESS files changed, new CSS generated...");
}

// a gulp task to watch files for changes
gulp.task('watch', ['build-css-from-less'], function() {
  gulp
    // using paths.watchDirs to watch ALL less
    .watch(paths.watchDirs, ['build-css-from-less'])
    .on('change', reportChange); // run reportChange on every change
});

