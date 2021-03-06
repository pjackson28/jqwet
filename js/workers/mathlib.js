/*
 * Web archived top page banner
 */
(function ($) {
    var _pe = window.pe || {
        fn: {}
    }; /* local reference */
    _pe.fn.mathlib = {
        type: 'plugin',
        support: (function () {
            var hasMathML = false;
            if (document.createElementNS) {
                var ns = "http://www.w3.org/1998/Math/MathML",
                    div = document.createElement("div");
                div.style.position = "absolute";
                var mfrac = div.appendChild(document.createElementNS(ns, "math")).appendChild(document.createElementNS(ns, "mfrac"));
                mfrac.appendChild(document.createElementNS(ns, "mi")).appendChild(document.createTextNode("xx"));
                mfrac.appendChild(document.createElementNS(ns, "mi")).appendChild(document.createTextNode("yy"));
                document.body.appendChild(div);
                hasMathML = div.offsetHeight > div.offsetWidth;
            }
            return hasMathML;
        })(),
        _exec: function (elm) {
            if (pe.mobile || pe.fn.mathlib.support ) return; // we do not want this on mobile devices or Mathml capable browsers
            pe.add._load('http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML');
        } // end of exec
    };
    window.pe = _pe;
    return _pe;
})(jQuery);