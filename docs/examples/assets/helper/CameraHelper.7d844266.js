import"../common.006007ed.js";import{M as n,g as r,a2 as i,aR as d,a6 as m,O as c}from"../three.75af7ea3.js";import{a as p,j as s}from"../Vis.es.a3304217.js";import"../vis-three.69d8f933.js";const o=document.getElementById("app"),h=new p().setDom(o).setSize().setStats(!0).play(),e=h.scene;e.add(new n(new r(10,10,10),new i({color:"rgb(255, 105, 70)"})));e.add(new d("white",1));const t=new m(45,o.offsetWidth/o.offsetHeight,5,200);e.add(t);t.position.set(-40,20,0);t.lookAt(0,0,0);const g=new s(t);e.add(g);const a=new c(-50,50,50,-50,5,200);e.add(a);a.position.set(40,20,0);a.lookAt(0,0,0);const l=new s(a);e.add(l);