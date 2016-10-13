/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',

            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
            'angular2-highcharts': 'npm:angular2-highcharts',
            'highcharts/highstock.src': 'npm:highcharts/highstock.js',
            'highcharts/highcharts-3d': 'npm:highcharts/highcharts-3d.js',
            'highcharts': 'npm:highcharts',
            'HighchartExporting': 'npm:highcharts/modules/exporting.js',
            'HighchartCSVExporting': 'npm:highcharts/modules/export-csv.js',
            'angular-2-local-storage': 'npm:angular-2-local-storage',
            'angular2-logger': 'npm:angular2-logger',
            'ng2-pagination': 'npm:ng2-pagination',
            "ng2-modal": "node_modules/ng2-modal",
            //'angular2-modal': 'npm:angular2-modal',
            //'angular2-modal/plugins/bootstrap': 'npm:angular2-modal/plugins/bootstrap'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'angular2-highcharts': {
                main: 'index',
                format: 'cjs',
                defaultExtension: 'js'
            },
            'highcharts': {
                defaultExtension: 'js',
                format: 'cjs'
            },
            'HighchartExporting': {
                defaultExtension: 'js',
                format: 'cjs'
            },
            'HighchartCSVExporting': {
                defaultExtension: 'js',
                format: 'cjs'
            },
            'angular-2-local-storage': { main: 'dist/index.js', defaultExtension: 'js' },
            'angular2-logger': { main: 'core.js', defaultExtension: 'js' },
            'ng2-pagination': {
                main: 'index',
                format: 'cjs',
                defaultExtension: 'js'
            },
            "ng2-modal": { "main": "index.js", "defaultExtension": "js" },
            //'angular2-modal': { defaultExtension: 'js', main: 'bundles/angular2-modal.umd' }
        }
    });
})(this);
