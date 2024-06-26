import {
  defineProcessor,
  EngineSupport,
  MODULETYPE,
} from "@vis-three/middleware";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "@vis-three/module-solid-object";
import { Sprite, SpriteMaterial } from "three";
import { SpriteCompiler } from "../SpriteCompiler";
import { getSpriteConfig, SpriteConfig } from "../SpriteConfig";

const spriteReplaceMaterial = new SpriteMaterial({
  color: "rgb(123, 123, 123)",
});

export default defineProcessor<
  SpriteConfig,
  Sprite,
  EngineSupport,
  SpriteCompiler
>({
  type: "Sprite",
  config: getSpriteConfig,
  commands: {
    add: (
      solidObjectCommands as unknown as SolidObjectCommands<
        SpriteConfig,
        Sprite
      >
    ).add,
    set: {
      lookAt() {},
      ...(
        solidObjectCommands as unknown as SolidObjectCommands<
          SpriteConfig,
          Sprite
        >
      ).set,
      material({ target, engine, value }) {
        const material = engine.compilerManager.getObjectfromModule(
          MODULETYPE.MATERIAL,
          value
        );

        if (material && material instanceof SpriteMaterial) {
          target.material = material;
        } else {
          target.material = spriteReplaceMaterial;
        }
      },
    },
    delete: (
      solidObjectCommands as unknown as SolidObjectCommands<
        SpriteConfig,
        Sprite
      >
    ).add,
  },
  create(config: SpriteConfig, engine: EngineSupport): Sprite {
    const sprite = new Sprite();

    const material = engine.compilerManager.getObjectfromModule(
      MODULETYPE.MATERIAL,
      config.material
    );

    if (material && material instanceof SpriteMaterial) {
      sprite.material = material;
    } else {
      sprite.material = spriteReplaceMaterial;
    }

    return solidObjectCreate(
      sprite,
      config,
      {
        geometry: true,
        material: true,
        lookAt: true,
      },
      engine
    );
  },
  dispose: solidObjectDispose,
});
