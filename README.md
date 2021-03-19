# useColorThief

A [React Hook](https://reactjs.org/docs/hooks-intro.html) wrapper for the package [color-thief](https://github.com/lokesh/color-thief) made by [lokesh](https://github.com/lokesh)

[![npm version](https://badge.fury.io/js/use-color-thief.svg)](https://www.npmjs.com/package/use-color-thief)
[![npm downloads](https://badgen.net/npm/dt/use-color-thief)](https://www.npmjs.com/package/use-color-thief)
[![npm downloads](https://badgen.net/bundlephobia/minzip/use-color-thief)](https://www.npmjs.com/package/use-color-thief)
[![license](https://badgen.net/github/license/csandman/use-color-thief)](./LICENSE)

## Requirements

To use this package you must have at least [React version 16.8.0](https://github.com/facebook/react/releases/tag/v16.8.0) as that is when hooks were first added.

## Installation

```shell
npm i -S use-color-thief
```

## Example

```js
import useColorThief from 'use-color-thief';
import { useEffect } from 'react';

const MyComponent = () => {
  const source =
    'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';

  const { color, palette } = useColorThief(source, {
    format: 'hex',
    colorCount: 10,
    quality: 10,
  });

  useEffect(() => {
    console.log('Color:', color);
    console.log('Palette:', palette);
  }, [palette, color]);

  if (!palette || !color) {
    return null;
  }

  return (
    <div>
      <h2>Color</h2>
      <p>{color}</p>
      <h2>Palette</h2>
      {palette.map((paletteColor) => (
        <p key={paletteColor}>{paletteColor}</p>
      ))}
    </div>
  );
};

export default MyComponent;
```

## API

```js
const { color, palette } = useColorThief(source, {
  format: 'rgb',
  colorCount: 10,
  quality: 10,
});
```

### Parameters

#### source

Type: `String` or `React Ref`

The image to grab the primary color and palette from. The source can be one of 3 options:

- Url — An http url to pull an image from
  - e.g. `https://www.example.com/my-image.png`
- Base 64 Data Url — A data url representation of the image
  - e.g. `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAS...`
- [React Ref](https://reactjs.org/docs/refs-and-the-dom.html) — A react ref created either through `useRef` or `createRef` (most likely `useRef`) that is attached to an `img` element in your jsx
  - e.g.

```js
const imgRef = useRef();

return <img ref={imgRef} src="https://www.example.com/my-image.png />;
```

#### options

Type: `object`

The optional parameters you can pass to modify the output of the hook.

#### options.format

Type: `string` — Default: `'rgb'`

The `format` option changes the format of the `color` and `palette` outputs. You pass either `rgb` or `hex`.

#### options.quality

Type: `number` — Default: `10`

An optional argument that must be an Integer of value 1 or greater, and defaults to 10. The number determines how many pixels are skipped before the next one is sampled. We rarely need to sample every single pixel in the image to get good results. The bigger the number, the faster a value will be returned. This field applies to both returns, `color` and `palette`.

#### options.colorCount

Type: `number` — Default: `10`

The number of colors to return for the `palette` field.

### Output

This hook returns an object containing two fields, `color` and `palette`.

#### output.color

Type: `Array[Integer]` or `String` — Default: `null`

The dominant color from the image. If nothing or `rgb` is passed for `options.format`, this value will be returned as an array of three integers representing red, green, and blue values. If `hex` is passed for `options.format` the color will be returned as a string in hex format, `#RRGGBB`.

#### output.palette

Type: `Array[Array[Integer]]` or `Array[String]` - Default: `null`

A palette from the image by clustering similar colors. The palette is returned as an array containing colors, each color matching the same format as the `output.color` value returned.

## CodeSandbox Demos

Each demo grabs a random image each time, so reload to see a different example output

- [Get colors in hex format from http url](https://codesandbox.io/s/usecolorthief-url-example-wu31s?file=/src/App.js)
- [Get colors in hex format from base64 data url](https://codesandbox.io/s/usecolorthief-data-url-example-36e7f?file=/src/App.js)
- [Get colors in hex format from a React Ref](https://codesandbox.io/s/usecolorthief-ref-example-n1eym?file=/src/App.js)
