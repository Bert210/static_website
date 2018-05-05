const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const inDevMode = process.env.NODE_ENV !== 'production';


function center(str, length){
  let strLen = str.length;
  let start = Math.floor((length - strLen)/2);
  return " ".repeat(start) + str + " ".repeat(start);
}

if(inDevMode){
  console.log('\x1b[34m%s', '='.repeat(32));  
  console.log(center("In Development Mode", 32));
  console.log('%s\x1b[0m', '='.repeat(32));
  
}else{
  console.log('\x1b[32m%s', '='.repeat(32));
  console.log(center("In Production Mode", 32));
  console.log('%s\x1b[0m', '='.repeat(32));
  
}

gulp.task('html', function(){
  return gulp.src('src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('css', function(){
  return gulp.src('src/sass/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Static Server + watching html/scss/js files
gulp.task('serve', ['html', 'css', 'js'], function() {

  browserSync.init({
      server: "./dist"  
  });
  gulp.watch("src/pug/**", ['html']);
  gulp.watch("src/js/**", ['js']);
  gulp.watch("src/sass/**", ['css']);

});

gulp.task('build', ['html', 'css', 'js']);

gulp.task('default', [ 'html', 'css', 'js' ]);