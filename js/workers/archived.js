/*
 * Web archived top page banner
 */
(function($) {

    var _pe = window.pe || {fn: {} };
    /* local reference */
    _pe.fn.archived = {
        type: 'plugin',
        _exec: function(elm) {
            if (pe.mobile) return; // we do not want this on mobile devices
            // create the toolbar
            var notice = $('<div class="archived" role="toolbar"><a class="archived-top-page" href="#archived" role="link">' + pe.dic.get('%archived-page') + '</a></div>');
            // lets bind the scrolls
            $(window).on('scroll', function() {
                if ($(this).scrollTop() > 10) {
                        notice.fadeIn("normal").attr('aria-hidden', 'false');
                    } else {
                        notice.fadeOut("normal").attr('aria-hidden', 'true');
                    }
                });
                
                // now test to ensure that we have this correctly placed
            if ($(window).scrollTop() < 10 || $(window).scrollTop() === 'undefined') {
                notice.fadeOut("normal").attr('aria-hidden', 'true');
            } else {
                notice.fadeIn("normal").attr('aria-hidden', 'false');
                }
            // add to page
            pe.pagecontainer().append(notice);
        } // end of exec
    };
    window.pe = _pe;
    return _pe;
})(jQuery);