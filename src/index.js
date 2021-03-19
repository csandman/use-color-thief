import { useState, useEffect } from 'react';
import ColorThief from 'colorthief/dist/color-thief.mjs';

const rgbToHex = (r, g, b) => {
  const toHex = (c) => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const useColorThief = (
  source,
  { format = 'rgb', quality = 10, colorCount = 10 } = {}
) => {
  const [url, setUrl] = useState('');
  const [output, setOutput] = useState({
    color: null,
    palette: null,
  });

  // Get the url to use for generating a palette
  useEffect(() => {
    if (source) {
      if (
        source.current &&
        source.current instanceof HTMLImageElement &&
        // When no url is passed, getting the 'src' attribute returns the page url
        source.current.src !== window.location.href
      ) {
        const setCurrentSrc = () => {
          if (source.current.src) {
            setUrl(source.current.src);
          }
        };
        setCurrentSrc();

        const observer = new MutationObserver(setCurrentSrc);
        observer.observe(source.current, { attributes: true });
        return () => {
          observer.disconnect();
        };
      }
      if (typeof source === 'string' && source.length) {
        setUrl(source);
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
            color = rgbToHex(...color);
            palette = palette.map((rgb) => rgbToHex(...rgb));
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
