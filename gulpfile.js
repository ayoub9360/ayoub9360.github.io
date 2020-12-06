const { src, dest, parallel, watch } = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Browser
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch("*.html").on('change', browserSync.reload);
}

// scss to css
function sass(){
    return src('./sass/style.scss')
    .pipe(gulpSass())
    .pipe(dest('./css/'))
    .pipe(browserSync.stream());
}

// Sass Watcher
function watcher(done){
    //watch('./sass/*.scss', sass)
    watch('./sass/', sass)
    done();
}

module.exports = {
    sass,
    watcher,
    browser: parallel(browser, watcher)
}