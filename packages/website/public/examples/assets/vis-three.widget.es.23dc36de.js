import{E as lt,o as $e,p as Me,O as ce,g as ft}from"./vis-three.middleware.es.7f273029.js";import{b as ut,i as at}from"./index.202ebdec.js";function ht(e,t){const n=Object.create(null),s=e.split(",");for(let r=0;r<s.length;r++)n[s[r]]=!0;return t?r=>!!n[r.toLowerCase()]:r=>!!n[r]}const pt=()=>{},dt=Object.prototype.hasOwnProperty,ee=(e,t)=>dt.call(e,t),T=Array.isArray,X=e=>We(e)==="[object Map]",gt=e=>typeof e=="function",mt=e=>typeof e=="string",re=e=>typeof e=="symbol",oe=e=>e!==null&&typeof e=="object",_t=Object.prototype.toString,We=e=>_t.call(e),yt=e=>We(e).slice(8,-1),_e=e=>mt(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,U=(e,t)=>!Object.is(e,t);let w;class wt{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=w,!t&&w&&(this.index=(w.scopes||(w.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const n=w;try{return w=this,t()}finally{w=n}}}on(){w=this}off(){w=this.parent}stop(t){if(this._active){let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.scopes)for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!t){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0,this._active=!1}}}function vt(e,t=w){t&&t.active&&t.effects.push(e)}function Et(){return w}const ye=e=>{const t=new Set(e);return t.w=0,t.n=0,t},Ne=e=>(e.w&C)>0,Be=e=>(e.n&C)>0,bt=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=C},Rt=e=>{const{deps:t}=e;if(t.length){let n=0;for(let s=0;s<t.length;s++){const r=t[s];Ne(r)&&!Be(r)?r.delete(e):t[n++]=r,r.w&=~C,r.n&=~C}t.length=n}},le=new WeakMap;let B=0,C=1;const fe=30;let v;const K=Symbol(""),ue=Symbol("");class we{constructor(t,n=null,s){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,vt(this,s)}run(){if(!this.active)return this.fn();let t=v,n=P;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=v,v=this,P=!0,C=1<<++B,B<=fe?bt(this):Te(this),this.fn()}finally{B<=fe&&Rt(this),C=1<<--B,v=this.parent,P=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){v===this?this.deferStop=!0:this.active&&(Te(this),this.onStop&&this.onStop(),this.active=!1)}}function Te(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let P=!0;const De=[];function St(){De.push(P),P=!1}function Ot(){const e=De.pop();P=e===void 0?!0:e}function _(e,t,n){if(P&&v){let s=le.get(e);s||le.set(e,s=new Map);let r=s.get(n);r||s.set(n,r=ye()),He(r)}}function He(e,t){let n=!1;B<=fe?Be(e)||(e.n|=C,n=!Ne(e)):n=!e.has(v),n&&(e.add(v),v.deps.push(e))}function I(e,t,n,s,r,o){const i=le.get(e);if(!i)return;let c=[];if(t==="clear")c=[...i.values()];else if(n==="length"&&T(e)){const l=Number(s);i.forEach((u,p)=>{(p==="length"||!re(p)&&p>=l)&&c.push(u)})}else switch(n!==void 0&&c.push(i.get(n)),t){case"add":T(e)?_e(n)&&c.push(i.get("length")):(c.push(i.get(K)),X(e)&&c.push(i.get(ue)));break;case"delete":T(e)||(c.push(i.get(K)),X(e)&&c.push(i.get(ue)));break;case"set":X(e)&&c.push(i.get(K));break}if(c.length===1)c[0]&&ae(c[0]);else{const l=[];for(const u of c)u&&l.push(...u);ae(ye(l))}}function ae(e,t){const n=T(e)?e:[...e];for(const s of n)s.computed&&Pe(s);for(const s of n)s.computed||Pe(s)}function Pe(e,t){(e!==v||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const Mt=ht("__proto__,__v_isRef,__isVue"),ze=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(re)),Ie=Tt();function Tt(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const s=f(this);for(let o=0,i=this.length;o<i;o++)_(s,"get",o+"");const r=s[t](...n);return r===-1||r===!1?s[t](...n.map(f)):r}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){St();const s=f(this)[t].apply(this,n);return Ot(),s}}),e}function Pt(e){const t=f(this);return _(t,"has",e),t.hasOwnProperty(e)}class Le{constructor(t=!1,n=!1){this._isReadonly=t,this._shallow=n}get(t,n,s){const r=this._isReadonly,o=this._shallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return o;if(n==="__v_raw")return s===(r?o?Ht:Je:o?qe:Ye).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(s)?t:void 0;const i=T(t);if(!r){if(i&&ee(Ie,n))return Reflect.get(Ie,n,s);if(n==="hasOwnProperty")return Pt}const c=Reflect.get(t,n,s);return(re(n)?ze.has(n):Mt(n))||(r||_(t,"get",n),o)?c:m(c)?i&&_e(n)?c:c.value:oe(c)?r?Ge(c):ke(c):c}}class Ue extends Le{constructor(t=!1){super(!1,t)}set(t,n,s,r){let o=t[n];if(H(o)&&m(o)&&!m(s))return!1;if(!this._shallow&&(!te(s)&&!H(s)&&(o=f(o),s=f(s)),!T(t)&&m(o)&&!m(s)))return o.value=s,!0;const i=T(t)&&_e(n)?Number(n)<t.length:ee(t,n),c=Reflect.set(t,n,s,r);return t===f(r)&&(i?U(s,o)&&I(t,"set",n,s):I(t,"add",n,s)),c}deleteProperty(t,n){const s=ee(t,n);t[n];const r=Reflect.deleteProperty(t,n);return r&&s&&I(t,"delete",n,void 0),r}has(t,n){const s=Reflect.has(t,n);return(!re(n)||!ze.has(n))&&_(t,"has",n),s}ownKeys(t){return _(t,"iterate",T(t)?"length":K),Reflect.ownKeys(t)}}class It extends Le{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Ct=new Ue,xt=new It,jt=new Ue(!0),ve=e=>e,ie=e=>Reflect.getPrototypeOf(e);function q(e,t,n=!1,s=!1){e=e.__v_raw;const r=f(e),o=f(t);n||(U(t,o)&&_(r,"get",t),_(r,"get",o));const{has:i}=ie(r),c=s?ve:n?Re:z;if(i.call(r,t))return c(e.get(t));if(i.call(r,o))return c(e.get(o));e!==r&&e.get(t)}function J(e,t=!1){const n=this.__v_raw,s=f(n),r=f(e);return t||(U(e,r)&&_(s,"has",e),_(s,"has",r)),e===r?n.has(e):n.has(e)||n.has(r)}function k(e,t=!1){return e=e.__v_raw,!t&&_(f(e),"iterate",K),Reflect.get(e,"size",e)}function Ce(e){e=f(e);const t=f(this);return ie(t).has.call(t,e)||(t.add(e),I(t,"add",e,e)),this}function xe(e,t){t=f(t);const n=f(this),{has:s,get:r}=ie(n);let o=s.call(n,e);o||(e=f(e),o=s.call(n,e));const i=r.call(n,e);return n.set(e,t),o?U(t,i)&&I(n,"set",e,t):I(n,"add",e,t),this}function je(e){const t=f(this),{has:n,get:s}=ie(t);let r=n.call(t,e);r||(e=f(e),r=n.call(t,e)),s&&s.call(t,e);const o=t.delete(e);return r&&I(t,"delete",e,void 0),o}function Ae(){const e=f(this),t=e.size!==0,n=e.clear();return t&&I(e,"clear",void 0,void 0),n}function G(e,t){return function(s,r){const o=this,i=o.__v_raw,c=f(i),l=t?ve:e?Re:z;return!e&&_(c,"iterate",K),i.forEach((u,p)=>s.call(r,l(u),l(p),o))}}function Z(e,t,n){return function(...s){const r=this.__v_raw,o=f(r),i=X(o),c=e==="entries"||e===Symbol.iterator&&i,l=e==="keys"&&i,u=r[e](...s),p=n?ve:t?Re:z;return!t&&_(o,"iterate",l?ue:K),{next(){const{value:a,done:b}=u.next();return b?{value:a,done:b}:{value:c?[p(a[0]),p(a[1])]:p(a),done:b}},[Symbol.iterator](){return this}}}}function S(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function At(){const e={get(o){return q(this,o)},get size(){return k(this)},has:J,add:Ce,set:xe,delete:je,clear:Ae,forEach:G(!1,!1)},t={get(o){return q(this,o,!1,!0)},get size(){return k(this)},has:J,add:Ce,set:xe,delete:je,clear:Ae,forEach:G(!1,!0)},n={get(o){return q(this,o,!0)},get size(){return k(this,!0)},has(o){return J.call(this,o,!0)},add:S("add"),set:S("set"),delete:S("delete"),clear:S("clear"),forEach:G(!0,!1)},s={get(o){return q(this,o,!0,!0)},get size(){return k(this,!0)},has(o){return J.call(this,o,!0)},add:S("add"),set:S("set"),delete:S("delete"),clear:S("clear"),forEach:G(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(o=>{e[o]=Z(o,!1,!1),n[o]=Z(o,!0,!1),t[o]=Z(o,!1,!0),s[o]=Z(o,!0,!0)}),[e,n,t,s]}const[Kt,Ft,$t,Wt]=At();function Ee(e,t){const n=t?e?Wt:$t:e?Ft:Kt;return(s,r,o)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_raw"?s:Reflect.get(ee(n,r)&&r in s?n:s,r,o)}const Nt={get:Ee(!1,!1)},Bt={get:Ee(!1,!0)},Dt={get:Ee(!0,!1)},Ye=new WeakMap,qe=new WeakMap,Je=new WeakMap,Ht=new WeakMap;function zt(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Lt(e){return e.__v_skip||!Object.isExtensible(e)?0:zt(yt(e))}function ke(e){return H(e)?e:be(e,!1,Ct,Nt,Ye)}function Ut(e){return be(e,!1,jt,Bt,qe)}function Ge(e){return be(e,!0,xt,Dt,Je)}function be(e,t,n,s,r){if(!oe(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const o=r.get(e);if(o)return o;const i=Lt(e);if(i===0)return e;const c=new Proxy(e,i===2?s:n);return r.set(e,c),c}function D(e){return H(e)?D(e.__v_raw):!!(e&&e.__v_isReactive)}function H(e){return!!(e&&e.__v_isReadonly)}function te(e){return!!(e&&e.__v_isShallow)}function f(e){const t=e&&e.__v_raw;return t?f(t):e}const z=e=>oe(e)?ke(e):e,Re=e=>oe(e)?Ge(e):e;function Ze(e){P&&v&&(e=f(e),He(e.dep||(e.dep=ye())))}function Qe(e,t){e=f(e);const n=e.dep;n&&ae(n)}function m(e){return!!(e&&e.__v_isRef===!0)}function Rn(e){return Yt(e,!1)}function Yt(e,t){return m(e)?e:new qt(e,t)}class qt{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:f(t),this._value=n?t:z(t)}get value(){return Ze(this),this._value}set value(t){const n=this.__v_isShallow||te(t)||H(t);t=n?t:f(t),U(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:z(t),Qe(this))}}function Jt(e){return m(e)?e.value:e}const kt={get:(e,t,n)=>Jt(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const r=e[t];return m(r)&&!m(n)?(r.value=n,!0):Reflect.set(e,t,n,s)}};function Gt(e){return D(e)?e:new Proxy(e,kt)}class Zt{constructor(t,n,s,r){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new we(t,()=>{this._dirty||(this._dirty=!0,Qe(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!r,this.__v_isReadonly=s}get value(){const t=f(this);return Ze(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}function Sn(e,t,n=!1){let s,r;const o=gt(e);return o?(s=e,r=pt):(s=e.get,r=e.set),new Zt(s,r,o||!r,n)}const Qt={},Xt=()=>{},Vt=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Xe=Array.isArray,en=e=>Se(e)==="[object Map]",tn=e=>Se(e)==="[object Set]",W=e=>typeof e=="function",Ve=e=>e!==null&&typeof e=="object",nn=e=>(Ve(e)||W(e))&&W(e.then)&&W(e.catch),sn=Object.prototype.toString,Se=e=>sn.call(e),rn=e=>Se(e)==="[object Object]",Ke=(e,t)=>!Object.is(e,t),on="0.6.0",et=function(e,t=null,n={}){return{_isVNode:!0,type:e,props:t,config:null,component:null,el:null,key:n.key||null,ref:n.ref||null,children:null}},M=function(e){return typeof e=="object"?Boolean(e._isVNode):!1},ne=function(e){return/^on[A-Z]/.test(e)},cn=function(e){const t=e.props,n={};for(const s in t)ne(s)&&(n[s]=t[s]);return n};var he=(e=>(e.STATIC="static",e.VIF="vif",e.VFOR="vfor",e))(he||{});const h=function(e,t=null){const n=et(e,t,{key:t&&t.key||null,ref:t&&t.ref||null});return h.add(n),n};h.reset=function(){h.el=null,h.scope="static",h.vnodes=[]};h.add=function(e){if(e.el=h.el,h.scope!=="static"){const t=h.vnodes[h.vnodes.length-1];h.scope==="vfor"&&(e.key||(e.key=t.vnodes.length),t.keyMap.set(e.key,e)),t.vnodes.push(e)}else h.vnodes.push(e);return h.vnodes};const On=function(e,t=null){return h(e,t)},Mn=function(e){h.scope="vif",h.vnodes.push({scope:h.scope,vnodes:[],keyMap:new Map}),e(),h.scope="static"},Tn=function(e){h.scope="vfor",h.vnodes.push({scope:h.scope,vnodes:[],keyMap:new Map}),e(),h.scope="static"};var pe=(e=>(e.MOUNTED="mounted",e.BEFORE_DISTORY="beforeDistory",e.UPDATE="update",e))(pe||{});const Pn=function(e=()=>{}){g.currentComponent&&g.currentComponent.on("mounted",t=>e())};let se=!1,de=!1;const E=[];let O=0;const N=[];let R=null,A=0;const ln=Promise.resolve();function fn(e){let t=O+1,n=E.length;for(;t<n;){const s=t+n>>>1,r=E[s],o=L(r);o<e||o===e&&r.pre?t=s+1:n=s}return t}function tt(e){(!E.length||!E.includes(e,se&&e.allowRecurse?O+1:O))&&(e.id==null?E.push(e):E.splice(fn(e.id),0,e),nt())}function nt(){!se&&!de&&(de=!0,ln.then(st))}function ge(e){Array.isArray(e)?N.push(...e):(!R||!R.includes(e,e.allowRecurse?A+1:A))&&N.push(e),nt()}function un(){if(N.length){const e=[...new Set(N)];if(N.length=0,R){R.push(...e);return}for(R=e,R.sort((t,n)=>L(t)-L(n)),A=0;A<R.length;A++)R[A]();R=null,A=0}}const L=e=>e.id==null?1/0:e.id,an=(e,t)=>{const n=L(e)-L(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function st(){de=!1,se=!0,E.sort(an);try{for(O=0;O<E.length;O++){const e=E[O];if(e&&e.active!==!1)try{e()}catch(t){console.error(t)}}}finally{O=0,E.length=0,un(),se=!1,(E.length||N.length)&&st()}}const F=Symbol.for("vis.widget.event"),hn=function(e){const t=function(n){t.value(n)};return t.value=e,t},Fe=/Once$/;function Oe(e){let t={};if(Fe.test(e)){t={};let s;for(;s=e.match(Fe);)e=e.slice(0,e.length-s[0].length),t[s[0].toLowerCase()]=!0}return[e.slice(2).toLowerCase(),t]}const pn=function(e,t,n){if(t[F]){console.error("config has already create events",t);return}const s=cn(e);for(const r in s){s[r]=hn(s[r]);const[o,i]=Oe(r);n.addEventListener(o,s[r])}t[F]=s},dn=function(e){const t=e.props,n=e.config;if(!n[F])return;const s=n[F];for(const r in s){const o=s[r];o&&o.value!==t[r]&&(o.value=t[r])}},gn=function(e,t){const n=e.config;if(!n[F])return;const s=n[F];for(const r in s){const o=s[r];if(o){const[i,c]=Oe(r);t.removeEventListener(i,o)}}n[F]=void 0};class g extends ut{constructor(t,n){super(),this.cid=$e(),this.name="",this.el="",this.isMounted=!1,this.props=Ut(Object.create(Object.prototype)),this.scope=new wt(!0),this.subTree=null,this.cacheResources=Object.create(Object.prototype),this.resourcesKeyEnum=Object.create(Object.prototype),this.vnode=t;const s=t.type;s.name&&(this.name=s.name),this.el=s.el,this.options=s,this.renderer=n,this.engine=n.engine,this.ctx=n.context,this.createProps(),this.createSetup(),this.createResources(),this.createRender(),this.createEffect()}static setCurrentComponent(t){g.currentComponent=t,t.scope.on()}static unsetCurrentComponent(){g.currentComponent&&g.currentComponent.scope.off(),g.currentComponent=null}renderTree(){return h.reset(),h.el=this.el,this.render.call({...this.setupState,...this.props},{components:this.options.components||{},resources:this.resourcesKeyEnum}),h.vnodes}createResources(){if(!this.options.resources)return;const t=this.options.resources.call(this.setupState);this.engine.registerResources(t),this.cacheResources=t;for(const n in t)this.resourcesKeyEnum[n]=n}createProps(){const t=this.options.props||{},n=this.vnode.props||{},s=this.props,r=this.options.emits||{},o={};for(const i in n)if(ne(i)){const[c,l]=Oe(i);r[c]?this[l.once?"once":"on"](c,n[i]):console.warn(`widget Component: you not declare attribute  ${i}  in emits options`,this.options)}else o[i]=n[i];for(const i in t){const c=t[i];if(c.required&&typeof o[i]=="undefined"){console.error("widget component: component prop is required.",{component:this,props:o,key:i});return}let l;if(typeof o[i]!="undefined"?l=o[i]:c.default&&(l=typeof c.default=="function"?c.default():c.default),l.constructor!==c.type){console.error("widget component: component prop is not instance of type.",{component:this,props:o,key:i,value:l,type:c.type});return}s[i]=l}}createSetup(){if(!this.options.setup)return;g.setCurrentComponent(this);const t=this.options.setup({engine:this.engine,props:this.props,emit:this.emit.bind(this)})||{};this.setupState=Gt(t),this.rawSetupState=t,g.unsetCurrentComponent()}createRender(){this.render=this.options.render}createEffect(){const t=new we(()=>{if(this.isMounted){const s=this.renderTree(),r=this.subTree;if(r.length!==s.length){console.error("widget component render: tree render error",{nextTree:s,prevTree:r});return}for(let o=0;o<s.length;o+=1)if(M(r[o])&&M(s[o]))this.renderer.patch(r[o],s[o]);else{const i=s[o],c=r[o];if(i.scope!==c.scope){console.error("widget component render: tree render error",{nextTree:s,prevTree:r});return}if(i.scope===he.VIF){for(const l of c.vnodes)this.renderer.patch(l,null);for(const l of i.vnodes)this.renderer.patch(null,l)}else if(i.scope===he.VFOR){for(const l of i.keyMap.keys())c.keyMap.has(l)?(this.renderer.patch(c.keyMap.get(l),i.keyMap.get(l)),c.keyMap.delete(l)):this.renderer.patch(null,i.keyMap.get(l));for(const l of c.keyMap.values())this.renderer.unmountElement(l)}else console.warn(`widget component render: unknow scope type: ${i.scope}`)}this.subTree=s}else{const s=this.rawSetupState,r=i=>{!i.ref||typeof s[i.ref]!="undefined"&&(s[i.ref].value=i.component?i.component:i.config||null)},o=this.subTree=this.renderTree();for(const i of o)if(M(i))this.renderer.patch(null,i),r(i);else for(const c of i.vnodes)this.renderer.patch(null,c),r(c);this.isMounted=!0,ge(()=>this.emit(pe.MOUNTED))}},()=>tt(n),this.scope),n=()=>t.run();n(),this.effect=t,this.update=n}distory(){this.emit(pe.BEFORE_DISTORY),this.scope.stop(),this.effect.active=!1,this.effect.stop();const t=this.subTree||[];for(let n=0;n<t.length;n+=1)if(M(t[n]))this.renderer.patch(t[n],null),t[n].config=null;else for(const s of t[n].vnodes)this.renderer.patch(s,null),s.config=null}updateProps(t){const n=this.props;for(const s in t)n[s]=t[s]}getState(t=!0){return t?this.rawSetupState:this.setupState}}const In=function(e){return e},rt=e=>{if(typeof e=="object"){if(M(e))return e.config.vid;for(const t in e)e[t]=rt(e[t]);return e}else return e};class mn{constructor(t){this.context=t,this.engine=t.engine}log(t,n,s){n?console[t](`Widget renderer: ${n}`,s):console.info(`Widget renderer: ${t}`)}patch(t,n){if(!t&&!n){console.error("widget renderer: patch prarams all of null");return}t!==n&&(n&&typeof n.type=="string"||t&&typeof t.type=="string"?this.processElement(t,n):this.processComponent(t,n))}render(t){this.patch(null,t)}processElement(t,n){if(!t&&!n){console.error("widget renderer: processElement prarams all of null");return}t===null?this.mountElement(n):n===null?this.unmountElement(t):this.patchElement(t,n)}unmountElement(t){if(Me(t.type)){if(t.config.parent){const s=this.engine.getConfigfromModules(ce,t.config.parent);if(!s){console.error("widget renderer: can not found parent config with: ",t);return}s.children.splice(s.children.indexOf(t.config.vid),1)}else if(!t.el){const s=this.engine.getObjectBySymbol(t.config.vid);s||console.error("widget renderer: can not found Three object with: ",t),s.removeFromParent()}const n=this.engine.getObjectBySymbol(t.config.vid);gn(t,n)}this.engine.removeConfigBySymbol(t.config.vid)}mountElement(t){const{element:n,onProps:s}=this.createElement(t);if(this.engine.applyConfig(n),Me(n.type)){if(!t.el)this.engine.scene.add(this.engine.getObjectfromModules(ce,n.vid));else{const o=this.engine.getConfigfromModules(ce,t.el);if(!o){console.error(`widget renderer: can not found parent config with: ${t.el}`);return}o.children.push(n.vid)}const r=this.engine.getObjectBySymbol(n.vid);pn(t,n,r)}}patchElement(t,n){if(t.type!==n.type)this.unmountElement(t),this.mountElement(n);else{n.config=t.config;const s=t.config;s||console.error("widget renderer: can not found  config with: ",t);let r={};const o=n.props;let i=!1;for(const l in t.props){if(ne(l)){i=!0;continue}r[l]=t.props[l]}const c=(l,u,p)=>{for(const a in l)M(l[a])?M(u[a])&&u[a].config.vid!==l[a].config.vid?p[a]=u[a].config.vid:M(u[a])||(p[a]=u[a]):at(l[a])?c(l[a],u[a],p[a]):u[a]!==l[a]&&(p[a]=u[a])};c(r,o,s),i&&dn(n)}}createElement(t){const n=t.props,s={},r={};for(const i in n)["ref","index"].includes(i)||(ne(i)?r[i]=n[i]:s[i]=rt(n[i]));const o=ft(t.type,s,{strict:!1,warn:!1});return t.config=o,{element:o,onProps:r}}processComponent(t,n){if(!t&&!n){console.error("widget renderer: processElement prarams all of null");return}t===null?this.mountComponent(n):n===null?this.unmountComponent(t):this.patchComponent(t,n)}mountComponent(t){t.component=new g(t,this)}unmountComponent(t){var n;(n=t.component)==null||n.distory(),t.component=null}patchComponent(t,n){const s=t.component;n.component=s,s.vnode=n;const r=t.props||{},o=n.props||{},i={};let c=!1;for(const l in o)o[l]!==r[l]&&(i[l]=o[l],c=!0);c&&(s.updateProps(i),s.update())}}class _n{constructor(t,n){this.wid=$e(),this.version=on,this.components={},this.instance=null,this.engine=t,this.root=n,this.renderer=new mn(this)}component(t,n){if(typeof t=="object"){if(n=t,!n.name){console.error("widget register component must be provide a name",n);return}t=n.name}if(!n){console.error("widget register component must be provide a component not a null",t);return}if(this.components[t]){console.warn(`A component with this name already exists: ${t}`);return}this.components[t]=n}mount(){const t=et(this.root);return this.renderer.render(t),this.instance=t.component,this}getState(){var t;return(t=this.instance)==null?void 0:t.getState(!0)}unmount(){var t;(t=this.instance)==null||t.distory()}use(){}}class yn extends lt{constructor(t={}){super(t)}createWidget(t){return new _n(this,t)}}const Cn=function(e,t={}){const n=new yn;return e.modules&&e.modules.forEach(s=>{n.registModule(s)}),e.plugins&&e.plugins.forEach(s=>{n.install(s)}),e.strategy&&e.strategy.forEach(s=>{n.exec(s)}),e.wdigets&&e.wdigets.forEach(s=>{n.createWidget(s)}),n};function V(e,t,n){let s;try{s=n?e(...n):e()}catch(r){console.error(r)}return s}function me(e,t,n){if(W(e)){const r=V(e,t,n);return r&&nn(r)&&r.catch(o=>{console.error(o)}),r}const s=[];for(let r=0;r<e.length;r++)s.push(me(e[r],t,n));return s}const Q={};function xn(e,t,n){return wn(e,t,n)}function wn(e,t,{immediate:n,deep:s,flush:r,onTrack:o,onTrigger:i}=Qt){var c;const l=Et()===((c=g.currentComponent)==null?void 0:c.scope)?g.currentComponent:null;let u,p=!1,a=!1;if(m(e)?(u=()=>e.value,p=te(e)):D(e)?(u=()=>e,s=!0):Xe(e)?(a=!0,p=e.some(d=>D(d)||te(d)),u=()=>e.map(d=>{if(m(d))return d.value;if(D(d))return $(d);if(W(d))return V(d)})):W(e)?t?u=()=>V(e):u=()=>{if(!(l&&!l.isMounted))return b&&b(),me(e,l)}:u=Xt,t&&s){const d=u;u=()=>$(d())}let b,ot=d=>{b=y.onStop=()=>{V(d),b=y.onStop=void 0}},x=a?new Array(e.length).fill(Q):Q;const j=()=>{if(!!y.active)if(t){const d=y.run();(s||p||(a?d.some((it,ct)=>Ke(it,x[ct])):Ke(d,x)))&&(b&&b(),me(t,l,[d,x===Q?void 0:a&&x[0]===Q?[]:x,ot]),x=d)}else y.run()};j.allowRecurse=!!t;let Y;r==="sync"?Y=j:r==="post"?Y=()=>ge(j):(j.pre=!0,l&&(j.id=l.cid),Y=()=>tt(j));const y=new we(u,Y);return t?n?j():x=y.run():r==="post"?ge(y.run.bind(y)):y.run(),()=>{y.stop(),l&&l.scope&&Vt(l.scope.effects,y)}}function $(e,t){if(!Ve(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),m(e))$(e.value,t);else if(Xe(e))for(let n=0;n<e.length;n++)$(e[n],t);else if(tn(e)||en(e))e.forEach(n=>{$(n,t)});else if(rn(e))for(const n in e)$(e[n],t);return e}export{yn as E,Rn as a,Cn as b,Sn as c,In as d,Mn as e,On as h,Pn as o,ke as r,Tn as v,xn as w};
