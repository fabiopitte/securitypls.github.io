(function ($) {
    "use strict";

    var $document = document,
        $window = window,
        $navbar = $('nav'),
        navHeight = 80

    /** Detect mobile device */
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    function shrink(scroll_pos) {

        if (scroll_pos > navHeight) {

            System.import('./tawk').then(function(module) {
                module.default();
            });

            $navbar.classList.add('shrink');
        }
        else {
            $navbar.classList.remove('shrink');
        }
    }

    $document.addEventListener("DOMContentLoaded", function () {

        var last_known_scroll_position = 0;
        var ticking = false;

        $window.addEventListener('scroll', function () {

            last_known_scroll_position = $window.scrollY;

            if (!ticking) {

                $window.requestAnimationFrame(function () {
                    shrink(last_known_scroll_position);
                    ticking = false;
                });

                ticking = true;
            }
        });
    });

})(document.querySelector.bind(document));