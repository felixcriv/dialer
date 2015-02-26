var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var streamify = require('gulp-streamify');

var runSeq = require('run-sequence');
var nodemon = require('gulp-nodemon');
var reload = browserSync.reload;


gulp.task('browserify', function() {
    return browserify('./src/js/main.js')
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('public/js'))
});


gulp.task('dev', ['browserify']);

gulp.task('watch', function() {
    gulp.watch(['src/js/*.js', 'index.js'], ['browserify'], reload);
});


gulp.task('browserSync-init', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
    });
});

gulp.task('nodemon', function(cb) {
    var called = false;
    return nodemon({
        script: 'index.js'
    }).on('start', function() {
        if (!called) {
            called = true;
            cb();
        }
    });
});

gulp.task('heroku:production', function() {
    runSeq('dev')
});

gulp.task('default', ['browserify', 'browserSync-init', 'watch']);