var l=Object.defineProperty;var p=(o,s,e)=>s in o?l(o,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[s]=e;var n=(o,s,e)=>(p(o,typeof s!="symbol"?s+"":s,e),e);import{t as v,a as c}from"./index.5fd0e639.js";import{aI as E,q as h,bN as L}from"./three.837c9bb0.js";const M="@vis-three/plugin-pointer-visual-controls",a=new E(0,0,0,"YXZ"),m=new h,f={type:"change"},d=Math.PI/2;var u;(function(o){o[o.LEFT=0]="LEFT",o[o.MID=1]="MID",o[o.RIGHT=2]="RIGHT"})(u||(u={}));class P extends L{constructor(e,t){super();n(this,"domElement");n(this,"camera");n(this,"minPolarAngle",0);n(this,"maxPolarAngle",Math.PI);n(this,"pointerSpeed",1);n(this,"pointerButton",u.LEFT);n(this,"isLocked",!1);n(this,"direction",new h(0,0,-1));n(this,"_mouseMove",this.onMouseMove.bind(this));n(this,"_mouseDown",this.onMouseDown.bind(this));n(this,"_mouseUp",this.onMouseUp.bind(this));t===void 0&&(console.warn('PointerVisualControls: The second parameter "domElement" is now mandatory.'),t=document.body),this.domElement=t,this.camera=e,this.connect()}setDom(e){this.dispose(),this.domElement=e,this.connect()}setCamera(e){this.camera=e}getDirection(e){return e.copy(this.direction).applyQuaternion(this.camera.quaternion)}onMouseDown(e){e.button===0&&(this.isLocked=!0)}onMouseUp(e){e.button===0&&(this.isLocked=!1)}onMouseMove(e){if(this.isLocked===!1)return;const t=e.movementX||0,i=e.movementY||0;a.setFromQuaternion(this.camera.quaternion),a.y-=t*.002*this.pointerSpeed,a.x-=i*.002*this.pointerSpeed,a.x=Math.max(d-this.maxPolarAngle,Math.min(d-this.minPolarAngle,a.x)),this.camera.quaternion.setFromEuler(a),this.dispatchEvent(f)}connect(){this.domElement.addEventListener("mousemove",this._mouseMove),this.domElement.addEventListener("mousedown",this._mouseDown),this.domElement.addEventListener("mouseup",this._mouseUp)}dispose(){this.domElement.removeEventListener("mousemove",this._mouseMove),this.domElement.removeEventListener("mousedown",this._mouseDown),this.domElement.removeEventListener("mouseup",this._mouseUp)}getObject(){return this.camera}moveForward(e){const t=this.camera;m.setFromMatrixColumn(t.matrix,0),m.crossVectors(t.up,m),t.position.addScaledVector(m,e)}moveRight(e){m.setFromMatrixColumn(this.camera.matrix,0),this.camera.position.addScaledVector(m,e)}}const w=v(M),x=function(o={}){let s,e;return{name:w,install(t){const i=new P(t.camera,t.dom);for(const r in o)typeof i[r]!="undefined"&&(i[r]=o[r]);t.pointerVisualControls=i,s=r=>{i.setDom(r.dom)},t.addEventListener(c.SETDOM,s),e=r=>{i.setCamera(r.camera)},t.addEventListener(c.SETCAMERA,e)},dispose(t){t.removeEventListener(c.SETDOM,s),t.removeEventListener(c.SETCAMERA,e),t.pointerVisualControls.dispose(),delete t.pointerVisualControls}}};export{x as P};