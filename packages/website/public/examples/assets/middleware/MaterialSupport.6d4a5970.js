import"../modulepreload-polyfill.b7f2da20.js";import{M as p}from"../index.7ee6895f.js";import{n as a,g as t}from"../vis-three.middleware.es.2e80d21b.js";import{u as l}from"../vis-three.library-shader.es.25ea0717.js";import{C as d}from"../vis-three.convenient.es.83638baf.js";import"../index.1d7ad8b9.js";import"../index.7d48aff8.js";import"../three.837c9bb0.js";import"../index.388dadd4.js";import"../Pass.1ae4f2a0.js";import"../index.763ed6df.js";import"../index.62992928.js";import"../index.f4f5b765.js";import"../index.a87f8394.js";import"../index.9a7b1aa5.js";import"../index.8de980d1.js";import"../index.9f3e0a95.js";import"../vis-three.plugin-keyboard-manager.es.9570acee.js";import"../Antdv.a86c3c0d.js";import"../index.dfadcd6f.js";import"../CSS3DRenderer.d266155a.js";import"../index.9c42f01c.js";import"../index.ddb76977.js";import"../index.b828c96c.js";import"../index.cfcd8596.js";import"../index.f7cac396.js";import"../index.9dfaa1ec.js";import"../index.ce95ade9.js";import"../vis-three.plugin-pointer-manager.es.86f17451.js";import"../index.484afc60.js";import"../index.29f340c8.js";import"../index.cfa4ec79.js";import"../index.ec2b829b.js";import"../index.aa7ffc23.js";import"../vis-three.module-animation-action.es.09a94f96.js";import"../UnrealBloomPass.caa1ad7b.js";import"../index.4192aafc.js";import"../index.e327b72e.js";import"../vis-three.strategy-orbit-controls-support.es.7f0e9f15.js";import"../vis-three.library-parser.es.80d54b6a.js";import"../vis-three.strategy-multi-renderer.es.c7860e7e.js";import"../vis-three.plugin-loader-manager.es.7fbd57ff.js";import"../G6.7a2bba98.js";a.register(l);const g=new d({width:256,height:256}).draw(e=>{e.textBaseline="middle",e.textAlign="center",e.fillStyle="rgb(206, 42, 230)",e.font=" bold 48px \u5FAE\u8F6F\u96C5\u9ED1",e.fillText("MATERIAL",128,128)}),r=new p().setDom(document.getElementById("app")).setSize().setStats(!0).registerResources({"example.canvas":g.get()});window.engine=r;t.injectEngine=r;const n=t("Scene");t.injectScene=n.vid;t("PointLight",{position:{x:30,y:50},distance:100});const i=t("BoxGeometry",{width:10,height:10,depth:10,groups:[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}]}),c=t("CanvasTexture",{url:"example.canvas"}),m=t("MeshStandardMaterial",{metalness:.5,roughness:.5,color:"rgb(100, 200, 100)",transparent:!0,opacity:.5,alphaTest:0}),v=t("MeshPhongMaterial",{color:"rgb(100, 100, 200)"}),s=t("SpriteMaterial",{map:c.vid});window.spriteMaterial=s;const h=t("LineBasicMaterial"),M=t("PointsMaterial"),o=t("ShaderMaterial",a.generateConfig("uvPulseShader"),{strict:!1});t("Mesh",{material:m.vid,geometry:i.vid,position:{x:-10}});t("Mesh",{material:v.vid,geometry:i.vid,position:{x:10}});t("Sprite",{material:s.vid,scale:{x:10,y:10},position:{y:15}});t("Line",{material:h.vid,geometry:i.vid,position:{z:10}});t("Points",{material:M.vid,geometry:i.vid,position:{z:-10}});t("Mesh",{material:o.vid,geometry:i.vid,position:{x:10,z:10}});t("Mesh",{material:[m.vid,o.vid],geometry:i.vid,position:{x:-10,z:10}});r.setSceneBySymbol(n.vid).play();r.renderManager.addEventListener("render",e=>{o.uniforms.time.value+=e.delta*5});window.engine=r;