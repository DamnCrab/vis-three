import"../modulepreload-polyfill.b7f2da20.js";import{P as i,M as s,B as m,a as l,L as d,b as g}from"../three.237d835c.js";import{d as p}from"../index.202ebdec.js";import{W as c,C as u}from"../index.1d3a6ec0.js";import{R as P}from"../index.e6be8a02.js";import{G as f}from"../index.591a8368.js";import{O as M}from"../vis-three.plugin-orbit-controls.es.9991f892.js";import{P as L}from"../vis-three.plugin-pointer-manager.es.640cfa1a.js";import{E as b}from"../index.c35e5a3e.js";import{L as h}from"../vis-three.plugin-loader-manager.es.c1771985.js";import{W as y}from"../index.14bb6edc.js";const a=p({plugins:[c({antialias:!0,alpha:!0}),u(),f(),P(),M(),L(),b(),h({path:"/examples/"})],strategy:[y()]}).setDom(document.getElementById("app")).setSize().play(),v=a.scene,o=new i("rgb(255, 255, 255)",1,300,0);o.position.y=30;const e=new s(new m(10,10,10),new l({color:"rgb(255, 105, 100)"}));e.position.x=10;const w=new d(e.geometry),r=new g(e.geometry);r.position.x=-10;v.add(o,e,w,r);e.addEventListener("click",n=>{alert("hello vis-three")});a.loaderManager.addEventListener("loaded",n=>{const t=n.resourceMap.get("/model/katana/katana.obj");t.scale.set(20,20,20),a.scene.add(t)});a.loaderManager.load(["/model/katana/katana.obj"]);
