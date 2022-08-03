import { CanvasTexture } from "three";
import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { ImageTexture } from "../../../extends/texture/ImageTexture";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { CanvasTextureConfig } from "../TextureConfig";
import { needUpdateRegCommand } from "./common";

export default defineProcessor<CanvasTextureConfig, CanvasTexture>({
  configType: CONFIGTYPE.CANVASTEXTURE,
  commands: {
    set: {
      url({ target, value, engine }) {
        target.image = engine.compilerManager.textureCompiler.getResource(
          value,
          HTMLCanvasElement
        );
        target.needsUpdate = true;
      },
      $reg: [needUpdateRegCommand],
    },
  },
  create(config: CanvasTextureConfig, engine: EngineSupport): CanvasTexture {
    const texture = new CanvasTexture(
      engine.compilerManager.textureCompiler.getResource(
        config.url,
        HTMLCanvasElement
      ) as HTMLCanvasElement
    );

    syncObject(config, texture, {
      type: true,
      url: true,
    });

    texture.needsUpdate = true;

    return texture;
  },

  dispose(target: ImageTexture): void {
    target.dispose();
  },
});
