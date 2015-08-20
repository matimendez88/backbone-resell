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
        console.log("dist/ files deleted");
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
        .pipe(concat('templates.js'))
        .pipe(size({
            title: 'JS size:'
        }))
        .pipe(gulp.dest('app/templates/'));
});

// ['templates'],
gulp.task('js-build', function() {
    gulp.src([
        // dependencies
        'node_modules/jquery/dist/jquery.js',
        'bower_components/chico/dist/ui/chico.js',
        'node_modules/handlebars/dist/handlebars.js',
        'bower_components/underscore/underscore.js',
        'bower_components/backbone/backbone.js',
        'node_modules/backbone.marionette/lib/backbone.marionette.js',
        'bower_components/masonry/dist/masonry.pkgd.js',
        'bower_components/jquery-mockjax/dist/jquery.mockjax.min.js',
        // app
        'app/app.js',
        'app/resell.module.js',
        'app/templates/templates.js',
        'app/utils/handlebars-helpers.js',
        'app/models/*.js',
        'app/collections/*.js',
        'app/views/*.js',
        'app/router.js',
        'mocks/mock.js'
    ])
    .pipe(concat('bundle.js'))
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
        .pipe(concat('bundle.css'))
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

gulp.task('default', ['del-build', 'templates', 'js-build', 'styles-build']);

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
        'app/**/*.js',
        'mocks/mock.js'
    ], ['default']);
    gulp.watch('app/styles/*.css', ['styles-build']);
});