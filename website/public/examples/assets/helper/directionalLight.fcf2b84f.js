import"../common.006007ed.js";import{M as n,g as s,a9 as i,a6 as r}from"../three.1b4256b1.js";import{g as a}from"../lil-gui.module.min.2e05211e.js";import{f as l,k as c}from"../Vis.es.dd28f8ae.js";import"../vis-three.72224a55.js";const m=new l().install("TransformControls").complete().setDom(document.getElementById("app")).setSize().play(),o=m.scene,d=new n(new s(100,10,100),new i({color:"rgb(255, 105, 100)"}));o.add(d);const e=new r("rgb(255, 255, 255)",1);o.add(e);e.position.set(10,30,0);const g=new c(e);o.add(g);const p=new a,h={color:e.color.getHex()};p.addColor(h,"color",-500,500).onChange(t=>{e.color.setHex(t)});