/*****************************************************************
** Author: Chung Chan, chungc@alum.mit.edu
**
** A plugin for loading external SVG content into Reveal.js slides.
**
** Version: 0.1.0
**
** License: MIT license
**
** Usage:
** 
** This plugin allows you to load external SVG content into your Reveal.js slides.
** You can specify the SVG file and an optional CSS selector to load specific parts
** of the SVG content.
**
** To use this plugin, add the following attributes to your HTML elements:
**
** data-load-svg-content="path/to/your/file.svg|[css-selector]"
**
** Examples:
** 
** 1. Load the entire SVG file:
** <div data-load-svg-content="Lecture2/d.dio.svg"></div>
**
** 2. Load a specific part of the SVG file using a CSS selector:
** <div data-load-svg-content="Lecture2/d.dio.svg|[data-cell-id='tree2']"></div>
**
******************************************************************/

"use strict";

window.RevealLoadSVGContent = window.RevealLoadSVGContent || {
  id: 'RevealLoadSVGContent',
  init: function(deck) {
        function loadSVGContent( filename, selector ) {
            return new Promise( function( resolve ) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function( filename, xhr ) {
                    if( xhr.readyState === 4 ) {
                        // file protocol yields status code 0 (useful for local debug, mobile applications etc.)
                        if ( ( xhr.status >= 200 && xhr.status < 300 ) || xhr.status === 0 ) {
                            var parser = new DOMParser();
                            var doc = parser.parseFromString(xhr.responseText, "image/svg+xml");
                            if (selector) {
                                var element = doc.querySelector(selector);
                                if (element) {
                                    resolve( element.outerHTML );
                                } else {
                                    let error = 'ERROR: The element with selector ' + selector + ' was not found in ' + filename + '.';
                                    console.error( error );
                                    resolve( '<div>' + error + '</div>' );
                                }
                            } else {
                                resolve( doc.documentElement.innerHTML );
                            }
                        }
                        else {
                            let error = 'ERROR: The attempt to fetch ' + filename + ' failed with HTTP status ' + xhr.status + '. Check your browser\'s JavaScript console for more details.'
                            console.error( error );
                            resolve( '<div>' + error + '</div>' );
                        }
                    }
                }.bind( this, filename, xhr );
                xhr.open( 'GET', filename, true );

                try {
                    xhr.send();
                }
                catch ( e ) {
                    let error = 'Failed to get the external content from file ' + filename + '. Make sure that the presentation and the file are served by a HTTP(S) server and the file can be found there. ' + e;
                    console.error( error );
                    resolve( '<div>' + error + '</div>' );
                }
            } );
        };

        return new Promise( function( resolve ) {
            // Get names of files to be loaded
            var filenames = [];
            deck.getRevealElement().querySelectorAll( '[data-load-svg-content]:not([data-loaded])').forEach( function( container, i ) {
                const dataLoadSvgContent = container.getAttribute("data-load-svg-content");
                const [filename, selector] = dataLoadSvgContent.split('|');
                if ( !filenames.find(function(e) { return e.filename == filename && e.selector == selector; }) ) {
                    filenames.push({ filename, selector });
                }
            });

            // Load external files
            var externalPromises = [];
            filenames.forEach( function( { filename, selector }, i ) {
                externalPromises.push( loadSVGContent( filename, selector ).then(
                    // Add content from external file
                    function( response ) {
                        deck.getRevealElement().querySelectorAll( '[data-load-svg-content="' + filename + (selector ? '|' + selector : '') + '"]:not([data-loaded])').forEach( function( container, i ) {
                            container.innerHTML = response + container.innerHTML;
                            container.setAttribute("data-loaded",true);
                        });
                    }
                ) );
            });

            Promise.all( externalPromises ).then( resolve );
        });
  }
};