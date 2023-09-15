(function(l,p){typeof exports=="object"&&typeof module!="undefined"?p(exports,require("@vis-three/utils"),require("uuid"),require("@vis-three/core"),require("rxjs"),require("@vis-three/plugin-loader-manager"),require("@vis-three/plugin-pointer-manager"),require("@vis-three/plugin-event-manager"),require("@vis-three/plugin-render-manager")):typeof define=="function"&&define.amd?define(["exports","@vis-three/utils","uuid","@vis-three/core","rxjs","@vis-three/plugin-loader-manager","@vis-three/plugin-pointer-manager","@vis-three/plugin-event-manager","@vis-three/plugin-render-manager"],p):(l=typeof globalThis!="undefined"?globalThis:l||self,p((l["vis-three"]=l["vis-three"]||{},l["vis-three"].middleware={}),l.utils,l.uuid,l.core,l.rxjs,l.pluginLoaderManager,l.pluginPointerManager,l.pluginEventManager,l.pluginRenderManager))})(this,function(l,p,M,w,te,S,W,H,V){"use strict";var ft=Object.defineProperty;var pt=(l,p,M)=>p in l?ft(l,p,{enumerable:!0,configurable:!0,writable:!0,value:M}):l[p]=M;var u=(l,p,M)=>(pt(l,typeof p!="symbol"?p+"":p,M),M);const b={},F={},x={},N={},z={},J={},U=r=>z[r]||null,re=r=>N[r],ne=r=>{const t=U(r);return t?re(t):!1},X=function(r,t){J[r.type]=r,x[r.type.toLocaleUpperCase()]=r.type,b[r.type]=r.config,z[r.type]=t},h={proxy:{expand:void 0,timing:"before",toRaw:void 0},symbol:{generator:M.v4,validator:M.validate}},ke=function(r){r.proxy&&Object.assign(h.proxy,r.proxy),r.symbol&&Object.assign(h.symbol,r.symbol)},C=(r,t)=>t===1/0?"Infinity":t===-1/0?"-Infinity":t,Z=(r,t)=>t==="Infinity"?1/0:t==="-Infinity"?-1/0:t,R=r=>JSON.parse(JSON.stringify(r,C),Z);class se{constructor(t){u(this,"config");this.config=t}pipe(t){return this.config=t(this.config),this}get(){return this.config}}var D={stringify:C,parse:Z,clone:R,Pipeline:se},qe=Object.freeze(Object.defineProperty({__proto__:null,stringify:C,parse:Z,clone:R,Pipeline:se,default:D},Symbol.toStringTag,{value:"Module"}));const d=function(r,t,e={observer:!0,strict:!0,warn:!0}){if(e.observer===void 0&&(e.observer=!0),e.strict===void 0&&(e.strict=!0),e.warn===void 0&&(e.warn=!0),e.handler===void 0&&(e.handler=h.proxy.expand),!b[r])return console.error(`type: ${r} can not be found in configList.`),{vid:"",type:r};const n=(o,a)=>{for(const c in a){if(o[c]===void 0){!e.strict&&(o[c]=a[c]),e.strict&&e.warn&&console.warn(`'${r}' config can not set key: ${c}`);continue}typeof a[c]=="object"&&a[c]!==null&&!Array.isArray(a[c])?(o[c]===null&&(o[c]={...a[c]}),n(o[c],a[c])):o[c]=a[c]}};let s=b[r]();if(s.vid===""&&(s.vid=h.symbol.generator()),t&&n(s,t),e.observer===!1)return s;e.handler&&h.proxy.timing==="before"&&(s=e.handler(s));let i=ye(s);if(e.handler&&h.proxy.timing==="after"&&(i=e.handler(i)),d.autoInject&&d.injectEngine){const o=d.injectEngine;if(o.applyConfig(i),d.injectScene&&ne(s.type)&&s.type!==x.SCENE){let a=null;typeof d.injectScene=="boolean"?a=o.getObjectConfig(o.scene):typeof d.injectScene=="string"&&(a=o.getConfigBySymbol(d.injectScene)),a?a.children.push(s.vid):console.warn("current engine scene can not found it config",o,o.scene)}return i}return i};d.autoInject=!0,d.injectScene=!1,d.injectEngine=null;const oe=(r,t={})=>{let e=JSON.stringify(r,D.stringify);const n={},s=Object.keys(r).filter(o=>o!=="assets");for(const o of s)for(const a of r[o]){const c=a.vid,f=M.v4();e=e.replace(new RegExp(c,"g"),f),t.detail&&(n[c]=f)}const i=JSON.parse(e,D.parse);if(t.fillName)if(typeof t.fillName=="function")for(const o of s)for(const a of i[o])a.name||(a.name=t.fillName(a));else for(const o of s)for(const a of i[o])a.name||(a.name=`${a.type}-${a.vid.slice(-2)}`);return t.detail?{config:i,detail:n}:i},K=(r,t,e={clone:!0,assets:!1})=>{const n=e.clone?D.clone(r):r,s=e.assets?Object.keys(n):Object.keys(n).filter(i=>i!=="assets");for(const i of s)n[i].forEach((a,c,f)=>{f[c]=t(a)});return n},ie=function(r){const t={};for(const e of Object.keys(r))for(const n of r[e])t[n.name]=n;return t},ae=function(r,t){return typeof r=="string"&&(r=JSON.parse(r,D.parse)),K(D.clone(r),e=>(e=d(e.type,e),t?t(e):e))};var We={clone:oe,handler:K,planish:ie,observable:ae},He=Object.freeze(Object.defineProperty({__proto__:null,clone:oe,handler:K,planish:ie,observable:ae,default:We},Symbol.toStringTag,{value:"Module"}));class ce{constructor(){u(this,"list",[]);u(this,"timer");u(this,"time",0)}exec(t){if(t(!1))return;this.list.includes(t)||this.list.push(t);let e=0;const n=()=>{this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>{const s=[];for(const i of this.list)i(!1)||s.push(i);if(s.length)if(s.length===e){for(const i of s)i(!0);this.list=[]}else e=s.length,this.list=s,n();else this.list=[]},this.time)};n()}append(t){this.list.length&&!this.list.includes(t)?this.list.push(t):this.exec(t)}nextTick(t){setTimeout(()=>{t()},this.time)}}const Ve=new ce;class Q{constructor(){u(this,"map",new WeakMap)}create(t){if(this.map.has(t)){console.warn("object is exist.",t);return}this.map.set(t,new w.EventDispatcher)}dispose(t){this.map.delete(t)}check(t){return this.map.has(t)}emit(t,e,n){if(!this.map.has(t)){console.warn("object can not create eventDispatcher please create it",t);return}this.map.get(t).emit(e,n)}on(t,e,n){if(!this.map.has(t)){console.warn("object can not create eventDispatcher please create it",t);return}this.map.get(t).on(e,n)}off(t,e,n){if(!this.map.has(t)){console.warn("object can not create eventDispatcher please create it",t);return}this.map.get(t).off(e,n)}}const v=new Q,Fe=new Q;var ze=Object.freeze(Object.defineProperty({__proto__:null,Bus:Q,compilerEvent:v,configEvent:Fe},Symbol.toStringTag,{value:"Module"}));class le{constructor(){u(this,"condition",{})}registerModule(t){return this.condition[t]=!1,this}updateCondition(t){return typeof this.condition[t]!="undefined"&&(this.condition[t]=!0),this}reset(){Object.keys(this.condition).forEach(t=>{this.condition[t]=!1})}test(){return!Object.values(this.condition).includes(!1)}trig(){}}class ue extends le{constructor(){super();u(this,"triggerList",[])}registerModule(e){return N[e]?super.registerModule(e):this}registerExec(e){e(!0)||this.triggerList.push(e)}trig(){const e=this.triggerList;for(const n of e)n();this.reset()}reset(){this.triggerList=[],super.reset()}}const fe=new ue,Xe=function(){return h.symbol.generator()};var pe=(r=>(r.ADD="compiler.add",r.REMOVE="compiler.remove",r.COMPILE="compiler.compile",r.UPDATE="compiler.update",r))(pe||{});class Ze{constructor(){u(this,"MODULE","");u(this,"processors",new Map);u(this,"target",{});u(this,"map",new Map);u(this,"weakMap",new WeakMap);u(this,"engine");u(this,"cacheCompile")}getMap(){return this.map}useEngine(t){return this.engine=t,this}setTarget(t){return this.target=t,this}add(t){if(!this.processors.has(t.type))return console.warn(`${this.MODULE} compiler can not support this type: ${t.type}`),null;const n=this.processors.get(t.type).create(t,this.engine,this);return this.map.set(t.vid,n),this.weakMap.set(n,t.vid),v.create(n),v.emit(n,"compiler.add"),n}remove(t){const e=t.vid;if(!this.map.has(e))return console.warn(`${this.MODULE} compiler can not found this vid object: ${e}.`),this;if(!this.processors.has(t.type))return console.warn(`${this.MODULE} compiler can not support this type: ${t.type}`),this;const n=this.map.get(e);return this.processors.get(t.type).dispose(n,this.engine,this),this.map.delete(e),this.weakMap.delete(n),v.emit(n,"compiler.remove"),v.dispose(n),this.cacheCompile&&this.cacheCompile.vid===e&&(this.cacheCompile=void 0),this}cover(t){const e=t.vid;return this.map.has(e)?(Promise.resolve().then(()=>{p.syncObject(t,t,{vid:!0,type:!0})}),this):(console.warn(`${this.MODULE} compiler can not found this vid object: ${e}.`),this)}compile(t,e){const n=this.cacheCompile;let s,i,o;if(n&&n.vid===t)s=n.target,i=n.config,o=n.processor;else{if(!this.map.has(t))return console.warn(`${this.MODULE} compiler set function: can not found object which vid is: '${t}'`),this;if(!this.target[t])return console.warn(`${this.MODULE} compiler set function: can not found config which vid is: '${t}'`),this;if(s=this.map.get(t),i=this.target[t],!this.processors.has(i.type))return console.warn(`PassCompiler can not support this type: ${i.type}`),this;o=this.processors.get(i.type),this.cacheCompile={target:s,config:i,processor:o,vid:t}}return o.process({config:i,target:s,engine:this.engine,processor:o,compiler:this,...e}),v.emit(s,`compiler.compile:${e.path.join(".")}.${e.key}`),v.emit(s,"compiler.update"),this}compileAll(){const t=this.target;for(const e of Object.values(t))this.add(e);return this}dispose(){this.cacheCompile&&(this.cacheCompile=void 0);for(const t of Object.values(this.target)){if(!this.map.has(t.vid)){console.warn(`${this.MODULE} compiler set function: can not found object which vid is: '${t.vid}'`);continue}const e=this.map.get(t.vid);if(!this.processors.has(t.type)){console.warn(`${this.MODULE}  can not support this type: ${t.type}`);continue}this.processors.get(t.type).dispose(e,this.engine,this)}return this.map.clear(),this.target={},this}reigstProcessor(t,e){return this.processors.has(t.type)?(console.warn(`${this.MODULE} compiler has already exist this processor ${t.type}, that will be cover.`),this):(this.processors.set(t.type,t),X(t,this.MODULE),e(this),this)}getObjectSymbol(t){return this.weakMap.get(t)||null}getObjectBySymbol(t){return this.map.get(t)||null}}const he=function(r,t,e){return class extends t{constructor(){super();u(this,"MODULE",r);for(const s of e)this.processors.set(s.type,s)}}},de=new WeakMap,G=function(r){Array.isArray(r)&&de.set(r,r.concat([]))},Ke=function(r){return de.get(r)},Y="vis.father",L="vis.key",_=function(r){let t="";const e=n=>{n[Symbol.for(L)]!==void 0&&(t=`${n[Symbol.for(L)]}${t?`.${t}`:""}`,n[Symbol.for(Y)]&&e(n[Symbol.for(Y)]))};return e(r),t},Qe=function(r){if(r.length&&p.isObject(r[0])){const t=r.length;for(let e=0;e<t;e+=1)r[e][Symbol.for(L)]=e}},I=new WeakMap,Ye=["push","pop","shift","unshift","splice","sort","reverse"],P=new WeakSet,_e=function(r,t,e){return Array.isArray(r)&&Ye.includes(t)&&P.add(r),Reflect.get(r,t,e)},et=function(r,t,e,n,s){const i=_(r);if(typeof t=="symbol"||s.isIgnore(p.extendPath(i,t)))return Reflect.set(r,t,e,n);if(p.isObject(e)&&!I.has(e)&&(e=B(s,e,r)),r[t]===void 0){p.isObject(e)&&(e[Symbol.for(L)]=t,p.isArray(e)&&G(e)),p.isArray(r)&&P.delete(r);const a=Reflect.set(r,t,e);return p.isArray(r)&&G(r),s.next({operate:"add",path:i,key:t,value:e}),a}const o=Reflect.set(r,t,e);if(p.isArray(r)){if(P.has(r)&&t==="length"){const a=Ke(r);if(!a)return console.error("array value is not be cached:",r),o;Qe(r);const c=Math.abs(a.length-r.length),f=a.length>=r.length?"delete":"add",m=a.length>=r.length?r:a;let E=0,Ie=0;for(const Be of f==="delete"?a:r){if(!m.includes(Be)&&(s.next({operate:f,path:i,key:Ie.toString(),value:Be}),E+=1,E===c))break;Ie+=1}return G(r),P.delete(r),o}else if(P.has(r)||t==="length")return o}return s.next({operate:"set",path:i,key:t,value:e}),o},tt=function(r,t,e){const n=_(r);if(typeof t=="symbol"||e.isIgnore(n))return Reflect.deleteProperty(r,t);const s=r[t],i=Reflect.deleteProperty(r,t);return p.isArray(r)||e.next({operate:"delete",path:n,key:t,value:s}),i},B=function(r,t,e){if(!p.isObject(t)||I.has(t))return t;const n=e?_(e):"";if(r.isIgnore(n))return t;const s={get:_e,set:(o,a,c,f)=>et(o,a,c,f,r),deleteProperty:(o,a)=>tt(o,a,r)};e&&(t[Symbol.for(Y)]=e);for(const o in t){const a=p.extendPath(n,o);if(!r.isIgnore(a)&&p.isObject(t[o])){if(p.isArray(t[o])){const c=t[o];t[o]=B(r,t[o],t),G(c)}else t[o]=B(r,t[o],t);t[o][Symbol.for(L)]=o}}const i=new Proxy(t,s);return r.saveRaw(i,t),I.set(i,r),i};class rt extends te.Subject{constructor(e,n){super();u(this,"ignore",{});u(this,"target");u(this,"rawMap",new WeakMap);n&&(this.ignore=n),this.target=B(this,e)}isIgnore(e){let n=this.ignore;for(const s of e.split(".")){if(n[s]===void 0)return!1;if(typeof n[s]=="boolean"&&n[s])return!0;n=n[s]}return!1}setIgnore(e){this.ignore=e}mergeIgnore(e){this.ignore=Object.assign(this.ignore,e)}saveRaw(e,n){this.rawMap.set(e,n)}toRaw(e){return this.rawMap.get(e)}}const ye=function(r,t){return new rt(r,t).target},ge=function(r){return I.get(h.proxy.toRaw?h.proxy.toRaw(r):r)},me=function(r,t,e){return Reflect.get(r,t,e)},Me=function(r,t,e,n,s){if(typeof t=="symbol")return Reflect.set(r,t,e,n);if(r[t]===void 0){const i=Reflect.set(r,t,e);return s.add(e),s.next({operate:"add",path:t,key:t,value:e}),i}else{const i=Reflect.set(r,t,e);return s.remove(e.vid),s.add(e),s.next({operate:"set",path:t,key:t,value:e}),i}},be=function(r,t,e){if(typeof t=="symbol")return Reflect.deleteProperty(r,t);const n=r[t],s=Reflect.deleteProperty(r,t);return e.next({operate:"delete",path:t,key:t,value:n}),e.remove(n.vid),s};class Oe extends te.Subject{constructor(){super();u(this,"container");u(this,"subscriptions",new Map);const e=h.proxy.expand?(n={})=>h.proxy.expand(n):(n={})=>n;h.proxy.timing==="before"?this.container=new Proxy(e(),{get:me,set:(n,s,i,o)=>Me(n,s,i,o,this),deleteProperty:(n,s)=>be(n,s,this)}):this.container=e(new Proxy({},{get:me,set:(n,s,i,o)=>Me(n,s,i,o,this),deleteProperty:(n,s)=>be(n,s,this)}))}add(e){const n=ge(e);if(!n){console.error("DataContainer: this config can not observer",e);return}this.subscriptions.set(n.target.vid,n.subscribe(s=>{this.next({operate:s.operate,path:p.extendPath(n.target.vid,s.path),key:s.key,value:s.value})}))}remove(e){this.subscriptions.delete(e)}}class Se{constructor(){u(this,"rule",()=>{});u(this,"members",[])}apply(t){return this.members.includes(t)||this.members.push(t),this}cancel(t){return this.members.includes(t)&&this.members.splice(this.members.indexOf(t),1),this}setRule(t){return this.rule=t,this}translate(t){const e=this.rule;for(const n of this.members)e(t,n);return this}}class ve{constructor(t,e=[]){u(this,"MODULE","");u(this,"dataContainer",new Oe);u(this,"translater");this.translater=new Se().setRule(t),this.dataContainer.subscribe(n=>{this.translater.translate(n)});for(const n of e)this.addConfig(n)}getData(){return this.dataContainer.container}existSymbol(t){return Boolean(this.dataContainer.container[t])}addConfig(t){return this.dataContainer.container[t.vid]=t,this}getConfig(t){return this.dataContainer.container[t]}removeConfig(t){const e=this.dataContainer.container;e[t]!==void 0&&delete e[t]}addCompiler(t){return t.setTarget(this.dataContainer.container),t.compileAll(),this.translater.apply(t),this}toJSON(t=!0){return t?JSON.stringify(this.exportConfig(),C):JSON.stringify(Object.values(this.dataContainer.container),C)}exportConfig(t=!0){if(t){const e=this.dataContainer.container,n=[],s={},i=(o,a,c={})=>{for(const f in o){if(["vid","type"].includes(f)){c[f]=o[f];continue}if(typeof o[f]=="object"&&o[f]!==null){if(Array.isArray(o[f])){if(!o[f].length)continue;c[f]=o[f].map(m=>typeof m=="object"&&m!==null?R(m):m);continue}c[f]={},a[f]?(i(o[f],a[f],c[f]),Object.keys(c[f]).length===0&&delete c[f]):c[f]=R(o[f])}else a[f]!==o[f]&&(c[f]=o[f])}};for(const o of Object.values(e)){if(!s[o.type]){if(!b[o.type]){console.error(`can not font some config with: ${o.type}`);continue}s[o.type]=b[o.type]()}const a={};i(o,s[o.type],a),n.push(a)}return n}else return Object.values(R(this.dataContainer.container))}load(t){const e=this.dataContainer.container,n={},s=(i,o)=>{for(const a in o)typeof i[a]=="object"&&i[a]!==null&&typeof o[a]=="object"&&o[a]!==null?s(i[a],o[a]):i[a]===void 0&&(i[a]=o[a])};for(const i of t){if(!n[i.type]){if(!b[i.type]){console.error(`can not font some config with: ${i.type}`);continue}n[i.type]=b[i.type]()}s(i,n[i.type]),e[i.vid]=i}return this}remove(t){const e=this.dataContainer.container;for(const n of t)e[n.vid]!==void 0&&delete e[n.vid];return this}}const Ee=function(r,t){return class extends ve{constructor(n=[]){super(t,n);u(this,"MODULE",r)}}};class we{constructor(t){u(this,"type");u(this,"config");u(this,"commands");u(this,"create");u(this,"dispose");this.type=t.type,this.commands=t.commands,this.create=t.create,this.dispose=t.dispose,this.config=()=>{const e=t.config();return e.type=this.type,e},x[this.type.toLocaleUpperCase()]=this.type,b[this.type]=this.config}process(t){if(!this.commands||!this.commands[t.operate]){this[t.operate](t);return}let e=this.commands[t.operate];for(const n of[].concat(t.path,t.key))if(!e[n]&&!e.$reg){this[t.operate](t);return}else if(e[n])if(typeof e[n]=="function"){e[n](t);return}else e=e[n];else if(e.$reg){for(const s of e.$reg)if(s.reg.test(n)){s.handler(t);return}}this[t.operate](t)}add(t){let e=t.target;const n=t.path;for(const s of n)if(typeof e[s]!==void 0)e=e[s];else{console.warn("processor can not exec default add operate.",t);return}e[t.key]=t.value}set(t){let e=t.target;const n=t.path;for(const s of n)if(typeof e[s]!==void 0)e=e[s];else{console.warn("processor can not exec default set operate.",t);return}e[t.key]=t.value}delete(t){let e=t.target;const n=t.path;for(const s of n)if(typeof e[s]!==void 0)e=e[s];else{console.warn("processor can not exec default delete operate.",t);return}delete e[t.key]}expand(t){const e=function(n,s){for(const i in s)p.isObject(s[i])&&p.isObject(n[i])?e(n[i],s[i]):(p.isObject(s[i])&&!n[i]||!p.isObject(s[i])&&!n[i])&&(n[i]=s[i])};return this.commands||(this.commands={}),e(this.commands,t),this}}const nt=r=>new we(r),st=(r,t,e=M.validate)=>{const{operate:n,key:s,path:i,value:o}=r;let a=s;const c=i.split(".");if(c.length&&(a=c.shift()),!e(a)){console.warn(`${t.MODULE} Rule: vid is illeage: ${a}`);return}if(n==="add"&&!c.length&&a===s){t.add(o);return}if(r.operate==="delete"&&!c.length){t.remove(o);return}if(r.operate==="set"&&!c.length&&s===a){t.cover(o);return}t.compile(a,{operate:n,key:s,path:c,value:o})},ot=function(){return{vid:"",type:"",name:""}},it=function(r){return`DEFUALT-${r}`},at=function(){};class Ce extends w.EventDispatcher{constructor(){super();u(this,"compilerMap",new Map)}extend(e,n=!1){this.compilerMap.has(e.MODULE)?(console.warn("compiler manager has exist this compiler",e),n&&this.compilerMap.set(e.MODULE,e)):this.compilerMap.set(e.MODULE,e)}getCompiler(e){return this.compilerMap.has(e)?this.compilerMap.get(e):(console.warn(`can not found this type in compiler manager: ${e}`),null)}getObjectSymbol(e){for(const n of this.compilerMap.values()){const s=n.getObjectSymbol(e);if(s)return s}return null}getObjectBySymbol(e){for(const n of this.compilerMap.values()){const s=n.getObjectBySymbol(e);if(s)return s}return null}getObjectfromModule(e,n){return this.compilerMap.has(e)?this.compilerMap.get(e).map.get(n)||null:(console.warn(`compiler manager can not found this module: ${e}`),null)}getObjectfromModules(e,n){Array.isArray(e)||(e=Object.keys(e));for(const s of e){if(!this.compilerMap.has(s)){console.warn(`compiler manager can not found this module: ${s}`);continue}const i=this.compilerMap.get(s);if(i.map.has(n))return i.map.get(n)}return null}dispose(){for(const e of this.compilerMap.values())e.dispose();return this.compilerMap.clear(),this}}const k="CompilerManagerPlugin",De=function(){return{name:k,install(r){const t=new Ce;r.compilerManager=t,r.getObjectSymbol=function(e){return t.getObjectSymbol(e)},r.getObjectBySymbol=function(e){return t.getObjectBySymbol(e)},r.getObjectfromModule=function(e,n){return t.getObjectfromModule(e,n)},r.getObjectfromModules=function(e,n){return t.getObjectfromModules(e,n)},r.getObject3D=function(e){return t.getObjectfromModules(N,e)}},dispose(r){r.compilerManager.dispose(),delete r.compilerManager,delete r.getObjectSymbol,delete r.getObjectBySymbol,delete r.getObjectfromModule,delete r.getObjectfromModules,delete r.getObject3D}}};class Ae extends w.EventDispatcher{constructor(){super();u(this,"dataSupportMap",new Map)}extend(e,n=!1){this.dataSupportMap.has(e.MODULE)?(console.warn("dataSupport manager has exist this dataSupport",e),n&&this.dataSupportMap.set(e.MODULE,e)):this.dataSupportMap.set(e.MODULE,e)}getDataSupport(e){return this.dataSupportMap.has(e)?this.dataSupportMap.get(e):(console.warn(`can not found this type in dataSupportManager: ${e}`),null)}getConfigBySymbol(e){const n=this.dataSupportMap.values();for(const s of n){const i=s.getConfig(e);if(i)return i}return null}removeConfigBySymbol(...e){for(const n of e)for(const s of this.dataSupportMap.values())if(s.existSymbol(n)){s.removeConfig(n);break}return this}getModuleBySymbol(e){const n=this.dataSupportMap.values();for(const s of n)if(s.existSymbol(e))return s.MODULE;return null}applyConfig(...e){for(const n of e){const s=U(n.type);s?this.dataSupportMap.get(s).addConfig(n):console.warn(`dataSupportManager can not found this config module: ${n.type}`)}return this}load(e){return this.dataSupportMap.forEach((s,i)=>{e[i]&&s.load(e[i])}),this}loadByModule(e,n){const s=this.dataSupportMap.get(n);return s?(s.load(e),this):(console.warn(`DataSupportManager can not support this module: ${n}`),this)}remove(e){return this.dataSupportMap.forEach((s,i)=>{e[i]&&s.remove(e[i])}),this}toJSON(e={},n=!0){return JSON.stringify(this.exportConfig(e,n),C)}exportConfig(e={},n=!0){return this.dataSupportMap.forEach((i,o)=>{e[o]=i.exportConfig(n)}),e}}const $="DataSupportManagerPlugin",je=function(){return{name:$,install(r){const t=new Ae;r.dataSupportManager=t,r.applyConfig=function(...e){return t.applyConfig(...e),r},r.getConfigBySymbol=function(e){return t.getConfigBySymbol(e)},r.removeConfigBySymbol=function(...e){return t.removeConfigBySymbol(...e),r},r.toJSON=function(){return t.toJSON()},r.exportConfig=function(){return t.exportConfig()}},dispose(r){delete r.dataSupportManager,delete r.applyConfig,delete r.getConfigBySymbol,delete r.removeConfigBySymbol,delete r.toJSON,delete r.exportConfig}}};var q=(r=>(r.MAPPED="mapped",r))(q||{});class Ne extends w.EventDispatcher{constructor(e={}){super();u(this,"configMap",new Map);u(this,"resourceMap",new Map);u(this,"paserMap",new Map);const n=new Map;for(const s in e)n.has(s)&&console.warn(`resourceManager construct params rescource already exist: ${s}, that will be cover.`),n.set(s,e[s]);this.mappingResource(n)}addParser(e){return this.paserMap.has(e.constructor)?this:(this.paserMap.set(e.constructor,e),this)}mappingResource(e,n){const s=this.configMap,i=this.resourceMap,o=[...this.paserMap.values()],a={};for(const[c,f]of e.entries()){if((n==null?void 0:n.parser)&&n.parser[c]){n.parser[c].parse({url:c,resource:f,configMap:s,resourceMap:i});continue}if((n==null?void 0:n.selector)&&n.selector[c]){const E=n.selector[c](c,f,this.paserMap);if(!E){console.warn("resource manager hanlder can not found this resource parser: ",f,n.selector[c]);continue}E.parse({url:c,resource:f,configMap:s,resourceMap:i}),a[c]=this.getResourceConfig(c);continue}let m=null;for(const E of o)if(m=E.selector(c,f,this.paserMap),m)break;if(!m){console.warn("resouce manager can not found some handler to parser this resource:",f);continue}m.parse({url:c,resource:f,configMap:s,resourceMap:i}),a[c]=this.getResourceConfig(c)}return this.dispatchEvent({type:"mapped",configMap:s,resourceMap:i,resourceConfig:a}),this}getResourceConfig(e){const n=this.configMap,s={};return[...n.keys()].filter(i=>i.startsWith(e)).forEach(i=>{const o=n.get(i);if(!o)console.error(`unknow error: can not found config by url: ${i}`);else{const a=U(o.type);a?(!s[a]&&(s[a]=[]),s[a].push(o)):console.error(`unknow error: can not found module by type: ${o.type}`,o)}}),s}hasResource(e){return this.resourceMap.has(e)}remove(e){const n=this.configMap,s=this.resourceMap;return[...n.keys()].filter(i=>i.startsWith(e)).forEach(i=>{n.delete(i);const o=s.get(i);o.dispose&&o.dispose(),s.delete(i)}),this}dispose(){this.resourceMap.forEach((e,n)=>{e.dispose&&e.dispose()}),this.resourceMap.clear(),this.configMap.clear()}}class ct{}const ee="ResourceManagerPlugin",Re=function(r={}){return{name:ee,install(t){const e=new Ne(r.resources);t.resourceManager=e,t.registerResources=n=>{const s=new Map;return Object.keys(n).forEach(i=>{s.set(i,n[i])}),e.mappingResource(s),t}},dispose(t){t.addEventListener(w.ENGINE_EVENT.DISPOSE,()=>{t.resourceManager.dispose()})}}},Le="LoaderDataSupportStrategy",Pe=function(){let r,t;return{name:Le,condition:[$,S.LOADER_MANAGER_PLUGIN],exec(e){r=e.toJSON,e.toJSON=function(){const n={assets:JSON.parse(e.loaderManager.toJSON())};return e.dataSupportManager.toJSON(n)},t=e.exportConfig,e.exportConfig=function(){let n={};return n={assets:e.loaderManager.exportConfig()},e.dataSupportManager.exportConfig(n)}},rollback(e){e.toJSON=r,e.exportConfig=t}}},$e="LoaderMappingStrategy",Te=function(){let r,t;return{name:$e,condition:[ee,S.LOADER_MANAGER_PLUGIN],exec(e){r=e.loadResources,e.loadResources=(n,s)=>{const i=o=>{s(void 0,o),e.resourceManager.removeEventListener(S.LOADER_EVENT.LOADED,i)};try{e.resourceManager.addEventListener(S.LOADER_EVENT.LOADED,i)}catch(o){s(o)}return e.loaderManager.reset().load(n),e},t=e.loadResourcesAsync,e.loadResourcesAsync=n=>new Promise((s,i)=>{try{e.loaderManager.once(S.LOADER_EVENT.LOADED,o=>{e.resourceManager.once(q.MAPPED,c=>{s(c)});const a=new Map;n.forEach(c=>{typeof c=="string"?a.set(c,o.resourceMap.get(c)):a.set(c.url,o.resourceMap.get(c.url))}),e.resourceManager.mappingResource(a)})}catch(o){i(o)}e.loaderManager.reset().load(n)})},rollback(e){e.loadResources=r,e.loadResourcesAsync=t}}},xe="CompilerSupportStrategy",Je=function(){return{name:xe,condition:[k,$],exec(r){r.compilerManager.compilerMap.forEach((t,e)=>{var n;t.useEngine(r),(n=r.dataSupportManager.dataSupportMap.get(e))==null||n.addCompiler(t)})},rollback(){}}};var Ue=(r=>(r[r.ZERO=0]="ZERO",r[r.ONE=100]="ONE",r[r.TWO=200]="TWO",r[r.THREE=300]="THREE",r[r.FOUR=400]="FOUR",r[r.FIVE=500]="FIVE",r[r.SIX=600]="SIX",r[r.SEVEN=700]="SEVEN",r[r.EIGHT=800]="EIGHT",r[r.NINE=900]="NINE",r))(Ue||{});class Ge extends w.Engine{constructor(){super();u(this,"moduleLifeCycle",[]);u(this,"moduleTriggers",[fe]);u(this,"processorExpands",[]);this.install(S.LoaderManagerPlugin()).install(W.PointerManagerPlugin()).install(H.EventManagerPlugin()).install(V.RenderManagerPlugin()).install(Re()).install(je()).install(De()),this.exec(Pe()).exec(Te()).exec(Je())}loadLifeCycle(e){const n=this.dataSupportManager,s=this.moduleTriggers,i=this.moduleLifeCycle.sort((o,a)=>o.order-a.order);for(const{module:o}of i){e[o]&&n.loadByModule(e[o],o);for(const a of s)a.updateCondition(o),a.test()&&a.trig()}}removeLifeCycle(e){const n=this.dataSupportManager,s=this.moduleLifeCycle.sort((c,f)=>f.order-c.order);for(const{module:c}of s)e[c]&&n.remove({[c]:e[c]});const i=e.assets||[],o=this.resourceManager,a=this.loaderManager;i.forEach(c=>{o.remove(c),a.remove(c)})}loadConfig(e,n){const s=this.renderManager.hasRendering();if(s&&this.renderManager.stop(),e.assets&&e.assets.length){const i=o=>{delete e.assets,this.loadLifeCycle(e),this.resourceManager.removeEventListener("mapped",i),n&&n(o),s?this.renderManager.play():this.renderManager.render()};this.resourceManager.addEventListener("mapped",i),this.loaderManager.reset().load(e.assets)}else this.loadLifeCycle(e),n&&n(),s?this.renderManager.play():this.renderManager.render();return this}loadConfigAsync(e,n){return new Promise((s,i)=>{const o=this.renderManager.hasRendering();o&&this.renderManager.stop(),e.assets&&e.assets.length?this.loadResourcesAsync(e.assets).then(a=>{delete e.assets,this.loadLifeCycle(e),o?this.renderManager.play():this.renderManager.render(),s(a)}):(this.loadLifeCycle(e),o?this.renderManager.play():this.renderManager.render(),s({type:q.MAPPED,configMap:this.resourceManager.configMap,resourceMap:this.resourceManager.resourceMap,resourceConfig:{}}))})}removeConfig(e){this.removeLifeCycle(e)}getObjectConfig(e){const n=this.getObjectSymbol(e);return n?this.getConfigBySymbol(n):null}registModule(e){if(F[e.type.toLocaleUpperCase()])return console.warn(`module ${e.type} is already exist.`),this;F[e.type.toLocaleUpperCase()]=e.type,e.object&&(N[e.type]=!0);const n=Ee(e.type,e.rule),s=he(e.type,e.compiler,e.processors);for(const a of e.processors)X(a,e.type);const i=new s,o=new n([]);this.dataSupportManager.extend(o),this.compilerManager.extend(i),i.useEngine(this),o.addCompiler(i),e.extend&&e.extend(this),e.processors.forEach(a=>{}),e.expand&&this.processorExpands.push(...e.expand);for(const a of this.processorExpands)Array.isArray(a.processors)?Object.values(J).forEach(c=>{a.processors.includes(c.type)&&c.expand(a.command)}):Object.values(J).forEach(c=>{a.processors.test(c.type)&&c.expand(a.command)});return this.moduleLifeCycle.push({module:e.type,order:e.lifeOrder||0}),this.moduleTriggers.forEach(a=>{a.registerModule(e.type)}),this}}const lt=function(r){const t=new Ge;return r.modules&&r.modules.forEach(e=>{t.registModule(e)}),r.plugins&&r.plugins.forEach(e=>{t.install(e)}),r.strategy&&r.strategy.forEach(e=>{t.exec(e)}),t},y=class{static generateConfig(t,e){if(!y.configLibrary.has(t))return console.warn(`event library can not found config by name: ${t}`),{name:""};const n=(i,o)=>{for(const a in o)i[a]!==void 0&&(typeof o[a]=="object"&&o[a]!==null&&!Array.isArray(o[a])?n(i[a],o[a]):i[a]=o[a])},s=JSON.parse(JSON.stringify(y.configLibrary.get(t)));return n(s,e),s}static generateScript(t,e,n,s){return y.generatorLibrary.has(s.name)?y.generatorLibrary.get(s.name)(t,e,n,s):(console.error(`event library can not found generator by name: ${s.name}`),()=>{})}static has(t){return y.configLibrary.has(t)}};let A=y;u(A,"configLibrary",new Map),u(A,"generatorLibrary",new Map),u(A,"register",function({config:t,generator:e}){return y.configLibrary.has(t.name)?(console.warn(`EventLibrary has already exist this event generator: ${t.name}, that will be cover.`),y):(y.configLibrary.set(t.name,JSON.parse(JSON.stringify(t))),y.generatorLibrary.set(t.name,e),y)});const g=class{static generateConfig(t,e){if(!g.configLibrary.has(t))return console.warn(`event library can not found config by name: ${t}`),{name:""};const n=(i,o)=>{for(const a in o)typeof o[a]=="object"&&o[a]!==null&&!Array.isArray(o[a])?n(i[a],o[a]):i[a]=o[a]},s=JSON.parse(JSON.stringify(g.configLibrary.get(t)));return n(s,e),s}static generateEvent(t,e){return g.generatorLibrary.has(t.name)?g.generatorLibrary.get(t.name)(e,t):(console.error(`event library can not found generator by name: ${t.name}`),()=>{})}static has(t){return g.configLibrary.has(t)}};let j=g;u(j,"configLibrary",new Map),u(j,"generatorLibrary",new Map),u(j,"register",function({config:t,generator:e}){return g.configLibrary.has(t.name)?(console.warn(`EventGeneratorManager has already exist this event generator: ${t.name}, that will be cover.`),g):(g.configLibrary.set(t.name,JSON.parse(JSON.stringify(t))),g.generatorLibrary.set(t.name,e),g)});const O=class{static getShader(t){return O.library.has(t)?O.cloneShader(O.library.get(t)):(console.warn(`con not found shader in shader library: ${t}`),null)}static generateConfig(t,e){if(!O.library.has(t))return console.warn(`con not found shader in shader library: ${t}`),{shader:t,uniforms:{}};const n=O.library.get(t),s={shader:t,uniforms:{}};if(n.uniforms&&(s.uniforms=JSON.parse(JSON.stringify(n.uniforms))),e){const i=(o,a)=>{for(const c in a)o[c]!==void 0&&(typeof a[c]=="object"&&a[c]!==null&&!Array.isArray(a[c])?(o[c]===null&&(o[c]={...a[c]}),i(o[c],a[c])):o[c]=a[c])};i(s.uniforms,e)}return s}static cloneShader(t){const e={name:t.name};return t.vertexShader&&(e.vertexShader=t.vertexShader),t.fragmentShader&&(e.fragmentShader=t.fragmentShader),t.uniforms&&(e.uniforms=JSON.parse(JSON.stringify(t.uniforms))),e}};let T=O;u(T,"library",new Map),u(T,"register",function(t){O.library.has(t.name)&&console.warn(`shader library has exist shader: ${t.name} that will be cover.`),O.library.set(t.name,t)});const ut=[k,$];l.AniScriptGeneratorManager=A,l.AntiShake=ce,l.Bus=ze,l.COMPILER_EVENT=pe,l.COMPILER_MANAGER_PLUGIN=k,l.COMPILER_SUPPORT_STRATEGY=xe,l.CONFIGFACTORY=b,l.CONFIGMODULE=z,l.CONFIGTYPE=x,l.Compiler=Ze,l.CompilerFactory=he,l.CompilerManager=Ce,l.CompilerManagerPlugin=De,l.CompilerSupportStrategy=Je,l.DATA_SUPPORT_MANAGER_PLUGIN=$,l.DataContainer=Oe,l.DataSupport=ve,l.DataSupportFactory=Ee,l.DataSupportManager=Ae,l.DataSupportManagerPlugin=je,l.EngineSupport=Ge,l.EventGeneratorManager=j,l.JSONHandler=qe,l.LOADER_DATA_SUPPORT_STRATEGY=Le,l.LOADER_MAPPING_STRATEGY=$e,l.LoaderDataSupportStrategy=Pe,l.LoaderMappingStrategy=Te,l.MODULETYPE=F,l.ModuleTrigger=le,l.OBJECTMODULE=N,l.ObjectModuleTrigger=ue,l.PLUGINS=ut,l.Parser=ct,l.Processor=we,l.ProcessorMembers=J,l.RESOURCE_EVENT=q,l.RESOURCE_MANAGER_PLUGIN=ee,l.ResourceManager=Ne,l.ResourceManagerPlugin=Re,l.Rule=st,l.SUPPORT_LIFE_CYCLE=Ue,l.ShaderGeneratorManager=T,l.Template=He,l.Translater=Se,l.createSymbol=Xe,l.defineEngineSupport=lt,l.defineOption=ke,l.defineProcessor=nt,l.emptyHandler=at,l.generateConfig=d,l.getModule=U,l.getObserver=ge,l.getSymbolConfig=ot,l.globalAntiShake=Ve,l.globalObjectModuleTrigger=fe,l.globalOption=h,l.installProcessor=X,l.isObjectModule=re,l.isObjectType=ne,l.observable=ye,l.uniqueSymbol=it,Object.keys(S).forEach(function(r){r!=="default"&&!l.hasOwnProperty(r)&&Object.defineProperty(l,r,{enumerable:!0,get:function(){return S[r]}})}),Object.keys(W).forEach(function(r){r!=="default"&&!l.hasOwnProperty(r)&&Object.defineProperty(l,r,{enumerable:!0,get:function(){return W[r]}})}),Object.keys(H).forEach(function(r){r!=="default"&&!l.hasOwnProperty(r)&&Object.defineProperty(l,r,{enumerable:!0,get:function(){return H[r]}})}),Object.keys(V).forEach(function(r){r!=="default"&&!l.hasOwnProperty(r)&&Object.defineProperty(l,r,{enumerable:!0,get:function(){return V[r]}})}),Object.defineProperties(l,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
