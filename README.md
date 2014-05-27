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
- `public` contains the front-end code, which uses AngularJS in a modular style with AMD / RequireJS
- `public/bower.json` contains the front-end third-party dependencies (this file is parsed by "mimosa bower", not bower directly)
- `public/mimosa-config.js` contains Mimosa configuration
- code inside `public/app` contains modularized components: related HTML + CSS + IMAGES + JS files live in the **same** folder - this is the coolest thing about this whole code structure
