import"../common.006007ed.js";import{t as i,at as l,aT as x,aU as j,aV as B,aW as w,aX as c,aY as k,ap as V,aZ as F,a_ as R,a$ as E,b0 as z,b1 as L,av as b,w as M,N as d,y,b2 as h,b3 as f,b4 as T,au as N}from"../three.1b4256b1.js";import{M as S,g as n}from"../Vis.es.dd28f8ae.js";/* empty css               */import{g as A}from"../lil-gui.module.min.2e05211e.js";import{m as s}from"../Antd.5c304842.js";import"../vis-three.72224a55.js";const t=new S().setDom(document.getElementById("app")).setSize().setStats(!0).play();s.loading({content:"\u6B63\u5728\u52A0\u8F7D\u8D44\u6E90\uFF1A0%",key:"loading",duration:0});t.loaderManager.addEventListener("loading",e=>{s.loading({content:`\u6B63\u5728\u52A0\u8F7D\u8D44\u6E90\uFF1A${parseInt((e.loadSuccess/e.loadTotal*100).toString())}
      %`,key:"loading",duration:0})});t.loaderManager.addEventListener("loaded",e=>{s.success({content:"\u52A0\u8F7D\u5B8C\u6210\uFF01",key:"loading",duration:1})});n.injectEngine=t;const u=n("Scene");t.setScene(u.vid);n.injectScene=!0;t.loaderManager.setPath("/vis-three/examples/");console.log(t);t.loadResourcesAsync(["/texture/skyBox/snowVillage/nx.jpg","/texture/skyBox/snowVillage/ny.jpg","/texture/skyBox/snowVillage/nz.jpg","/texture/skyBox/snowVillage/px.jpg","/texture/skyBox/snowVillage/py.jpg","/texture/skyBox/snowVillage/pz.jpg"]).then(()=>{const e=n("CubeTexture",{cube:{nx:"/texture/skyBox/snowVillage/nx.jpg",ny:"/texture/skyBox/snowVillage/ny.jpg",nz:"/texture/skyBox/snowVillage/nz.jpg",px:"/texture/skyBox/snowVillage/px.jpg",py:"/texture/skyBox/snowVillage/py.jpg",pz:"/texture/skyBox/snowVillage/pz.jpg"}});u.background=e.vid;const a=new A,o=a.addFolder("cube");o.add(e.cube,"nx",["/texture/skyBox/snowVillage/nx.jpg","/texture/skyBox/snowVillage/ny.jpg","/texture/skyBox/snowVillage/nz.jpg","/texture/skyBox/snowVillage/px.jpg","/texture/skyBox/snowVillage/py.jpg","/texture/skyBox/snowVillage/pz.jpg"]),o.add(e.cube,"ny",["/texture/skyBox/snowVillage/nx.jpg","/texture/skyBox/snowVillage/ny.jpg","/texture/skyBox/snowVillage/nz.jpg","/texture/skyBox/snowVillage/px.jpg","/texture/skyBox/snowVillage/py.jpg","/texture/skyBox/snowVillage/pz.jpg"]),o.add(e.cube,"nz",["/texture/skyBox/snowVillage/nx.jpg","/texture/skyBox/snowVillage/ny.jpg","/texture/skyBox/snowVillage/nz.jpg","/texture/skyBox/snowVillage/px.jpg","/texture/skyBox/snowVillage/py.jpg","/texture/skyBox/snowVillage/pz.jpg"]),o.add(e.cube,"px",["/texture/skyBox/snowVillage/nx.jpg","/texture/skyBox/snowVillage/ny.jpg","/texture/skyBox/snowVillage/nz.jpg","/texture/skyBox/snowVillage/px.jpg","/texture/skyBox/snowVillage/py.jpg","/texture/skyBox/snowVillage/pz.jpg"]),o.add(e.cube,"py",["/texture/skyBox/snowVillage/nx.jpg","/texture/skyBox/snowVillage/ny.jpg","/texture/skyBox/snowVillage/nz.jpg","/texture/skyBox/snowVillage/px.jpg","/texture/skyBox/snowVillage/py.jpg","/texture/skyBox/snowVillage/pz.jpg"]),o.add(e.cube,"pz",["/texture/skyBox/snowVillage/nx.jpg","/texture/skyBox/snowVillage/ny.jpg","/texture/skyBox/snowVillage/nz.jpg","/texture/skyBox/snowVillage/px.jpg","/texture/skyBox/snowVillage/py.jpg","/texture/skyBox/snowVillage/pz.jpg"]),a.add(e,"wrapS",{"THREE.RepeatWrapping":i,"THREE.ClampToEdgeWrapping":l,"THREE.MirroredRepeatWrapping":x}),a.add(e,"wrapT",{"THREE.RepeatWrapping":i,"THREE.ClampToEdgeWrapping":l,"THREE.MirroredRepeatWrapping":x}),a.add(e,"format",{AlphaFormat:j,RedFormat:B,RedIntegerFormat:w,RGFormat:c,RGIntegerFormat:k,RGBAFormat:V,RGBAIntegerFormat:F,LuminanceFormat:R,LuminanceAlphaFormat:E,DepthFormat:z,DepthStencilFormat:L}),a.add(e,"encoding",{LinearEncoding:b,sRGBEncoding:M}),a.add(e,"magFilter",{Nearest:d,Linear:y}),a.add(e,"minFilter",{Nearest:d,Linear:y,NearestMipmapNearest:h,NearestMipmapLinear:f,LinearMipmapNearest:T,LinearMipmapLinear:N}),a.add(e,"rotation",-Math.PI,Math.PI,.01),a.add({anisotropy:e.anisotropy},"anisotropy",1,5,1).onChange(m=>{e.anisotropy=2**m});const r=a.addFolder("repeat");r.add(e.repeat,"x",1,5,1),r.add(e.repeat,"y",1,5,1);const p=a.addFolder("offset");p.add(e.offset,"x",-1,1,.1),p.add(e.offset,"y",-1,1,.1);const g=a.addFolder("center");g.add(e.center,"x",-1,1,.1),g.add(e.center,"y",-1,1,.1)});
