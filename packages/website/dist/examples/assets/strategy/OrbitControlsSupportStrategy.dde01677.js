import"../modulepreload-polyfill.b7f2da20.js";import{W as r,C as n}from"../index.1d7ad8b9.js";import{E as d}from"../index.388dadd4.js";import{O as m}from"../index.763ed6df.js";import{G as p}from"../index.9a7b1aa5.js";import{O as s}from"../index.cfcd8596.js";import{E as l}from"../index.b828c96c.js";import{o as g,g as a}from"../vis-three.middleware.es.2e80d21b.js";import{c,i as u,p as f,l as h,f as S,k as P,h as x}from"../vis-three.module-animation-action.es.09a94f96.js";import{g as b}from"../lil-gui.module.min.095a7f3d.js";import{O as y}from"../vis-three.strategy-orbit-controls-support.es.7f0e9f15.js";import"../index.7d48aff8.js";import"../three.837c9bb0.js";import"../Pass.1ae4f2a0.js";import"../index.9c42f01c.js";import"../vis-three.plugin-loader-manager.es.7fbd57ff.js";import"../vis-three.plugin-pointer-manager.es.86f17451.js";import"../index.ce95ade9.js";import"../G6.7a2bba98.js";import"../Antdv.a86c3c0d.js";import"../UnrealBloomPass.caa1ad7b.js";import"../CSS3DRenderer.d266155a.js";import"../index.4192aafc.js";import"../vis-three.convenient.es.83638baf.js";const o=g({plugins:[r({antialias:!0,alpha:!0}),d({MSAA:!0}),n(),m(),p()],strategy:[s(),l(),y()],modules:[c,u,f,h,S,P,x]}).setDom(document.getElementById("app")).setSize().play();a.injectEngine=o;const i=a("Scene");o.setSceneBySymbol(i.vid);a.injectScene=i.vid;a("PointLight",{position:{x:30,y:50},distance:100});const M=a("MeshStandardMaterial"),A=a("BoxGeometry",{width:20,height:10,depth:20});a("Mesh",{material:M.vid,geometry:A.vid});const e=a("OrbitControls",{autoRotate:!0});window.engine=o;const t=new b;t.add(e,"enabled");t.add(e,"autoRotate");t.add(e,"autoRotateSpeed",-5,5,.1);t.add(e,"enableDamping");t.add(e,"dampingFactor",-5,5,.1);t.add(e,"enablePan");t.add(e,"panSpeed",-5,5,.1);t.add(e,"enableRotate");t.add(e,"rotateSpeed",-5,5,.1);t.add(e,"enableZoom");t.add(e,"zoomSpeed",-5,5,.1);t.add(e,"maxAzimuthAngle",-2*Math.PI,2*Math.PI,.1);t.add(e,"maxDistance",0,200,1);t.add(e,"maxPolarAngle",0,Math.PI,.1);t.add(e,"maxZoom",0,100,1);t.add(e,"minAzimuthAngle",-2*Math.PI,2*Math.PI,.1);t.add(e,"minDistance",0,200,1);t.add(e,"minPolarAngle",0,Math.PI,.1);t.add(e,"minZoom",0,100,1);window.addEventListener("resize",()=>{o.setSize()});