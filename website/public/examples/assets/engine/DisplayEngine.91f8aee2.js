import"../common.006007ed.js";import{M as t,g as i,a9 as a,a7 as r,i as d,q as m}from"../three.1b4256b1.js";import{f as p}from"../Vis.es.dd28f8ae.js";import"../vis-three.72224a55.js";const c=new p().setDom(document.getElementById("app")).setSize().play(),e=c.scene,o=new t(new i(10,10,10),new a({color:"rgb(255, 105, 100)"}));o.position.x=10;e.add(o);const n=new r("rgb(255, 255, 255)",1,300,0);n.position.y=30;e.add(n);const g=new d(o.geometry);e.add(g);const s=new m(o.geometry);s.position.x=-10;e.add(s);
