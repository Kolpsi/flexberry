const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const csso = require('gulp-csso');
const server = require("browser-sync").create();
const rename = require("gulp-rename");
const del = require("del");
const jsmin = require('gulp-jsmin');


gulp.task("css", function() {
    return gulp.src("src/less/style.less")
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(csso())
        .pipe(less())
        .pipe(rename("style-min.css"))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest("src/css"))
        .pipe(server.stream());
});



// gulp.task("copy", function() {
//     return gulp.src([
//             "src/assets/modules/lib/*.js"
//         ], {

//         })
//         .pipe(gulp.dest("dist/assets/modules/lib"));
// });

// gulp.task("clean", function() {
//     return del("dist");
// });

// gulp.task("js", function() {
//     return gulp.src('src/assets/modules/*.js')
//         .pipe(jsmin())
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('dist/assets/modules'));
// });

// gulp.task("html", function() {
//     return gulp.src("src/*.html")
//         .pipe(gulp.dest("dist"));
// });

// gulp.task("images", function() {
//     return gulp.src("src/assets/img/**/*.{png,jpg,svg}")
//         .pipe(gulp.dest("dist/assets/img"));
// });

gulp.task("server", function() {
    server.init({
        server: "src/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("src/less/**/*.less", gulp.series("css"));
    gulp.watch("src/*.html").on("change", server.reload);
    gulp.watch("src/js/*.js").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server"));

gulp.task("refresh", function(done) {
    server.reload();
    done();
});

// gulp.task("build", gulp.series(
//     "clean",
//     "copy",
//     "css",
//     "js",
//     "html",
//     "images",
// ));