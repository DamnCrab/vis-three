import"../common.006007ed.js";import{M as d,g as r,a9 as m,a7 as p,i as g,L as w,q as h,n as y,I as b}from"../three.1b4256b1.js";import{f as M}from"../Vis.es.dd28f8ae.js";import"../vis-three.72224a55.js";const o=new M().install("ObjectHelper").install("Selection").complete().setDom(document.getElementById("app")).setSize().play(),e=o.scene,t=new d(new r(10,10,10),new m({color:"rgb(255, 105, 100)"}));t.position.x=10;e.add(t);const i=new p("rgb(255, 255, 255)",1,30,0);i.position.y=20;e.add(i);const L=new g(t.geometry,new w({color:"yellow"}));e.add(L);const a=new h(t.geometry,new y({color:"blue"}));a.position.x=-10;e.add(a);const s=new b(180/Math.PI*45,16/9,5,70);s.position.set(0,20,50);s.lookAt(0,0,0);e.add(s);o.addEventListener("selected",l=>{let n="";l.objects.forEach(c=>{n+=`<div class="selected-elem">${c.uuid}</div>`}),document.getElementById("selected").innerHTML=n});
