import"../common.006007ed.js";import{t as s,at as p,aT as m,aU as E,aV as M,aW as h,aX as L,aY as y,ap as f,aZ as v,a_ as T,a$ as N,b0 as G,b1 as S,av as A,w as I,N as g,y as l,b2 as W,b3 as j,b4 as B,au as H}from"../three.1b4256b1.js";import{M as b,g as t}from"../Vis.es.dd28f8ae.js";/* empty css               */import{g as x}from"../lil-gui.module.min.2e05211e.js";import{m as n}from"../Antd.5c304842.js";import"../vis-three.72224a55.js";const r=new b().setDom(document.getElementById("app")).setSize().setStats(!0).play();n.loading({content:"\u6B63\u5728\u52A0\u8F7D\u8D44\u6E90\uFF1A0%",key:"loading",duration:0});r.loaderManager.addEventListener("loading",e=>{n.loading({content:`\u6B63\u5728\u52A0\u8F7D\u8D44\u6E90\uFF1A${parseInt((e.loadSuccess/e.loadTotal*100).toString())}
      %`,key:"loading",duration:0})});r.loaderManager.addEventListener("loaded",e=>{n.success({content:"\u52A0\u8F7D\u5B8C\u6210\uFF01",key:"loading",duration:1})});t.injectEngine=r;const c=t("Scene");r.setScene(c.vid);t.injectScene=!0;r.loaderManager.setPath("/vis-three/examples/");console.log(r);r.loadResourcesAsync(["/video/1.mp4","/video/Redia-HatsuneMiku.mp4"]).then(()=>{const e=t("VideoTexture",{url:"/video/Redia-HatsuneMiku.mp4"}),F=t("MeshBasicMaterial",{map:e.vid}),R=t("BoxGeometry",{width:20,height:20,depth:20});t("Mesh",{geometry:R.vid,material:F.vid}),c.background=e.vid;const a=new x;a.add(e,"url",["/video/1.mp4","/video/Redia-HatsuneMiku.mp4"]),a.add(e,"wrapS",{"THREE.RepeatWrapping":s,"THREE.ClampToEdgeWrapping":p,"THREE.MirroredRepeatWrapping":m}),a.add(e,"wrapT",{"THREE.RepeatWrapping":s,"THREE.ClampToEdgeWrapping":p,"THREE.MirroredRepeatWrapping":m}),a.add(e,"format",{AlphaFormat:E,RedFormat:M,RedIntegerFormat:h,RGFormat:L,RGIntegerFormat:y,RGBAFormat:f,RGBAIntegerFormat:v,LuminanceFormat:T,LuminanceAlphaFormat:N,DepthFormat:G,DepthStencilFormat:S}),a.add(e,"encoding",{LinearEncoding:A,sRGBEncoding:I}),a.add(e,"magFilter",{Nearest:g,Linear:l}),a.add(e,"minFilter",{Nearest:g,Linear:l,NearestMipmapNearest:W,NearestMipmapLinear:j,LinearMipmapNearest:B,LinearMipmapLinear:H}),a.add(e,"rotation",-Math.PI,Math.PI,.01),a.add({anisotropy:e.anisotropy},"anisotropy",1,5,1).onChange(u=>{e.anisotropy=2**u});const i=a.addFolder("repeat");i.add(e.repeat,"x",1,5,1),i.add(e.repeat,"y",1,5,1);const o=a.addFolder("offset");o.add(e.offset,"x",-1,1,.1),o.add(e.offset,"y",-1,1,.1);const d=a.addFolder("center");d.add(e.center,"x",-1,1,.1),d.add(e.center,"y",-1,1,.1)});
