var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
// var minifyCSS = require('gulp-csso');
// var concat = require('gulp-concat');
// var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('html', function(){
  return gulp.src('src/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('css', function(){
  return gulp.src('src/sass/*.scss')
    .pipe(sass())
    // .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src('src/js/*.js')
    // .pipe(sourcemaps.init())
    // .pipe(concat('app.min.js'))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['html', 'css', 'js'], function() {

  browserSync.init({
      server: "./dist"  
  });
  gulp.watch("src/pug/**", ['html']);
  gulp.watch("src/js/**", ['js']);
  gulp.watch("src/sass/**", ['css']);

  // gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  // gulp.watch(['src/assets/**/*'], ['copy']);
  // gulp.watch("src/*.html").on('change', browserSync.reload);
  // gulp.watch("src/*.html", ['html']);
});

gulp.task('default', [ 'html', 'css', 'js' ]);