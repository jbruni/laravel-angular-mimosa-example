/*
 * Mimosa configuration
 * 
 * - Automated front-end build tool
 */

exports.config = {
  "modules": [
    "copy",
    "jshint",
    "js-validate",
    "bower",
    "html-templates",
    "require",
    "minify-js",
    "inline-css-import",
    "minify-css"
  ],
  "watch": {
    "sourceDir": "app",
    "compiledDir": "dist",
    "javascriptDir": "."
  },
  "vendor": {
    "javascripts": "vendor",
    "stylesheets": "vendor"
  },
  "template": {
    "writeLibrary": false,
    "wrapType": "none",
    "nameTransform": function(filePath) { return filePath + '.html'; },
    "output": [{
      "folders": ["minha-conta"],
      "outputFileName": "minha-conta/templates"
    },{
      "folders": ["franquia"],
      "outputFileName": "franquia/templates"
    }]
  },
  "copy": {
    "extensions": ["js","css","png","jpg","jpeg","gif","eot","svg","ttf","woff","otf","yaml","kml","ico","htc","htm","json","txt","xml","xsd","map","md","mp4","mp3","swf"]
  },
  "htmlTemplates": {
    "extensions": ["html"]
  },
  "bower": {
    "copy": {
      "strategy": "none",
      "mainOverrides": {
        "angular-i18n": ["angular-locale_pt-br.js"],
        "jqHoverIntent": ["jquery.hoverIntent.js"],
        "selectivizr": ["selectivizr.js"],
        "json3": ["lib/json3.js"],
        "swami": ["src/swami.js"],
        "moment": ["moment.js","lang/pt-br.js"]
      },
      "forceLatest": false
    }
  },
  "require": {
    "optimize": {
      "overrides" : {
        "exclude": [
          "jquery", "angular", "angular-i18n", "angular-route",
          "angular-resource", "angular-animate", "angular-bootstrap",
          "angular-once", "ngUpload", "es5-shim", "swami", "jqHoverIntent",
          "zeroclipboard", "moment", "moment-i18n"
        ],
        "name": null,
        "insertRequire": null,
        "wrap": null
      }
    }
  },
  "minifyJS": {
    "exclude": [/\.min\./, /selectivizr\.js/]
  }
}
