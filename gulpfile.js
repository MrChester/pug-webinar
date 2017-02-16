const gulp = require('gulp')
	, pug = require('gulp-pug')
	, fs = require('fs')
	, browserSync = require('browser-sync').create()
	, reload = browserSync.reload
	, sass = require('gulp-sass')
	, plumber = require('gulp-plumber')
	, spritesmith = require('gulp.spritesmith')
	, sassGlob = require('gulp-sass-glob')
	, sourcemaps = require('gulp-sourcemaps')
	, csso = require('gulp-csso')
	, autoprefixer = require('gulp-autoprefixer')
	, svgSprite = require('gulp-svg-sprite');

gulp.task('sprite:svg', () => {
	let config = {
		shape: {
			spacing: {
				padding: 5
			}
		},
		mode: {
			symbol: {
				dest: './dist/img/sprite',
				sprite: 'sprite.svg',
			}
			// css: {
			// 	render: {
			// 		scss: true
			// 	}
			// }
		}
	};

	gulp.src('./dist/img/icons/svg/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('.'));
});

// server
gulp.task('server', function() {
	browserSync.init({
		open: false,
		server: {
			baseDir: "./dist",
		}
	});
});

gulp.task('sass', () => {
	return gulp.src('./src/styles/main.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers : ['> 5%'],
			cascade : false
		}))
		.pipe(csso())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css/'))
		.pipe(reload({stream : true}));
});

gulp.task('pug', () => {
	// let locals = require('./content.json');

	gulp.src('src/views/pages/**/*.pug')
		.pipe(plumber())
		.pipe(pug({
			// locals : locals
			pretty: true,
		}))
		.pipe(gulp.dest('dist'))
		.pipe(reload({stream : true}));
});

gulp.task('sprite', function () {
	var spriteData = gulp.src(
		'./src/img/icons/*.png'
	).pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.scss',
		cssFormat: 'css',
		imgPath: '../img/sprite.png',
		padding: 70
	}));

	spriteData.img.pipe(gulp.dest('./dist/img'));
	spriteData.css.pipe(gulp.dest('./src/styles/sprite'));
});

gulp.task('watch', () => {
	gulp.watch('src/**/*.pug', ['pug']);
	gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'pug','sprite', 'server', 'watch']);
