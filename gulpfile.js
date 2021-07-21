"use strict";

const { src, dest } = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require('gulp-strip-css-comments');
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const rigger = require("gulp-rigger");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const imagemin = require("gulp-imagemin");
const del = require("del");
const panini = require("panini");
const browsersync = require("browser-sync").create();
const jsonMinify = require('gulp-json-minify');



/* Paths to source/build/watch files
=========================*/

var path = {
  build: {
    html: "dist/",
    js: "dist/assets/js/",
    css: "dist/assets/css/",
    fonts: "dist/assets/fonts/",
    videos: "dist/assets/videos/",
    json: "dist/assets/json/",
    sprite: "dist/assets/sprite/",
    images: "dist/assets/img/"
  },
  src: {
    html: "src/*.{htm,html,php}",
    js: "src/assets/js/**/*.js",
    css: "src/assets/sass/style.scss",
    fonts: "src/assets/fonts/**/*.*",
    videos: "src/assets/videos/**/*.*",
    json: "src/assets/json/**/*.*",
    sprite: "src/assets/sprite/**/*.*",
    images: "src/assets/img/**/*.{jpg,png,webp,svg,gif,ico}"
  },
  watch: {
    html: "src/**/*.{htm,html,php}",
    js: "src/assets/js/**/*.js",
    css: "src/assets/sass/**/*.scss",
    fonts: "src/assets/fonts/**/*.*",
    videos: "src/assets/videos/**/*.*",
    json: "src/assets/json/**/*.*",
    sprite: "src/assets/sprite/**/*.*",
    images: "src/assets/img/**/*.{jpg,png,webp,svg,gif,ico}"
  },
  clean: "./dist"
};


/* Tasks
=========================*/

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function html() {
  panini.refresh();
  return src(path.src.html, { base: 'src/' })
    .pipe(plumber())
    .pipe(panini({
      root: 'src/',
      layouts: 'src/tpl/layouts/',
      partials: 'src/tpl/partials/',
      helpers: 'src/tpl/helpers/',
      data: 'src/tpl/data/'
    }))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.css, { base: './src/assets/sass/' })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ["last 5 versions"],
      cascade: true
    }))
    .pipe(cssbeautify())
    .pipe(cssnano({
      zindex: false,
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(removeComments())
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js, { base: './src/assets/js/' })
    .pipe(plumber())
    .pipe(rigger())
    // .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function fonts() {
  return src(path.src.fonts, { base: './src/assets/fonts/' })
    .pipe(dest(path.build.fonts))
}

function json() {
  return src(path.src.json, { base: './src/assets/json/' })
    .pipe(jsonMinify())
    .pipe(dest(path.build.json))
    .pipe(browsersync.stream());
}

function videos() {
  return src(path.src.videos, { base: './src/assets/videos/' })
    .pipe(dest(path.build.videos))
    .pipe(browsersync.stream());
}

function sprite() {
  return src(path.src.sprite, { base: './src/assets/sprite/' })
    .pipe(dest(path.build.sprite))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.images)
    .pipe(dest(path.build.images));
}

function clean() {
  return del(path.clean);
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.fonts], fonts);
  gulp.watch([path.watch.videos], videos);
  gulp.watch([path.watch.json], json);
  gulp.watch([path.watch.sprite], sprite);
  gulp.watch([path.watch.images], images);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, json, videos, sprite, fonts, images));
const watch = gulp.parallel(build, watchFiles, browserSync);


// export tasks
exports.html = html;
exports.css = css;
exports.js = js;
exports.fonts = fonts;
exports.videos = videos;
exports.json = json;
exports.fonts = fonts;
exports.sprite = sprite;
exports.images = images;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
