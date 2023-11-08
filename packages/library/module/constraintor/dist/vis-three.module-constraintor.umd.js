(function(o,i){typeof exports=="object"&&typeof module!="undefined"?module.exports=i(require("@vis-three/middleware"),require("uuid"),require("@vis-three/library-constraintor")):typeof define=="function"&&define.amd?define(["@vis-three/middleware","uuid","@vis-three/library-constraintor"],i):(o=typeof globalThis!="undefined"?globalThis:o||self,o["vis-three"]=o["vis-three"]||{},o["vis-three"]["module-constraintor"]=i(o.middleware,o.uuid,o.libraryConstraintor))})(this,function(o,i,a){"use strict";class p extends o.Compiler{constructor(){super()}}const m=function(t,e,r=i.validate){o.Rule(t,e,r)},c=function(){return Object.assign(o.getSymbolConfig(),{target:""})},B=function(){return Object.assign(c(),{target:"",targetAttr:"",ref:"",refAttr:"",offset:null})},v=function(){return Object.assign(c(),{targetAttr:"",ref:"",space:"world",offset:{position:{direction:"+",axes:"y"},operate:"+",value:0}})},f={reg:new RegExp(".*"),handler(t){t.processor.set(t),t.target.constrain()}},u=new WeakMap;var b=o.defineProcessor({type:"NumberConstraintor",config:B,commands:{set:{target({target:t,config:e,engine:r}){e.target&&e.targetAttr&&(t.setTarget(r.getConfigBySymbol(e.target),e.targetAttr),t.constrain())},targetAttr({target:t,config:e,engine:r}){e.target&&e.targetAttr&&(t.setTarget(r.getConfigBySymbol(e.target),e.targetAttr),t.constrain())},ref({target:t,config:e,engine:r}){e.ref&&e.refAttr&&(t.setReference(r.getConfigBySymbol(e.ref),e.refAttr),t.constrain())},refAttr({target:t,config:e,engine:r}){e.ref&&e.refAttr&&(t.setReference(r.getConfigBySymbol(e.ref),e.refAttr),t.constrain())},$reg:[f]}},create(t,e){const r=e.getObjectBySymbol(t.ref),n=new a.NumberConstraintor(e.getConfigBySymbol(t.target),t.targetAttr,e.getConfigBySymbol(t.ref),t.refAttr,t.offset?{...t.offset}:null);if(r){n.constrain();const s=()=>{n.constrain()};u.set(n,s),o.Bus.compilerEvent.on(r,`${o.COMPILER_EVENT.COMPILE}:${t.refAttr}`,s)}return n},dispose(t){u.delete(t)}});const y=new WeakMap,C=["geometry","position.x","position.y","position.z","rotation.x","rotation.y","rotation.z","scale.x","scale.y","scale.z"],g=function(t,e){const r=()=>{t.constrain()};y.set(t,r),C.forEach(n=>{o.Bus.compilerEvent.on(e,`${o.COMPILER_EVENT.COMPILE}${n}`,r)}),e.geometry&&o.Bus.compilerEvent.on(e.geometry,o.COMPILER_EVENT.UPDATE,r)},E=function(t){const e=t.reference,r=y.get(t);r&&(C.forEach(n=>{o.Bus.compilerEvent.off(e,`${o.COMPILER_EVENT.COMPILE}${n}`,r)}),e.geometry&&o.Bus.compilerEvent.off(e.geometry,o.COMPILER_EVENT.UPDATE,r))};var l=o.defineProcessor({type:"BoundingBoxConstraintor",config:v,commands:{set:{target({target:t,config:e,engine:r}){e.target&&e.targetAttr&&(t.setTarget(r.getConfigBySymbol(e.target),e.targetAttr),t.constrain())},targetAttr({target:t,config:e,engine:r}){e.target&&e.targetAttr&&(t.setTarget(r.getConfigBySymbol(e.target),e.targetAttr),t.constrain())},ref({target:t,config:e,engine:r,value:n}){if(E(t),!n)return;const s=r.getObjectBySymbol(e.ref);if(!s){console.warn(`BoundingBox constraintor processor: can not found object: ${e.ref}`);return}t.setReference(s),t.constrain(),g(t,s)},$reg:[f]}},create(t,e){const r=e.getObjectBySymbol(t.ref),n=new a.BoundingBoxConstraintor(e.getConfigBySymbol(t.target),t.targetAttr,t.space,r,o.JSONHandler.clone(t.offset));return r&&(n.constrain(),g(n,r)),n},dispose(t){E(t)}}),A={type:"constraintor",compiler:p,rule:m,processors:[b,l],lifeOrder:o.SUPPORT_LIFE_CYCLE.NINE};return A});