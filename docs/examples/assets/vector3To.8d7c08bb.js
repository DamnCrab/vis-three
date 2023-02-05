import{az as z,s as x,ab as P,h as R}from"./three.53c13b85.js";var p={Linear:{None:function(t){return t}},Quadratic:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quartic:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quintic:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sinusoidal:{In:function(t){return 1-Math.cos(t*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return .5*(1-Math.cos(Math.PI*t))}},Exponential:{In:function(t){return t===0?0:Math.pow(1024,t-1)},Out:function(t){return t===1?1:1-Math.pow(2,-10*t)},InOut:function(t){return t===0?0:t===1?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2)}},Circular:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){return t===0?0:t===1?1:-Math.pow(2,10*(t-1))*Math.sin((t-1.1)*5*Math.PI)},Out:function(t){return t===0?0:t===1?1:Math.pow(2,-10*t)*Math.sin((t-.1)*5*Math.PI)+1},InOut:function(t){return t===0?0:t===1?1:(t*=2,t<1?-.5*Math.pow(2,10*(t-1))*Math.sin((t-1.1)*5*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin((t-1.1)*5*Math.PI)+1)}},Back:{In:function(t){var n=1.70158;return t*t*((n+1)*t-n)},Out:function(t){var n=1.70158;return--t*t*((n+1)*t+n)+1},InOut:function(t){var n=2.5949095;return(t*=2)<1?.5*(t*t*((n+1)*t-n)):.5*((t-=2)*t*((n+1)*t+n)+2)}},Bounce:{In:function(t){return 1-p.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?p.Bounce.In(t*2)*.5:p.Bounce.Out(t*2-1)*.5+.5}}},A;typeof self=="undefined"&&typeof process!="undefined"&&process.hrtime?A=function(){var t=process.hrtime();return t[0]*1e3+t[1]/1e6}:typeof self!="undefined"&&self.performance!==void 0&&self.performance.now!==void 0?A=self.performance.now.bind(self.performance):Date.now!==void 0?A=Date.now:A=function(){return new Date().getTime()};var I=A,D=function(){function t(){this._tweens={},this._tweensAddedDuringUpdate={}}return t.prototype.getAll=function(){var n=this;return Object.keys(this._tweens).map(function(e){return n._tweens[e]})},t.prototype.removeAll=function(){this._tweens={}},t.prototype.add=function(n){this._tweens[n.getId()]=n,this._tweensAddedDuringUpdate[n.getId()]=n},t.prototype.remove=function(n){delete this._tweens[n.getId()],delete this._tweensAddedDuringUpdate[n.getId()]},t.prototype.update=function(n,e){n===void 0&&(n=I()),e===void 0&&(e=!1);var i=Object.keys(this._tweens);if(i.length===0)return!1;for(;i.length>0;){this._tweensAddedDuringUpdate={};for(var r=0;r<i.length;r++){var o=this._tweens[i[r]],s=!e;o&&o.update(n,s)===!1&&!e&&delete this._tweens[i[r]]}i=Object.keys(this._tweensAddedDuringUpdate)}return!0},t}(),T={Linear:function(t,n){var e=t.length-1,i=e*n,r=Math.floor(i),o=T.Utils.Linear;return n<0?o(t[0],t[1],i):n>1?o(t[e],t[e-1],e-i):o(t[r],t[r+1>e?e:r+1],i-r)},Bezier:function(t,n){for(var e=0,i=t.length-1,r=Math.pow,o=T.Utils.Bernstein,s=0;s<=i;s++)e+=r(1-n,i-s)*r(n,s)*t[s]*o(i,s);return e},CatmullRom:function(t,n){var e=t.length-1,i=e*n,r=Math.floor(i),o=T.Utils.CatmullRom;return t[0]===t[e]?(n<0&&(r=Math.floor(i=e*(1+n))),o(t[(r-1+e)%e],t[r],t[(r+1)%e],t[(r+2)%e],i-r)):n<0?t[0]-(o(t[0],t[0],t[1],t[1],-i)-t[0]):n>1?t[e]-(o(t[e],t[e],t[e-1],t[e-1],i-e)-t[e]):o(t[r?r-1:0],t[r],t[e<r+1?e:r+1],t[e<r+2?e:r+2],i-r)},Utils:{Linear:function(t,n,e){return(n-t)*e+t},Bernstein:function(t,n){var e=T.Utils.Factorial;return e(t)/e(n)/e(t-n)},Factorial:function(){var t=[1];return function(n){var e=1;if(t[n])return t[n];for(var i=n;i>1;i--)e*=i;return t[n]=e,e}}(),CatmullRom:function(t,n,e,i,r){var o=(e-t)*.5,s=(i-n)*.5,a=r*r,c=r*a;return(2*n-2*e+o+s)*c+(-3*n+3*e-2*o-s)*a+o*r+n}}},N=function(){function t(){}return t.nextId=function(){return t._nextId++},t._nextId=0,t}(),M=new D,_=function(){function t(n,e){e===void 0&&(e=M),this._object=n,this._group=e,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=p.Linear.None,this._interpolationFunction=T.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._id=N.nextId(),this._isChainStopped=!1,this._goToEnd=!1}return t.prototype.getId=function(){return this._id},t.prototype.isPlaying=function(){return this._isPlaying},t.prototype.isPaused=function(){return this._isPaused},t.prototype.to=function(n,e){return this._valuesEnd=Object.create(n),e!==void 0&&(this._duration=e),this},t.prototype.duration=function(n){return this._duration=n,this},t.prototype.start=function(n){if(this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var e in this._valuesStartRepeat)this._swapEndStartRepeatValues(e),this._valuesStart[e]=this._valuesStartRepeat[e]}return this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=n!==void 0?typeof n=="string"?I()+parseFloat(n):n:I(),this._startTime+=this._delayTime,this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat),this},t.prototype._setupProperties=function(n,e,i,r){for(var o in i){var s=n[o],a=Array.isArray(s),c=a?"array":typeof s,u=!a&&Array.isArray(i[o]);if(!(c==="undefined"||c==="function")){if(u){var f=i[o];if(f.length===0)continue;f=f.map(this._handleRelativeValue.bind(this,s)),i[o]=[s].concat(f)}if((c==="object"||a)&&s&&!u){e[o]=a?[]:{};for(var l in s)e[o][l]=s[l];r[o]=a?[]:{},this._setupProperties(s,e[o],i[o],r[o])}else typeof e[o]=="undefined"&&(e[o]=s),a||(e[o]*=1),u?r[o]=i[o].slice().reverse():r[o]=e[o]||0}}},t.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},t.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},t.prototype.pause=function(n){return n===void 0&&(n=I()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=n,this._group&&this._group.remove(this),this)},t.prototype.resume=function(n){return n===void 0&&(n=I()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=n-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},t.prototype.stopChainedTweens=function(){for(var n=0,e=this._chainedTweens.length;n<e;n++)this._chainedTweens[n].stop();return this},t.prototype.group=function(n){return this._group=n,this},t.prototype.delay=function(n){return this._delayTime=n,this},t.prototype.repeat=function(n){return this._initialRepeat=n,this._repeat=n,this},t.prototype.repeatDelay=function(n){return this._repeatDelayTime=n,this},t.prototype.yoyo=function(n){return this._yoyo=n,this},t.prototype.easing=function(n){return this._easingFunction=n,this},t.prototype.interpolation=function(n){return this._interpolationFunction=n,this},t.prototype.chain=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return this._chainedTweens=n,this},t.prototype.onStart=function(n){return this._onStartCallback=n,this},t.prototype.onUpdate=function(n){return this._onUpdateCallback=n,this},t.prototype.onRepeat=function(n){return this._onRepeatCallback=n,this},t.prototype.onComplete=function(n){return this._onCompleteCallback=n,this},t.prototype.onStop=function(n){return this._onStopCallback=n,this},t.prototype.update=function(n,e){if(n===void 0&&(n=I()),e===void 0&&(e=!0),this._isPaused)return!0;var i,r,o=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(n>o)return!1;e&&this.start(n)}if(this._goToEnd=!1,n<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),r=(n-this._startTime)/this._duration,r=this._duration===0||r>1?1:r;var s=this._easingFunction(r);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,s),this._onUpdateCallback&&this._onUpdateCallback(this._object,r),r===1)if(this._repeat>0){isFinite(this._repeat)&&this._repeat--;for(i in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[i]=="string"&&(this._valuesStartRepeat[i]=this._valuesStartRepeat[i]+parseFloat(this._valuesEnd[i])),this._yoyo&&this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i];return this._yoyo&&(this._reversed=!this._reversed),this._repeatDelayTime!==void 0?this._startTime=n+this._repeatDelayTime:this._startTime=n+this._delayTime,this._onRepeatCallback&&this._onRepeatCallback(this._object),!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var a=0,c=this._chainedTweens.length;a<c;a++)this._chainedTweens[a].start(this._startTime+this._duration);return this._isPlaying=!1,!1}return!0},t.prototype._updateProperties=function(n,e,i,r){for(var o in i)if(e[o]!==void 0){var s=e[o]||0,a=i[o],c=Array.isArray(n[o]),u=Array.isArray(a),f=!c&&u;f?n[o]=this._interpolationFunction(a,r):typeof a=="object"&&a?this._updateProperties(n[o],s,a,r):(a=this._handleRelativeValue(s,a),typeof a=="number"&&(n[o]=s+(a-s)*r))}},t.prototype._handleRelativeValue=function(n,e){return typeof e!="string"?e:e.charAt(0)==="+"||e.charAt(0)==="-"?n+parseFloat(e):parseFloat(e)},t.prototype._swapEndStartRepeatValues=function(n){var e=this._valuesStartRepeat[n],i=this._valuesEnd[n];typeof i=="string"?this._valuesStartRepeat[n]=this._valuesStartRepeat[n]+parseFloat(i):this._valuesStartRepeat[n]=this._valuesEnd[n],this._valuesEnd[n]=e},t}();N.nextId;var y=M;y.getAll.bind(y);y.removeAll.bind(y);y.add.bind(y);y.remove.bind(y);y.update.bind(y);var h;(function(t){t.EASING_LINEAR_NONE="EASING_LINEAR_NONE",t.EASING_QUARTIC_IN="EASING_QUARTIC_IN",t.EASING_QUARTIC_OUT="EASING_QUARTIC_OUT",t.EASING_QUARTIC_INOUT="EASING_QUARTIC_INOUT",t.EASING_QUADRATIC_IN="EASING_QUADRATIC_IN",t.EASING_QUADRATIC_OUT="EASING_QUADRATIC_OUT",t.EASING_QUADRATIC_INOUT="EASING_QUADRATIC_INOUT"})(h||(h={}));const g={EASING_LINEAR_NONE:p.Linear.None,EASING_QUARTIC_IN:p.Quartic.In,EASING_QUARTIC_OUT:p.Quartic.Out,EASING_QUARTIC_INOUT:p.Quartic.InOut,EASING_QUADRATIC_IN:p.Quadratic.In,EASING_QUADRATIC_OUT:p.Quadratic.Out,EASING_QUADRATIC_INOUT:p.Quadratic.InOut};h.EASING_QUADRATIC_INOUT;const Q={name:"fadeObject",params:{target:"",direction:"out",delay:0,duration:300,timingFunction:h.EASING_QUADRATIC_INOUT,visible:!0}},G=function(t,n){const e=n.params,i=t.getObjectBySymbol(e.target);if(!i)return console.warn(`real time animation fadeObject: can not found vid object: ${e.target}`),()=>{};const r=t.getObjectConfig(i);if(!r.material)return console.warn(`real time animation fadeObject: target can not support fade: ${e.target}`),()=>{};const o=[],s=[],a=Array.isArray(r.material)?[].concat(r.material):[r.material];for(const u of a){const f=t.getObjectBySymbol(u),l=t.getConfigBySymbol(u);if(!(f instanceof z)){console.error(`real time animation fadeObject: object config material is not instanceof Material: ${u}`);continue}if(!l){console.error(`real time animation fadeObject: object config material can not found config: ${u}`);continue}o.push(f),s.push(l)}let c=!1;return()=>{if(c)return;c=!0;const u=t.renderManager;r.visible=!0,o.forEach((f,l,C)=>{f.visible=!0,f.transparent=!0,f.opacity=e.direction==="in"?0:1,f.needsUpdate=!0;const b=new _(f).to({opacity:e.direction==="in"?1:0}).duration(e.duration).delay(e.delay).easing(g[e.timingFunction]).start(),v=E=>{b.update()};u.addEventListener("render",v),b.onComplete(()=>{u.removeEventListener("render",v),e.direction==="out"&&e.visible?(s[l].visible=!1,r.visible=!1):e.direction==="in"&&e.visible&&(s[l].visible=!0,r.visible=!0),s[l].opacity=e.direction==="in"?1:0,c=!1})})}};var Y=Object.freeze(Object.defineProperty({__proto__:null,config:Q,generator:G},Symbol.toStringTag,{value:"Module"}));const k={name:"focusObject",params:{target:"",camera:"",space:"world",offset:{x:0,y:0,z:20},delay:0,duration:1e3,timingFunction:h.EASING_QUADRATIC_INOUT,back:!0}},L=function(t,n){const e=n.params,i=t.getObjectBySymbol(e.target),r=t.orbitControls.target;if(!i)return console.warn(`real time animation focusObject: can not found vid object: ${e.target}`),()=>{};if(!(i instanceof x))return console.warn(`real time animation focusObject: vid object is not a class of THREE.Object3D: ${e.target}`),()=>{};let o=!1;const s=new P;return()=>{if(o)return;o=!0;let a=t.camera;e.camera&&(a=t.getObjectBySymbol(e.camera),a||(a=t.camera,console.warn(`real time animation focusObject: can not found camera config: ${e.camera}`)));const c=t.getObjectConfig(a),u=t.orbitControls&&t.orbitControls.object===a;c||console.warn("engine current camera can not found config.");const f=t.renderManager;let l={x:i.matrixWorld.elements[12]+e.offset.x,y:i.matrixWorld.elements[13]+e.offset.y,z:i.matrixWorld.elements[14]+e.offset.z};const C={x:a.position.x,y:a.position.y,z:a.position.z};if(e.space==="local"){const d=new R(e.offset.x,e.offset.y,e.offset.z).applyEuler(s.setFromRotationMatrix(i.matrixWorld));l={x:i.matrixWorld.elements[12]+d.x,y:i.matrixWorld.elements[13]+d.y,z:i.matrixWorld.elements[14]+d.z}}const b=new _(a.position).to(l).duration(e.duration).delay(e.delay).easing(g[e.timingFunction]).start();let v;const E={x:a.up.x,y:a.up.y,z:a.up.z};if(e.space==="local"){const d=new R(0,1,0).applyEuler(s.setFromRotationMatrix(i.matrixWorld));v=new _(a.up).to({x:d.x,y:d.y,z:d.z}).duration(e.duration).delay(e.delay).easing(g[e.timingFunction]).start()}let S;const F={x:r.x,y:r.y,z:r.z};u&&(S=new _(r).to({x:i.matrixWorld.elements[12],y:i.matrixWorld.elements[13],z:i.matrixWorld.elements[14]}).duration(e.duration).delay(e.delay).easing(g[e.timingFunction]).start());let m;u&&e.space==="local"?m=d=>{b.update(),v.update(),S.update()}:u?m=d=>{b.update(),S.update()}:e.space==="local"?m=d=>{b.update(),v.update()}:m=d=>{b.update()},f.addEventListener("render",m),b.onComplete(()=>{if(f.removeEventListener("render",m),c&&(c.position.x=l.x,c.position.y=l.y,c.position.z=l.z),o=!1,e.back){const d=()=>{const U=new _(a.position).to(C).duration(e.duration).delay(e.delay).easing(g[e.timingFunction]).start();let O;e.space==="local"&&(O=new _(a.up).to(E).duration(e.duration).delay(e.delay).easing(g[e.timingFunction]).start());let w;u&&(w=new _(r).to(F).duration(e.duration).delay(e.delay).easing(g[e.timingFunction]).start());const j=K=>{U.update(),O&&O.update(),w&&w.update()};U.onComplete(()=>{f.removeEventListener("render",j)}),f.addEventListener("render",j),document.removeEventListener("dblclick",d)};document.addEventListener("dblclick",d)}})}};var Z=Object.freeze(Object.defineProperty({__proto__:null,config:k,generator:L},Symbol.toStringTag,{value:"Module"}));const $={name:"moveFromTo",params:{target:"",from:{x:0,y:0,z:0},to:{x:10,y:10,z:10},delay:0,duration:1e3,timingFunction:h.EASING_QUADRATIC_INOUT}},B=function(t,n){const e=n.params,r=t.compilerManager.getObjectBySymbol(e.target);if(!r)return console.warn(`real time animation moveTO: can not found vid object: ${e.target}`),()=>{};const o=t.renderManager,s=t.dataSupportManager.getConfigBySymbol(e.target);if(!s)return console.warn(`can not found object config: ${e.target}`),()=>{};let a=!1;return()=>{if(a)return;a=!0,r.position.set(e.from.x,e.from.y,e.from.z),r.updateMatrix(),r.updateMatrixWorld();const c=new _(r.position).to(e.to).duration(e.duration).delay(e.delay).easing(g[e.timingFunction]).start(),u=f=>{c.update()};o.addEventListener("render",u),c.onComplete(()=>{o.removeEventListener("render",u),s.position.x=e.to.x,s.position.y=e.to.y,s.position.z=e.to.z,a=!1})}};var V=Object.freeze(Object.defineProperty({__proto__:null,config:$,generator:B},Symbol.toStringTag,{value:"Module"}));const W={name:"moveSpacing",params:{target:"",spacing:{x:10,y:10,z:10},delay:0,duration:1e3,timingFunction:h.EASING_QUADRATIC_INOUT}},q=function(t,n){const e=n.params,i=t.getObjectBySymbol(e.target);if(!i)return console.warn(`can not found vid object: ${e.target}`),()=>{};if(!(i instanceof x))return console.warn(`object is not instanceof Object3D: ${e.target}`),()=>{};const r=t.renderManager,o=t.getConfigBySymbol(e.target);let s=!1;return()=>{if(s)return;s=!0;const a={x:i.position.x+e.spacing.x,y:i.position.y+e.spacing.y,z:i.position.z+e.spacing.z},c=new _(i.position).to(a).duration(e.duration).delay(e.delay).easing(g[e.timingFunction]).start(),u=f=>{c.update()};r.addEventListener("render",u),c.onComplete(()=>{r.removeEventListener("render",u),o.position.x=a.x,o.position.y=a.y,o.position.z=a.z,s=!1})}};var tt=Object.freeze(Object.defineProperty({__proto__:null,config:W,generator:q},Symbol.toStringTag,{value:"Module"}));const H={name:"moveTo",params:{target:"",position:{x:0,y:0,z:0},delay:0,duration:1e3,timingFunction:h.EASING_QUADRATIC_INOUT}},J=function(t,n){const e=n.params,r=t.compilerManager.getObjectBySymbol(e.target);if(!r)return console.warn(`real time animation moveTO: can not found vid object: ${e.target}`),()=>{};const o=t.renderManager,s=t.dataSupportManager.getConfigBySymbol(e.target);if(!s)return console.warn(`can not found object config: ${e.target}`),()=>{};let a=!1;return()=>{if(a)return;a=!0;const c=new _(r.position).to(e.position).duration(e.duration).delay(e.delay).easing(g[e.timingFunction]).start(),u=f=>{c.update()};o.addEventListener("render",u),c.onComplete(()=>{o.removeEventListener("render",u),s.position.x=e.position.x,s.position.y=e.position.y,s.position.z=e.position.z,a=!1})}};var et=Object.freeze(Object.defineProperty({__proto__:null,config:H,generator:J},Symbol.toStringTag,{value:"Module"}));h.EASING_QUADRATIC_INOUT;h.EASING_QUADRATIC_INOUT;h.EASING_QUADRATIC_INOUT;h.EASING_QUADRATIC_INOUT;h.EASING_QUADRATIC_INOUT;h.EASING_QUADRATIC_INOUT;export{tt as a,V as b,Y as c,Z as f,et as m};
