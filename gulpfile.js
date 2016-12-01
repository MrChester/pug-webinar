const gulp = require('gulp');
const pug = require('gulp-pug');
const fs = require('fs');

gulp.task('pug', () => {
	// let locals = require('./content.json');

	gulp.src('src/pages/**/*.pug')
		.pipe(pug({
			locals : JSON.parse(fs.readFileSync('./content.json', 'utf8')),
			pretty: true,
		}))
		.pipe(gulp.dest('dist'))
});

gulp.task('watch', () => {
	gulp.watch('src/**/*.pug', ['pug'])
});

gulp.task('default', ['pug', 'watch']);
