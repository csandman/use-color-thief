import { useState, useEffect, MutableRefObject } from 'react';
import ColorThief from 'colorthief';

export type ColorThiefSource = string | MutableRefObject<HTMLImageElement>;

export type ColorThiefColor = Array<number> | string | null;

export interface ColorThiefOptions {
  format?: string;
  quality?: number;
  colorCount?: number;
}

export interface ColorThiefOutput {
  color: ColorThiefColor;
  palette: Array<ColorThiefColor>;
}

/**
 * Converts 3 rgb integers into a hex string
 *
 * @param {number} r The red component of an rgb color
 * @param {number} g The green component of an rgb color
 * @param {number} b The blue component of an rgb color
 * @returns {string} A color in hex string format.
 */
const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number): string => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Gets a primary color and a color palette from an image ref or url
 *
 * @param {ColorThiefSource} source The source url or image ref to grab colors from
 * @param {ColorThiefOptions} options The second number to add.
 * @returns {ColorThiefOutput} The resulting color and palette from the input image
 */
const useColorThief = (
  source: ColorThiefSource,
  options: ColorThiefOptions
): ColorThiefOutput => {
  const { format = 'rgb', quality = 10, colorCount = 10 } = options;

  const [url, setUrl] = useState('');
  const [output, setOutput] = useState({
    color: null,
    palette: null,
  });

  // Get the url to use for generating a palette
  useEffect(() => {
    if (source) {
      if (typeof source === 'string' && source.length) {
        setUrl(source);
      } else {
        const { current } = <MutableRefObject<HTMLImageElement>>source;
        if (
          current &&
          current instanceof HTMLImageElement &&
          // When no url is passed, getting the 'src' attribute returns the page url
          current.src !== window.location.href
        ) {
          const setCurrentSrc = () => {
            if (current.src) {
              setUrl(current.src);
            }
          };
          setCurrentSrc();

          const observer = new MutationObserver(setCurrentSrc);
          observer.observe(current, { attributes: true });
          return () => {
            observer.disconnect();
          };
        }
      }
    }

    return () => {};
  }, [source]);

  // When the image url changes, update the color and palette
  useEffect(() => {
    let isCurrent = true;

    if (url) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';

      const handleImageLoad = () => {
        if (isCurrent) {
          const colorThief = new ColorThief();

          let color = colorThief.getColor(img, quality);
          let palette = colorThief.getPalette(img, colorCount, quality);

          if (format === 'hex') {
            const [r, g, b] = color;
            color = rgbToHex(r, g, b);
            palette = palette.map(([pr, pg, pb]) => rgbToHex(pr, pg, pb));
          }

          setOutput({ color, palette });

          img.removeEventListener('load', handleImageLoad);
        }
      };

      img.addEventListener('load', handleImageLoad);
      img.src = url;
    }

    return () => {
      isCurrent = false;
    };
  }, [url, colorCount, quality, format]);

  return output;
};

export default useColorThief;
