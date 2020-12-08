const autoPrefixBrowserList = [
	'last 2 version',
	'safari 5',
	'ie 8',
	'ie 9',
	'opera 12.1',
	'ios 6',
	'android 4'
];

const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const plumber = require('gulp-plumber');
const sourceMaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

gulp.task('images-compression', () => {
	return gulp
		.src('dist/assets/*')
		.pipe(
			imagemin({
				verbose: true
			})
		)
		.pipe(gulp.dest('dist/assets'));
});

gulp.task('sass', () => {
	return gulp
		.src('src/scss/**/*.scss')
		.pipe(sourceMaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourceMaps.write())
		.pipe(
			autoprefixer({
				browsers: autoPrefixBrowserList
			})
		)
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', () => {
	return gulp
		.src('src/**/*.js')
		.pipe(sourceMaps.init())
		.pipe(
			babel({
				presets: ['@babel/env']
			})
		)
		.pipe(concat('bundle.js'))
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest('dist'));
});

gulp.task('html', () => {
	return gulp.src('src/**/*.html').pipe(gulp.dest('dist'));
});

gulp.task('copy-assets', () => {
	return gulp.src('src/assets/*').pipe(gulp.dest('dist/assets'));
});

gulp.task('server', () => {
	gulp.watch('src/*.html').on('change', () => {
		gulp.series('html')();
		browserSync.reload();
	});
	gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('src/js/*.js', gulp.series('scripts'));
	gulp.watch('src/assets/*', gulp.series('copy-assets', 'images-compression'));

	browserSync.init({
		server: {
			baseDir: './dist/'
		}
	});
});

gulp.task('default', gulp.series('html', 'sass', 'scripts', 'copy-assets', 'images-compression'));
