/**
 * Dependencies
 */

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    declare = require('gulp-declare'),
    del = require('del'),
    handlebars = require('gulp-handlebars'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    size = require('gulp-size'),
    uglify = require('gulp-uglify'),
    wrap = require('gulp-wrap');


/**
 * Default tasks
 */

gulp.task('del-build', function() {
    del(['build/*'], function(err) {
        console.log("build/ files deleted");
    });
});

gulp.task('del-dist', function() {
    del(['dist/*'], function(err) {
        console.log("build/ files deleted");
    });
});

 gulp.task('templates', function(){
    gulp.src(['app/templates/**/*.hbs'])
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: '__templates',
            noRedeclare: true
        }))
        .pipe(concate('templates.js'))
        .pipe(gulp.dest('templates/'));
});

 gulp.task('js-build', ['templates'], function() {
    gulp.src([
        // dependencies
        'bower_components/jquery/dist/jquery.js',
        'bower_components/chico/dist/ui/chico.js',
        'bower_components/handlebars/handlebars.js',
        'bower_components/underscore/underscore.js',
        'bower_components/backbone/backbone.js',
        // app
        'app/templates/templates.js',
        'app/utils/handlebars-helpers.js',
        'app/models/*.js',
        'app/collections/*.js',
        'app/views/*.js',
        'app/routes/*.js',
        'app/app.js'
    ])
    .pipe(concate('bundle.js'))
    .pipe(size({
        title: 'JS size:'
    }))
    .pipe(gulp.dest('build/scripts/'));
});

gulp.task('js-dist', function() {
    gulp.src([
        'build/scripts/bundle.js',
    ])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(size({
        title: 'JS size:'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('styles-build', function() {
    gulp.src([
            'app/styles/*'
        ])
        .pipe(autoprefixer({
            browsers: ['last 5 versions','Firefox ESR']
        }))
        .pipe(concate('bundle.css'))
        .pipe(size({
            title: 'CSS size:'
        }))
        .pipe(gulp.dest('build/styles/'));
});

gulp.task('styles-dist', function() {
    gulp.src([
            'build/styles/bundle.css'
        ])
        .pipe(minifyCSS())
        .pipe(size({
            title: 'CSS size:'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['del-build', 'js-build', 'styles-build']);

gulp.task('build', ['default']);

gulp.task('dist', ['build', 'clean-dist'], function(){
    setTimeout(function() {
        gulp.start(['js-dist', 'styles-dist']);
    }, 100);
});

gulp.task('watch', function() {
    gulp.start('default');
    gulp.watch([
        'gulpfile.js',
        'app/templates/**/*.hbs',
        'app/*.js',
        'app/**/*.js'
    ], ['js-build']);
    gulp.watch('app/styles/*.css', ['styles-build']);
});