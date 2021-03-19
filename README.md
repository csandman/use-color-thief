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

## Usage

```js
import useColorThief from 'use-color-thief';
import { useEffect } from 'react';

const MyComponent = () => {
  const source =
    'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';

  const { color, palette } = useColorThief(source, {
    format: 'hex',
    colorCount: 5,
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
