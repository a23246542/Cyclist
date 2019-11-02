var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var fileinclude = require('gulp-file-include');
var reload = browserSync.reload;

gulp.task('concat',function(){
    gulp.src('dev/*.html').pipe(gulp.dest('dest/'));
})

gulp.task('concatjs',function(){
    gulp.src('dev/js/*js').pipe(gulp.dest('dest/js/'));
})

// gulp.task('concatscss',function(){
//     gulp.src('dev/scss/*scss').pipe(gulp.dest('dest/css/'))
// })

// =======================================================

// gulp.task('mincss',function(){
//     gulp.src('dest/css/*css')
//     .pipe(cleanCSS({compatibility:'ie8'}))
//     .pipe(gulp.dest('dest/css/'));
// })



// ====================sass===================


gulp.task('sass',function(){
    return gulp.src('dev/sass/*.scss')
    // .pipe(sourcemaps.init())
    // .pipe(sass({outputStyle:'compressed'})
    .pipe(sass().on('error',sass.logError))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('dest/css/'))
})


// ===========html template====================

gulp.task('template',function(){
     gulp.src('dev/*html')
         .pipe(fileinclude({
             prefix:'@@',
             basepath:'@file'
         }))
         .pipe(gulp.dest('dest/'));
})


// ===============watch=========================

gulp.task('watch',function(){
    // gulp.watch('dev/sass/*.scss',['sass']);
    gulp.watch(["dev/sass/*.scss", "dev/sass/**/*.scss"], ['sass']).on('change', reload);
    gulp.watch(['dev/*.html','dev/**/html'],['template']).on('change',reload);
    gulp.watch(["dev/js/*js"] , ['concatjs']).on('change', reload);
})

// 多個網頁


// ==============default======================

gulp.task('default',function(){
    browserSync.init({
        server:{
            baseDir:'dest',
            index:"activity.html"
        }
    });
})