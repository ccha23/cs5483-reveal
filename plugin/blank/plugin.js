"use strict";

window.RevealBlank = window.RevealBlank || {
    id: 'blank',
    init: function(deck) {

        /**
         * Adjusts the width and height of elements with the class 'blank' to ensure they maintain their dimensions
         * after replacing their content with a hint or a non-breaking space.
         */
        function adjustBlanks() {
            const blanks = document.querySelectorAll('.blank');
            blanks.forEach(blank => {
                if (blank.getAttribute('blanked') !== 'true') {
                    const width = blank.offsetWidth;
                    const height = blank.offsetHeight;
                    blank.innerHTML = blank.getAttribute('hint') || 
                                      (/[a-zA-Z]/.test(blank.innerHTML.charAt(0)) ? 
                                      blank.innerHTML.charAt(0) : 
                                      '&nbsp;');
                    blank.style.width = width + 'px';
                    blank.style.height = height + 'px';
                    blank.setAttribute('blanked', 'true');
                }
            });
        }

        deck.addEventListener('slidetransitionend', 
            function () {
                adjustBlanks();
            }
        );
    }
};