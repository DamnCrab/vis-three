import"../modulepreload-polyfill.b7f2da20.js";/* empty css               */import{o as y,$ as F,bP as M,b7 as E,bQ as f,bR as h,aC as s,p as m,aL as g,bF as B,bG as b,bH as L,bI as w,bJ as V,R as j,bK as k,bL as G,bM as N,bN as C,bO as I,a1 as S,aF as T,N as d,q as l,aI as A,aK as W,aJ as v,a0 as H}from"../three.53c13b85.js";import{M as q}from"../index.887e5a6e.js";import{g as t}from"../index.f4616ae6.js";import"../index.8051b4a0.js";import"../index.553ea369.js";import"../index.322afd23.js";import"../index.b6f9a1a5.js";import"../index.54dc275e.js";import{g as z}from"../lil-gui.module.min.095a7f3d.js";import"../index.6949873b.js";import"../index.40bdee24.js";import"../index.0ac2cd23.js";import"../index.d5cadf5a.js";import"../index.cb88c218.js";import"../index.10df2fa4.js";import"../index.4dfb083f.js";import"../index.3d2d386e.js";import"../index.382e9bf2.js";import"../index.4d68b12a.js";import"../Antdv.35288747.js";import"../index.687db21f.js";import"../index.b0fe2ce4.js";import"../TextureDisplayer.d47ce54e.js";import"../index.e35148e2.js";import"../index.dc401cd6.js";import"../index.73cd6fe7.js";import"../index.c5c75baa.js";import"../index.c346d9e8.js";import"../index.0e5858b5.js";import"../index.e72b23c1.js";import"../index.0357ebfa.js";import"../index.e4863e82.js";import"../index.d9d3455e.js";import"../UnrealBloomPass.3e69e790.js";import"../index.8445d065.js";import"../index.adb60d71.js";import"../index.ef0218c2.js";import"../index.99d2f4c4.js";import"../index.26301b51.js";import"../G6.cf5ff0af.js";const r=new q().setDom(document.getElementById("app")).setSize().setStats(!0).play();t.injectEngine=r;const c=t("Scene");r.setSceneBySymbol(c.vid);t.injectScene=!0;r.loaderManager.setPath("/vis-three/examples/");r.loadResourcesAsync(["/texture/skyBox/snowVillage/nx.jpg","/texture/skyBox/snowVillage/ny.jpg","/texture/skyBox/snowVillage/nz.jpg","/texture/skyBox/snowVillage/px.jpg","/texture/skyBox/snowVillage/py.jpg","/texture/skyBox/snowVillage/pz.jpg"]).then(()=>{const e=t("ImageTexture",{url:"/texture/skyBox/snowVillage/nx.jpg"}),i=t("MeshBasicMaterial",{map:e.vid}),u=t("BoxGeometry",{width:20,height:20,depth:20}),x=t("SphereGeometry",{radius:10});t("Mesh",{geometry:u.vid,material:i.vid,position:{x:-25}}),t("Mesh",{geometry:x.vid,material:i.vid,position:{x:25}}),c.background=e.vid;const a=new z;a.add(e,"url",["/texture/skyBox/snowVillage/nx.jpg","/texture/skyBox/snowVillage/ny.jpg","/texture/skyBox/snowVillage/nz.jpg","/texture/skyBox/snowVillage/px.jpg","/texture/skyBox/snowVillage/py.jpg","/texture/skyBox/snowVillage/pz.jpg"]),a.add(e,"mapping",{UVMapping:y,CubeReflectionMapping:F,CubeRefractionMapping:M,EquirectangularReflectionMapping:E,EquirectangularRefractionMapping:f,CubeUVReflectionMapping:h}),a.add(e,"wrapS",{"THREE.RepeatWrapping":s,"THREE.ClampToEdgeWrapping":m,"THREE.MirroredRepeatWrapping":g}),a.add(e,"wrapT",{"THREE.RepeatWrapping":s,"THREE.ClampToEdgeWrapping":m,"THREE.MirroredRepeatWrapping":g}),a.add(e,"format",{AlphaFormat:B,RedFormat:b,RedIntegerFormat:L,RGFormat:w,RGIntegerFormat:V,RGBAFormat:j,RGBAIntegerFormat:k,LuminanceFormat:G,LuminanceAlphaFormat:N,DepthFormat:C,DepthStencilFormat:I}),a.add(e,"encoding",{LinearEncoding:S,sRGBEncoding:T}),a.add(e,"magFilter",{Nearest:d,Linear:l}),a.add(e,"minFilter",{Nearest:d,Linear:l,NearestMipmapNearest:A,NearestMipmapLinear:W,LinearMipmapNearest:v,LinearMipmapLinear:H}),a.add(e,"rotation",-Math.PI,Math.PI,.01),a.add({anisotropy:e.anisotropy},"anisotropy",1,5,1).onChange(R=>{e.anisotropy=2**R});const o=a.addFolder("repeat");o.add(e.repeat,"x",1,5,1),o.add(e.repeat,"y",1,5,1);const p=a.addFolder("offset");p.add(e.offset,"x",-1,1,.1),p.add(e.offset,"y",-1,1,.1);const n=a.addFolder("center");n.add(e.center,"x",-1,1,.1),n.add(e.center,"y",-1,1,.1)});
