import"../modulepreload-polyfill.b7f2da20.js";import{M as m}from"../index.790bec74.js";import{g as o}from"../vis-three.middleware.es.7f273029.js";import{g as p}from"../lil-gui.module.min.095a7f3d.js";import"../three.237d835c.js";import"../index.1d3a6ec0.js";import"../index.202ebdec.js";import"../index.2e2f06f6.js";import"../ShaderPass.02f07bc0.js";import"../vis-three.plugin-orbit-controls.es.9991f892.js";import"../index.f318ae8c.js";import"../index.4ec3bfd2.js";import"../index.ea2b9d59.js";import"../index.591a8368.js";import"../index.a30a6c1f.js";import"../index.12fd638d.js";import"../index.32dc3bb0.js";import"../vis-three.plugin-keyboard-manager.es.417ffa7e.js";import"../Antdv.414c4eb5.js";import"../index.edc751ad.js";import"../CSS3DRenderer.ba0f6fa5.js";import"../index.e6be8a02.js";import"../index.2f498209.js";import"../index.117a61e1.js";import"../index.3b8dbf96.js";import"../index.c0475655.js";import"../index.2328f892.js";import"../index.c35e5a3e.js";import"../vis-three.plugin-pointer-manager.es.640cfa1a.js";import"../index.cd2c2c2e.js";import"../index.a089cc34.js";import"../index.bca5cc71.js";import"../index.692e1021.js";import"../index.90db9154.js";import"../vis-three.module-particle.es.8e43cbb8.js";import"../UnrealBloomPass.2cdbe9ee.js";import"../index.ee52b7bf.js";import"../vis-three.convenient.es.7b860830.js";import"../index.bdaae9f1.js";import"../vis-three.strategy-orbit-controls-support.es.706978dc.js";import"../index.d3463d42.js";import"../vis-three.library-parser.es.5c9e4dac.js";import"../vis-three.strategy-multi-renderer.es.a35ffd0a.js";import"../vis-three.strategy-selection-prompt.es.fc4c19e4.js";import"../vis-three.plugin-loader-manager.es.c1771985.js";import"../G6.d44f13fb.js";const r=new m().setDom(document.getElementById("app")).setStats(!0).setSize().play();o.injectEngine=r;const e=o("Scene");r.setSceneBySymbol(e.vid);o.injectScene=e.vid;o("PointLight",{position:{x:30,y:50},distance:100});const n=o("MeshStandardMaterial"),a=o("BoxGeometry",{width:20,height:10,depth:20}),d=o("Mesh",{material:n.vid,geometry:a.vid}),t=o("OrthographicCamera",{far:200,position:{y:50},zoom:16,lookAt:d.vid}),i=new p;i.add(t,"left",-2e3,2e3,10);i.add(t,"right",-2e3,2e3,10);i.add(t,"top",-2e3,2e3,10);i.add(t,"bottom",-2e3,2e3,10);i.add(t,"near",0,2e3,10);i.add(t,"far",0,2e3,10);i.add(t,"zoom",0,50,1);i.add(t,"adaptiveWindow");document.getElementById("default").onclick=()=>{r.setViewpoint("default")};document.getElementById("orthographicCamera").onclick=()=>{r.setCameraBySymbol(t.vid)};window.addEventListener("resize",()=>{r.setSize()});
