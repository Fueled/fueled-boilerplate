

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require ('gulp-rename'),
	clean = require ('gulp-clean'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	defineModule = require('gulp-define-module'),
	declare = require('gulp-declare'),
	runSequence = require('run-sequence'),
	connect = require('gulp-connect'),
	webserver = require('gulp-webserver');


gulp.task('styles', function() {
	return gulp.src('app/assets/css/**/*.scss')
		.pipe(sass({
			compass: false,
			lineNumbers: true,
			loadPath: ['app/assets/css'],
			style: 'expanded'
		}))
		.pipe(autoprefixer('last 2 version', 'ie 10'))
		.pipe(gulp.dest('public/assets/css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('public/assets/css'))
		.pipe(notify({
			message: "Styles task completed"
		}));
});

gulp.task('scripts', function() {
	return gulp.src([
			'app/assets/js/plugins/plugins.js',
			'app/assets/js/g.js',
			'app/assets/js/partials/*.js',
			'app/assets/js/main.js'
		])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('public/assets/js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('public/assets/js'))
		.pipe(notify({
			message: "Scripts task completed"
		}));
});


gulp.task('images', function() {
	return gulp.src('app/assets/images/**/*')
		.pipe(gulp.dest('public/assets/images'))
		.pipe(notify({
			message: 'Images task complete',
			onLast: true
		}));
});

gulp.task('html', function() {
	return gulp.src('app/**/*.html')
		.pipe(gulp.dest('public'))
		.pipe(notify({
			message: "HTML task complete"
		}));
});

gulp.task('all-js', function() {
	runSequence('plugins', 'scripts');
});

gulp.task('webserver', function() {
	return gulp.src('public')
		.pipe(webserver({
			livereload: true,
			directoryListing: false,
			port: 8000
		}));
});

gulp.task('default', ['webserver'], function() {
	gulp.watch(['app/assets/js/**/*.js'], ['scripts']);
	gulp.watch('app/assets/css/**/*.scss', ['styles']);
	gulp.watch('app/assets/images/**/*', ['images']);
	gulp.watch('app/**/*.html', ['html']);
});
