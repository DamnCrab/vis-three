import"../common.006007ed.js";import{D as m,g as e}from"../Vis.es.a3304217.js";import"../three.75af7ea3.js";import"../vis-three.69d8f933.js";const t=new m().install("CSS3DRenderer").complete().setDom(document.getElementById("app")).registerResources({"examples.css3DObject":document.getElementById("element1"),"examples.css3DObject2":document.getElementById("element2"),"examples.css3DObject3":document.getElementById("element3")}),s=e("CSS3DObject",{element:"examples.css3DObject",position:{x:-50,y:10},rotation:{y:Math.PI/180*20},scale:{x:.1,y:.1,z:.1}}),c=e("CSS3DObject",{element:"examples.css3DObject2",position:{x:50,y:10},rotation:{y:-(Math.PI/180)*20},scale:{x:.1,y:.1,z:.1}}),n=e("CSS3DObject",{element:"examples.css3DObject3",position:{z:-30,y:10},scale:{x:.5,y:.5,z:.5}}),o=e("Scene",{children:[s.vid,c.vid,n.vid]});t.applyConfig(s,c,n,o);t.setScene(o.vid).play();setTimeout(()=>{t.setSize()},0);