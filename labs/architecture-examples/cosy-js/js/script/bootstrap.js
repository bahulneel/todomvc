// Application bootstrap
(function($, snuggle) {

    // Define our controls
    controls = {
        todo: require('./todo')
    };

    // Useful application lib/utils
    lib = {
        local: require('./local')
    };

    // Debug level
    debug = false;

    // Bind snuggle to the root node
    snuggle.up($('html'), controls, lib, debug);

})(jQuery, require('../lib/cosy.js').snuggle);
