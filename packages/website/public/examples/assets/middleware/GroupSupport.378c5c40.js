import"../modulepreload-polyfill.b7f2da20.js";import{M as a}from"../index.887e5a6e.js";import{g as i}from"../index.f4616ae6.js";import"../index.8051b4a0.js";import"../index.553ea369.js";import"../index.322afd23.js";import"../index.b6f9a1a5.js";import"../index.54dc275e.js";import"../index.6949873b.js";import"../index.40bdee24.js";import"../three.53c13b85.js";import"../index.0ac2cd23.js";import"../index.d5cadf5a.js";import"../index.cb88c218.js";import"../index.10df2fa4.js";import"../index.4dfb083f.js";import"../index.3d2d386e.js";import"../index.382e9bf2.js";import"../index.4d68b12a.js";import"../Antdv.35288747.js";import"../index.687db21f.js";import"../index.b0fe2ce4.js";import"../TextureDisplayer.d47ce54e.js";import"../index.e35148e2.js";import"../index.dc401cd6.js";import"../index.73cd6fe7.js";import"../index.c5c75baa.js";import"../index.c346d9e8.js";import"../index.0e5858b5.js";import"../index.e72b23c1.js";import"../index.0357ebfa.js";import"../index.e4863e82.js";import"../index.d9d3455e.js";import"../UnrealBloomPass.3e69e790.js";import"../index.8445d065.js";import"../index.adb60d71.js";import"../index.ef0218c2.js";import"../index.99d2f4c4.js";import"../index.26301b51.js";import"../G6.cf5ff0af.js";const r=new a().setDom(document.getElementById("app")).setSize(),t=i("MeshStandardMaterial"),o=i("BoxGeometry",{width:20,height:20,depth:20}),m=i("Mesh",{material:t.vid,geometry:o.vid,position:{z:-20}}),p=i("Mesh",{material:t.vid,geometry:o.vid,position:{z:20,x:20}}),e=i("Mesh",{material:t.vid,geometry:o.vid,position:{z:20,x:-20}}),n=i("Group",{children:[m.vid,p.vid,e.vid],position:{y:20}}),s=i("PointLight",{position:{y:50},distance:150}),d=i("Scene",{children:[s.vid,n.vid]});r.applyConfig(s,t,o,m,p,e,n,d);r.setSceneBySymbol(d.vid).play();
