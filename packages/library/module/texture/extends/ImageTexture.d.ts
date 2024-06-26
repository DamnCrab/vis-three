import { Mapping, PixelFormat, Texture, TextureDataType, TextureEncoding, TextureFilter, Wrapping } from "three";
export declare class ImageTexture extends Texture {
    constructor(image?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, mapping?: Mapping, wrapS?: Wrapping, wrapT?: Wrapping, magFilter?: TextureFilter, minFilter?: TextureFilter, format?: PixelFormat, type?: TextureDataType, anisotropy?: number, encoding?: TextureEncoding);
}
