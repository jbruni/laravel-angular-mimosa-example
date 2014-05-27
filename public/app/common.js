/*
 * RequireJS configuration
 * 
 * - Common RequireJS config
 */

require.config({
  "waitSeconds": 37,
  "paths": {
      "jquery": "vendor/jquery/dist/jquery",
      "angular": "vendor/angular/angular",
      "angular-i18n": "vendor/angular-i18n/angular-locale_pt-br",
      "angular-route": "vendor/angular-route/angular-route",
      "angular-resource": "vendor/angular-resource/angular-resource",
      "angular-animate": "vendor/angular-animate/angular-animate",
      "angular-bootstrap": "vendor/angular-bootstrap-jbruni/ui-bootstrap-tpls",
      "angular-once": "vendor/angular-once/once",
      "ngUpload": "vendor/ngUpload/ng-upload",
      "es5-shim": "vendor/es5-shim/es5-shim",
      "swami": "vendor/swami/src/swami",
      "jqHoverIntent": "vendor/jqHoverIntent/jquery.hoverIntent",
      "zeroclipboard": "vendor/zeroclipboard/ZeroClipboard",
      "moment": "vendor/moment/moment",
      "moment-i18n": "vendor/moment/lang/pt-br"
  },
  "shim": {
      "angular": {
          "deps": ["jquery"],
          "exports": "angular"
      },
      "angular-i18n": ["angular"],
      "angular-route": ["angular"],
      "angular-resource": ["angular"],
      "angular-animate": ["angular"],
      "angular-bootstrap": ["angular"],
      "angular-once": ["angular"],
      "ngUpload": ["angular"],
      "jqHoverIntent": ["jquery"],
      "moment-i18n": ["moment"]
  }
});
