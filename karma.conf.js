module.exports = function(config){
    config.set({
    basePath : './',

    files : [
      'https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js',
      'http://code.angularjs.org/1.2.9/angular.min.js',
      'http://code.angularjs.org/1.2.9/angular-route.min.js',
      'http://code.angularjs.org/1.2.9/angular-resource.min.js',
      'http://code.angularjs.org/1.2.9/angular-mocks.js',
      'public/js/littleplanefinder.min.js',
      'test/*.js'
    ],

    exclude : [],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    reporters: ['progress']

})}
