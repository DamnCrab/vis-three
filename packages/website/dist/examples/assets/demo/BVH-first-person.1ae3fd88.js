import"../modulepreload-polyfill.b7f2da20.js";import{l as B}from"../loadingTips.ee044a06.js";import{az as x,v as E,bQ as M,n as u,a7 as V,J as C,M as L,a as W}from"../three.237d835c.js";import{m as _,M as G}from"../index.da7053a0.js";import{W as R,C as z}from"../index.1d3a6ec0.js";import{R as I}from"../index.e6be8a02.js";import{E as H}from"../index.2e2f06f6.js";import{L as D}from"../vis-three.plugin-loader-manager.es.c1771985.js";import{K,a as T}from"../index.7d0cd300.js";import{S as j}from"../index.32dc3bb0.js";import{P as A}from"../index.55cf2ee6.js";import{E as O}from"../index.117a61e1.js";import{S as U}from"../index.cd2c2c2e.js";import{d as q}from"../index.202ebdec.js";/* empty css               */import"../Antdv.414c4eb5.js";import"../ShaderPass.02f07bc0.js";const b=new u,v=new u,g=new x;new E;const s=new M,S=5,F=20;let h=!1;const d=new u,y={radius:.5,segment:new M(new u,new u(0,-1,0))},o=q({plugins:[I({fps:1e3/60}),R({antialias:!0,alpha:!0}),H({WebGLMultisampleRenderTarget:!0}),z(),D({path:"/examples/"}),j(),G({visualizer:!0,shapecast:{intersectsBounds:a=>a.intersectsBox(g),intersectsTriangle:a=>{const r=b,t=v,c=a.closestPointToSegment(s,r,t);if(c<y.radius){const i=y.radius-c,l=t.sub(r).normalize();s.start.addScaledVector(l,i),s.end.addScaledVector(l,i)}}}}),A()],strategy:[O(),U()]}).setDom(document.getElementById("app")).setSize().setStats(!0);o.install(K({target:o.camera,movementSpeed:10,quickenSpeed:10,space:"world",extendKeyDown:a=>{switch(a.code){case"Space":h&&(d.y=F);break}},beforeUpdate:({delta:a})=>{d.y+=h?0:a*-30,n.position.addScaledVector(d,a)}})).exec(T());const n=o.camera;B(o);document.getElementById("lock").onclick=()=>{o.pointerLockControls.lock(),document.getElementById("lock").style.display="none"};o.pointerLockControls.addEventListener("unlock",()=>{document.getElementById("lock").style.display="flex"});const P=()=>{d.y=0,n.position.set(47,0,90),n.lookAt(n.position.x,n.position.y,n.position.z-10),console.log(n.matrixWorld)},k=new V("white",7);k.position.set(-5,5,10);o.scene.add(n,k);P();const J=new u;o.keyboardMoveControls.forwrad=a=>o.pointerLockControls.getDirection(J);const Q=a=>{n.updateMatrixWorld(),g.makeEmpty(),s.copy(y.segment),s.start.applyMatrix4(n.matrixWorld),s.end.applyMatrix4(n.matrixWorld),g.expandByPoint(s.start),g.expandByPoint(s.end),g.min.addScalar(-y.radius),g.max.addScalar(y.radius),o.meshBVHManager.shapecast();const r=b;r.copy(s.start);const t=v;t.subVectors(r,n.position),h=t.y>Math.abs(a*d.y*.25);const c=Math.max(0,t.length()-1e-5);t.normalize().multiplyScalar(c),n.position.add(t),h?d.set(0,0,0):(t.normalize(),d.addScaledVector(t,-t.dot(d))),n.position.y<-80&&P()};o.keyboardMoveControls.addEventListener("afterUpdate",a=>{for(let r=0;r<S;r+=1)Q(a.delta/S)});o.loadResourcesAsync(["/model/glb/dungeon_low_poly_game_level_challenge/scene.gltf"]).then(a=>{const t=a.resourceMap.get("/model/glb/dungeon_low_poly_game_level_challenge/scene.gltf").scene;t.scale.setScalar(.03);const c=new x;c.setFromObject(t),c.getCenter(t.position).negate(),t.updateMatrixWorld(!0);const i={};t.traverse(e=>{if(!(/Boss/.test(e.name)||/Enemie/.test(e.name)||/Shield/.test(e.name)||/Sword/.test(e.name)||/Character/.test(e.name)||/Gate/.test(e.name)||/Cube/.test(e.name)||e.material&&e.material.color.r===1)&&e.isMesh){const f=e.material.color.getHex();i[f]=i[f]||[],i[f].push(e)}});const l=new C;for(const e in i){const f=i[e],w=[];if(f.forEach(p=>{if(p.material.emissive.r!==0)l.attach(p);else{const m=p.geometry.clone();m.applyMatrix4(p.matrixWorld),w.push(m)}}),w.length){const p=_(w),m=new L(p,new W({color:parseInt(e),shadowSide:2}));m.castShadow=!0,m.receiveShadow=!0,m.material.shadowSide=2,l.add(m)}}l.updateMatrixWorld(!0),l.traverse(e=>{e.geometry&&o.addBVH(e)}),o.scene.add(l),o.play()});window.engine=o;
