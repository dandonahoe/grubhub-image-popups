var gulp = require('gulp'),
	watch = require('gulp-watch');


gulp.task('copyFiles', function () {
	console.log("Copying because of change");

	gulp.src('./node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('dist'));
});


gulp.task('watch', function() {
	gulp.watch('./node_modules/**/*', ['copyFiles']);
});

