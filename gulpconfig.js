module.exports = {
    
    bases: {
        src:    'src/',
        dist:   'assets/'
    },

    // Any required paths
    paths: {
        assets: {
            all:        'assets/**/*',
        },
        css: {
            name:       'style', // no extension 
            base:       'base.scss',
            watch:      'css/**/*.{scss,css}',
        },
        js: {
            name:       'nimiq-app',
            watch:      'js/**/*.js',
        },
        php: {
            watch:      '**/*.php'
        },
    },

    browsersync: {
        proxy: 'localhost/plugin_tester/', // Project URL.
        open: "external", // Allow external connections
        browser: "chrome", // Open the site in Chrome
        //host: "192.168.2.12", // May need to update this - use dev-ip to get list of IPs
        open: true, // Automatically open the browser with BrowserSync live server.
        injectChanges: true, // Inject CSS changes on change
    },
    
    // Browsers you care about for autoprefixing.
    // Browserlist https        ://github.com/ai/browserslist
    autoprefixer_browser: [
        'last 2 version',
        '> 1%',
        'ie >= 9',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4',
    ],
    
};