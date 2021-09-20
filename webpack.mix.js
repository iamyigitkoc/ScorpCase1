const { js } = require('laravel-mix');
let mix = require('laravel-mix');
let path = require('path');

mix
.options({manifest: false})
.js(path.resolve(__dirname, 'src/main.js'), 'js')
.vue({version: 2})
.sass(path.resolve(__dirname, 'src/style/bootstrap-grid.scss'), 'css')
.sass(path.resolve(__dirname, 'src/style/layout.scss'), 'css')
.setPublicPath('public');