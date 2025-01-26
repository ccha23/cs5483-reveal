# Load SVG content

## Setup

To use the plugin include
```html
<!-- Load content plugin -->
<script src="loadsvgcontent/plugin.js"></script>
```
to the header of your presentation and configure reveal.js and the plugin by

```js
Reveal.initialize({
  // ...
  plugins: [ RevealLoadSVGContent ],
  // ...
});
```

## Usage

Simply add a `data-load` attribute with the filename to the an element, to load the file and add the innerHTML content into to the current element.

```html
<div data-load-svg-content="graphics.svg">
<!-- Content of graphics.svg will be added here -->
</div>
```

## License

MIT licensed

Copyright (C) 2025 Chung Chan
