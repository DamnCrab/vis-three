import"../modulepreload-polyfill.b7f2da20.js";import{n as l}from"../three.237d835c.js";import{g as t,a as i}from"../vis-three.middleware.es.7f273029.js";import{M as g}from"../index.790bec74.js";import{g as v}from"../lil-gui.module.min.095a7f3d.js";import"../index.202ebdec.js";import"../vis-three.plugin-loader-manager.es.c1771985.js";import"../vis-three.plugin-pointer-manager.es.640cfa1a.js";import"../index.c35e5a3e.js";import"../index.e6be8a02.js";import"../G6.d44f13fb.js";import"../Antdv.414c4eb5.js";import"../index.1d3a6ec0.js";import"../index.2e2f06f6.js";import"../ShaderPass.02f07bc0.js";import"../vis-three.plugin-orbit-controls.es.9991f892.js";import"../index.f318ae8c.js";import"../index.4ec3bfd2.js";import"../index.ea2b9d59.js";import"../index.591a8368.js";import"../index.a30a6c1f.js";import"../index.12fd638d.js";import"../index.32dc3bb0.js";import"../vis-three.plugin-keyboard-manager.es.417ffa7e.js";import"../index.edc751ad.js";import"../CSS3DRenderer.ba0f6fa5.js";import"../index.2f498209.js";import"../index.117a61e1.js";import"../index.3b8dbf96.js";import"../index.c0475655.js";import"../index.2328f892.js";import"../index.cd2c2c2e.js";import"../index.a089cc34.js";import"../index.bca5cc71.js";import"../index.692e1021.js";import"../index.90db9154.js";import"../vis-three.module-particle.es.8e43cbb8.js";import"../UnrealBloomPass.2cdbe9ee.js";import"../index.ee52b7bf.js";import"../vis-three.convenient.es.7b860830.js";import"../index.bdaae9f1.js";import"../vis-three.strategy-orbit-controls-support.es.706978dc.js";import"../index.d3463d42.js";import"../vis-three.library-parser.es.5c9e4dac.js";import"../vis-three.strategy-multi-renderer.es.a35ffd0a.js";import"../vis-three.strategy-selection-prompt.es.fc4c19e4.js";const n=new g().setDom(document.getElementById("app")).setSize().play();t.injectEngine=n;const h=t("Scene");n.setSceneBySymbol(h.vid);t.injectScene=!0;const e=t(i.PATH,{autoClose:!1});window.drawPath=e;const m=t(i.PATHGEOMETRY,{path:e.vid,space:!1}),s=t(i.LINEBASICMATERIAL,{});t(i.LINE,{material:s.vid,geometry:m.vid});const u=t(i.SHAPE,{shape:e.vid}),a=t(i.EXTRUDEGEOMETRY,{shapes:u.vid,options:{depth:10,bevelEnabled:!1}});t(i.MESH,{material:s.vid,geometry:a.vid,position:{x:-50,z:-20}});new l;let r=[];const p=n.pathSketcher.showDrawingBoard(!0).setSketcherByPlane().changeToDrawingView().beginDraw();console.log(p.camera);const c=new v;p.addEventListener("write",o=>{e.curves.push({curve:"line",params:[o.point.x,o.point.y,0,0]}),r=e.curves[e.curves.length-1].params,m.divisions=e.curves.length*256,c.add(e.curves[e.curves.length-1].params,"0",1,130)});p.addEventListener("move",o=>{r[r.length-2]=o.point.x,r[r.length-1]=o.point.y});p.addEventListener("end",o=>{console.log(e.curves.length),e.curves.pop(),console.log(e.curves.length)});const d=()=>{n.setViewpoint("default"),p.endDraw()};document.getElementById("default").onclick=d;document.addEventListener("keydown",o=>{o.keyCode===13&&d()});c.add(a.options,"depth",1,30,2);window.engine=n;
