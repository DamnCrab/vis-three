import { ENGINE_EVENT, } from "@vis-three/core";
import { RGBAFormat, Vector2, WebGLMultisampleRenderTarget, WebGLRenderTarget, } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
export const EffectComposerPlugin = function (params) {
    let setCameraFun;
    let setSizeFun;
    let setSceneFun;
    let renderFun;
    let cacheRender;
    return {
        name: "EffectComposerPlugin",
        deps: "WebGLRendererPlugin",
        order: true,
        install(engine) {
            let composer;
            if (params.WebGLMultisampleRenderTarget || params.MSAA) {
                const renderer = engine.webGLRenderer;
                const pixelRatio = renderer.getPixelRatio();
                const size = renderer.getDrawingBufferSize(new Vector2());
                if (Number(window.__THREE__) > 137) {
                    composer = new EffectComposer(renderer, new WebGLRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
                        format: params.format || RGBAFormat,
                        // @ts-ignore
                        samples: params.samples || 4,
                    }));
                }
                else {
                    composer = new EffectComposer(renderer, new WebGLMultisampleRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
                        format: params.format || RGBAFormat,
                    }));
                }
            }
            else {
                composer = new EffectComposer(engine.webGLRenderer);
            }
            engine.effectComposer = composer;
            const renderPass = new RenderPass(engine.scene, engine.camera);
            composer.addPass(renderPass);
            setCameraFun = (event) => {
                renderPass.camera = event.camera;
            };
            engine.addEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            setSceneFun = (event) => {
                renderPass.scene = event.scene;
            };
            engine.addEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
            setSizeFun = (event) => {
                composer.setSize(event.width, event.height);
            };
            engine.addEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            cacheRender = engine.render;
            engine.render = function () {
                this.effectComposer.render();
                return this;
            };
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            engine.addEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
            engine.addEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            engine.render = cacheRender;
            delete engine.effectComposer;
        },
        installDeps: {
            RenderManagerPlugin(engine) {
                engine.renderManager.removeEventListener(ENGINE_EVENT.SETSIZE, cacheRender);
                renderFun = (event) => {
                    engine.effectComposer.render(event.delta);
                };
                engine.renderManager.addEventListener(ENGINE_EVENT.SETSIZE, renderFun);
            },
        },
        disposeDeps: {
            RenderManagerPlugin(engine) {
                engine.renderManager.removeEventListener(ENGINE_EVENT.SETSIZE, renderFun);
            },
        },
    };
};