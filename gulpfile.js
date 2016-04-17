const gulp = require('gulp');
const babelify = require('babelify');
//const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
//const buffer = require('vinyl-buffer');

gulp.task('scripts', () => {
    var bundler = browserify('./lib/script.es6')
        .transform(babelify, {presets: ['es2015']})
        .bundle();

    return bundler
        .pipe(source('script.js'))
        .pipe(gulp.dest('dist'));

});

gulp.task('watch', () => {
    gulp.watch('lib/script.es6', ['scripts']);
});

gulp.task('default', ['watch', 'scripts']);