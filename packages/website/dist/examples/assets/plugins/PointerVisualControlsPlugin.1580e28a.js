import"../modulepreload-polyfill.b7f2da20.js";import{M as s,B as m,a as d,P as p,L as g,b as l}from"../three.837c9bb0.js";import{W as c,C as f}from"../index.be5e1784.js";import{R as u}from"../index.813bc471.js";import{E as P}from"../index.db239e15.js";import{G as w}from"../index.3e934afa.js";import{E as y}from"../index.c0066b9f.js";import{d as E}from"../index.5fd0e639.js";import{g as M}from"../lil-gui.module.min.095a7f3d.js";import{P as b}from"../index.3c2d0e7e.js";import"../Pass.1ae4f2a0.js";const n=E({plugins:[u(),c({antialias:!0,alpha:!0}),P({MSAA:!0}),f(),w(),b()],strategy:[y()]}).setDom(document.getElementById("app")).setSize().play(),e=n.scene,o=new s(new m(10,10,10),new d({color:"rgb(255, 105, 100)"}));o.position.x=10;e.add(o);const r=new p("rgb(255, 255, 255)",1,300,0);r.position.y=30;e.add(r);const h=new g(o.geometry);e.add(h);const a=new l(o.geometry);a.position.x=-10;e.add(a);const t=n.pointerVisualControls,i=new M;i.add(t,"minPolarAngle");i.add(t,"maxPolarAngle");i.add(t,"pointerSpeed");window.engine=n;