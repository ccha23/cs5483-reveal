"use strict";

window.RevealBlank = window.RevealBlank || {
    id: 'blank',
    init: function(deck) {

        /**
         * Adjusts the width and height of elements with the class 'blank' to ensure they maintain their dimensions
         * after replacing their content with a hint or a non-breaking space.
         * This function is called when the deck is ready and after each slide transition.
         */
        function adjustBlanks() {
            const blanks = document.querySelectorAll('.blank');
            blanks.forEach(blank => {
                if (blank.getAttribute('data-blanked') !== 'true') {
                    const width = blank.offsetWidth;
                    const height = blank.offsetHeight;
                    const hint = blank.getAttribute('data-blank-hint') || 
                        (/[a-zA-Z]/.test(blank.innerHTML.charAt(0)) ? 
                        blank.innerHTML.charAt(0) : 
                        '&nbsp;');
                    blank.innerHTML = `<span
                    style="color: #181; background-color: #efe; padding: 5px 10px; vertical-align: middle; min-width: ${width}px; height: ${height}px; display: inline-block; text-align: left;">
                    ${hint}
                    </span>`;
                    blank.setAttribute('data-blanked', 'true');
                }
            });
        }

        /**
         * Event listener for the 'ready' event of the deck.
         * Calls the adjustBlanks function to adjust the dimensions of blank elements.
         */
        deck.addEventListener('ready', 
            function () {
                adjustBlanks();
            }
        );

        /**
         * Event listener for the 'slidetransitionend' event of the deck.
         * Calls the adjustBlanks function to adjust the dimensions of blank elements.
         */
        deck.addEventListener('slidetransitionend', 
            function () {
                adjustBlanks();
            }
        );
    }
};