import"../modulepreload-polyfill.b7f2da20.js";/* empty css               */import{b$ as d}from"../three.237d835c.js";import{M as g}from"../index.790bec74.js";import{g as e,t as b,a as n,i as S}from"../vis-three.middleware.es.7f273029.js";import"../index.1d3a6ec0.js";import"../index.202ebdec.js";import"../index.2e2f06f6.js";import"../ShaderPass.02f07bc0.js";import"../vis-three.plugin-orbit-controls.es.9991f892.js";import"../index.f318ae8c.js";import"../index.4ec3bfd2.js";import"../index.ea2b9d59.js";import"../index.591a8368.js";import"../index.a30a6c1f.js";import"../index.12fd638d.js";import"../index.32dc3bb0.js";import"../vis-three.plugin-keyboard-manager.es.417ffa7e.js";import"../Antdv.414c4eb5.js";import"../index.edc751ad.js";import"../CSS3DRenderer.ba0f6fa5.js";import"../index.e6be8a02.js";import"../index.2f498209.js";import"../index.117a61e1.js";import"../index.3b8dbf96.js";import"../index.c0475655.js";import"../index.2328f892.js";import"../index.c35e5a3e.js";import"../vis-three.plugin-pointer-manager.es.640cfa1a.js";import"../index.cd2c2c2e.js";import"../index.a089cc34.js";import"../index.bca5cc71.js";import"../index.692e1021.js";import"../index.90db9154.js";import"../vis-three.module-particle.es.8e43cbb8.js";import"../UnrealBloomPass.2cdbe9ee.js";import"../index.ee52b7bf.js";import"../vis-three.convenient.es.7b860830.js";import"../index.bdaae9f1.js";import"../vis-three.strategy-orbit-controls-support.es.706978dc.js";import"../index.d3463d42.js";import"../vis-three.library-parser.es.5c9e4dac.js";import"../vis-three.strategy-multi-renderer.es.a35ffd0a.js";import"../vis-three.strategy-selection-prompt.es.fc4c19e4.js";import"../vis-three.plugin-loader-manager.es.c1771985.js";import"../G6.d44f13fb.js";const t=new g().setDom(document.getElementById("app")).setStats(!0).setSize().play();e.injectEngine=t;const a=e("Scene");t.setSceneBySymbol(a.vid);e.injectScene=!0;t.loaderManager.setPath("/examples/");e("AmbientLight",{intensity:10});e.autoInject=!1;t.loaderManager.getLoader("glb").dracoLoader.setDecoderPath("/examples//draco/gltf/");t.loadResourcesAsync(["model/glb/Soldier.glb"]).then(r=>{const i=b.observable(r.resourceConfig["model/glb/Soldier.glb"]);t.loadConfig(i);const l=r.configMap.get("model/glb/Soldier.glb.scene"),o=t.getConfigBySymbol(l.vid);o.scale.x=20,o.scale.y=20,o.scale.z=20,a.children.push(o.vid);const s=t.getObjectBySymbol(i.skinnedMesh[0].vid),m=e(n.MIXERANIMATION,{target:o.vid}),c=e(n.ANIMATIONACTION,{mixer:m.vid,clip:i.animationClip[1].vid});t.applyConfig(m,c),S.append(()=>{const p=new d(s.skeleton.bones[0]);return p.material.linewidth=2,t.scene.add(p),!0})});window.engine=t;
