import"../modulepreload-polyfill.b7f2da20.js";import{M as i}from"../index.790bec74.js";import{g as t}from"../vis-three.middleware.es.7f273029.js";import"../three.237d835c.js";import"../index.1d3a6ec0.js";import"../index.202ebdec.js";import"../index.2e2f06f6.js";import"../ShaderPass.02f07bc0.js";import"../vis-three.plugin-orbit-controls.es.9991f892.js";import"../index.f318ae8c.js";import"../index.4ec3bfd2.js";import"../index.ea2b9d59.js";import"../index.591a8368.js";import"../index.a30a6c1f.js";import"../index.12fd638d.js";import"../index.32dc3bb0.js";import"../vis-three.plugin-keyboard-manager.es.417ffa7e.js";import"../Antdv.414c4eb5.js";import"../index.edc751ad.js";import"../CSS3DRenderer.ba0f6fa5.js";import"../index.e6be8a02.js";import"../index.2f498209.js";import"../index.117a61e1.js";import"../index.3b8dbf96.js";import"../index.c0475655.js";import"../index.2328f892.js";import"../index.c35e5a3e.js";import"../vis-three.plugin-pointer-manager.es.640cfa1a.js";import"../index.cd2c2c2e.js";import"../index.a089cc34.js";import"../index.bca5cc71.js";import"../index.692e1021.js";import"../index.90db9154.js";import"../vis-three.module-particle.es.8e43cbb8.js";import"../UnrealBloomPass.2cdbe9ee.js";import"../index.ee52b7bf.js";import"../vis-three.convenient.es.7b860830.js";import"../index.bdaae9f1.js";import"../vis-three.strategy-orbit-controls-support.es.706978dc.js";import"../index.d3463d42.js";import"../vis-three.library-parser.es.5c9e4dac.js";import"../vis-three.strategy-multi-renderer.es.a35ffd0a.js";import"../vis-three.strategy-selection-prompt.es.fc4c19e4.js";import"../vis-three.plugin-loader-manager.es.c1771985.js";import"../G6.d44f13fb.js";const e=new i().setDom(document.getElementById("app")).setStats(!0).setSize().play();e.registerResources({"examples.css3DObject":document.getElementById("element1"),"examples.css3DObject2":document.getElementById("element2"),"examples.css3DObject3":document.getElementById("element3")});t.injectEngine=e;const o=t("Scene");e.setSceneBySymbol(o.vid);t.injectScene=!0;t("PointLight",{position:{x:30,y:50},distance:100});const m=t("MeshStandardMaterial",{color:"rgb(255, 0, 0)"}),r=t("BoxGeometry",{width:20,height:40,depth:60});t("BoxGeometry",{width:20,height:40,depth:60});t("Mesh",{geometry:r.vid,material:m.vid});t("CSS3DPlane",{element:"examples.css3DObject",width:200,height:200,position:{x:-50,y:10},rotation:{y:Math.PI/180*20},scale:{x:.1,y:.1,z:.1}});t("CSS3DPlane",{element:"examples.css3DObject2",width:200,height:220,position:{x:50,y:10},rotation:{y:-(Math.PI/180)*20},scale:{x:.1,y:.1,z:.1}});t("CSS2DPlane",{element:"examples.css3DObject3",width:200,height:100,position:{z:-30,y:10},scale:{x:.5,y:.5,z:.5}});window.engine=e;
