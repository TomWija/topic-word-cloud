"use strict";

const gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    browserify = require("browserify"),
    babel = require("babelify"),
    runSequence = require("run-sequence"),
    sass = require("gulp-sass"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    uglify = require("gulp-uglify"),
    autoprefixer = require("gulp-autoprefixer");

// Paths

var resourcePath = "./htdocs/resources/public/",
    compiledPath = resourcePath + "compiled/",
    sassPath = resourcePath + "scss/",
    jsPath = resourcePath + "js/";

// Transpile ES6 JS into JS compatible with older browsers and auto-inject into browsers
// Also minify the code to make it load faster in productions
gulp.task("build:js", () => {
    return browserify({
        entries: jsPath + "main.js"
    })
        .transform(babel, {presets: ["env"]})
        .bundle()
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(compiledPath + "js/"))
        .pipe(browserSync.stream());
});

// Compile sass into CSS and auto-inject into browsers
gulp.task("build:sass", () => {
    return gulp.src(sassPath + "main.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: [
                "Chrome >= 35",
                "Safari >= 7",
                "Firefox >= 29",
                "ie > 9"
            ],
            cascade: false
        }))
        .pipe(gulp.dest(compiledPath + "css/"))
        .pipe(browserSync.stream());
});

// Serve the project using Browser-sync, allowing for hot reloading on file changes
gulp.task("serve", ["build:js", "build:sass"], () => {
    browserSync.init({
        server: "./htdocs"
    });

    gulp.watch("htdocs/resources/public/scss/**/*.scss", ["build:sass"]);
    gulp.watch("htdocs/resources/public/js/**/*.js", ["build:js"]);
    gulp.watch("htdocs/*.html").on("change", browserSync.reload);
});

// Compile all assets
gulp.task("build", () => {
    runSequence(
        "build:js",
        "build:sass"
    );
});

// Default task is build
gulp.task("default", ["build"]);
