# CASE 1 done for Scorp Sample Project 1

## About the project

### Background

This case is for showing the knowledge for fundamental knowledge on frontend development. With respect to this, I tried to create a fluent frontend application using Vue.js.

### Technologies/Packages used and why they are used

- Vue.js as frontend framework
- Laravel Mix as module bundler
- Bootstrap as grid system (bundled via bootstrap-grid.scss & used breakpoint mixins from the package in the scss files)
- Serve for static file serving and used as development server to host the files.
- NPM used for package management
- Vue-i18n for localization
- Sass & Sass loader for SCSS compilation
- Vue-router for routing in Vue application
- Vue-youtube for Youtube iframe API

### Requirements:

- Node.js 14.17.6 or later
- NPM 6.14.15
- A web browser with Chromium 89(or later) and that supports ES5 (see: [ES5 Compliant Browsers](https://caniuse.com/es5))

### Project File Structure:

```
.
|- /public #Root directory for development server
│   │- /js
│   │- /css
|   |- /img
|   |- index.html #Single page application
|- /src #Source code
|   |- /components #Vue.js components
|   |- /lang #Language files and language config
|   |- /style #all styling
|   |- main.js #Vue.js application source file
│- README.md
│- package.json    
│- webpack.mix.js
|- serve.json

```
