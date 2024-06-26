import {
  EngineSupport,
  RenderEvent,
  defineProcessor,
} from "@vis-three/middleware";
import {
  MixerAnimationConfig,
  getMixerAnimationConfig,
} from "../AnimationConfig";
import {
  AnimationAction,
  AnimationMixer,
  AnimationObjectGroup,
  Object3D,
} from "three";
import { AnimationCompiler } from "../AnimationCompiler";

const cachePlayMap: WeakMap<AnimationMixer, (render: RenderEvent) => void> =
  new WeakMap();

export default defineProcessor<
  MixerAnimationConfig,
  AnimationMixer,
  EngineSupport,
  AnimationCompiler
>({
  type: "MixerAnimation",
  config: getMixerAnimationConfig,
  create(config, engine, compiler) {
    let target: Object3D | AnimationObjectGroup;

    if (Array.isArray(config.target)) {
      target = new AnimationObjectGroup();
      config.target.forEach((vid) => {
        const object = engine.getObjectBySymbol(vid);
        if (!object) {
          console.warn(
            `mixer animation processor can not found vid in engine: ${vid}`
          );
        } else {
          (<AnimationObjectGroup>target).add(object);
        }
      });
    } else {
      target = engine.getObjectBySymbol(config.target);
      if (!target) {
        console.warn(
          `mixer animation processor can not found vid in engine: ${config.target}`
        );
        target = new Object3D();
      }
    }

    const mixer = new AnimationMixer(target);

    mixer.time = config.time;
    mixer.timeScale = config.timeScale;

    if (config.play) {
      const fun = (event: RenderEvent) => {
        mixer.update(event.delta);
      };

      compiler.playAnimation(fun);

      cachePlayMap.set(mixer, fun);
    }

    return mixer;
  },
  dispose(target, engine, compiler) {
    const fun = cachePlayMap.get(target);

    if (fun) {
      compiler.stopAnimation(fun);
      cachePlayMap.delete(target);
    }

    target.uncacheRoot(target.getRoot());
    //@ts-ignore
    target._actions.forEach((action: AnimationAction) => {
      const clip = action.getClip();
      target.uncacheClip(clip);
      target.uncacheAction(clip);
    });
  },
});
