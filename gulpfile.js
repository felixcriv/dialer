var gulp = require('gulp');
var uglify = require('gulp-uglify');
//var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var notify = require("gulp-notify");


gulp.task('browserify', function() {
    return browserify('./src/main.js')
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('public/js'))
        .pipe(notify('browserify and uglify done!'));
});


gulp.task('dev', ['browserify']);

gulp.task('watch', function(){
	gulp.watch(['src/*.js'], ['browserify']);
});

gulp.task('default', ['watch', 'browserify']);