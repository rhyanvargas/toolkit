define([
    'jquery',
    './flags/touch',
    './flags/retina',
    './flags/transition',
    './extensions/cache'
], function($, isTouch, isRetina, hasTransition) {

var Toolkit = {

    /** Current version */
    version: '%version%',

    /** Build date hash */
    build: '%build%',

    /** Vendor namespace */
    vendor: '',

    /** ARIA support */
    aria: true,

    /** Localization messages */
    messages: {
        loading: 'Loading...',
        error: 'An error has occurred!'
    },

    /** Does the browser support transitions? */
    hasTransition: hasTransition,

    /** Detect touch devices */
    isTouch: isTouch,

    /** Detect retina displays */
    isRetina: isRetina,

    /** Plugin instances indexed by the selector that activated it */
    cache: {},

    /**
     * Creates a jQuery plugin by extending the jQuery prototype with a method definition.
     * The Toolkit plugin is only initialized if one has not been already.
     * Plugins are either defined per element, or on a collection of elements.
     *
     * @param {String} plugin
     * @param {Function} callback
     * @param {bool} collection
     */
    create: function(plugin, callback, collection) {
        var name = plugin;

        // Prefix with toolkit to avoid collisions
        if ($.fn[name]) {
            name = 'toolkit' + name.charAt(0).toUpperCase() + name.slice(1);
        }

        $.fn[name] = collection ?

            // Apply the instance to a collection of elements
            function() {
                var instance = Toolkit.cache[plugin + '.' + this.selector] = callback.apply(this, arguments);

                return this.each(function() {
                    $(this).cache('toolkit.' + plugin, instance);
                });
            } :

            // Apply the instance per element
            function() {
                var args = arguments;

                return this.each(function() {
                    $(this).cache('toolkit.' + plugin, callback.apply(this, args));
                });
            };
    }
};

// Make it available
window.Toolkit = Toolkit;

return Toolkit;
});