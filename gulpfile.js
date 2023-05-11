const { src, dest, watch, series, parallel } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Imagenes
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css( done ) {

    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss( [ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )

    done();
}

function imagenes() {
    return src('src/img/**/*')
        .pipe( dest('build/img') )
}

function versionWebp() {
    return src('src/img/**/*.{png,jpg,jpeg}')
        .pipe( webp() )
        .pipe( dest('build/img') )
}

function versionAvif() {
    return src('src/img/**/*.{png,jpg,jpeg}')
        .pipe( avif() )
        .pipe( dest('build/img') )
}

function dev() {
    watch ( 'src/scss/**/*.scss',css )
    watch ( 'src/img/**/*', imagenes )
}

exports.css = css;
exports.dev = dev;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev );