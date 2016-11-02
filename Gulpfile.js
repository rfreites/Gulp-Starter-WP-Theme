var gulp = require('gulp');
var scss = require('gulp-sass');
var rename = require('gulp-rename');
var uglifycss = require('gulp-uglifycss');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');

gulp.task('scripts', function() {
  return gulp.src([
  			'node_modules/bootstrap/js/tests/vendor/jquery.min.js',
			'node_modules/bootstrap/js/tests/vendor/qunit.js',
			'node_modules/bootstrap/js/tests/vendor/tether.min.js',
			'node_modules/bootstrap/dist/js/bootstrap.js',
			'assets/js/skip-link-focus-fix.js',
			'assets/js/modernizr.js',
			'assets/js/slick.js'
			])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./assets/js'));
});


gulp.task('scss', function () {
  gulp.src('./assets/scss/*.scss')
    .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
	.pipe(rename('app.min.css'))
	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('scss:watch', function () {
  gulp.watch('assets/scss/*.scss', ['scss']);
});

gulp.task('build', ['scripts']);

gulp.task('js:watch', function(){
	gulp.watch('assets/js/index.js',function(){
		return gulp.src([
			'assets/js/all.js',
			'assets/js/index.js'
			])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('public/js'));
	})
});

gulp.task('default', ['scss:watch','js:watch']);
