import{t as o}from"./index.202ebdec.js";import{a}from"./vis-three.plugin-object-helper.es.15c18b4e.js";import{a as s}from"./index.12fd638d.js";const n="@vis-three/strategy-transform-controls-helper-filter",c=o(n),O=function(){return{name:c,condition:[s,a],exec(r){const t=[];r.transformControls.traverse(e=>{t.push(e)}),r.objectHelperManager.addFilteredObject(...t)},rollback(r){}}};export{O as T};
