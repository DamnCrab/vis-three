import"../modulepreload-polyfill.b7f2da20.js";/* empty css               */import{o as E,$ as f,bP as b,b7 as L,bQ as s,bR as y,aC as d,p as g,aL as c,bF as G,bG as N,bH as C,bI as x,bJ as I,R as S,bK as T,bL as v,bM as B,bN as A,bO as W,a1 as l,aF as H,N as R,q as r,aI as q,aK as w,aJ as D,a0 as P}from"../three.53c13b85.js";import{M as U}from"../index.887e5a6e.js";import{g as t}from"../index.f4616ae6.js";import"../index.8051b4a0.js";import"../index.553ea369.js";import"../index.322afd23.js";import"../index.b6f9a1a5.js";import"../index.54dc275e.js";import{g as V}from"../lil-gui.module.min.095a7f3d.js";import"../index.6949873b.js";import"../index.40bdee24.js";import"../index.0ac2cd23.js";import"../index.d5cadf5a.js";import"../index.cb88c218.js";import"../index.10df2fa4.js";import"../index.4dfb083f.js";import"../index.3d2d386e.js";import"../index.382e9bf2.js";import"../index.4d68b12a.js";import"../Antdv.35288747.js";import"../index.687db21f.js";import"../index.b0fe2ce4.js";import"../TextureDisplayer.d47ce54e.js";import"../index.e35148e2.js";import"../index.dc401cd6.js";import"../index.73cd6fe7.js";import"../index.c5c75baa.js";import"../index.c346d9e8.js";import"../index.0e5858b5.js";import"../index.e72b23c1.js";import"../index.0357ebfa.js";import"../index.e4863e82.js";import"../index.d9d3455e.js";import"../UnrealBloomPass.3e69e790.js";import"../index.8445d065.js";import"../index.adb60d71.js";import"../index.ef0218c2.js";import"../index.99d2f4c4.js";import"../index.26301b51.js";import"../G6.cf5ff0af.js";const i=new U().setDom(document.getElementById("app")).setSize().setStats(!0).play();t.injectEngine=i;const F=t("Scene");i.setSceneBySymbol(F.vid);t.injectScene=!0;i.loaderManager.setPath("/vis-three/examples/");i.loadResourcesAsync(["/texture/hdr/livingRoom.hdr"]).then(()=>{const e=t("LoadTexture",{url:"/texture/hdr/livingRoom.hdr",mapping:s,flipY:!0,encoding:l,minFilter:r,magFilter:r}),o=t("MeshBasicMaterial",{map:e.vid}),M=t("BoxGeometry",{width:20,height:20,depth:20}),u=t("SphereGeometry",{radius:10});t("Mesh",{geometry:M.vid,material:o.vid,position:{x:-25}}),t("Mesh",{geometry:u.vid,material:o.vid,position:{x:25}}),F.background=e.vid;const a=new V;a.add(e,"mapping",{UVMapping:E,CubeReflectionMapping:f,CubeRefractionMapping:b,EquirectangularReflectionMapping:L,EquirectangularRefractionMapping:s,CubeUVReflectionMapping:y}),a.add(e,"wrapS",{"THREE.RepeatWrapping":d,"THREE.ClampToEdgeWrapping":g,"THREE.MirroredRepeatWrapping":c}),a.add(e,"wrapT",{"THREE.RepeatWrapping":d,"THREE.ClampToEdgeWrapping":g,"THREE.MirroredRepeatWrapping":c}),a.add(e,"format",{AlphaFormat:G,RedFormat:N,RedIntegerFormat:C,RGFormat:x,RGIntegerFormat:I,RGBAFormat:S,RGBAIntegerFormat:T,LuminanceFormat:v,LuminanceAlphaFormat:B,DepthFormat:A,DepthStencilFormat:W}),a.add(e,"encoding",{LinearEncoding:l,sRGBEncoding:H}),a.add(e,"magFilter",{Nearest:R,Linear:r}),a.add(e,"minFilter",{Nearest:R,Linear:r,NearestMipmapNearest:q,NearestMipmapLinear:w,LinearMipmapNearest:D,LinearMipmapLinear:P}),a.add(e,"rotation",-Math.PI,Math.PI,.01),a.add({anisotropy:e.anisotropy},"anisotropy",1,5,1).onChange(h=>{e.anisotropy=2**h});const p=a.addFolder("repeat");p.add(e.repeat,"x",1,5,1),p.add(e.repeat,"y",1,5,1);const n=a.addFolder("offset");n.add(e.offset,"x",-1,1,.1),n.add(e.offset,"y",-1,1,.1);const m=a.addFolder("center");m.add(e.center,"x",-1,1,.1),m.add(e.center,"y",-1,1,.1)});
