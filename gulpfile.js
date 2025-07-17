const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const browserSync = require("browser-sync").create();
const gulpReplace = require('gulp-replace');

// ✅ SCSSの処理
function compileSass() {
    return gulp.src("./src/assets/sass/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(),
            cssSorter()
        ]))
        .pipe(gulp.dest("./public/assets/css/"))
        .pipe(browserSync.stream());
}

// ✅ JSのコピー
function copyJs() {
    return gulp.src("./src/assets/js/**/*.js")
        .pipe(gulp.dest("./public/assets/js/"))
        .on('end', browserSync.reload);
}

// ✅ ローカルサーバー起動
function serve(done) {
    browserSync.init({
        server: {
            baseDir: './public',
            index: 'index.html'
        },
        open: true,
        notify: false
    });
    done();
}

// ✅ 監視
function watch() {
    gulp.watch("./src/assets/sass/**/*.scss", compileSass);
    gulp.watch("./src/assets/js/**/*.js", copyJs);
}

// ✅ デフォルトタスク
exports.default = gulp.series(
    gulp.parallel(compileSass, copyJs),
    serve,
    watch
);