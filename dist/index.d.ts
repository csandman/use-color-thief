import { MutableRefObject } from 'react';
export declare type ColorThiefColor = Array<number> | string | null;
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
 * Gets a primary color and a color palette from an image ref or url
 *
 * @param {string | MutableRefObject<HTMLImageElement>} source The source url or image ref to grab colors from
 * @param {ColorThiefOptions} options The second number to add.
 * @returns {ColorThiefOutput} The resulting color and palette from the input image
 */
declare const useColorThief: (source: string | MutableRefObject<HTMLImageElement>, options: ColorThiefOptions) => ColorThiefOutput;
export default useColorThief;
