import KaTeX from 'katex';
import MathJax2 from 'mathjax2';
import MathJax3 from 'mathjax3';
import defaultTypesetter from './defaultTypesetter';

/*!
 * This plugin is a wrapper for the MathJax2,
 * MathJax3 and KaTeX typesetter plugins.
 */
const Plugin = Object.assign(defaultTypesetter(), {
    KaTeX,
    MathJax2,
    MathJax3
});

export default Plugin;