import { MutableRefObject } from 'react';
export declare type ColorThiefColor = Array<number> | string | null;
export declare enum FormatString {
    rgb = "rgb",
    hex = "hex"
}
export interface ColorThiefOptions {
    format?: FormatString;
    quality?: number;
    colorCount?: number;
}
export interface ColorThiefOutput {
    color: ColorThiefColor;
    palette: Array<ColorThiefColor>;
}
/**
 * A hook to grab a primary color and a color palette from an image ref, url, or data url
 *
 * @param {string | MutableRefObject<HTMLImageElement>} source The source url or image ref to grab colors from
 * @param {ColorThiefOptions} options Options for generating colors, `format`, `colorCount`, and `quality`
 * @returns {ColorThiefOutput} The resulting color and palette from the input image
 */
declare const useColorThief: (source: string | MutableRefObject<HTMLImageElement>, options: ColorThiefOptions) => ColorThiefOutput;
export default useColorThief;
