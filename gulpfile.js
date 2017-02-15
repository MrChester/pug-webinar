const gulp = require('gulp')
	, pug = require('gulp-pug')
	, fs = require('fs')
	, browserSync = require('browser-sync').create()
	, reload = browserSync.reload
	, plumber = require('gulp-plumber');


// server
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});
});

gulp.task('pug', () => {
	// let locals = require('./content.json');

	gulp.src('src/pages/**/*.pug')
		.pipe(plumber())
		.pipe(pug({
			locals : {
				one : JSON.parse(fs.readFileSync('./content.json', 'utf8')),
				two : JSON.parse(fs.readFileSync('./content2.json', 'utf8'))
			},
			pretty: true,
		}))
		.pipe(gulp.dest('dist'))
		.pipe(reload({stream : true}));
});

gulp.task('watch', () => {
	gulp.watch('src/**/*.pug', ['pug'])
});

gulp.task('default', ['server', 'pug', 'watch']);
