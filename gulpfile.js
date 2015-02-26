var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
// var notify = require("gulp-notify");
var runSeq = require('run-sequence');


gulp.task('browserify', function() {
    return browserify('./src/js/main.js')
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('public/js')
        .pipe(browserSync.reload({stream:true})));
        // .pipe(notify('browserify and uglify done!'));
});


gulp.task('dev', ['browserify']);

gulp.task('watch', function(){
	gulp.watch(['src/*.js'], ['browserify']);
});

gulp.task('browserSync', function(){
	browserSync({
		server:{
			baseDir: './public'
		}
	})
});

gulp.task('heroku:production', function(){
  runSeq('dev')
});

gulp.task('default', ['watch', 'browserify']);