// var Resell = {
//     Models: {},
//     Collections: {},
//     Views: {},
//     Cache: {}
// };

'use strict';

(function (win) {

    // Check if app its launched
    if (win.SYI) { return; }

    // Create app
    var SYI = new Backbone.Marionette.Application();

    SYI.addRegions({
        'mainRegion': '#app'
    });

    // Subscribe to "start" application event
    SYI.on('start', function() {
        Backbone.history.start();
    });

    // Export Application
    win.SYI = SYI;

    // Start the MorfifyApp app
    $(function() {
        // This fire "start" application event
        SYI.start();
    });
}(window));