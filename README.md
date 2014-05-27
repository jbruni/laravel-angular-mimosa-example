laravel-angular-mimosa-example
==============================

This is an application which uses:

- **Laravel 4** (PHP framework) for server-side / back-end
- **AngularJS** (JavaScript framework) for client-side / front-end
- **RequireJS** / AMD to organize code and lazy load resources (front-end)
- **Mimosa** as front-end build tool

While in development, code is not minified, files are separated, app load time is fast as everything is lazily loaded by RequireJS - simple and good to work.

After Mimosa build, with minification and optimization, files are concatenated and minified, so the download size and number of requests are drastically reduced in production, not to mention the obfuscation of the JavaScript code.

- `app` and `bootstrap` folders are Laravel-related (PHP / back-end)
- [`app/views/layouts`](https://github.com/jbruni/laravel-angular-mimosa-example/tree/master/app/views/layouts) contains the *index.html* template, which is built and delivered by the server-side of the app
- `public` is the root of publicly accessible assets, containing the front-end code in the `app`sub-folder, which uses AngularJS in a modular style with AMD / RequireJS
- `public/bower.json` contains the front-end third-party dependencies (this file is parsed by "mimosa bower", not bower directly)
- `public/mimosa-config.js` contains Mimosa configuration
- code inside `public/app` contains modularized components: related HTML + CSS + IMAGES + JS files live in the **same** folder - this is the coolest thing about this whole code structure

What Mimosa does
================

`mimosa bower` creates a `vendor` folder inside `public/app` and installs **bower dependencies** there (not whole repos, but only the necessary files).

It creates a `public/dist` (production) folder where it copies the `public/app` (development) code and makes its "magic" there, as follows.

It inlines **CSS files** from @import clauses, and minifies them.

It concatenates and makes **HTML files available as templates** in JavaScript files.

It just **copies IMAGES** and common assets.

It concatenates and minifies the JavaScript files, following `r.js` approach (requireJS optimization). It parses the code and finds out which JavaScript files are "entry points" ("modules"), and also detects which other specific JavaScript files are called from them (and thus necessary in the optimized "built" file). All this automatically. So, in the end we got **one minified/optimized JAVASCRIPT file** for each "separated single page app" in the project.
