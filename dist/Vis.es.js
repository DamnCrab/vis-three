var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { LineBasicMaterial, LineSegments, BufferGeometry, Float32BufferAttribute, Color, Mesh, OctahedronBufferGeometry, MeshBasicMaterial, Sphere, Vector3, CameraHelper as CameraHelper$1, Matrix4, PerspectiveCamera, OrthographicCamera, EdgesGeometry, BoxBufferGeometry, EventDispatcher as EventDispatcher$1, Material, Scene, AxesHelper, GridHelper, MeshLambertMaterial, PointsMaterial, SpriteMaterial, AmbientLight, DirectionalLight, Line, Light, Points, Sprite, Camera, Texture, Clock, MOUSE, Vector2, WebGLMultisampleRenderTarget, RGBAFormat, Raycaster, Object3D, WebGLRenderer, Loader, FileLoader, Group as Group$1, MeshPhongMaterial, LoaderUtils, FrontSide, RepeatWrapping, DefaultLoadingManager, TextureLoader, ImageLoader, UVMapping, ClampToEdgeWrapping, LinearFilter, LinearMipmapLinearFilter, LinearEncoding, TangentSpaceNormalMap, MultiplyOperation, PCFShadowMap, NoToneMapping, Quaternion, Euler, SphereBufferGeometry, PointLight, SpotLight, MeshStandardMaterial, DodecahedronBufferGeometry, Fog, FogExp2, PlaneBufferGeometry, CubeTexture, CanvasTexture, PCFSoftShadowMap } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
class EventDispatcher {
  constructor() {
    __publicField(this, "listeners", new Map());
  }
  addEventListener(type, listener) {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      listeners.set(type, new Set());
    }
    listeners.get(type).add(listener);
  }
  hasEventListener(type, listener) {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      return false;
    }
    return listeners.get(type).has(listener);
  }
  removeEventListener(type, listener) {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      return;
    }
    if (!listeners.get(type).has(listener)) {
      return;
    }
    listeners.get(type).delete(listener);
  }
  dispatchEvent(event) {
    var _a;
    const type = event.type;
    const listeners = this.listeners;
    if (listeners.has(type)) {
      try {
        (_a = listeners.get(type)) == null ? void 0 : _a.forEach((listener) => {
          listener.call(this, event);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
  clear() {
    this.listeners = new Map();
  }
  useful() {
    return Boolean([...this.listeners.keys()].length);
  }
}
const ACTIVECOLOR = "rgb(230, 20, 240)";
const HOVERCOLOR = "rgb(255, 158, 240)";
const HELPERCOLOR = "rgb(255, 255, 255)";
const getHelperLineMaterial = () => new LineBasicMaterial({ color: HELPERCOLOR });
class PointLightHelper extends LineSegments {
  constructor(pointLight2) {
    super();
    __publicField(this, "sphere");
    __publicField(this, "target");
    __publicField(this, "shape");
    __publicField(this, "type", "VisPointLightHelper");
    __publicField(this, "cachaColor");
    __publicField(this, "cachaDistance");
    __publicField(this, "cachaVector3");
    this.geometry = new BufferGeometry();
    const points = [
      -1,
      0,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      0,
      1,
      -0.707,
      -0.707,
      0,
      0.707,
      0.707,
      0,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      0,
      0,
      -0.707,
      -0.707,
      0,
      0.707,
      0.707,
      0,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      0,
      0.707,
      0.707,
      0,
      -0.707,
      -0.707,
      0,
      0.707
    ];
    this.geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
    this.material = getHelperLineMaterial();
    this.geometry.boundingSphere;
    const color = new Color().copy(pointLight2.color).multiplyScalar(pointLight2.intensity);
    const shape = new Mesh(new OctahedronBufferGeometry(pointLight2.distance, 0), new MeshBasicMaterial({
      color,
      wireframe: true
    }));
    shape.raycast = () => {
    };
    this.shape = shape;
    this.target = pointLight2;
    this.sphere = new Sphere(new Vector3(0, 0, 0), 1);
    this.cachaColor = pointLight2.color.getHex();
    this.cachaDistance = pointLight2.distance;
    this.cachaVector3 = new Vector3();
    this.add(this.shape);
    this.matrixAutoUpdate = false;
    this.matrix = pointLight2.matrix;
    this.onBeforeRender = () => {
      const light = this.target;
      const shape2 = this.shape;
      const scource = this;
      if (light.distance !== this.cachaDistance) {
        shape2.geometry.dispose();
        shape2.geometry = new OctahedronBufferGeometry(light.distance, 0);
        this.cachaDistance = light.distance;
      }
      if (light.color.getHex() !== this.cachaColor) {
        shape2.material.color.copy(light.color).multiplyScalar(light.intensity);
        scource.material.color.copy(light.color).multiplyScalar(light.intensity);
        this.cachaColor = light.color.getHex();
      }
    };
  }
  raycast(raycaster, intersects) {
    const target = this.target;
    const matrixWorld = target.matrixWorld;
    const sphere = this.sphere;
    sphere.set(this.cachaVector3.set(0, 0, 0), 1);
    sphere.applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsSphere(sphere)) {
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      });
    }
  }
}
class CameraHelper extends LineSegments {
  constructor(camera) {
    super();
    __publicField(this, "shape");
    __publicField(this, "target");
    __publicField(this, "type", "CameraHelper");
    __publicField(this, "cachaData");
    const geometry = new BufferGeometry();
    const positions = [
      0,
      0,
      0,
      -1,
      1,
      -1,
      0,
      0,
      0,
      -1,
      1,
      1,
      0,
      0,
      0,
      -1,
      -1,
      -1,
      0,
      0,
      0,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      -1,
      1,
      1,
      -1,
      -1,
      1,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      -1,
      0,
      0,
      0,
      0,
      -1,
      -1,
      0,
      0,
      0,
      0,
      -1,
      1,
      0,
      1,
      1,
      0,
      1,
      -1,
      0,
      1,
      -1,
      0,
      -1,
      -1,
      0,
      -1,
      -1,
      0,
      -1,
      1,
      0,
      -1,
      1,
      0,
      1,
      1,
      0,
      -1,
      1,
      2,
      -1,
      1,
      0,
      1,
      -1,
      2,
      1,
      -1,
      0,
      -1,
      -1,
      2,
      -1,
      -1,
      0,
      1,
      1,
      2,
      1,
      1,
      2,
      1,
      1,
      2,
      -1,
      1,
      2,
      -1,
      1,
      2,
      -1,
      -1,
      2,
      -1,
      -1,
      2,
      1,
      -1,
      2,
      1,
      -1,
      2,
      1,
      1
    ];
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geometry.rotateY(-90 * Math.PI / 180);
    geometry.computeBoundingBox();
    const shape = new CameraHelper$1(camera);
    shape.matrix = new Matrix4();
    shape.matrixAutoUpdate = true;
    shape.raycast = () => {
    };
    this.add(shape);
    this.shape = shape;
    this.geometry = geometry;
    this.material = getHelperLineMaterial();
    this.target = camera;
    this.matrixAutoUpdate = false;
    this.matrix = camera.matrix;
    if (camera instanceof PerspectiveCamera) {
      this.cachaData = {
        fov: camera.fov,
        aspect: camera.aspect,
        near: camera.near,
        far: camera.far
      };
    } else if (camera instanceof OrthographicCamera) {
      this.cachaData = {
        left: camera.left,
        right: camera.right,
        top: camera.top,
        bottom: camera.bottom,
        near: camera.near,
        far: camera.far
      };
    } else {
      this.cachaData = {};
    }
    this.onBeforeRender = () => {
      let needsUpdate = false;
      const cachaData = this.cachaData;
      Object.keys(cachaData).forEach((key) => {
        if (cachaData[key] !== camera[key]) {
          cachaData[key] = camera[key];
          needsUpdate = true;
        }
      });
      needsUpdate && this.shape.update();
    };
  }
  raycast(raycaster, intersects) {
    const matrixWorld = this.matrixWorld;
    const box = this.geometry.boundingBox.clone();
    box.applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsBox(box)) {
      const target = this.target;
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      });
    }
  }
}
class MeshHelper extends LineSegments {
  constructor(mesh) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisMeshHelper");
    __publicField(this, "cachaGeometryUUid");
    const thresholdAngle = 1;
    this.target = mesh;
    this.geometry = new EdgesGeometry(mesh.geometry, thresholdAngle);
    this.cachaGeometryUUid = mesh.geometry.uuid;
    this.material = getHelperLineMaterial();
    this.raycast = () => {
    };
    this.matrixAutoUpdate = false;
    this.matrix = mesh.matrix;
    this.onBeforeRender = () => {
      const target = this.target;
      if (target.geometry.uuid !== this.cachaGeometryUUid) {
        this.geometry.dispose();
        this.geometry = new EdgesGeometry(target.geometry, thresholdAngle);
        this.cachaGeometryUUid = target.geometry.uuid;
      }
    };
  }
}
var CONFIGTYPE;
(function(CONFIGTYPE2) {
  CONFIGTYPE2["BOXGEOMETRY"] = "BoxGeometry";
  CONFIGTYPE2["SPHEREGEOMETRY"] = "SphereGeometry";
  CONFIGTYPE2["LOADGEOMETRY"] = "LoadGeometry";
  CONFIGTYPE2["MODEL"] = "Model";
  CONFIGTYPE2["MESH"] = "Mesh";
  CONFIGTYPE2["LINE"] = "Line";
  CONFIGTYPE2["LINESEGMENTS"] = "LineSegments";
  CONFIGTYPE2["POINTS"] = "Points";
  CONFIGTYPE2["SPRITE"] = "Sprite";
  CONFIGTYPE2["GROUP"] = "Group";
  CONFIGTYPE2["IMAGETEXTURE"] = "ImageTexture";
  CONFIGTYPE2["CUBETEXTURE"] = "CubeTexture";
  CONFIGTYPE2["CANVASTEXTURE"] = "CanvasTexture";
  CONFIGTYPE2["MESHSTANDARDMATERIAL"] = "MeshStandardMaterial";
  CONFIGTYPE2["MESHPHONGMATERIAL"] = "MeshPhongMaterial";
  CONFIGTYPE2["SPRITEMATERIAL"] = "SpriteMaterial";
  CONFIGTYPE2["LINEBASICMATERIAL"] = "LineBasicMaterial";
  CONFIGTYPE2["POINTSMATERIAL"] = "PointsMaterial";
  CONFIGTYPE2["AMBIENTLIGHT"] = "AmbientLight";
  CONFIGTYPE2["SPOTLIGHT"] = "SpotLight";
  CONFIGTYPE2["POINTLIGHT"] = "PointLight";
  CONFIGTYPE2["PERSPECTIVECAMERA"] = "PerspectiveCamera";
  CONFIGTYPE2["ORTHOGRAPHICCAMERA"] = "OrthographicCamera";
  CONFIGTYPE2["WEBGLRENDERER"] = "WebGLRenderer";
  CONFIGTYPE2["SCENE"] = "Scene";
  CONFIGTYPE2["TRNASFORMCONTROLS"] = "TransformControls";
  CONFIGTYPE2["ORBITCONTROLS"] = "OrbitControls";
  CONFIGTYPE2["EVENT"] = "Event";
})(CONFIGTYPE || (CONFIGTYPE = {}));
class GroupHelper extends LineSegments {
  constructor(group) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisGroupHelper");
    this.target = group;
    const geometry = new EdgesGeometry(new BoxBufferGeometry(1, 1, 1));
    geometry.computeBoundingBox();
    this.geometry = geometry;
    this.material = getHelperLineMaterial();
    this.matrixAutoUpdate = false;
    this.matrix = group.matrix;
  }
  raycast(raycaster, intersects) {
    const matrixWorld = this.matrixWorld;
    const box = this.geometry.boundingBox.clone();
    box.applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsBox(box)) {
      const target = this.target;
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      });
    }
  }
}
var HELPERCOMPILEREVENTTYPE;
(function(HELPERCOMPILEREVENTTYPE2) {
  HELPERCOMPILEREVENTTYPE2["ADD"] = "add";
  HELPERCOMPILEREVENTTYPE2["REMOVE"] = "remove";
})(HELPERCOMPILEREVENTTYPE || (HELPERCOMPILEREVENTTYPE = {}));
const _SceneHelperCompiler = class extends EventDispatcher$1 {
  constructor(scene) {
    super();
    __publicField(this, "map");
    __publicField(this, "scene");
    this.map = new Map();
    this.scene = scene;
  }
  getMap() {
    return this.map;
  }
  add(object) {
    if (_SceneHelperCompiler.filterHelperMap[object.type]) {
      return;
    }
    if (_SceneHelperCompiler.typeHelperMap[object.type]) {
      const helper = new _SceneHelperCompiler.typeHelperMap[object.type](object);
      this.map.set(object, helper);
      this.scene._add(helper);
      this.dispatchEvent({
        type: HELPERCOMPILEREVENTTYPE.ADD,
        helper,
        object
      });
    } else {
      console.warn(`Scene helper compiler can not support this type object: '${object.type}'`);
    }
  }
  remove(object) {
    if (_SceneHelperCompiler.filterHelperMap[object.type]) {
      return;
    }
    if (this.map.has(object)) {
      const helper = this.map.get(object);
      this.scene._remove(helper);
      helper.geometry.dispose();
      if (helper.material) {
        if (helper.material instanceof Material) {
          helper.material.dispose();
        } else {
          helper.material.forEach((material) => {
            material.dispose();
          });
        }
      }
      this.map.delete(object);
      this.dispatchEvent({
        type: HELPERCOMPILEREVENTTYPE.REMOVE,
        helper,
        object
      });
    } else {
      console.warn(`Scene helper compiler can not found this object\`s helper: ${object}`);
    }
  }
  setVisiable(visiable) {
    const scene = this.scene;
    if (visiable) {
      this.map.forEach((helper, origin) => {
        scene._add(helper);
      });
    } else {
      this.map.forEach((helper, origin) => {
        scene._remove(helper);
      });
    }
  }
  resetHelperColor(...object) {
    const map = this.map;
    const helperColorHex = _SceneHelperCompiler.helperColorHex;
    object.forEach((elem) => {
      if (map.has(elem)) {
        const helper = map.get(elem);
        helper.material.color.setHex(helperColorHex);
      }
    });
  }
  setHelperHoverColor(...object) {
    const map = this.map;
    const hoverColorHex = _SceneHelperCompiler.hoverColorHex;
    object.forEach((elem) => {
      if (map.has(elem)) {
        const helper = map.get(elem);
        helper.material.color.setHex(hoverColorHex);
      }
    });
  }
  setHelperActiveColor(...object) {
    const map = this.map;
    const activeColorHex = _SceneHelperCompiler.activeColorHex;
    object.forEach((elem) => {
      if (map.has(elem)) {
        const helper = map.get(elem);
        helper.material.color.setHex(activeColorHex);
      }
    });
  }
};
let SceneHelperCompiler = _SceneHelperCompiler;
__publicField(SceneHelperCompiler, "helperColorHex", new Color(HELPERCOLOR).getHex());
__publicField(SceneHelperCompiler, "activeColorHex", new Color(ACTIVECOLOR).getHex());
__publicField(SceneHelperCompiler, "hoverColorHex", new Color(HOVERCOLOR).getHex());
__publicField(SceneHelperCompiler, "typeHelperMap", {
  [CONFIGTYPE.POINTLIGHT]: PointLightHelper,
  [CONFIGTYPE.PERSPECTIVECAMERA]: CameraHelper,
  [CONFIGTYPE.ORTHOGRAPHICCAMERA]: CameraHelper,
  [CONFIGTYPE.MESH]: MeshHelper,
  [CONFIGTYPE.GROUP]: GroupHelper
});
__publicField(SceneHelperCompiler, "filterHelperMap", {
  "AmbientLight": true,
  "Object3D": true
});
var ModelingSceneCameraDefalutType;
(function(ModelingSceneCameraDefalutType2) {
  ModelingSceneCameraDefalutType2["DefaultPerspectiveCamera"] = "DefaultPerspectiveCamera";
  ModelingSceneCameraDefalutType2["DefaultOrthograpbicCamera"] = "DefaultOrthograpbicCamera";
})(ModelingSceneCameraDefalutType || (ModelingSceneCameraDefalutType = {}));
var SCENEVIEWPOINT;
(function(SCENEVIEWPOINT2) {
  SCENEVIEWPOINT2["DEFAULT"] = "default";
  SCENEVIEWPOINT2["TOP"] = "top";
  SCENEVIEWPOINT2["BOTTOM"] = "bottom";
  SCENEVIEWPOINT2["LEFT"] = "left";
  SCENEVIEWPOINT2["RIGHT"] = "right";
  SCENEVIEWPOINT2["FRONT"] = "front";
  SCENEVIEWPOINT2["BACK"] = "back";
})(SCENEVIEWPOINT || (SCENEVIEWPOINT = {}));
var SCENEDISPLAYMODE;
(function(SCENEDISPLAYMODE2) {
  SCENEDISPLAYMODE2["GEOMETRY"] = "geometry";
  SCENEDISPLAYMODE2["MATERIAL"] = "material";
  SCENEDISPLAYMODE2["LIGHT"] = "light";
  SCENEDISPLAYMODE2["ENV"] = "env";
})(SCENEDISPLAYMODE || (SCENEDISPLAYMODE = {}));
Scene.prototype.add = function(...object) {
  if (!arguments.length) {
    return this;
  }
  if (arguments.length > 1) {
    for (let i = 0; i < arguments.length; i++) {
      this.add(arguments[i]);
    }
    return this;
  }
  const currentObject = object[0];
  if (currentObject === this) {
    console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
    return this;
  }
  if (currentObject && currentObject.isObject3D) {
    if (currentObject.parent !== null) {
      const index = this.children.indexOf(currentObject);
      if (index !== -1) {
        currentObject.parent = null;
        this.children.splice(index, 1);
        currentObject.dispatchEvent({ type: "removed" });
      }
    }
    currentObject.parent = this;
    this.children.push(currentObject);
    currentObject.dispatchEvent({ type: "added" });
  } else {
    console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", object);
  }
  return this;
};
class ModelingScene extends Scene {
  constructor(config) {
    super();
    __publicField(this, "cameraSet");
    __publicField(this, "lightSet");
    __publicField(this, "meshSet");
    __publicField(this, "lineSet");
    __publicField(this, "pointsSet");
    __publicField(this, "spriteSet");
    __publicField(this, "helperCompiler");
    __publicField(this, "resetHoverObjectSet");
    __publicField(this, "resetActiveObjectSet");
    __publicField(this, "displayMode");
    __publicField(this, "meshOverrideMaterial");
    __publicField(this, "lineOverrideMaterial");
    __publicField(this, "pointsOverrideMaterial");
    __publicField(this, "spriteOverrideMaterial");
    __publicField(this, "materialCacheMap");
    __publicField(this, "defaultAmbientLight");
    __publicField(this, "defaultDirectionalLight");
    __publicField(this, "backgroundCache");
    __publicField(this, "environmentCache");
    __publicField(this, "defaultPerspectiveCamera");
    __publicField(this, "defaultOrthograpbicCamera");
    __publicField(this, "axesHelper");
    __publicField(this, "gridHelper");
    __publicField(this, "showAxesHelper");
    __publicField(this, "showGridHelper");
    __publicField(this, "getDefaultPerspectiveCamera");
    __publicField(this, "getDefaultOrthographicCamera");
    __publicField(this, "setAxesHelper");
    __publicField(this, "setGridHelper");
    __publicField(this, "switchDisplayMode");
    __publicField(this, "setDisplayMode");
    this.cameraSet = new Set();
    this.lightSet = new Set();
    this.meshSet = new Set();
    this.lineSet = new Set();
    this.pointsSet = new Set();
    this.spriteSet = new Set();
    this.helperCompiler = new SceneHelperCompiler(this);
    this.resetHoverObjectSet = new Set();
    this.resetActiveObjectSet = new Set();
    if (config.hasDefaultPerspectiveCamera) {
      if (config.defaultPerspectiveCameraSetting) {
        this.defaultPerspectiveCamera = new PerspectiveCamera(config.defaultPerspectiveCameraSetting.fov, config.defaultPerspectiveCameraSetting.aspect, config.defaultPerspectiveCameraSetting.near, config.defaultPerspectiveCameraSetting.far);
      } else {
        this.defaultPerspectiveCamera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1e3);
      }
      this.defaultPerspectiveCamera.position.set(50, 50, 50);
      this.defaultPerspectiveCamera.lookAt(0, 0, 0);
      this.defaultPerspectiveCamera.name = "\u9ED8\u8BA4\u900F\u89C6\u76F8\u673A";
      this.cameraSet.add(this.defaultPerspectiveCamera);
      this.getDefaultPerspectiveCamera = function() {
        return this.defaultPerspectiveCamera;
      };
    }
    if (config.hasDefaultOrthographicCamera) {
      if (config.defaultOrthographicCameraSetting) {
        const setting = config.defaultOrthographicCameraSetting;
        this.defaultOrthograpbicCamera = new OrthographicCamera(setting.left, setting.right, setting.top, setting.bottom, setting.near, setting.far);
      } else {
        const domWidth = window.innerWidth / 2;
        const domHeight = window.innerHeight / 2;
        this.defaultOrthograpbicCamera = new OrthographicCamera(-domWidth / 8, domWidth / 8, domHeight / 8, -domHeight / 8, 1, 1e3);
      }
      this.defaultOrthograpbicCamera.name = "\u9ED8\u8BA4\u6B63\u4EA4\u76F8\u673A";
      this.cameraSet.add(this.defaultOrthograpbicCamera);
      this.getDefaultOrthographicCamera = function() {
        return this.defaultOrthograpbicCamera;
      };
      this.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(0, 60, 0);
      });
      this.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(0, -60, 0);
      });
      this.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(60, 0, 0);
      });
      this.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(-60, 0, 0);
      });
      this.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(0, 0, 60);
      });
      this.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, (e) => {
        this.defaultOrthograpbicCamera.position.set(0, 0, -60);
      });
    }
    if (config.hasAxesHelper) {
      this.axesHelper = new AxesHelper(500);
      this.axesHelper.matrixAutoUpdate = false;
      this.axesHelper.raycast = () => {
      };
      super.add(this.axesHelper);
      this.setAxesHelper = function(setting) {
        const axesHelper = this.axesHelper;
        if (setting.size) {
          const position = axesHelper.geometry.getAttribute("position");
          position.setX(setting.size, 1);
          position.setY(setting.size, 3);
          position.setZ(setting.size, 5);
          position.needsUpdate = true;
        }
        if (typeof setting.visiable !== void 0) {
          axesHelper.visible = setting.visiable;
        }
      };
      this.showAxesHelper = (show) => {
        if (show) {
          super.add(this.axesHelper);
        } else {
          super.remove(this.axesHelper);
        }
      };
    }
    if (config.hasGridHelper) {
      const gridHelper = new GridHelper(500, 50, "rgb(130, 130, 130)", "rgb(70, 70, 70)");
      gridHelper.raycast = () => {
      };
      if (gridHelper.material instanceof Material) {
        const material = gridHelper.material;
        material.transparent = true;
        material.opacity = 0.5;
        material.needsUpdate = true;
      }
      gridHelper.matrixAutoUpdate = false;
      gridHelper.raycast = () => {
      };
      this.gridHelper = gridHelper;
      super.add(gridHelper);
      this.addEventListener(`${SCENEVIEWPOINT.DEFAULT}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, Math.PI / 2);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, (e) => {
        gridHelper.rotation.set(0, 0, Math.PI / 2);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, (e) => {
        gridHelper.rotation.set(Math.PI / 2, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, (e) => {
        gridHelper.rotation.set(Math.PI / 2, 0, 0);
        gridHelper.updateMatrix();
        gridHelper.updateMatrixWorld();
      });
      this.showGridHelper = (show) => {
        if (show) {
          super.add(this.gridHelper);
        } else {
          super.remove(this.gridHelper);
        }
      };
    }
    if (config.hasDisplayMode) {
      const overrideColor = "rgb(250, 250, 250)";
      this.meshOverrideMaterial = new MeshLambertMaterial({ color: overrideColor });
      this.lineOverrideMaterial = new LineBasicMaterial({ color: overrideColor });
      this.pointsOverrideMaterial = new PointsMaterial({ color: overrideColor, size: 5, sizeAttenuation: false });
      this.spriteOverrideMaterial = new SpriteMaterial({ color: overrideColor });
      this.materialCacheMap = new WeakMap();
      this.defaultAmbientLight = new AmbientLight("rgb(255, 255, 255)", 0.5);
      this.defaultAmbientLight.matrixAutoUpdate = false;
      this.defaultDirectionalLight = new DirectionalLight("rgb(255, 255, 255)", 0.3);
      this.defaultDirectionalLight.castShadow = false;
      this.defaultDirectionalLight.position.set(-100, 100, 100);
      this.defaultDirectionalLight.updateMatrix();
      this.defaultDirectionalLight.updateMatrixWorld();
      this.defaultDirectionalLight.matrixAutoUpdate = false;
      this.switchDisplayMode = (mode) => {
        const filterMaterial = () => {
          const meterialCacheMap = this.materialCacheMap;
          const meshOverrideMaterial = this.meshOverrideMaterial;
          this.meshSet.forEach((mesh) => {
            meterialCacheMap.set(mesh, mesh.material);
            mesh.material = meshOverrideMaterial;
          });
          const lineOverrideMaterial = this.lineOverrideMaterial;
          this.lineSet.forEach((line) => {
            meterialCacheMap.set(line, line.material);
            line.material = lineOverrideMaterial;
          });
          const pointsOverrideMaterial = this.pointsOverrideMaterial;
          this.pointsSet.forEach((points) => {
            meterialCacheMap.set(points, points.material);
            points.material = pointsOverrideMaterial;
          });
          const spriteOverrideMaterial = this.spriteOverrideMaterial;
          this.spriteSet.forEach((sprite) => {
            meterialCacheMap.set(sprite, sprite.material);
            sprite.material = spriteOverrideMaterial;
          });
        };
        const reduceMaterial = () => {
          const meterialCacheMap = this.materialCacheMap;
          this.meshSet.forEach((mesh) => {
            if (meterialCacheMap.get(mesh)) {
              mesh.material = meterialCacheMap.get(mesh);
              meterialCacheMap.delete(mesh);
            }
          });
          this.lineSet.forEach((line) => {
            if (meterialCacheMap.get(line)) {
              line.material = meterialCacheMap.get(line);
              meterialCacheMap.delete(line);
            }
          });
          this.pointsSet.forEach((points) => {
            if (meterialCacheMap.get(points)) {
              points.material = meterialCacheMap.get(points);
              meterialCacheMap.delete(points);
            }
          });
          this.spriteSet.forEach((sprite) => {
            if (meterialCacheMap.get(sprite)) {
              sprite.material = meterialCacheMap.get(sprite);
              meterialCacheMap.delete(sprite);
            }
          });
        };
        const filterLight = () => {
          this.lightSet.forEach((light) => {
            super.remove(light);
          });
          super.add(this.defaultAmbientLight);
          super.add(this.defaultDirectionalLight);
        };
        const reduceLight = () => {
          this.lightSet.forEach((light) => {
            super.add(light);
          });
          super.remove(this.defaultAmbientLight);
          super.remove(this.defaultDirectionalLight);
        };
        const filterScene = () => {
          if (this.background instanceof Texture) {
            this.backgroundCache = this.background;
            this.background = null;
          }
          if (this.environment instanceof Texture) {
            this.environmentCache = this.environment;
            this.environment = null;
          }
        };
        const reduceScene = () => {
          if (this.backgroundCache) {
            this.background = this.backgroundCache;
            this.backgroundCache = void 0;
          }
          if (this.environmentCache) {
            this.environment = this.environmentCache;
            this.environmentCache = void 0;
          }
        };
        if (mode === SCENEDISPLAYMODE.GEOMETRY) {
          filterMaterial();
          filterScene();
          filterLight();
        } else if (mode === SCENEDISPLAYMODE.MATERIAL) {
          reduceMaterial();
          filterScene();
          filterLight();
        } else if (mode === SCENEDISPLAYMODE.LIGHT) {
          reduceMaterial();
          filterScene();
          reduceLight();
        } else if (mode === SCENEDISPLAYMODE.ENV) {
          reduceMaterial();
          reduceScene();
          reduceLight();
        } else {
          console.warn(`VisScene can not set this mode: ${mode}`);
        }
      };
      this.setDisplayMode = (mode) => {
        this.displayMode = mode;
        this.switchDisplayMode(mode);
      };
      if (config.displayMode !== void 0) {
        this.setDisplayMode(config.displayMode);
        this.switchDisplayMode(this.displayMode);
      } else {
        this.setDisplayMode(SCENEDISPLAYMODE.ENV);
        this.switchDisplayMode(this.displayMode);
      }
    }
  }
  getHelperCompiler() {
    return this.helperCompiler;
  }
  setObjectHelperVisiable(visiable) {
    this.helperCompiler.setVisiable(visiable);
  }
  setObjectHelperHover(...object) {
    const resetObjectSet = this.resetHoverObjectSet;
    const activeObjectSet = this.resetActiveObjectSet;
    object.forEach((elem, i, arr) => {
      resetObjectSet.delete(elem);
      if (activeObjectSet.has(elem)) {
        arr.splice(i, 1);
      }
    });
    activeObjectSet.forEach((elem) => {
      resetObjectSet.delete(elem);
    });
    this.helperCompiler.resetHelperColor(...resetObjectSet);
    resetObjectSet.clear();
    this.helperCompiler.setHelperHoverColor(...object);
    object.forEach((elem) => {
      resetObjectSet.add(elem);
    });
    return this;
  }
  setObjectHelperActive(...object) {
    const resetObjectSet = this.resetActiveObjectSet;
    object.forEach((elem) => {
      resetObjectSet.delete(elem);
    });
    this.helperCompiler.resetHelperColor(...resetObjectSet);
    resetObjectSet.clear();
    this.helperCompiler.setHelperActiveColor(...object);
    object.forEach((elem) => {
      resetObjectSet.add(elem);
    });
    return this;
  }
  showObjectHelper(show) {
    this.helperCompiler.setVisiable(show);
    return this;
  }
  setViewPoint(direction) {
    this.dispatchEvent({ type: `${direction}ViewPoint` });
  }
  add(...object) {
    let addNumber = 0;
    object.forEach((elem) => {
      if (elem instanceof Mesh) {
        this.meshSet.add(elem);
        addNumber += 1;
      } else if (elem instanceof Line) {
        this.lineSet.add(elem);
        addNumber += 1;
      } else if (elem instanceof Light) {
        this.lightSet.add(elem);
        addNumber += 1;
      } else if (elem instanceof Points) {
        this.pointsSet.add(elem);
        addNumber += 1;
      } else if (elem instanceof Sprite) {
        this.spriteSet.add(elem);
        addNumber += 1;
      } else if (elem instanceof Camera) {
        this.cameraSet.add(elem);
        addNumber += 1;
      }
      this.helperCompiler.add(elem);
    });
    if (this.displayMode !== void 0 && addNumber > 0) {
      this.switchDisplayMode(this.displayMode);
    }
    return super.add(...object);
  }
  remove(...object) {
    const materialCacheMap = this.materialCacheMap;
    object.forEach((elem) => {
      materialCacheMap && materialCacheMap.has(elem) && materialCacheMap.delete(elem);
      if (elem instanceof Mesh) {
        this.meshSet.delete(elem);
      } else if (elem instanceof Line) {
        this.lineSet.delete(elem);
      } else if (elem instanceof Light) {
        this.lightSet.delete(elem);
      } else if (elem instanceof Points) {
        this.pointsSet.delete(elem);
      } else if (elem instanceof Sprite) {
        this.spriteSet.delete(elem);
      } else if (elem instanceof Camera) {
        this.cameraSet.delete(elem);
      }
      this.helperCompiler.remove(elem);
    });
    return super.remove(...object);
  }
  _add(...object) {
    return super.add(...object);
  }
  _remove(...object) {
    return super.remove(...object);
  }
  updateMaterial(object) {
    var _a;
    if (this.displayMode !== void 0 && this.displayMode === "geometry") {
      (_a = this.materialCacheMap) == null ? void 0 : _a.set(object, object.material);
      this.switchDisplayMode && this.switchDisplayMode(this.displayMode);
    }
    return this;
  }
}
const ModelingScenePlugin = function(params) {
  if (this.scene instanceof ModelingScene) {
    console.warn("this has installed modeling scene plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.error("must install some renderer before this plugin.");
    return false;
  }
  const scene = new ModelingScene(params);
  this.scene = scene;
  this.render = () => {
    this.webGLRenderer.render(scene, this.currentCamera);
    return this;
  };
  if (params.hasDefaultPerspectiveCamera) {
    const defaultPerspectiveCamera = scene.getDefaultPerspectiveCamera();
    this.currentCamera = defaultPerspectiveCamera;
    scene.addEventListener(`${SCENEVIEWPOINT.DEFAULT}ViewPoint`, (e) => {
      this.setCamera(defaultPerspectiveCamera);
    });
  }
  if (params.hasDefaultOrthographicCamera) {
    const defaultOrthograpbicCamera = scene.getDefaultOrthographicCamera();
    scene.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, (e) => {
      if (this.orbitControls) {
        this.orbitControls.target.set(0, 0, 0);
      }
      this.setCamera(defaultOrthograpbicCamera);
    });
    scene.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, (e) => {
      if (this.orbitControls) {
        this.orbitControls.target.set(0, 0, 0);
      }
      this.setCamera(defaultOrthograpbicCamera);
    });
    scene.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, (e) => {
      if (this.orbitControls) {
        this.orbitControls.target.set(0, 0, 0);
      }
      this.setCamera(defaultOrthograpbicCamera);
    });
    scene.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, (e) => {
      if (this.orbitControls) {
        this.orbitControls.target.set(0, 0, 0);
      }
      this.setCamera(defaultOrthograpbicCamera);
    });
    scene.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, (e) => {
      if (this.orbitControls) {
        this.orbitControls.target.set(0, 0, 0);
      }
      this.setCamera(defaultOrthograpbicCamera);
    });
    scene.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, (e) => {
      if (this.orbitControls) {
        this.orbitControls.target.set(0, 0, 0);
      }
      this.setCamera(defaultOrthograpbicCamera);
    });
  }
  return true;
};
const ScenePlugin = function(params) {
  if (this.scene) {
    console.warn("this has installed scene plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.error("must install some renderer before this plugin.");
    return false;
  }
  this.scene = new Scene();
  this.render = () => {
    this.webGLRenderer.render(this.scene, this.currentCamera);
    return this;
  };
  const defalutCamera = new PerspectiveCamera();
  defalutCamera.position.set(50, 50, 50);
  defalutCamera.lookAt(0, 0, 0);
  this.currentCamera = defalutCamera;
  return true;
};
var RENDERERMANAGER;
(function(RENDERERMANAGER2) {
  RENDERERMANAGER2["RENDER"] = "render";
  RENDERERMANAGER2["PLAY"] = "play";
  RENDERERMANAGER2["STOP"] = "stop";
})(RENDERERMANAGER || (RENDERERMANAGER = {}));
var SCENESTATUSMANAGER;
(function(SCENESTATUSMANAGER2) {
  SCENESTATUSMANAGER2["HOVERCHANGE"] = "hover-change";
  SCENESTATUSMANAGER2["ACTIVECHANGE"] = "active-change";
})(SCENESTATUSMANAGER || (SCENESTATUSMANAGER = {}));
var POINTERMANAGER;
(function(POINTERMANAGER2) {
  POINTERMANAGER2["POINTERDOWN"] = "pointerdown";
  POINTERMANAGER2["POINTERMOVE"] = "pointermove";
  POINTERMANAGER2["POINTERUP"] = "pointerup";
})(POINTERMANAGER || (POINTERMANAGER = {}));
var MODELCOMPILER;
(function(MODELCOMPILER2) {
  MODELCOMPILER2["SETMATERIAL"] = "setMaterial";
})(MODELCOMPILER || (MODELCOMPILER = {}));
const EVENTTYPE = {
  RENDERERMANAGER,
  SCENESTATUSMANAGER,
  POINTERMANAGER,
  MODELCOMPILER
};
class RenderManager extends EventDispatcher {
  constructor() {
    super(...arguments);
    __publicField(this, "clock", new Clock());
    __publicField(this, "animationFrame", -1);
    __publicField(this, "render", () => {
      const clock = this.clock;
      const delta = clock.getDelta();
      const total = clock.getElapsedTime();
      this.dispatchEvent({
        type: RENDERERMANAGER.RENDER,
        delta,
        total
      });
    });
    __publicField(this, "play", () => {
      this.dispatchEvent({
        type: RENDERERMANAGER.PLAY
      });
      const playFun = () => {
        this.render();
        this.animationFrame = requestAnimationFrame(playFun);
      };
      playFun();
    });
    __publicField(this, "stop", () => {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = -1;
      this.dispatchEvent({
        type: RENDERERMANAGER.STOP
      });
    });
    __publicField(this, "checkHasRendering", () => {
      return this.animationFrame !== -1;
    });
    __publicField(this, "hasVaildRender", () => {
      return this.useful();
    });
  }
}
const RenderManagerPlugin = function() {
  if (this.renderManager) {
    console.warn("has installed render manager plugin.");
    return false;
  }
  this.renderManager = new RenderManager();
  this.render && this.renderManager.addEventListener("render", this.render);
  this.render = function() {
    this.renderManager.render();
    return this;
  };
  this.play = function() {
    this.renderManager.play();
    return this;
  };
  this.stop = function() {
    this.renderManager.stop();
    return this;
  };
  return true;
};
class VisOrbitControls extends OrbitControls {
  constructor(camera, domElement) {
    super(camera, domElement);
    this.mouseButtons = {
      LEFT: null,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    };
  }
  setCamera(camera) {
    this.object = camera;
    this.update();
    return this;
  }
}
const OrbitControlsPlugin = function(params) {
  if (this.orbitControls) {
    console.warn("this has installed orbitControls plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.warn("this must install renderer before install orbitControls plugin.");
    return false;
  }
  if (!this.renderManager) {
    console.warn("this must install renderManager before install orbitControls plugin.");
    return false;
  }
  this.orbitControls = new VisOrbitControls(this.currentCamera, this.dom);
  this.addEventListener("setCamera", (event) => {
    this.orbitControls.setCamera(event.camera);
  });
  this.renderManager.addEventListener("render", () => {
    this.orbitControls.update();
  });
  if (this.scene instanceof ModelingScene) {
    const scene = this.scene;
    scene.addEventListener(`${SCENEVIEWPOINT.DEFAULT}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = true;
    });
    scene.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = false;
    });
    scene.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, (e) => {
      this.orbitControls.enableRotate = false;
    });
  }
  return true;
};
class VisStats {
  constructor(parameters) {
    __publicField(this, "REVISION");
    __publicField(this, "dom");
    __publicField(this, "addPanel");
    __publicField(this, "showPanel");
    __publicField(this, "begin");
    __publicField(this, "end");
    __publicField(this, "update");
    __publicField(this, "domElement");
    __publicField(this, "setMode");
    const stats = Stats();
    this.REVISION = stats.REVISION;
    this.dom = stats.dom;
    this.domElement = stats.domElement;
    this.begin = stats.begin.bind(stats);
    this.end = stats.end.bind(stats);
    this.update = stats.update.bind(stats);
    this.addPanel = stats.addPanel.bind(stats);
    this.showPanel = stats.showPanel.bind(stats);
    this.setMode = stats.setMode.bind(stats);
    const dom = this.domElement;
    dom.style.position = "absolute";
    dom.style.top = "0";
    dom.style.left = "35px";
    if (parameters) {
      dom.style.top = `${parameters.top}px`;
      dom.style.left = `${parameters.left}px`;
      dom.style.right = `${parameters.right}px`;
      dom.style.bottom = `${parameters.bottom}px`;
    }
  }
}
const StatsPlugin = function(params) {
  if (this.stats) {
    console.warn("this has installed stats plugin.");
    return false;
  }
  if (!this.renderManager) {
    console.warn("this must install renderManager before install stats plugin.");
    return false;
  }
  const stats = new VisStats(params);
  this.stats = stats;
  this.setStats = function(show) {
    if (show) {
      this.dom.appendChild(this.stats.domElement);
    } else {
      try {
        this.dom.removeChild(this.stats.domElement);
      } catch (error) {
      }
    }
    return this;
  };
  this.renderManager.addEventListener("render", () => {
    this.stats.update();
  });
  return true;
};
const EffectComposerPlugin = function(params) {
  if (this.effectComposer) {
    console.warn("this has installed effect composer plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.error("must install some renderer before this plugin.");
    return false;
  }
  let composer;
  if (params == null ? void 0 : params.WebGLMultisampleRenderTarget) {
    const renderer = this.webGLRenderer;
    const pixelRatio = renderer.getPixelRatio();
    const size = renderer.getDrawingBufferSize(new Vector2());
    composer = new EffectComposer(renderer, new WebGLMultisampleRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
      format: RGBAFormat
    }));
  } else {
    composer = new EffectComposer(this.webGLRenderer);
  }
  this.effectComposer = composer;
  let renderPass;
  if (this.scene) {
    renderPass = new RenderPass(this.scene, this.currentCamera);
  } else {
    console.error(`composer con not found support scene plugin.`);
    return false;
  }
  composer.addPass(renderPass);
  this.addEventListener("setCamera", (event) => {
    renderPass.camera = event.camera;
  });
  this.addEventListener("setSize", (event) => {
    composer.setSize(event.width, event.height);
  });
  if (this.renderManager) {
    this.renderManager.removeEventListener("render", this.render);
  }
  this.render = () => {
    this.effectComposer.render();
    return this;
  };
  if (this.renderManager) {
    this.renderManager.addEventListener("render", (event) => {
      this.effectComposer.render(event.delta);
    });
  }
  return true;
};
class PointerManager extends EventDispatcher {
  constructor(parameters) {
    super();
    __publicField(this, "dom");
    __publicField(this, "mouse");
    __publicField(this, "canMouseMove");
    __publicField(this, "mouseEventTimer");
    __publicField(this, "throttleTime");
    const dom = parameters.dom;
    this.dom = dom;
    this.mouse = new Vector2();
    this.canMouseMove = true;
    this.mouseEventTimer = null;
    this.throttleTime = parameters.throttleTime || 1e3 / 60;
    dom.addEventListener("pointerdown", (event) => {
      this.pointerDown(event);
    });
    dom.addEventListener("pointermove", (event) => {
      if (!this.canMouseMove) {
        return;
      }
      this.canMouseMove = false;
      this.mouseEventTimer = setTimeout(() => {
        const mouse = this.mouse;
        const dom2 = this.dom;
        mouse.x = event.offsetX / dom2.offsetWidth * 2 - 1;
        mouse.y = -(event.offsetY / dom2.offsetHeight) * 2 + 1;
        this.canMouseMove = true;
        this.pointerMove(event);
      }, this.throttleTime);
    });
    dom.addEventListener("pointerup", (event) => {
      this.pointerUp(event);
    });
  }
  getMousePoint() {
    return this.mouse;
  }
  pointerDown(event) {
    const eventObject = { mouse: this.mouse };
    for (let key in event) {
      eventObject[key] = event[key];
    }
    this.dispatchEvent(eventObject);
  }
  pointerMove(event) {
    const eventObject = { mouse: this.mouse };
    for (let key in event) {
      eventObject[key] = event[key];
    }
    this.dispatchEvent(eventObject);
  }
  pointerUp(event) {
    const eventObject = { mouse: this.mouse };
    for (let key in event) {
      eventObject[key] = event[key];
    }
    this.dispatchEvent(eventObject);
  }
}
const PointerManagerPlugin = function(params) {
  if (this.pointerManager) {
    console.warn("this has installed pointerManager plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.error("must install some renderer before this plugin.");
    return false;
  }
  const pointerManager = new PointerManager(Object.assign(params || {}, {
    dom: this.dom
  }));
  this.pointerManager = pointerManager;
  return true;
};
var EVENTNAME;
(function(EVENTNAME2) {
  EVENTNAME2["POINTERDOWN"] = "pointerdown";
  EVENTNAME2["POINTERUP"] = "pointerup";
  EVENTNAME2["POINTERMOVE"] = "pointermove";
  EVENTNAME2["POINTERENTER"] = "pointerenter";
  EVENTNAME2["POINTERLEAVE"] = "pointerleave";
  EVENTNAME2["CLICK"] = "click";
  EVENTNAME2["DBLCLICK"] = "dblclick";
  EVENTNAME2["CONTEXTMENU"] = "contextmenu";
})(EVENTNAME || (EVENTNAME = {}));
class EventManager extends EventDispatcher {
  constructor(parameters) {
    super();
    __publicField(this, "raycaster");
    __publicField(this, "scene");
    __publicField(this, "camera");
    __publicField(this, "recursive", false);
    __publicField(this, "penetrate", false);
    this.raycaster = new Raycaster();
    this.camera = parameters.camera;
    this.scene = parameters.scene;
    parameters.recursive && (this.recursive = parameters.recursive);
    parameters.penetrate && (this.penetrate = parameters.penetrate);
  }
  setCamera(camera) {
    this.camera = camera;
    return this;
  }
  intersectObject(mouse) {
    this.raycaster.setFromCamera(mouse, this.camera);
    return this.raycaster.intersectObjects(this.scene.children, this.recursive);
  }
  use(pointerManager) {
    const mergeEvent = function(event, object) {
      return Object.assign({}, event, object);
    };
    pointerManager.addEventListener("pointerdown", (event) => {
      const intersections = this.intersectObject(event.mouse);
      if (intersections.length) {
        if (this.penetrate) {
          if (event.button === 0) {
            for (let intersection of intersections) {
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "pointerdown",
                intersection
              }));
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "mousedown",
                intersection
              }));
            }
          }
        } else {
          const intersection = intersections[0];
          if (event.button === 0) {
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "pointerdown",
              intersection
            }));
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "mousedown",
              intersection
            }));
          }
        }
      }
      if (event.button === 0) {
        this.dispatchEvent(mergeEvent(event, {
          type: "pointerdown",
          intersections
        }));
        this.dispatchEvent(mergeEvent(event, {
          type: "mousedown",
          intersections
        }));
      }
    });
    const cacheObjectMap = new Map();
    pointerManager.addEventListener("pointermove", (event) => {
      const intersections = this.intersectObject(event.mouse);
      if (intersections.length) {
        if (this.penetrate) {
          for (let intersection of intersections) {
            if (cacheObjectMap.has(intersection.object)) {
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "pointermove",
                intersection
              }));
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "mousemove",
                intersection
              }));
            } else {
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "pointerenter",
                intersection
              }));
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "mouseenter",
                intersection
              }));
            }
          }
        } else {
          const intersection = intersections[0];
          if (cacheObjectMap.has(intersection.object)) {
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "pointermove",
              intersection
            }));
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "mousemove",
              intersection
            }));
          } else {
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "pointerenter",
              intersection
            }));
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "mouseenter",
              intersection
            }));
          }
        }
        for (let intersection of intersections) {
          cacheObjectMap.set(intersection.object, intersection);
        }
      } else {
        cacheObjectMap.forEach((intersection) => {
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "pointerleave",
            intersection
          }));
          intersection.object.dispatchEvent(mergeEvent(event, {
            type: "mouseleave",
            intersection
          }));
        });
        cacheObjectMap.clear();
      }
      this.dispatchEvent(mergeEvent(event, {
        type: "pointermove",
        intersections
      }));
      this.dispatchEvent(mergeEvent(event, {
        type: "mousemove",
        intersections
      }));
    });
    const cacheClickObject = new Map();
    let cacheClickTimer = null;
    pointerManager.addEventListener("pointerup", (event) => {
      const intersections = this.intersectObject(event.mouse);
      if (intersections.length) {
        if (this.penetrate) {
          for (let intersection of intersections) {
            if (event.button === 0) {
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "pointerup",
                intersection
              }));
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "mouseup",
                intersection
              }));
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "click",
                intersection
              }));
              if (cacheClickObject.has(intersection.object)) {
                intersection.object.dispatchEvent(mergeEvent(event, {
                  type: "dblclick",
                  intersection
                }));
              }
            } else if (event.button === 2) {
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "contextmenu",
                intersection
              }));
            }
          }
        } else {
          const intersection = intersections[0];
          if (event.button === 0) {
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "pointerup",
              intersection
            }));
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "mouseup",
              intersection
            }));
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "click",
              intersection
            }));
            if (cacheClickObject.has(intersection.object)) {
              intersection.object.dispatchEvent(mergeEvent(event, {
                type: "dblclick",
                intersection
              }));
            }
          } else if (event.button === 2) {
            intersection.object.dispatchEvent(mergeEvent(event, {
              type: "contextmenu",
              intersection
            }));
          }
        }
      }
      if (event.button === 0) {
        this.dispatchEvent(mergeEvent(event, {
          type: "pointerup",
          intersections
        }));
        this.dispatchEvent(mergeEvent(event, {
          type: "mouseup",
          intersections
        }));
        this.dispatchEvent(mergeEvent(event, {
          type: "click",
          intersections
        }));
        if (cacheClickTimer) {
          clearTimeout(cacheClickTimer);
          cacheClickTimer = null;
          this.dispatchEvent(mergeEvent(event, {
            type: "dblclick",
            intersections
          }));
        } else {
          if (intersections.length) {
            for (let intersection of intersections) {
              cacheClickObject.set(intersection.object, true);
            }
          }
          cacheClickTimer = setTimeout(() => {
            cacheClickTimer = null;
            cacheClickObject.clear();
          }, 300);
        }
      } else if (event.button === 2) {
        this.dispatchEvent(mergeEvent(event, {
          type: "contextmenu",
          intersections
        }));
      }
    });
    return this;
  }
}
const EventManagerPlugin = function(params) {
  if (this.eventManager) {
    console.warn("engine has installed eventManager plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.error("must install some renderer before this plugin.");
    return false;
  }
  if (!this.pointerManager) {
    console.error("must install pointerManager before this plugin.");
    return false;
  }
  const eventManager = new EventManager(Object.assign({
    scene: this.scene,
    camera: this.currentCamera
  }, params));
  eventManager.use(this.pointerManager);
  this.eventManager = eventManager;
  this.addEventListener("setCamera", (event) => {
    this.eventManager.setCamera(event.camera);
  });
  if (this.scene instanceof ModelingScene) {
    this.eventManager.addEventListener("pointermove", (event) => {
      this.scene.setObjectHelperHover(...event.intersections.map((elem) => elem.object));
    });
    this.eventManager.addEventListener("click", (event) => {
      if (this.transing) {
        this.transing = false;
        return;
      }
      if (event.button === 0) {
        this.scene.setObjectHelperActive(...event.intersections.map((elem) => elem.object));
      }
    });
  }
  return true;
};
var TRANSFORMEVENT;
(function(TRANSFORMEVENT2) {
  TRANSFORMEVENT2["OBJECTCHANGED"] = "objectChanged";
})(TRANSFORMEVENT || (TRANSFORMEVENT = {}));
class VisTransformControls extends TransformControls {
  constructor(camera, dom) {
    super(camera, dom);
    __publicField(this, "target");
    __publicField(this, "transObjectSet");
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this._onPointerDown = (event) => {
      var _a;
      if (!this.enabled || !((_a = this.object) == null ? void 0 : _a.parent))
        return;
      this.domElement.setPointerCapture(event.pointerId);
      this.domElement.addEventListener("pointermove", this._onPointerMove);
      this.pointerHover(this._getPointer(event));
      this.pointerDown(this._getPointer(event));
    };
    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.target = new Object3D();
    this.transObjectSet = new Set();
    let mode = "";
    let target = this.target;
    let transObjectSet = this.transObjectSet;
    let cachaTargetTrans = {
      x: 0,
      y: 0,
      z: 0
    };
    let objectMatrixAutoMap = new WeakMap();
    this.addEventListener("mouseDown", (event) => {
      mode = event.target.mode;
      mode === "translate" && (mode = "position");
      mode === "rotate" && (mode = "rotation");
      cachaTargetTrans.x = target[mode].x;
      cachaTargetTrans.y = target[mode].y;
      cachaTargetTrans.z = target[mode].z;
      transObjectSet.forEach((object) => {
        objectMatrixAutoMap.set(object, object.matrixAutoUpdate);
        object.matrixAutoUpdate = false;
      });
    });
    this.addEventListener("objectChange", (event) => {
      const offsetX = target[mode].x - cachaTargetTrans.x;
      const offsetY = target[mode].y - cachaTargetTrans.y;
      const offsetZ = target[mode].z - cachaTargetTrans.z;
      cachaTargetTrans.x = target[mode].x;
      cachaTargetTrans.y = target[mode].y;
      cachaTargetTrans.z = target[mode].z;
      transObjectSet.forEach((elem) => {
        elem[mode].x += offsetX;
        elem[mode].y += offsetY;
        elem[mode].z += offsetZ;
        elem.updateMatrix();
        elem.updateMatrixWorld();
      });
      this.dispatchEvent({
        type: TRANSFORMEVENT.OBJECTCHANGED,
        transObjectSet,
        mode,
        target
      });
    });
    this.addEventListener("mouseUp", (event) => {
      transObjectSet.forEach((object) => {
        object.matrixAutoUpdate = objectMatrixAutoMap.get(object);
        objectMatrixAutoMap.delete(object);
      });
    });
  }
  getTarget() {
    return this.target;
  }
  getTransObjectSet() {
    return this.transObjectSet;
  }
  setCamera(camera) {
    this.camera = camera;
    return this;
  }
  setAttach(...object) {
    this.transObjectSet.clear();
    if (!object.length || !object[0]) {
      this.detach();
      return this;
    }
    this.attach(this.target);
    const target = this.target;
    if (object.length === 1) {
      const currentObject = object[0];
      target.scale.copy(currentObject.scale);
      target.rotation.copy(currentObject.rotation);
      target.position.copy(currentObject.position);
      target.updateMatrix();
      target.updateMatrixWorld();
      this.transObjectSet.add(currentObject);
      return this;
    }
    const xList = [];
    const yList = [];
    const zList = [];
    object.forEach((elem) => {
      xList.push(elem.position.x);
      yList.push(elem.position.y);
      zList.push(elem.position.z);
    });
    target.rotation.set(0, 0, 0);
    target.scale.set(0, 0, 0);
    target.position.x = (Math.max(...xList) - Math.min(...xList)) / 2 + Math.min(...xList);
    target.position.y = (Math.max(...yList) - Math.min(...yList)) / 2 + Math.min(...yList);
    target.position.z = (Math.max(...zList) - Math.min(...zList)) / 2 + Math.min(...zList);
    target.updateMatrix();
    target.updateMatrixWorld();
    object.forEach((elem) => {
      this.transObjectSet.add(elem);
    });
    return this;
  }
}
const TransformControlsPlugin = function(params) {
  if (this.transformControls) {
    console.warn("this has installed transformControls plugin.");
    return false;
  }
  if (!this.webGLRenderer) {
    console.warn("this must install renderer before install transformControls plugin.");
    return false;
  }
  if (!this.pointerManager) {
    console.warn("this must install pointerManager before install transformControls plugin.");
    return false;
  }
  if (!this.eventManager) {
    console.warn("this must install eventManager before install transformControls plugin.");
    return false;
  }
  const transformControls = new VisTransformControls(this.currentCamera, this.dom);
  this.transformControls = transformControls;
  this.transing = false;
  transformControls.addEventListener("mouseDown", () => {
    this.transing = true;
  });
  if (this.scene instanceof Scene) {
    this.scene.add(this.transformControls);
    this.scene.add(this.transformControls.target);
  } else if (this.scene instanceof ModelingScene) {
    this.scene._add(this.transformControls);
    this.scene._add(this.transformControls.target);
  }
  this.setTransformControls = function(show) {
    this.transformControls.visible = show;
    return this;
  };
  this.addEventListener("setCamera", (event) => {
    transformControls.setCamera(event.camera);
  });
  this.eventManager.addEventListener("pointerup", (event) => {
    if (this.transing) {
      return;
    }
    if (event.button === 0) {
      const objectList = event.intersections.map((elem) => elem.object);
      transformControls.setAttach(objectList[0]);
    }
  });
  this.completeSet.add(() => {
    if (this.IS_ENGINESUPPORT) {
      const objectToConfig = (object) => {
        const symbol = this.compilerManager.getObjectSymbol(object);
        if (!symbol) {
          return null;
        }
        return this.dataSupportManager.getObjectConfig(symbol);
      };
      let config = null;
      let mode;
      transformControls.addEventListener(TRANSFORMEVENT.OBJECTCHANGED, (event) => {
        const e = event;
        e.transObjectSet.forEach((object) => {
          config = objectToConfig(object);
          mode = e.mode;
          if (config) {
            config[mode].x = object[mode].x;
            config[mode].y = object[mode].y;
            config[mode].z = object[mode].z;
          }
        });
      });
    }
  });
  return true;
};
const WebGLRendererPlugin = function(params) {
  if (this.webGLRenderer) {
    console.warn("this has installed webglRenderer plugin.");
    return false;
  }
  this.webGLRenderer = new WebGLRenderer(params);
  this.dom = this.webGLRenderer.domElement;
  this.setSize = function(width, height) {
    var _a, _b;
    if (width && width <= 0 || height && height <= 0) {
      console.warn(`you must be input width and height bigger then zero, width: ${width}, height: ${height}`);
      return this;
    }
    !width && (width = (_a = this.dom) == null ? void 0 : _a.offsetWidth);
    !height && (height = (_b = this.dom) == null ? void 0 : _b.offsetHeight);
    this.dispatchEvent({ type: "setSize", width, height });
    return this;
  };
  this.setCamera = function setCamera(camera) {
    this.currentCamera = camera;
    this.dispatchEvent({
      type: "setCamera",
      camera
    });
    return this;
  };
  this.setDom = function(dom) {
    this.dom = dom;
    dom.appendChild(this.webGLRenderer.domElement);
    return this;
  };
  this.addEventListener("setSize", (event) => {
    const width = event.width;
    const height = event.height;
    this.webGLRenderer.setSize(width, height, true);
    const camera = this.currentCamera;
    if (camera) {
      if (camera instanceof PerspectiveCamera) {
        camera.aspect = event.width / event.height;
        camera.updateProjectionMatrix();
      } else if (camera instanceof OrthographicCamera) {
        camera.left = -width / 16;
        camera.right = width / 16;
        camera.top = height / 16;
        camera.bottom = -height / 16;
        camera.updateProjectionMatrix();
      }
    }
  });
  this.addEventListener("dispose", () => {
    this.webGLRenderer.dispose();
  });
  return true;
};
const _object_pattern = /^[og]\s*(.+)?/;
const _material_library_pattern = /^mtllib /;
const _material_use_pattern = /^usemtl /;
const _map_use_pattern = /^usemap /;
const _vA = new Vector3();
const _vB = new Vector3();
const _vC = new Vector3();
const _ab = new Vector3();
const _cb = new Vector3();
function ParserState() {
  const state = {
    objects: [],
    object: {},
    vertices: [],
    normals: [],
    colors: [],
    uvs: [],
    materials: {},
    materialLibraries: [],
    startObject: function(name, fromDeclaration) {
      if (this.object && this.object.fromDeclaration === false) {
        this.object.name = name;
        this.object.fromDeclaration = fromDeclaration !== false;
        return;
      }
      const previousMaterial = this.object && typeof this.object.currentMaterial === "function" ? this.object.currentMaterial() : void 0;
      if (this.object && typeof this.object._finalize === "function") {
        this.object._finalize(true);
      }
      this.object = {
        name: name || "",
        fromDeclaration: fromDeclaration !== false,
        geometry: {
          vertices: [],
          normals: [],
          colors: [],
          uvs: [],
          hasUVIndices: false
        },
        materials: [],
        smooth: true,
        startMaterial: function(name2, libraries) {
          const previous = this._finalize(false);
          if (previous && (previous.inherited || previous.groupCount <= 0)) {
            this.materials.splice(previous.index, 1);
          }
          const material = {
            index: this.materials.length,
            name: name2 || "",
            mtllib: Array.isArray(libraries) && libraries.length > 0 ? libraries[libraries.length - 1] : "",
            smooth: previous !== void 0 ? previous.smooth : this.smooth,
            groupStart: previous !== void 0 ? previous.groupEnd : 0,
            groupEnd: -1,
            groupCount: -1,
            inherited: false,
            clone: function(index) {
              const cloned = {
                index: typeof index === "number" ? index : this.index,
                name: this.name,
                mtllib: this.mtllib,
                smooth: this.smooth,
                groupStart: 0,
                groupEnd: -1,
                groupCount: -1,
                inherited: false
              };
              cloned.clone = this.clone.bind(cloned);
              return cloned;
            }
          };
          this.materials.push(material);
          return material;
        },
        currentMaterial: function() {
          if (this.materials.length > 0) {
            return this.materials[this.materials.length - 1];
          }
          return void 0;
        },
        _finalize: function(end) {
          const lastMultiMaterial = this.currentMaterial();
          if (lastMultiMaterial && lastMultiMaterial.groupEnd === -1) {
            lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
            lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
            lastMultiMaterial.inherited = false;
          }
          if (end && this.materials.length > 1) {
            for (let mi = this.materials.length - 1; mi >= 0; mi--) {
              if (this.materials[mi].groupCount <= 0) {
                this.materials.splice(mi, 1);
              }
            }
          }
          if (end && this.materials.length === 0) {
            this.materials.push({
              name: "",
              smooth: this.smooth
            });
          }
          return lastMultiMaterial;
        }
      };
      if (previousMaterial && previousMaterial.name && typeof previousMaterial.clone === "function") {
        const declared = previousMaterial.clone(0);
        declared.inherited = true;
        this.object.materials.push(declared);
      }
      this.objects.push(this.object);
    },
    finalize: function() {
      if (this.object && typeof this.object._finalize === "function") {
        this.object._finalize(true);
      }
    },
    parseVertexIndex: function(value, len) {
      const index = parseInt(value, 10);
      return (index >= 0 ? index - 1 : index + len / 3) * 3;
    },
    parseNormalIndex: function(value, len) {
      const index = parseInt(value, 10);
      return (index >= 0 ? index - 1 : index + len / 3) * 3;
    },
    parseUVIndex: function(value, len) {
      const index = parseInt(value, 10);
      return (index >= 0 ? index - 1 : index + len / 2) * 2;
    },
    addVertex: function(a, b, c) {
      const src = this.vertices;
      const dst = this.object.geometry.vertices;
      dst.push(src[a + 0], src[a + 1], src[a + 2]);
      dst.push(src[b + 0], src[b + 1], src[b + 2]);
      dst.push(src[c + 0], src[c + 1], src[c + 2]);
    },
    addVertexPoint: function(a) {
      const src = this.vertices;
      const dst = this.object.geometry.vertices;
      dst.push(src[a + 0], src[a + 1], src[a + 2]);
    },
    addVertexLine: function(a) {
      const src = this.vertices;
      const dst = this.object.geometry.vertices;
      dst.push(src[a + 0], src[a + 1], src[a + 2]);
    },
    addNormal: function(a, b, c) {
      const src = this.normals;
      const dst = this.object.geometry.normals;
      dst.push(src[a + 0], src[a + 1], src[a + 2]);
      dst.push(src[b + 0], src[b + 1], src[b + 2]);
      dst.push(src[c + 0], src[c + 1], src[c + 2]);
    },
    addFaceNormal: function(a, b, c) {
      const src = this.vertices;
      const dst = this.object.geometry.normals;
      _vA.fromArray(src, a);
      _vB.fromArray(src, b);
      _vC.fromArray(src, c);
      _cb.subVectors(_vC, _vB);
      _ab.subVectors(_vA, _vB);
      _cb.cross(_ab);
      _cb.normalize();
      dst.push(_cb.x, _cb.y, _cb.z);
      dst.push(_cb.x, _cb.y, _cb.z);
      dst.push(_cb.x, _cb.y, _cb.z);
    },
    addColor: function(a, b, c) {
      const src = this.colors;
      const dst = this.object.geometry.colors;
      if (src[a] !== void 0)
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
      if (src[b] !== void 0)
        dst.push(src[b + 0], src[b + 1], src[b + 2]);
      if (src[c] !== void 0)
        dst.push(src[c + 0], src[c + 1], src[c + 2]);
    },
    addUV: function(a, b, c) {
      const src = this.uvs;
      const dst = this.object.geometry.uvs;
      dst.push(src[a + 0], src[a + 1]);
      dst.push(src[b + 0], src[b + 1]);
      dst.push(src[c + 0], src[c + 1]);
    },
    addDefaultUV: function() {
      const dst = this.object.geometry.uvs;
      dst.push(0, 0);
      dst.push(0, 0);
      dst.push(0, 0);
    },
    addUVLine: function(a) {
      const src = this.uvs;
      const dst = this.object.geometry.uvs;
      dst.push(src[a + 0], src[a + 1]);
    },
    addFace: function(a, b, c, ua, ub, uc, na, nb, nc) {
      const vLen = this.vertices.length;
      let ia = this.parseVertexIndex(a, vLen);
      let ib = this.parseVertexIndex(b, vLen);
      let ic = this.parseVertexIndex(c, vLen);
      this.addVertex(ia, ib, ic);
      this.addColor(ia, ib, ic);
      if (na !== void 0 && na !== "") {
        const nLen = this.normals.length;
        ia = this.parseNormalIndex(na, nLen);
        ib = this.parseNormalIndex(nb, nLen);
        ic = this.parseNormalIndex(nc, nLen);
        this.addNormal(ia, ib, ic);
      } else {
        this.addFaceNormal(ia, ib, ic);
      }
      if (ua !== void 0 && ua !== "") {
        const uvLen = this.uvs.length;
        ia = this.parseUVIndex(ua, uvLen);
        ib = this.parseUVIndex(ub, uvLen);
        ic = this.parseUVIndex(uc, uvLen);
        this.addUV(ia, ib, ic);
        this.object.geometry.hasUVIndices = true;
      } else {
        this.addDefaultUV();
      }
    },
    addPointGeometry: function(vertices) {
      this.object.geometry.type = "Points";
      const vLen = this.vertices.length;
      for (let vi = 0, l = vertices.length; vi < l; vi++) {
        const index = this.parseVertexIndex(vertices[vi], vLen);
        this.addVertexPoint(index);
        this.addColor(index);
      }
    },
    addLineGeometry: function(vertices, uvs) {
      this.object.geometry.type = "Line";
      const vLen = this.vertices.length;
      const uvLen = this.uvs.length;
      for (let vi = 0, l = vertices.length; vi < l; vi++) {
        this.addVertexLine(this.parseVertexIndex(vertices[vi], vLen));
      }
      for (let uvi = 0, l = uvs.length; uvi < l; uvi++) {
        this.addUVLine(this.parseUVIndex(uvs[uvi], uvLen));
      }
    }
  };
  state.startObject("", false);
  return state;
}
class OBJLoader extends Loader {
  constructor(manager) {
    super(manager);
    this.materials = null;
  }
  load(url, onLoad, onProgress, onError) {
    const scope = this;
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function(text) {
      try {
        onLoad(scope.parse(text));
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          console.error(e);
        }
        scope.manager.itemError(url);
      }
    }, onProgress, onError);
  }
  setMaterials(materials) {
    this.materials = materials;
    return this;
  }
  parse(text) {
    const state = new ParserState();
    if (text.indexOf("\r\n") !== -1) {
      text = text.replace(/\r\n/g, "\n");
    }
    if (text.indexOf("\\\n") !== -1) {
      text = text.replace(/\\\n/g, "");
    }
    const lines = text.split("\n");
    let line = "", lineFirstChar = "";
    let lineLength = 0;
    let result = [];
    const trimLeft = typeof "".trimLeft === "function";
    for (let i = 0, l = lines.length; i < l; i++) {
      line = lines[i];
      line = trimLeft ? line.trimLeft() : line.trim();
      lineLength = line.length;
      if (lineLength === 0)
        continue;
      lineFirstChar = line.charAt(0);
      if (lineFirstChar === "#")
        continue;
      if (lineFirstChar === "v") {
        const data = line.split(/\s+/);
        switch (data[0]) {
          case "v":
            state.vertices.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
            if (data.length >= 7) {
              state.colors.push(parseFloat(data[4]), parseFloat(data[5]), parseFloat(data[6]));
            } else {
              state.colors.push(void 0, void 0, void 0);
            }
            break;
          case "vn":
            state.normals.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
            break;
          case "vt":
            state.uvs.push(parseFloat(data[1]), parseFloat(data[2]));
            break;
        }
      } else if (lineFirstChar === "f") {
        const lineData = line.substr(1).trim();
        const vertexData = lineData.split(/\s+/);
        const faceVertices = [];
        for (let j = 0, jl = vertexData.length; j < jl; j++) {
          const vertex = vertexData[j];
          if (vertex.length > 0) {
            const vertexParts = vertex.split("/");
            faceVertices.push(vertexParts);
          }
        }
        const v1 = faceVertices[0];
        for (let j = 1, jl = faceVertices.length - 1; j < jl; j++) {
          const v2 = faceVertices[j];
          const v3 = faceVertices[j + 1];
          state.addFace(v1[0], v2[0], v3[0], v1[1], v2[1], v3[1], v1[2], v2[2], v3[2]);
        }
      } else if (lineFirstChar === "l") {
        const lineParts = line.substring(1).trim().split(" ");
        let lineVertices = [];
        const lineUVs = [];
        if (line.indexOf("/") === -1) {
          lineVertices = lineParts;
        } else {
          for (let li = 0, llen = lineParts.length; li < llen; li++) {
            const parts = lineParts[li].split("/");
            if (parts[0] !== "")
              lineVertices.push(parts[0]);
            if (parts[1] !== "")
              lineUVs.push(parts[1]);
          }
        }
        state.addLineGeometry(lineVertices, lineUVs);
      } else if (lineFirstChar === "p") {
        const lineData = line.substr(1).trim();
        const pointData = lineData.split(" ");
        state.addPointGeometry(pointData);
      } else if ((result = _object_pattern.exec(line)) !== null) {
        const name = (" " + result[0].substr(1).trim()).substr(1);
        state.startObject(name);
      } else if (_material_use_pattern.test(line)) {
        state.object.startMaterial(line.substring(7).trim(), state.materialLibraries);
      } else if (_material_library_pattern.test(line)) {
        state.materialLibraries.push(line.substring(7).trim());
      } else if (_map_use_pattern.test(line)) {
        console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');
      } else if (lineFirstChar === "s") {
        result = line.split(" ");
        if (result.length > 1) {
          const value = result[1].trim().toLowerCase();
          state.object.smooth = value !== "0" && value !== "off";
        } else {
          state.object.smooth = true;
        }
        const material = state.object.currentMaterial();
        if (material)
          material.smooth = state.object.smooth;
      } else {
        if (line === "\0")
          continue;
        console.warn('THREE.OBJLoader: Unexpected line: "' + line + '"');
      }
    }
    state.finalize();
    const container = new Group$1();
    container.materialLibraries = [].concat(state.materialLibraries);
    const hasPrimitives = !(state.objects.length === 1 && state.objects[0].geometry.vertices.length === 0);
    if (hasPrimitives === true) {
      for (let i = 0, l = state.objects.length; i < l; i++) {
        const object = state.objects[i];
        const geometry = object.geometry;
        const materials = object.materials;
        const isLine = geometry.type === "Line";
        const isPoints = geometry.type === "Points";
        let hasVertexColors = false;
        if (geometry.vertices.length === 0)
          continue;
        const buffergeometry = new BufferGeometry();
        buffergeometry.setAttribute("position", new Float32BufferAttribute(geometry.vertices, 3));
        if (geometry.normals.length > 0) {
          buffergeometry.setAttribute("normal", new Float32BufferAttribute(geometry.normals, 3));
        }
        if (geometry.colors.length > 0) {
          hasVertexColors = true;
          buffergeometry.setAttribute("color", new Float32BufferAttribute(geometry.colors, 3));
        }
        if (geometry.hasUVIndices === true) {
          buffergeometry.setAttribute("uv", new Float32BufferAttribute(geometry.uvs, 2));
        }
        const createdMaterials = [];
        for (let mi = 0, miLen = materials.length; mi < miLen; mi++) {
          const sourceMaterial = materials[mi];
          const materialHash = sourceMaterial.name + "_" + sourceMaterial.smooth + "_" + hasVertexColors;
          let material = state.materials[materialHash];
          if (this.materials !== null) {
            material = this.materials.create(sourceMaterial.name);
            if (isLine && material && !(material instanceof LineBasicMaterial)) {
              const materialLine = new LineBasicMaterial();
              Material.prototype.copy.call(materialLine, material);
              materialLine.color.copy(material.color);
              material = materialLine;
            } else if (isPoints && material && !(material instanceof PointsMaterial)) {
              const materialPoints = new PointsMaterial({ size: 10, sizeAttenuation: false });
              Material.prototype.copy.call(materialPoints, material);
              materialPoints.color.copy(material.color);
              materialPoints.map = material.map;
              material = materialPoints;
            }
          }
          if (material === void 0) {
            if (isLine) {
              material = new LineBasicMaterial();
            } else if (isPoints) {
              material = new PointsMaterial({ size: 1, sizeAttenuation: false });
            } else {
              material = new MeshPhongMaterial();
            }
            material.name = sourceMaterial.name;
            material.flatShading = sourceMaterial.smooth ? false : true;
            material.vertexColors = hasVertexColors;
            state.materials[materialHash] = material;
          }
          createdMaterials.push(material);
        }
        let mesh;
        if (createdMaterials.length > 1) {
          for (let mi = 0, miLen = materials.length; mi < miLen; mi++) {
            const sourceMaterial = materials[mi];
            buffergeometry.addGroup(sourceMaterial.groupStart, sourceMaterial.groupCount, mi);
          }
          if (isLine) {
            mesh = new LineSegments(buffergeometry, createdMaterials);
          } else if (isPoints) {
            mesh = new Points(buffergeometry, createdMaterials);
          } else {
            mesh = new Mesh(buffergeometry, createdMaterials);
          }
        } else {
          if (isLine) {
            mesh = new LineSegments(buffergeometry, createdMaterials[0]);
          } else if (isPoints) {
            mesh = new Points(buffergeometry, createdMaterials[0]);
          } else {
            mesh = new Mesh(buffergeometry, createdMaterials[0]);
          }
        }
        mesh.name = object.name;
        container.add(mesh);
      }
    } else {
      if (state.vertices.length > 0) {
        const material = new PointsMaterial({ size: 1, sizeAttenuation: false });
        const buffergeometry = new BufferGeometry();
        buffergeometry.setAttribute("position", new Float32BufferAttribute(state.vertices, 3));
        if (state.colors.length > 0 && state.colors[0] !== void 0) {
          buffergeometry.setAttribute("color", new Float32BufferAttribute(state.colors, 3));
          material.vertexColors = true;
        }
        const points = new Points(buffergeometry, material);
        container.add(points);
      }
    }
    return container;
  }
}
class MTLLoader extends Loader {
  constructor(manager) {
    super(manager);
  }
  load(url, onLoad, onProgress, onError) {
    const scope = this;
    const path = this.path === "" ? LoaderUtils.extractUrlBase(url) : this.path;
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function(text) {
      try {
        onLoad(scope.parse(text, path));
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          console.error(e);
        }
        scope.manager.itemError(url);
      }
    }, onProgress, onError);
  }
  setMaterialOptions(value) {
    this.materialOptions = value;
    return this;
  }
  parse(text, path) {
    const lines = text.split("\n");
    let info = {};
    const delimiter_pattern = /\s+/;
    const materialsInfo = {};
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      line = line.trim();
      if (line.length === 0 || line.charAt(0) === "#") {
        continue;
      }
      const pos = line.indexOf(" ");
      let key = pos >= 0 ? line.substring(0, pos) : line;
      key = key.toLowerCase();
      let value = pos >= 0 ? line.substring(pos + 1) : "";
      value = value.trim();
      if (key === "newmtl") {
        info = { name: value };
        materialsInfo[value] = info;
      } else {
        if (key === "ka" || key === "kd" || key === "ks" || key === "ke") {
          const ss = value.split(delimiter_pattern, 3);
          info[key] = [parseFloat(ss[0]), parseFloat(ss[1]), parseFloat(ss[2])];
        } else {
          info[key] = value;
        }
      }
    }
    const materialCreator = new MaterialCreator(this.resourcePath || path, this.materialOptions);
    materialCreator.setCrossOrigin(this.crossOrigin);
    materialCreator.setManager(this.manager);
    materialCreator.setMaterials(materialsInfo);
    return materialCreator;
  }
}
class MaterialCreator {
  constructor(baseUrl = "", options = {}) {
    this.baseUrl = baseUrl;
    this.options = options;
    this.materialsInfo = {};
    this.materials = {};
    this.materialsArray = [];
    this.nameLookup = {};
    this.crossOrigin = "anonymous";
    this.side = this.options.side !== void 0 ? this.options.side : FrontSide;
    this.wrap = this.options.wrap !== void 0 ? this.options.wrap : RepeatWrapping;
  }
  setCrossOrigin(value) {
    this.crossOrigin = value;
    return this;
  }
  setManager(value) {
    this.manager = value;
  }
  setMaterials(materialsInfo) {
    this.materialsInfo = this.convert(materialsInfo);
    this.materials = {};
    this.materialsArray = [];
    this.nameLookup = {};
  }
  convert(materialsInfo) {
    if (!this.options)
      return materialsInfo;
    const converted = {};
    for (const mn in materialsInfo) {
      const mat = materialsInfo[mn];
      const covmat = {};
      converted[mn] = covmat;
      for (const prop in mat) {
        let save = true;
        let value = mat[prop];
        const lprop = prop.toLowerCase();
        switch (lprop) {
          case "kd":
          case "ka":
          case "ks":
            if (this.options && this.options.normalizeRGB) {
              value = [value[0] / 255, value[1] / 255, value[2] / 255];
            }
            if (this.options && this.options.ignoreZeroRGBs) {
              if (value[0] === 0 && value[1] === 0 && value[2] === 0) {
                save = false;
              }
            }
            break;
        }
        if (save) {
          covmat[lprop] = value;
        }
      }
    }
    return converted;
  }
  preload() {
    for (const mn in this.materialsInfo) {
      this.create(mn);
    }
  }
  getIndex(materialName) {
    return this.nameLookup[materialName];
  }
  getAsArray() {
    let index = 0;
    for (const mn in this.materialsInfo) {
      this.materialsArray[index] = this.create(mn);
      this.nameLookup[mn] = index;
      index++;
    }
    return this.materialsArray;
  }
  create(materialName) {
    if (this.materials[materialName] === void 0) {
      this.createMaterial_(materialName);
    }
    return this.materials[materialName];
  }
  createMaterial_(materialName) {
    const scope = this;
    const mat = this.materialsInfo[materialName];
    const params = {
      name: materialName,
      side: this.side
    };
    function resolveURL(baseUrl, url) {
      if (typeof url !== "string" || url === "")
        return "";
      if (/^https?:\/\//i.test(url))
        return url;
      return baseUrl + url;
    }
    function setMapForType(mapType, value) {
      if (params[mapType])
        return;
      const texParams = scope.getTextureParams(value, params);
      const map = scope.loadTexture(resolveURL(scope.baseUrl, texParams.url));
      map.repeat.copy(texParams.scale);
      map.offset.copy(texParams.offset);
      map.wrapS = scope.wrap;
      map.wrapT = scope.wrap;
      params[mapType] = map;
    }
    for (const prop in mat) {
      const value = mat[prop];
      let n;
      if (value === "")
        continue;
      switch (prop.toLowerCase()) {
        case "kd":
          params.color = new Color().fromArray(value);
          break;
        case "ks":
          params.specular = new Color().fromArray(value);
          break;
        case "ke":
          params.emissive = new Color().fromArray(value);
          break;
        case "map_kd":
          setMapForType("map", value);
          break;
        case "map_ks":
          setMapForType("specularMap", value);
          break;
        case "map_ke":
          setMapForType("emissiveMap", value);
          break;
        case "norm":
          setMapForType("normalMap", value);
          break;
        case "map_bump":
        case "bump":
          setMapForType("bumpMap", value);
          break;
        case "map_d":
          setMapForType("alphaMap", value);
          params.transparent = true;
          break;
        case "ns":
          params.shininess = parseFloat(value);
          break;
        case "d":
          n = parseFloat(value);
          if (n < 1) {
            params.opacity = n;
            params.transparent = true;
          }
          break;
        case "tr":
          n = parseFloat(value);
          if (this.options && this.options.invertTrProperty)
            n = 1 - n;
          if (n > 0) {
            params.opacity = 1 - n;
            params.transparent = true;
          }
          break;
      }
    }
    this.materials[materialName] = new MeshPhongMaterial(params);
    return this.materials[materialName];
  }
  getTextureParams(value, matParams) {
    const texParams = {
      scale: new Vector2(1, 1),
      offset: new Vector2(0, 0)
    };
    const items = value.split(/\s+/);
    let pos;
    pos = items.indexOf("-bm");
    if (pos >= 0) {
      matParams.bumpScale = parseFloat(items[pos + 1]);
      items.splice(pos, 2);
    }
    pos = items.indexOf("-s");
    if (pos >= 0) {
      texParams.scale.set(parseFloat(items[pos + 1]), parseFloat(items[pos + 2]));
      items.splice(pos, 4);
    }
    pos = items.indexOf("-o");
    if (pos >= 0) {
      texParams.offset.set(parseFloat(items[pos + 1]), parseFloat(items[pos + 2]));
      items.splice(pos, 4);
    }
    texParams.url = items.join(" ").trim();
    return texParams;
  }
  loadTexture(url, mapping, onLoad, onProgress, onError) {
    const manager = this.manager !== void 0 ? this.manager : DefaultLoadingManager;
    let loader = manager.getHandler(url);
    if (loader === null) {
      loader = new TextureLoader(manager);
    }
    if (loader.setCrossOrigin)
      loader.setCrossOrigin(this.crossOrigin);
    const texture = loader.load(url, onLoad, onProgress, onError);
    if (mapping !== void 0)
      texture.mapping = mapping;
    return texture;
  }
}
var LOADERMANAGER;
(function(LOADERMANAGER2) {
  LOADERMANAGER2["BEFORELOAD"] = "beforeLoad";
  LOADERMANAGER2["LOADING"] = "loading";
  LOADERMANAGER2["DETAILLOADING"] = "detailLoading";
  LOADERMANAGER2["DETAILLOADED"] = "detailLoaded";
  LOADERMANAGER2["LOADED"] = "loaded";
})(LOADERMANAGER || (LOADERMANAGER = {}));
class LoaderManager extends EventDispatcher {
  constructor(parameters) {
    super();
    __publicField(this, "resourceMap");
    __publicField(this, "loaderMap");
    __publicField(this, "loadTotal");
    __publicField(this, "loadSuccess");
    __publicField(this, "loadError");
    __publicField(this, "isError");
    __publicField(this, "isLoading");
    __publicField(this, "isLoaded");
    __publicField(this, "loadDetailMap");
    this.resourceMap = new Map();
    this.loadTotal = 0;
    this.loadSuccess = 0;
    this.loadError = 0;
    this.isError = false;
    this.isLoading = false;
    this.isLoaded = false;
    this.loadDetailMap = {};
    const imageLoader = new ImageLoader();
    this.loaderMap = {
      "jpg": imageLoader,
      "png": imageLoader,
      "jpeg": imageLoader,
      "obj": new OBJLoader(),
      "mtl": new MTLLoader()
    };
    if (parameters) {
      this.loaderMap = Object.assign(this.loaderMap, parameters.loaderExtends);
    }
  }
  loaded() {
    this.dispatchEvent({
      type: LOADERMANAGER.LOADED,
      loadTotal: this.loadTotal,
      loadSuccess: this.loadSuccess,
      loadError: this.loadError,
      resourceMap: this.resourceMap
    });
    return this;
  }
  checkLoaded() {
    if (this.loadTotal === this.loadSuccess + this.loadError) {
      this.isError = true;
      this.isLoaded = true;
      this.isLoading = false;
      this.loaded();
    }
    return this;
  }
  load(urlList) {
    var _a;
    this.reset();
    this.isLoading = true;
    this.dispatchEvent({
      type: LOADERMANAGER.BEFORELOAD,
      urlList: [...urlList]
    });
    if (urlList.length <= 0) {
      this.checkLoaded();
      console.warn(`url list is empty.`);
      return this;
    }
    this.loadTotal += urlList.length;
    const resourceMap = this.resourceMap;
    const loaderMap = this.loaderMap;
    const loadDetailMap = this.loadDetailMap;
    for (let url of urlList) {
      const detail = {
        url,
        progress: 0,
        error: false,
        message: url
      };
      loadDetailMap[url] = detail;
      if (resourceMap.has(url)) {
        detail.progress = 1;
        this.loadSuccess += 1;
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADED,
          detail
        });
        this.dispatchEvent({
          type: LOADERMANAGER.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        });
        this.checkLoaded();
        continue;
      }
      const ext = (_a = url.split(".").pop()) == null ? void 0 : _a.toLocaleLowerCase();
      if (!ext) {
        detail.message = `url: ${url} \u5730\u5740\u6709\u8BEF\uFF0C\u65E0\u6CD5\u83B7\u53D6\u6587\u4EF6\u683C\u5F0F\u3002`;
        console.warn(detail.message);
        detail.error = true;
        this.isError = true;
        this.loadError += 1;
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADED,
          detail
        });
        this.dispatchEvent({
          type: LOADERMANAGER.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        });
        continue;
      }
      const loader = loaderMap[ext];
      if (!loader) {
        detail.message = `url: ${url} \u4E0D\u652F\u6301\u6B64\u6587\u4EF6\u683C\u5F0F\u52A0\u8F7D\u3002`;
        console.warn(detail.message);
        detail.error = true;
        this.isError = true;
        this.loadError += 1;
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADED,
          detail
        });
        this.dispatchEvent({
          type: LOADERMANAGER.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        });
        continue;
      }
      loader.loadAsync(url, (event) => {
        detail.progress = Number((event.loaded / event.total).toFixed(2));
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADING,
          detail
        });
      }).then((res) => {
        detail.progress = 1;
        this.loadSuccess += 1;
        this.resourceMap.set(url, res);
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADED,
          detail
        });
        this.dispatchEvent({
          type: LOADERMANAGER.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        });
        this.checkLoaded();
      }).catch((err) => {
        detail.error = true;
        detail.message = JSON.stringify(err);
        this.loadError += 1;
        this.dispatchEvent({
          type: LOADERMANAGER.DETAILLOADED,
          detail
        });
        this.dispatchEvent({
          type: LOADERMANAGER.LOADING,
          loadTotal: this.loadTotal,
          loadSuccess: this.loadSuccess,
          loadError: this.loadError
        });
        this.checkLoaded();
      });
    }
    return this;
  }
  reset() {
    this.loadTotal = 0;
    this.loadSuccess = 0;
    this.loadError = 0;
    this.isError = false;
    this.isLoading = false;
    this.isLoaded = false;
    this.loadDetailMap = {};
    return this;
  }
  register(ext, loader) {
    this.loaderMap[ext] = loader;
    return this;
  }
  hasLoaded(url) {
    return this.resourceMap.has(url);
  }
  getResource(url) {
    return this.resourceMap.get(url);
  }
  getLoadDetailMap() {
    return this.loadDetailMap;
  }
  setLoadDetailMap(map) {
    this.loadDetailMap = map;
    return this;
  }
  toJSON() {
    const assets = [];
    this.resourceMap.forEach((value, url) => {
      assets.push(url);
    });
    return JSON.stringify(assets);
  }
  dispose() {
    this.resourceMap.clear();
    return this;
  }
}
const LoaderManagerPlugin = function(params) {
  if (this.loaderManager) {
    console.warn("engine has installed loaderManager plugin.");
    return false;
  }
  const loaderManager = new LoaderManager(params);
  this.loaderManager = loaderManager;
  this.loadResources = (urlList, callback) => {
    const lodedFun = (event) => {
      callback(void 0, event);
      this.loaderManager.removeEventListener("loaded", lodedFun);
    };
    try {
      this.loaderManager.addEventListener("loaded", lodedFun);
    } catch (error) {
      callback(error);
    }
    this.loaderManager.load(urlList);
    return this;
  };
  this.loadResourcesAsync = (urlList) => {
    return new Promise((resolve, reject) => {
      const lodedFun = (event) => {
        resolve(event);
        this.loaderManager.removeEventListener("loaded", lodedFun);
      };
      try {
        this.loaderManager.addEventListener("loaded", lodedFun);
      } catch (error) {
        reject(error);
      }
      this.loaderManager.load(urlList);
    });
  };
  return true;
};
var MODULETYPE;
(function(MODULETYPE2) {
  MODULETYPE2["CAMERA"] = "camera";
  MODULETYPE2["LIGHT"] = "light";
  MODULETYPE2["GEOMETRY"] = "geometry";
  MODULETYPE2["TEXTURE"] = "texture";
  MODULETYPE2["MATERIAL"] = "material";
  MODULETYPE2["RENDERER"] = "renderer";
  MODULETYPE2["SCENE"] = "scene";
  MODULETYPE2["SPRITE"] = "sprite";
  MODULETYPE2["CONTROLS"] = "controls";
  MODULETYPE2["EVENT"] = "event";
  MODULETYPE2["LINE"] = "line";
  MODULETYPE2["MESH"] = "mesh";
  MODULETYPE2["POINTS"] = "points";
  MODULETYPE2["GROUP"] = "group";
})(MODULETYPE || (MODULETYPE = {}));
const getObjectConfig = () => {
  return {
    vid: "",
    name: "",
    type: "Object3D",
    castShadow: true,
    receiveShadow: true,
    lookAt: "",
    visible: true,
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: {
      x: 1,
      y: 1,
      z: 1
    }
  };
};
const getLightConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: "Light",
    color: "rgb(255, 255, 255)",
    intensity: 1
  });
};
const getAmbientLightConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.AMBIENTLIGHT,
    color: "rgb(255, 255, 255)",
    intensity: 1
  });
};
const getPointLightConfig = function() {
  return Object.assign(getLightConfig(), {
    type: CONFIGTYPE.POINTLIGHT,
    distance: 30,
    decay: 0.01
  });
};
const getSpotLightConfig = function() {
  return Object.assign(getLightConfig(), {
    type: CONFIGTYPE.SPOTLIGHT,
    distance: 30,
    angle: Math.PI / 180 * 45,
    penumbra: 0.01,
    decay: 0.01
  });
};
const getGeometryConfig = function() {
  return {
    vid: "",
    type: "Geometry",
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: {
      x: 1,
      y: 1,
      z: 1
    }
  };
};
const getBoxGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: "BoxGeometry",
    width: 5,
    height: 5,
    depth: 5,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1
  });
};
const getSphereGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: "SphereGeometry",
    radius: 3,
    widthSegments: 32,
    heightSegments: 32,
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI
  });
};
const getLoadGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    type: "LoadGeometry",
    url: ""
  });
};
const getTextureConfig = function() {
  return {
    vid: "",
    type: "Texture",
    name: "",
    mapping: UVMapping,
    wrapS: ClampToEdgeWrapping,
    wrapT: ClampToEdgeWrapping,
    magFilter: LinearFilter,
    minFilter: LinearMipmapLinearFilter,
    anisotropy: 1,
    format: RGBAFormat,
    offset: {
      x: 0,
      y: 0
    },
    repeat: {
      x: 1,
      y: 1
    },
    rotation: 0,
    center: {
      x: 0,
      y: 0
    },
    matrixAutoUpdate: true,
    encoding: LinearEncoding,
    needsUpdate: false
  };
};
const getImageTextureConfig = function() {
  return Object.assign(getTextureConfig(), {
    type: "ImageTexture",
    url: ""
  });
};
const getCubeTextureConfig = function() {
  return Object.assign(getTextureConfig(), {
    type: "CubeTexture",
    cube: {
      nx: "",
      ny: "",
      nz: "",
      px: "",
      py: "",
      pz: ""
    }
  });
};
const getCanvasTextureConfig = function() {
  return Object.assign(getTextureConfig(), {
    type: "CanvasTexture",
    url: "",
    needsUpdate: false
  });
};
const getMaterialConfig = function() {
  return {
    vid: "",
    type: "Material",
    alphaTest: 0,
    colorWrite: true,
    depthTest: true,
    depthWrite: true,
    format: RGBAFormat,
    fog: true,
    name: "",
    needsUpdate: false,
    opacity: 1,
    dithering: false,
    shadowSide: null,
    side: FrontSide,
    toneMapped: true,
    transparent: false,
    visible: true
  };
};
const getMeshStandardMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.MESHSTANDARDMATERIAL,
    aoMapIntensity: 1,
    bumpScale: 1,
    color: "rgb(255, 255, 255)",
    displacementScale: 1,
    displacementBias: 0,
    emissive: "rgb(0, 0, 0)",
    emissiveIntensity: 1,
    envMapIntensity: 1,
    flatShading: false,
    lightMapIntensity: 1,
    metalness: 0,
    normalMapType: TangentSpaceNormalMap,
    refractionRatio: 0.98,
    roughness: 1,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    roughnessMap: "",
    normalMap: "",
    metalnessMap: "",
    map: "",
    lightMap: "",
    envMap: "",
    emissiveMap: "",
    displacementMap: "",
    bumpMap: "",
    alphaMap: "",
    aoMap: ""
  });
};
const getMeshPhongMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.MESHPHONGMATERIAL,
    aoMapIntensity: 1,
    bumpScale: 1,
    color: "rgb(255, 255, 255)",
    displacementScale: 1,
    displacementBias: 0,
    emissive: "rgb(0, 0, 0)",
    emissiveIntensity: 1,
    envMapIntensity: 1,
    flatShading: false,
    lightMapIntensity: 1,
    normalMapType: TangentSpaceNormalMap,
    refractionRatio: 0.98,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    specular: "rgb(17, 17, 17)",
    shininess: 30,
    combine: MultiplyOperation,
    normalMap: "",
    map: "",
    lightMap: "",
    envMap: "",
    emissiveMap: "",
    displacementMap: "",
    bumpMap: "",
    alphaMap: "",
    aoMap: "",
    specularMap: ""
  });
};
const getSpriteMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.SPRITEMATERIAL,
    color: "rgb(255, 255, 255)",
    rotation: 0,
    map: "",
    alphaMap: "",
    sizeAttenuation: true
  });
};
const getLineBasicMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.LINEBASICMATERIAL,
    color: "rgb(255, 255, 255)",
    linecap: "round",
    linejoin: "round",
    linewidth: 1
  });
};
const getPointsMaterialConfig = function() {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.POINTSMATERIAL,
    map: "",
    alphaMap: "",
    color: "rgb(255, 255, 255)",
    sizeAttenuation: true,
    size: 1
  });
};
const getPerspectiveCameraConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.PERSPECTIVECAMERA,
    adaptiveWindow: false,
    fov: 45,
    aspect: 1920 / 1080,
    near: 5,
    far: 50
  });
};
const getOrthographicCameraConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.ORTHOGRAPHICCAMERA,
    adaptiveWindow: false,
    left: 1920 / 16,
    right: 1920 / 16,
    top: 1080 / 16,
    bottom: 1080 / 16,
    near: 5,
    far: 50
  });
};
const getWebGLRendererConfig = function() {
  return {
    vid: "WebGLRenderer",
    type: "WebGLRenderer",
    clearColor: "rgba(0, 0, 0, 0)",
    outputEncoding: LinearEncoding,
    physicallyCorrectLights: false,
    shadowMap: {
      enabled: false,
      autoUpdate: true,
      type: PCFShadowMap
    },
    toneMapping: NoToneMapping,
    toneMappingExposure: 1,
    pixelRatio: window.devicePixelRatio,
    adaptiveCamera: false,
    viewport: null,
    scissor: null,
    size: null
  };
};
const getSceneConfig = function() {
  return {
    vid: "Scene",
    type: "Scene",
    background: "",
    environment: "",
    fog: null
  };
};
const getTransformControlsConfig = function() {
  return {
    vid: "TransformControls",
    type: "TransformControls",
    axis: "XYZ",
    enabled: true,
    mode: "translate",
    snapAllow: false,
    rotationSnap: Math.PI / 180 * 10,
    translationSnap: 5,
    scaleSnap: 0.1,
    showX: true,
    showY: true,
    showZ: true,
    size: 1,
    space: "world"
  };
};
const getOrbitControlsConfig = function() {
  return {
    vid: "OrbitControls",
    type: "OrbitControls",
    autoRotate: false,
    autoRotateSpeed: 2,
    enableDamping: false,
    dampingFactor: 0.05
  };
};
const getSpriteConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: "Sprite",
    material: "",
    center: {
      x: 0.5,
      y: 0.5
    }
  });
};
const getEventConfig = function() {
  return {
    vid: "",
    type: CONFIGTYPE.EVENT,
    target: "",
    pointerdown: [],
    pointermove: [],
    pointerup: [],
    pointerenter: [],
    pointerleave: [],
    click: [],
    dblclick: [],
    contextmenu: []
  };
};
const getMeshConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.MESH,
    geometry: "",
    material: ""
  });
};
const getPointsConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.POINTS,
    geometry: "",
    material: ""
  });
};
const getLineConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.LINE,
    geometry: "",
    material: ""
  });
};
const getGroupConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.GROUP,
    children: []
  });
};
function isValidKey(key, object) {
  return key in object;
}
function isValidEnum(enumeration, value) {
  return Object.values(enumeration).includes(value);
}
function generateConfigFunction(config) {
  return (merge) => {
    const recursion = (config2, merge2) => {
      for (const key in merge2) {
        if (config2[key] === void 0) {
          console.warn(` config can not set key: ${key}`);
          continue;
        }
        if (typeof merge2[key] === "object" && merge2[key] !== null && !Array.isArray(merge2[key])) {
          recursion(config2[key], merge2[key]);
        } else {
          config2[key] = merge2[key];
        }
      }
    };
    if (merge) {
      recursion(config, merge);
    }
    return config;
  };
}
function getConfigModelMap() {
  return {
    [CONFIGTYPE.IMAGETEXTURE]: MODULETYPE.TEXTURE,
    [CONFIGTYPE.CUBETEXTURE]: MODULETYPE.TEXTURE,
    [CONFIGTYPE.CANVASTEXTURE]: MODULETYPE.TEXTURE,
    [CONFIGTYPE.MESHSTANDARDMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE.MESHPHONGMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE.SPRITEMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE.LINEBASICMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE.POINTSMATERIAL]: MODULETYPE.MATERIAL,
    [CONFIGTYPE.AMBIENTLIGHT]: MODULETYPE.LIGHT,
    [CONFIGTYPE.SPOTLIGHT]: MODULETYPE.LIGHT,
    [CONFIGTYPE.POINTLIGHT]: MODULETYPE.LIGHT,
    [CONFIGTYPE.BOXGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.SPHEREGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.LOADGEOMETRY]: MODULETYPE.GEOMETRY,
    [CONFIGTYPE.SPRITE]: MODULETYPE.SPRITE,
    [CONFIGTYPE.LINE]: MODULETYPE.LINE,
    [CONFIGTYPE.MESH]: MODULETYPE.MESH,
    [CONFIGTYPE.POINTS]: MODULETYPE.POINTS,
    [CONFIGTYPE.GROUP]: MODULETYPE.GROUP,
    [CONFIGTYPE.PERSPECTIVECAMERA]: MODULETYPE.CAMERA,
    [CONFIGTYPE.ORTHOGRAPHICCAMERA]: MODULETYPE.CAMERA,
    [CONFIGTYPE.WEBGLRENDERER]: MODULETYPE.RENDERER,
    [CONFIGTYPE.SCENE]: MODULETYPE.SCENE,
    [CONFIGTYPE.TRNASFORMCONTROLS]: MODULETYPE.CONTROLS,
    [CONFIGTYPE.EVENT]: MODULETYPE.EVENT
  };
}
function getConfigFunctionMap() {
  return {
    [CONFIGTYPE.IMAGETEXTURE]: getImageTextureConfig,
    [CONFIGTYPE.CUBETEXTURE]: getCubeTextureConfig,
    [CONFIGTYPE.CANVASTEXTURE]: getCanvasTextureConfig,
    [CONFIGTYPE.MESHSTANDARDMATERIAL]: getMeshStandardMaterialConfig,
    [CONFIGTYPE.MESHPHONGMATERIAL]: getMeshPhongMaterialConfig,
    [CONFIGTYPE.SPRITEMATERIAL]: getSpriteMaterialConfig,
    [CONFIGTYPE.LINEBASICMATERIAL]: getLineBasicMaterialConfig,
    [CONFIGTYPE.POINTSMATERIAL]: getPointsMaterialConfig,
    [CONFIGTYPE.AMBIENTLIGHT]: getAmbientLightConfig,
    [CONFIGTYPE.SPOTLIGHT]: getSpotLightConfig,
    [CONFIGTYPE.POINTLIGHT]: getPointLightConfig,
    [CONFIGTYPE.BOXGEOMETRY]: getBoxGeometryConfig,
    [CONFIGTYPE.SPHEREGEOMETRY]: getSphereGeometryConfig,
    [CONFIGTYPE.LOADGEOMETRY]: getLoadGeometryConfig,
    [CONFIGTYPE.SPRITE]: getSpriteConfig,
    [CONFIGTYPE.LINE]: getLineConfig,
    [CONFIGTYPE.MESH]: getMeshConfig,
    [CONFIGTYPE.POINTS]: getPointsConfig,
    [CONFIGTYPE.GROUP]: getGroupConfig,
    [CONFIGTYPE.PERSPECTIVECAMERA]: getPerspectiveCameraConfig,
    [CONFIGTYPE.ORTHOGRAPHICCAMERA]: getOrthographicCameraConfig,
    [CONFIGTYPE.WEBGLRENDERER]: getWebGLRendererConfig,
    [CONFIGTYPE.SCENE]: getSceneConfig,
    [CONFIGTYPE.TRNASFORMCONTROLS]: getTransformControlsConfig,
    [CONFIGTYPE.ORBITCONTROLS]: getOrbitControlsConfig,
    [CONFIGTYPE.EVENT]: getEventConfig
  };
}
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
  return typeof uuid === "string" && REGEX.test(uuid);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify(rnds);
}
const typeMap = getConfigFunctionMap();
const generateConfig = function(type, merge, strict = true, warn = true) {
  if (typeMap[type]) {
    const recursion = (config, merge2) => {
      for (const key in merge2) {
        if (config[key] === void 0) {
          !strict && (config[key] = merge2[key]);
          strict && warn && console.warn(`'${type}' config can not set key: ${key}`);
          continue;
        }
        if (typeof merge2[key] === "object" && merge2[key] !== null && !Array.isArray(merge2[key])) {
          recursion(config[key], merge2[key]);
        } else {
          config[key] = merge2[key];
        }
      }
    };
    const initConfig = typeMap[type]();
    if (initConfig.vid === "") {
      initConfig.vid = v4();
    }
    merge && recursion(initConfig, merge);
    return initConfig;
  } else {
    console.error(`type: ${type} can not be found in configList.`);
    return null;
  }
};
var RESOURCEEVENTTYPE;
(function(RESOURCEEVENTTYPE2) {
  RESOURCEEVENTTYPE2["MAPPED"] = "mapped";
})(RESOURCEEVENTTYPE || (RESOURCEEVENTTYPE = {}));
class ResourceManager extends EventDispatcher {
  constructor() {
    super();
    __publicField(this, "structureMap", new Map());
    __publicField(this, "configMap", new Map());
    __publicField(this, "resourceMap", new Map());
  }
  mappingResource(loadResourceMap) {
    const structureMap = this.structureMap;
    const configMap = this.configMap;
    const resourceMap = this.resourceMap;
    const recursionMappingObject = function(url, object) {
      const config = {
        type: `${object.type}`
      };
      let mappingUrl = "";
      if (object.geometry) {
        const geometry = object.geometry;
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const center = box.getCenter(new Vector3());
        mappingUrl = `${url}.geometry`;
        resourceMap.set(mappingUrl, geometry);
        configMap.set(mappingUrl, generateConfig(CONFIGTYPE.LOADGEOMETRY, {
          url: mappingUrl,
          position: {
            x: center.x / (box.max.x - box.min.x) * 2,
            y: center.y / (box.max.y - box.min.y) * 2,
            z: center.z / (box.max.z - box.min.z) * 2
          }
        }));
        config.geometry = mappingUrl;
      }
      if (object.material) {
        const material = object.material;
        if (material instanceof Array) {
          config.material = [];
          material.forEach((materialChild, i, arr) => {
            mappingUrl = `${url}.material.${i}`;
            resourceMap.set(mappingUrl, materialChild);
            configMap.set(mappingUrl, generateConfig(materialChild.type, materialChild, true, false));
            config.material[i] = mappingUrl;
          });
        } else {
          mappingUrl = `${url}.material`;
          resourceMap.set(mappingUrl, material);
          configMap.set(mappingUrl, generateConfig(material.type, material, true, false));
          config.material = mappingUrl;
        }
      }
      if (object.children.length) {
        config.children = [];
        object.children.forEach((child, i, arr) => {
          mappingUrl = `${url}.children.${i}`;
          config.children[i] = recursionMappingObject(mappingUrl, child);
        });
      }
      return config;
    };
    loadResourceMap.forEach((resource, url) => {
      if (resource instanceof HTMLImageElement) {
        resourceMap.set(url, resource);
        configMap.set(url, generateConfig(CONFIGTYPE.IMAGETEXTURE, {
          url
        }));
        structureMap.set(url, url);
      } else if (resource instanceof HTMLCanvasElement) {
        resourceMap.set(url, resource);
        structureMap.set(url, url);
      } else if (resource instanceof Object3D) {
        structureMap.set(url, recursionMappingObject(url, resource));
      }
    });
    this.dispatchEvent({
      type: "mapped",
      structureMap,
      configMap,
      resourceMap
    });
    return this;
  }
  dispose() {
  }
}
const ResourceManagerPlugin = function(params) {
  if (this.resourceManager) {
    console.warn("engine has installed resourceManager plugin.");
    return false;
  }
  const resourceManager = new ResourceManager();
  this.resourceManager = resourceManager;
  if (this.loaderManager) {
    this.loaderManager.addEventListener("loaded", (event) => {
      this.resourceManager.mappingResource(event.resourceMap);
    });
  }
  this.registerResources = (resourceMap) => {
    const map = new Map();
    Object.keys(resourceMap).forEach((key) => {
      map.set(key, resourceMap[key]);
    });
    this.resourceManager.mappingResource(map);
    return this;
  };
  return true;
};
const _ProxyBroadcast = class extends EventDispatcher {
  constructor() {
    super();
  }
  proxyExtends(object, path) {
    if (!path) {
      path = [];
    }
    if (_ProxyBroadcast.proxyWeakSet.has(object) || typeof object !== "object" && object !== null) {
      return object;
    }
    const handler = {
      get: (target, key) => {
        return Reflect.get(target, key);
      },
      set: (target, key, value) => {
        let result;
        if (target[key] === void 0) {
          if (typeof value === "object" && value !== null) {
            const newPath = path.concat([key]);
            value = this.proxyExtends(value, newPath);
          }
          result = Reflect.set(target, key, value);
          this.broadcast({
            operate: "add",
            path: path.concat([]),
            key,
            value
          });
        } else {
          if (typeof value === "object" && !_ProxyBroadcast.proxyWeakSet.has(object)) {
            const newPath = path.concat([key]);
            value = this.proxyExtends(value, newPath);
          }
          result = Reflect.set(target, key, value);
          this.broadcast({
            operate: "set",
            path: path.concat([]),
            key,
            value
          });
        }
        return result;
      },
      deleteProperty: (target, key) => {
        const result = Reflect.deleteProperty(target, key);
        this.broadcast({
          operate: "delete",
          path: path.concat([]),
          key,
          value: ""
        });
        return result;
      }
    };
    if (typeof object === "object" && object !== null) {
      for (const key in object) {
        const tempPath = path.concat([key]);
        if (isValidKey(key, object) && typeof object[key] === "object" && object[key] !== null) {
          object[key] = this.proxyExtends(object[key], tempPath);
        }
      }
    }
    return new Proxy(object, handler);
  }
  broadcast({ operate, path, key, value }) {
    const filterMap = {
      __poto__: true,
      length: true
    };
    if (isValidKey(key, filterMap) && filterMap[key]) {
      return this;
    }
    this.dispatchEvent({
      type: "broadcast",
      notice: { operate, path, key, value }
    });
    return this;
  }
};
let ProxyBroadcast = _ProxyBroadcast;
__publicField(ProxyBroadcast, "proxyWeakSet", new WeakSet());
class Translater {
  constructor() {
    __publicField(this, "rule");
    __publicField(this, "memberSet");
    this.rule = function() {
    };
    this.memberSet = new Set();
  }
  apply(compiler) {
    this.memberSet.add(compiler);
    return this;
  }
  cancel(compiler) {
    this.memberSet.delete(compiler);
    return this;
  }
  setRule(rule) {
    this.rule = rule;
    return this;
  }
  translate(notice) {
    const rule = this.rule;
    this.memberSet.forEach((compiler) => {
      rule(notice, compiler);
    });
    return this;
  }
}
class DataSupport {
  constructor(rule, data) {
    __publicField(this, "data");
    __publicField(this, "broadcast");
    __publicField(this, "translater");
    this.translater = new Translater().setRule(rule);
    this.broadcast = new ProxyBroadcast();
    this.data = this.broadcast.proxyExtends(data);
    this.broadcast.addEventListener("broadcast", (event) => {
      this.translater.translate(event.notice);
    });
  }
  getData() {
    return this.data;
  }
  setData(data) {
    this.data = data;
    return this;
  }
  proxyData(data) {
    this.data = this.broadcast.proxyExtends(data);
    return this.data;
  }
  getConfig(vid) {
    return this.data[vid];
  }
  addCompiler(compiler) {
    compiler.setTarget(this.data);
    compiler.compileAll();
    this.translater.apply(compiler);
    return this;
  }
  toJSON() {
    return JSON.stringify(this.data);
  }
  load(config) {
    const data = this.data;
    for (const key in config) {
      data[key] = config[key];
    }
    return this;
  }
}
const TextureRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
  } else if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`texture rule vid is illeage: '${vid}'`);
      return;
    }
  }
};
class TextureDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(TextureRule, data);
  }
}
const MaterialRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
  } else if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`material rule vid is illeage: '${vid}'`);
      return;
    }
  }
};
class MaterialDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(MaterialRule, data);
  }
}
class ObjectDataSupport extends DataSupport {
  constructor(rule, data) {
    !data && (data = Object.create(Object.prototype));
    super(rule, data);
    __publicField(this, "IS_OBJECTDATASUPPORT", true);
  }
}
const LightRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`model rule vid is illeage: '${vid}'`);
    }
    return;
  }
};
class LightDataSupport extends ObjectDataSupport {
  constructor(data) {
    !data && (data = {});
    super(LightRule, data);
  }
}
const GeometryRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, value);
    } else {
      console.warn(`geometry rule vid is illeage: '${vid}'`);
    }
    return;
  }
};
class GeometryDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(GeometryRule, data);
  }
}
const CameraRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
  } else if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`camera rule vid is illeage: '${vid}'`);
    }
  }
};
class CameraDataSupport extends ObjectDataSupport {
  constructor(data) {
    !data && (data = {});
    super(CameraRule, data);
  }
}
const RendererRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (operate === "add") {
    compiler.add(key, value);
    return;
  }
  if (operate === "set") {
    compiler.set(path.concat([]), key, value);
    return;
  }
};
class RendererDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(RendererRule, data);
  }
}
const SceneRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (operate === "set") {
    compiler.set(path.concat([]), key, value);
  }
};
class SceneDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {
      scene: getSceneConfig()
    });
    super(SceneRule, data);
  }
}
const ControlsRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (operate === "set") {
    const tempPath = path.concat([]);
    const type = tempPath.shift();
    if (type) {
      compiler.set(type, tempPath, key, value);
    } else {
      console.error(`controls rule can not found controls type in set operate.`);
    }
  }
};
class ControlsDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(ControlsRule, data);
  }
}
const SpriteRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    compiler.add(key, value);
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    compiler.set(vid, tempPath, key, value);
  }
};
class SpriteDataSupport extends ObjectDataSupport {
  constructor(data) {
    !data && (data = {});
    super(SpriteRule, data);
  }
}
const EventRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key) && !path.length) {
      compiler.add(key, value);
    } else {
      if (Number.isInteger(Number(key)) && path.length === 2) {
        const [vid, eventName] = path;
        if (!validate(vid)) {
          console.warn(`EventRule: vid is illeage: ${vid}`);
          return;
        }
        if (!isValidEnum(EVENTNAME, eventName)) {
          console.warn(`EventRule: eventName is not support: ${eventName}`);
          return;
        }
        compiler.addEvent(vid, eventName, value);
      }
    }
    return;
  }
  if (operate === "set") {
    if (!path.length) {
      return;
    }
    const [vid, eventName, index] = path;
    if (!validate(vid)) {
      console.warn(`EventRule: vid is illeage: ${vid}`);
      return;
    }
    if (!isValidEnum(EVENTNAME, eventName)) {
      console.warn(`EventRule: eventName is not support: ${eventName}`);
      return;
    }
    if (!Number.isInteger(Number(index))) {
      console.warn(`EventRule: this index is not integer: ${index}`);
      return;
    }
    compiler.updateEvent(vid, eventName, Number(index));
    return;
  }
  if (operate === "delete") {
    if (validate(key) && !path.length) {
      compiler.remove(key);
    } else {
      if (Number.isInteger(Number(key)) && path.length === 2) {
        const [vid, eventName] = path;
        if (!validate(vid)) {
          console.warn(`EventRule: vid is illeage: ${vid}`);
          return;
        }
        if (!isValidEnum(EVENTNAME, eventName)) {
          console.warn(`EventRule: eventName is not support: ${eventName}`);
          return;
        }
        compiler.removeEvent(vid, eventName, Number(key));
      }
    }
    return;
  }
};
class EventDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(EventRule, data);
  }
}
const LineRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`model rule vid is illeage: '${vid}'`);
    }
    return;
  }
};
class LineDataSupport extends DataSupport {
  constructor(data) {
    !data && (data = {});
    super(LineRule, data);
  }
}
const MeshRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`model rule vid is illeage: '${vid}'`);
    }
    return;
  }
};
class MeshDataSupport extends ObjectDataSupport {
  constructor(data) {
    !data && (data = {});
    super(MeshRule, data);
  }
}
const PointsRule = function(notice, compiler) {
  const { operate, key, path, value } = notice;
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`model rule vid is illeage: '${vid}'`);
    }
    return;
  }
};
class PointsDataSupport extends ObjectDataSupport {
  constructor(data) {
    !data && (data = {});
    super(PointsRule, data);
  }
}
const GroupRule = function(input, compiler) {
  const { operate, key, path, value } = input;
  console.log(input);
  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }
  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`model rule vid is illeage: '${vid}'`);
    }
    return;
  }
};
class GroupDataSupport extends ObjectDataSupport {
  constructor(data) {
    !data && (data = {});
    super(GroupRule, data);
  }
}
class DataSupportManager {
  constructor(parameters) {
    __publicField(this, "cameraDataSupport");
    __publicField(this, "lightDataSupport");
    __publicField(this, "geometryDataSupport");
    __publicField(this, "textureDataSupport");
    __publicField(this, "materialDataSupport");
    __publicField(this, "rendererDataSupport");
    __publicField(this, "sceneDataSupport");
    __publicField(this, "controlsDataSupport");
    __publicField(this, "spriteDataSupport");
    __publicField(this, "eventDataSupport");
    __publicField(this, "lineDataSupport");
    __publicField(this, "meshDataSupport");
    __publicField(this, "pointsDataSupport");
    __publicField(this, "groupDataSupport");
    __publicField(this, "dataSupportMap");
    __publicField(this, "objectDataSupportList");
    this.cameraDataSupport = new CameraDataSupport();
    this.lightDataSupport = new LightDataSupport();
    this.geometryDataSupport = new GeometryDataSupport();
    this.textureDataSupport = new TextureDataSupport();
    this.materialDataSupport = new MaterialDataSupport();
    this.rendererDataSupport = new RendererDataSupport();
    this.sceneDataSupport = new SceneDataSupport();
    this.controlsDataSupport = new ControlsDataSupport();
    this.spriteDataSupport = new SpriteDataSupport();
    this.eventDataSupport = new EventDataSupport();
    this.lineDataSupport = new LineDataSupport();
    this.meshDataSupport = new MeshDataSupport();
    this.pointsDataSupport = new PointsDataSupport();
    this.groupDataSupport = new GroupDataSupport();
    this.objectDataSupportList = [];
    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        if (this[key] !== void 0) {
          this[key] = parameters[key];
          if (parameters[key].IS_OBJECTDATASUPPORT) {
            this.objectDataSupportList.push(parameters[key]);
          }
        }
      });
    } else {
      Object.keys(this).forEach((key) => {
        if (typeof this[key] === "object" && this[key].IS_OBJECTDATASUPPORT) {
          this.objectDataSupportList.push(this[key]);
        }
      });
    }
    const dataSupportMap = new Map();
    for (let module in MODULETYPE) {
      dataSupportMap.set(MODULETYPE[module], this[`${MODULETYPE[module]}DataSupport`]);
    }
    this.dataSupportMap = dataSupportMap;
  }
  getObjectDataSupportList() {
    return this.objectDataSupportList;
  }
  getDataSupport(type) {
    if (this.dataSupportMap.has(type)) {
      return this.dataSupportMap.get(type);
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`);
      return null;
    }
  }
  getSupportData(type) {
    if (this.dataSupportMap.has(type)) {
      return this.dataSupportMap.get(type).getData();
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`);
      return null;
    }
  }
  setSupportData(type, data) {
    if (this.dataSupportMap.has(type)) {
      this.dataSupportMap.get(type).setData(data);
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`);
    }
    return this;
  }
  getObjectConfig(vid) {
    if (!validate(vid)) {
      console.warn(`vid is illeage: ${vid}`);
      return null;
    }
    for (let objectDataSupport of this.objectDataSupportList) {
      const config = objectDataSupport.getConfig(vid);
      if (config) {
        return config;
      }
    }
    return null;
  }
  load(config) {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      config[module] && dataSupport.load(config[module]);
    });
    return this;
  }
  toJSON(extendsConfig) {
    const jsonObject = extendsConfig || {};
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      jsonObject[module] = dataSupport.getData();
    });
    return JSON.stringify(jsonObject);
  }
}
const DataSupportManagerPlugin = function(params) {
  if (this.dataSupportManager) {
    console.warn("engine has installed dataSupportManager plugin.");
    return false;
  }
  const dataSupportManager = new DataSupportManager(params);
  this.dataSupportManager = dataSupportManager;
  this.toJSON = function() {
    if (this.loaderManager) {
      const assets = {
        assets: JSON.parse(this.loaderManager.toJSON())
      };
      return this.dataSupportManager.toJSON(assets);
    }
    return this.dataSupportManager.toJSON();
  };
  this.completeSet.add(() => {
    const rendererData = this.dataSupportManager.getDataSupport(MODULETYPE.RENDERER).getData();
    if (!rendererData.WebGLRenderer) {
      rendererData.WebGLRenderer = generateConfig(CONFIGTYPE.WEBGLRENDERER);
    }
    const sceneData = this.dataSupportManager.getDataSupport(MODULETYPE.SCENE).getData();
    if (!sceneData.scene) {
      sceneData.scene = generateConfig(CONFIGTYPE.SCENE);
    }
    const controlsData = this.dataSupportManager.getDataSupport(MODULETYPE.CONTROLS).getData();
    if (this.transformControls) {
      if (!controlsData[CONFIGTYPE.TRNASFORMCONTROLS]) {
        controlsData[CONFIGTYPE.TRNASFORMCONTROLS] = generateConfig(CONFIGTYPE.TRNASFORMCONTROLS);
      }
    }
    if (this.orbitControls) {
      if (!controlsData[CONFIGTYPE.ORBITCONTROLS]) {
        controlsData[CONFIGTYPE.ORBITCONTROLS] = generateConfig(CONFIGTYPE.ORBITCONTROLS);
      }
    }
  });
  return true;
};
class Compiler {
  static applyConfig(config, object, filter = {}, callBack) {
    const filterMap = Object.assign({
      vid: true,
      type: true
    }, filter);
    const recursiveConfig = (config2, object2) => {
      for (const key in config2) {
        if (filterMap[key]) {
          continue;
        }
        if (typeof config2[key] === "object" && typeof config2[key] !== null && isValidKey(key, object2)) {
          recursiveConfig(config2[key], object2[key]);
          continue;
        }
        if (isValidKey(key, object2)) {
          object2[key] = config2[key];
        }
      }
    };
    recursiveConfig(config, object);
    callBack && callBack();
  }
  constructor() {
  }
}
class ObjectCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "IS_OBJECTCOMPILER", true);
    __publicField(this, "scene");
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "weakMap");
    __publicField(this, "cacheObjectMap");
    __publicField(this, "geometryMap");
    __publicField(this, "materialMap");
    __publicField(this, "objectMapSet");
    if (parameters) {
      parameters.scene && (this.scene = parameters.scene);
      parameters.target && (this.target = parameters.target);
    } else {
      this.scene = new Scene();
      this.target = {};
    }
    this.geometryMap = new Map();
    this.materialMap = new Map();
    this.map = new Map();
    this.weakMap = new WeakMap();
    this.objectMapSet = new Set();
    this.cacheObjectMap = new WeakMap();
  }
  getMaterial(vid) {
    if (validate(vid)) {
      if (this.materialMap.has(vid)) {
        return this.materialMap.get(vid);
      } else {
        console.warn(`${this.COMPILER_NAME}Compiler: can not found material which vid: ${vid}`);
        return this.getReplaceMaterial();
      }
    } else {
      console.warn(`${this.COMPILER_NAME}Compiler: material vid parameter is illegal: ${vid}`);
      return this.getReplaceMaterial();
    }
  }
  getGeometry(vid) {
    if (validate(vid)) {
      if (this.geometryMap.has(vid)) {
        return this.geometryMap.get(vid);
      } else {
        console.warn(`${this.COMPILER_NAME}Compiler: can not found geometry which vid: ${vid}`);
        return this.getReplaceGeometry();
      }
    } else {
      console.warn(`${this.COMPILER_NAME}Compiler: geometry vid parameter is illegal: ${vid}`);
      return this.getReplaceGeometry();
    }
  }
  getObject(vid) {
    for (const map of this.objectMapSet) {
      if (map.has(vid)) {
        return map.get(vid);
      }
    }
    return null;
  }
  setLookAt(vid, target) {
    if (vid === target) {
      console.error(`can not set object lookAt itself.`);
      return this;
    }
    if (!this.map.has(vid)) {
      console.error(`${this.COMPILER_NAME}Compiler: can not found object which vid: ${vid}.`);
      return this;
    }
    const model = this.map.get(vid);
    let cacheData = this.cacheObjectMap.get(model);
    if (!cacheData) {
      cacheData = { lookAtTarget: null, updateMatrixWorldFun: null };
      this.cacheObjectMap.set(model, cacheData);
    }
    if (!target) {
      if (!cacheData.updateMatrixWorldFun) {
        return this;
      }
      model.updateMatrixWorld = cacheData.updateMatrixWorldFun;
      cacheData.lookAtTarget = null;
      cacheData.updateMatrixWorldFun = null;
      return this;
    }
    let lookAtTarget = this.getObject(target);
    if (!lookAtTarget) {
      console.warn(`${this.COMPILER_NAME}Compiler: can not found this vid mapping object: '${vid}'`);
      return this;
    }
    const updateMatrixWorldFun = model.updateMatrixWorld;
    cacheData.updateMatrixWorldFun = updateMatrixWorldFun;
    cacheData.lookAtTarget = lookAtTarget.position;
    model.updateMatrixWorld = (focus) => {
      updateMatrixWorldFun.bind(model)(focus);
      model.lookAt(cacheData.lookAtTarget);
    };
    return this;
  }
  linkGeometryMap(map) {
    this.geometryMap = map;
    return this;
  }
  linkMaterialMap(materialMap) {
    this.materialMap = materialMap;
    return this;
  }
  linkObjectMap(...map) {
    for (let objectMap of map) {
      if (!this.objectMapSet.has(objectMap)) {
        this.objectMapSet.add(objectMap);
      }
    }
    return this;
  }
  setScene(scene) {
    this.scene = scene;
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  getMap() {
    return this.map;
  }
  getObjectSymbol(object) {
    if (this.weakMap.has(object)) {
      return this.weakMap.get(object);
    } else {
      return null;
    }
  }
  compileAll() {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }
  remove(vid) {
    if (!this.map.has(vid)) {
      console.warn(`${this.COMPILER_NAME}Compiler: can not found object which vid: ${vid}.`);
      return this;
    }
    this.weakMap.delete(this.map.get(vid));
    this.cacheObjectMap.delete(this.map.get(vid));
    this.map.delete(vid);
    return this;
  }
  dispose() {
    this.map.clear();
    this.objectMapSet.clear();
    return this;
  }
}
class CameraCompiler extends ObjectCompiler {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "COMPILER_NAME", MODULETYPE.CAMERA);
    __publicField(this, "engine");
    __publicField(this, "constructMap");
    __publicField(this, "filterAttribute");
    __publicField(this, "cacheCameraMap");
    __publicField(this, "replaceMaterial", new Material());
    __publicField(this, "replaceGeometry", new BufferGeometry());
    if (parameters) {
      parameters.engine && (this.engine = parameters.engine);
    } else {
      this.engine = new Engine().install(ENGINEPLUGIN.WEBGLRENDERER);
    }
    const constructMap = new Map();
    constructMap.set("PerspectiveCamera", () => new PerspectiveCamera());
    constructMap.set("OrthographicCamera", () => new OrthographicCamera(0, 0, 0, 0));
    this.constructMap = constructMap;
    this.filterAttribute = {
      scale: true
    };
    this.cacheCameraMap = new WeakMap();
  }
  getReplaceMaterial() {
    console.warn(`CameraCompiler: can not use material in CameraCompiler.`);
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    console.warn(`CameraCompiler: can not use geometry in CameraCompiler.`);
    return this.replaceGeometry;
  }
  setAdaptiveWindow(vid, value) {
    if (!this.map.has(vid)) {
      console.warn(`camera compiler can not found this vid camera: '${vid}'`);
      return this;
    }
    const camera = this.map.get(vid);
    let cacheData = this.cacheCameraMap.get(camera);
    if (!cacheData) {
      cacheData = {};
      this.cacheCameraMap.set(camera, cacheData);
    }
    if (!value) {
      if (cacheData.setSizeFun && this.engine.hasEventListener("setSize", cacheData.setSizeFun)) {
        this.engine.removeEventListener("setSize", cacheData.setSizeFun);
        cacheData.setSizeFun = void 0;
        return this;
      }
      if (cacheData.setSizeFun && !this.engine.hasEventListener("setSize", cacheData.setSizeFun)) {
        cacheData.setSizeFun = void 0;
        return this;
      }
    }
    if (value) {
      if (cacheData.setSizeFun && this.engine.hasEventListener("setSize", cacheData.setSizeFun)) {
        return this;
      }
      if (cacheData.setSizeFun && !this.engine.hasEventListener("setSize", cacheData.setSizeFun)) {
        this.engine.addEventListener("setSize", cacheData.setSizeFun);
        return this;
      }
      let setSizeFun = (event) => {
      };
      if (camera instanceof PerspectiveCamera) {
        setSizeFun = (event) => {
          camera.aspect = event.width / event.height;
          camera.updateProjectionMatrix();
        };
      } else if (camera instanceof OrthographicCamera) {
        setSizeFun = (event) => {
          const width = event.width;
          const height = event.height;
          camera.left = -width / 16;
          camera.right = width / 16;
          camera.top = height / 16;
          camera.bottom = -height / 16;
        };
      } else {
        console.warn(`camera compiler can not support this class camera:`, camera);
      }
      this.engine.addEventListener("setSize", setSizeFun);
      cacheData.setSizeFun = setSizeFun;
      const domElement = this.engine.webGLRenderer.domElement;
      setSizeFun({
        type: "setSize",
        width: domElement.offsetWidth,
        height: domElement.offsetHeight
      });
    }
    return this;
  }
  add(vid, config) {
    if (config.type && this.constructMap.has(config.type)) {
      const camera = this.constructMap.get(config.type)();
      Compiler.applyConfig(config, camera, Object.assign({
        lookAt: true,
        adaptiveWindow: true
      }, this.filterAttribute));
      if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
        camera.updateProjectionMatrix();
      }
      this.map.set(vid, camera);
      this.weakMap.set(camera, vid);
      this.setLookAt(config.vid, config.lookAt);
      this.setAdaptiveWindow(config.vid, config.adaptiveWindow);
      this.scene.add(camera);
    } else {
      console.warn(`CameraCompiler: can not support this config type: ${config.type}`);
    }
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`geometry compiler set function can not found vid geometry: '${vid}'`);
      return this;
    }
    if (this.filterAttribute[key]) {
      return this;
    }
    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }
    if (key === "adaptiveWindow") {
      return this.setAdaptiveWindow(vid, value);
    }
    let object = this.map.get(vid);
    for (let key2 of path) {
      if (this.filterAttribute[key2]) {
        return this;
      }
      object = object[key2];
    }
    object[key] = value;
    if (object instanceof PerspectiveCamera || object instanceof OrthographicCamera) {
      object.updateProjectionMatrix();
    }
    return this;
  }
  setEngine(engine) {
    this.engine = engine;
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class ControlsCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "transformControls");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.transformControls && (this.transformControls = parameters.transformControls);
    } else {
      this.target = {
        TransformControls: getTransformControlsConfig()
      };
      this.transformControls = new TransformControls(new Camera());
    }
  }
  set(type, path, key, value) {
    if (type === "TransformControls") {
      const controls = this.transformControls;
      if (key === "snapAllow") {
        const config = this.target["TransformControls"];
        if (value) {
          controls.translationSnap = config.translationSnap;
          controls.rotationSnap = config.rotationSnap;
          controls.scaleSnap = config.scaleSnap;
        } else {
          controls.translationSnap = null;
          controls.rotationSnap = null;
          controls.scaleSnap = null;
        }
        return this;
      }
      controls[key] = value;
    } else {
      console.warn(`controls compiler can not support this controls: '${type}'`);
      return this;
    }
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    return this;
  }
  dispose(parameter) {
    return this;
  }
}
const openWindow$1 = function(compiler, config) {
  return () => {
    window.open(config.params.url);
  };
};
var BasicEventLbirary = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  openWindow: openWindow$1
});
var Easing = {
  Linear: {
    None: function(amount) {
      return amount;
    }
  },
  Quadratic: {
    In: function(amount) {
      return amount * amount;
    },
    Out: function(amount) {
      return amount * (2 - amount);
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount;
      }
      return -0.5 * (--amount * (amount - 2) - 1);
    }
  },
  Cubic: {
    In: function(amount) {
      return amount * amount * amount;
    },
    Out: function(amount) {
      return --amount * amount * amount + 1;
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount;
      }
      return 0.5 * ((amount -= 2) * amount * amount + 2);
    }
  },
  Quartic: {
    In: function(amount) {
      return amount * amount * amount * amount;
    },
    Out: function(amount) {
      return 1 - --amount * amount * amount * amount;
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount;
      }
      return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
    }
  },
  Quintic: {
    In: function(amount) {
      return amount * amount * amount * amount * amount;
    },
    Out: function(amount) {
      return --amount * amount * amount * amount * amount + 1;
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount * amount;
      }
      return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
    }
  },
  Sinusoidal: {
    In: function(amount) {
      return 1 - Math.cos(amount * Math.PI / 2);
    },
    Out: function(amount) {
      return Math.sin(amount * Math.PI / 2);
    },
    InOut: function(amount) {
      return 0.5 * (1 - Math.cos(Math.PI * amount));
    }
  },
  Exponential: {
    In: function(amount) {
      return amount === 0 ? 0 : Math.pow(1024, amount - 1);
    },
    Out: function(amount) {
      return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
    },
    InOut: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      if ((amount *= 2) < 1) {
        return 0.5 * Math.pow(1024, amount - 1);
      }
      return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
    }
  },
  Circular: {
    In: function(amount) {
      return 1 - Math.sqrt(1 - amount * amount);
    },
    Out: function(amount) {
      return Math.sqrt(1 - --amount * amount);
    },
    InOut: function(amount) {
      if ((amount *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
    }
  },
  Elastic: {
    In: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
    },
    Out: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function(amount) {
      if (amount === 0) {
        return 0;
      }
      if (amount === 1) {
        return 1;
      }
      amount *= 2;
      if (amount < 1) {
        return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
      }
      return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
    }
  },
  Back: {
    In: function(amount) {
      var s = 1.70158;
      return amount * amount * ((s + 1) * amount - s);
    },
    Out: function(amount) {
      var s = 1.70158;
      return --amount * amount * ((s + 1) * amount + s) + 1;
    },
    InOut: function(amount) {
      var s = 1.70158 * 1.525;
      if ((amount *= 2) < 1) {
        return 0.5 * (amount * amount * ((s + 1) * amount - s));
      }
      return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
    }
  },
  Bounce: {
    In: function(amount) {
      return 1 - Easing.Bounce.Out(1 - amount);
    },
    Out: function(amount) {
      if (amount < 1 / 2.75) {
        return 7.5625 * amount * amount;
      } else if (amount < 2 / 2.75) {
        return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
      } else if (amount < 2.5 / 2.75) {
        return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
      } else {
        return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
      }
    },
    InOut: function(amount) {
      if (amount < 0.5) {
        return Easing.Bounce.In(amount * 2) * 0.5;
      }
      return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
    }
  }
};
var now;
if (typeof self === "undefined" && typeof process !== "undefined" && process.hrtime) {
  now = function() {
    var time = process.hrtime();
    return time[0] * 1e3 + time[1] / 1e6;
  };
} else if (typeof self !== "undefined" && self.performance !== void 0 && self.performance.now !== void 0) {
  now = self.performance.now.bind(self.performance);
} else if (Date.now !== void 0) {
  now = Date.now;
} else {
  now = function() {
    return new Date().getTime();
  };
}
var now$1 = now;
var Group = function() {
  function Group2() {
    this._tweens = {};
    this._tweensAddedDuringUpdate = {};
  }
  Group2.prototype.getAll = function() {
    var _this = this;
    return Object.keys(this._tweens).map(function(tweenId) {
      return _this._tweens[tweenId];
    });
  };
  Group2.prototype.removeAll = function() {
    this._tweens = {};
  };
  Group2.prototype.add = function(tween) {
    this._tweens[tween.getId()] = tween;
    this._tweensAddedDuringUpdate[tween.getId()] = tween;
  };
  Group2.prototype.remove = function(tween) {
    delete this._tweens[tween.getId()];
    delete this._tweensAddedDuringUpdate[tween.getId()];
  };
  Group2.prototype.update = function(time, preserve) {
    if (time === void 0) {
      time = now$1();
    }
    if (preserve === void 0) {
      preserve = false;
    }
    var tweenIds = Object.keys(this._tweens);
    if (tweenIds.length === 0) {
      return false;
    }
    while (tweenIds.length > 0) {
      this._tweensAddedDuringUpdate = {};
      for (var i = 0; i < tweenIds.length; i++) {
        var tween = this._tweens[tweenIds[i]];
        var autoStart = !preserve;
        if (tween && tween.update(time, autoStart) === false && !preserve) {
          delete this._tweens[tweenIds[i]];
        }
      }
      tweenIds = Object.keys(this._tweensAddedDuringUpdate);
    }
    return true;
  };
  return Group2;
}();
var Interpolation = {
  Linear: function(v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.Linear;
    if (k < 0) {
      return fn(v[0], v[1], f);
    }
    if (k > 1) {
      return fn(v[m], v[m - 1], m - f);
    }
    return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
  },
  Bezier: function(v, k) {
    var b = 0;
    var n = v.length - 1;
    var pw = Math.pow;
    var bn = Interpolation.Utils.Bernstein;
    for (var i = 0; i <= n; i++) {
      b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
    }
    return b;
  },
  CatmullRom: function(v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.CatmullRom;
    if (v[0] === v[m]) {
      if (k < 0) {
        i = Math.floor(f = m * (1 + k));
      }
      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    } else {
      if (k < 0) {
        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
      }
      if (k > 1) {
        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
      }
      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    }
  },
  Utils: {
    Linear: function(p0, p1, t) {
      return (p1 - p0) * t + p0;
    },
    Bernstein: function(n, i) {
      var fc = Interpolation.Utils.Factorial;
      return fc(n) / fc(i) / fc(n - i);
    },
    Factorial: function() {
      var a = [1];
      return function(n) {
        var s = 1;
        if (a[n]) {
          return a[n];
        }
        for (var i = n; i > 1; i--) {
          s *= i;
        }
        a[n] = s;
        return s;
      };
    }(),
    CatmullRom: function(p0, p1, p2, p3, t) {
      var v0 = (p2 - p0) * 0.5;
      var v1 = (p3 - p1) * 0.5;
      var t2 = t * t;
      var t3 = t * t2;
      return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
    }
  }
};
var Sequence = function() {
  function Sequence2() {
  }
  Sequence2.nextId = function() {
    return Sequence2._nextId++;
  };
  Sequence2._nextId = 0;
  return Sequence2;
}();
var mainGroup = new Group();
var Tween = function() {
  function Tween2(_object, _group) {
    if (_group === void 0) {
      _group = mainGroup;
    }
    this._object = _object;
    this._group = _group;
    this._isPaused = false;
    this._pauseStart = 0;
    this._valuesStart = {};
    this._valuesEnd = {};
    this._valuesStartRepeat = {};
    this._duration = 1e3;
    this._initialRepeat = 0;
    this._repeat = 0;
    this._yoyo = false;
    this._isPlaying = false;
    this._reversed = false;
    this._delayTime = 0;
    this._startTime = 0;
    this._easingFunction = Easing.Linear.None;
    this._interpolationFunction = Interpolation.Linear;
    this._chainedTweens = [];
    this._onStartCallbackFired = false;
    this._id = Sequence.nextId();
    this._isChainStopped = false;
    this._goToEnd = false;
  }
  Tween2.prototype.getId = function() {
    return this._id;
  };
  Tween2.prototype.isPlaying = function() {
    return this._isPlaying;
  };
  Tween2.prototype.isPaused = function() {
    return this._isPaused;
  };
  Tween2.prototype.to = function(properties, duration) {
    this._valuesEnd = Object.create(properties);
    if (duration !== void 0) {
      this._duration = duration;
    }
    return this;
  };
  Tween2.prototype.duration = function(d) {
    this._duration = d;
    return this;
  };
  Tween2.prototype.start = function(time) {
    if (this._isPlaying) {
      return this;
    }
    this._group && this._group.add(this);
    this._repeat = this._initialRepeat;
    if (this._reversed) {
      this._reversed = false;
      for (var property in this._valuesStartRepeat) {
        this._swapEndStartRepeatValues(property);
        this._valuesStart[property] = this._valuesStartRepeat[property];
      }
    }
    this._isPlaying = true;
    this._isPaused = false;
    this._onStartCallbackFired = false;
    this._isChainStopped = false;
    this._startTime = time !== void 0 ? typeof time === "string" ? now$1() + parseFloat(time) : time : now$1();
    this._startTime += this._delayTime;
    this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);
    return this;
  };
  Tween2.prototype._setupProperties = function(_object, _valuesStart, _valuesEnd, _valuesStartRepeat) {
    for (var property in _valuesEnd) {
      var startValue = _object[property];
      var startValueIsArray = Array.isArray(startValue);
      var propType = startValueIsArray ? "array" : typeof startValue;
      var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
      if (propType === "undefined" || propType === "function") {
        continue;
      }
      if (isInterpolationList) {
        var endValues = _valuesEnd[property];
        if (endValues.length === 0) {
          continue;
        }
        endValues = endValues.map(this._handleRelativeValue.bind(this, startValue));
        _valuesEnd[property] = [startValue].concat(endValues);
      }
      if ((propType === "object" || startValueIsArray) && startValue && !isInterpolationList) {
        _valuesStart[property] = startValueIsArray ? [] : {};
        for (var prop in startValue) {
          _valuesStart[property][prop] = startValue[prop];
        }
        _valuesStartRepeat[property] = startValueIsArray ? [] : {};
        this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
      } else {
        if (typeof _valuesStart[property] === "undefined") {
          _valuesStart[property] = startValue;
        }
        if (!startValueIsArray) {
          _valuesStart[property] *= 1;
        }
        if (isInterpolationList) {
          _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
        } else {
          _valuesStartRepeat[property] = _valuesStart[property] || 0;
        }
      }
    }
  };
  Tween2.prototype.stop = function() {
    if (!this._isChainStopped) {
      this._isChainStopped = true;
      this.stopChainedTweens();
    }
    if (!this._isPlaying) {
      return this;
    }
    this._group && this._group.remove(this);
    this._isPlaying = false;
    this._isPaused = false;
    if (this._onStopCallback) {
      this._onStopCallback(this._object);
    }
    return this;
  };
  Tween2.prototype.end = function() {
    this._goToEnd = true;
    this.update(Infinity);
    return this;
  };
  Tween2.prototype.pause = function(time) {
    if (time === void 0) {
      time = now$1();
    }
    if (this._isPaused || !this._isPlaying) {
      return this;
    }
    this._isPaused = true;
    this._pauseStart = time;
    this._group && this._group.remove(this);
    return this;
  };
  Tween2.prototype.resume = function(time) {
    if (time === void 0) {
      time = now$1();
    }
    if (!this._isPaused || !this._isPlaying) {
      return this;
    }
    this._isPaused = false;
    this._startTime += time - this._pauseStart;
    this._pauseStart = 0;
    this._group && this._group.add(this);
    return this;
  };
  Tween2.prototype.stopChainedTweens = function() {
    for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
      this._chainedTweens[i].stop();
    }
    return this;
  };
  Tween2.prototype.group = function(group) {
    this._group = group;
    return this;
  };
  Tween2.prototype.delay = function(amount) {
    this._delayTime = amount;
    return this;
  };
  Tween2.prototype.repeat = function(times) {
    this._initialRepeat = times;
    this._repeat = times;
    return this;
  };
  Tween2.prototype.repeatDelay = function(amount) {
    this._repeatDelayTime = amount;
    return this;
  };
  Tween2.prototype.yoyo = function(yoyo) {
    this._yoyo = yoyo;
    return this;
  };
  Tween2.prototype.easing = function(easingFunction) {
    this._easingFunction = easingFunction;
    return this;
  };
  Tween2.prototype.interpolation = function(interpolationFunction) {
    this._interpolationFunction = interpolationFunction;
    return this;
  };
  Tween2.prototype.chain = function() {
    var tweens = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      tweens[_i] = arguments[_i];
    }
    this._chainedTweens = tweens;
    return this;
  };
  Tween2.prototype.onStart = function(callback) {
    this._onStartCallback = callback;
    return this;
  };
  Tween2.prototype.onUpdate = function(callback) {
    this._onUpdateCallback = callback;
    return this;
  };
  Tween2.prototype.onRepeat = function(callback) {
    this._onRepeatCallback = callback;
    return this;
  };
  Tween2.prototype.onComplete = function(callback) {
    this._onCompleteCallback = callback;
    return this;
  };
  Tween2.prototype.onStop = function(callback) {
    this._onStopCallback = callback;
    return this;
  };
  Tween2.prototype.update = function(time, autoStart) {
    if (time === void 0) {
      time = now$1();
    }
    if (autoStart === void 0) {
      autoStart = true;
    }
    if (this._isPaused)
      return true;
    var property;
    var elapsed;
    var endTime = this._startTime + this._duration;
    if (!this._goToEnd && !this._isPlaying) {
      if (time > endTime)
        return false;
      if (autoStart)
        this.start(time);
    }
    this._goToEnd = false;
    if (time < this._startTime) {
      return true;
    }
    if (this._onStartCallbackFired === false) {
      if (this._onStartCallback) {
        this._onStartCallback(this._object);
      }
      this._onStartCallbackFired = true;
    }
    elapsed = (time - this._startTime) / this._duration;
    elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
    var value = this._easingFunction(elapsed);
    this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
    if (this._onUpdateCallback) {
      this._onUpdateCallback(this._object, elapsed);
    }
    if (elapsed === 1) {
      if (this._repeat > 0) {
        if (isFinite(this._repeat)) {
          this._repeat--;
        }
        for (property in this._valuesStartRepeat) {
          if (!this._yoyo && typeof this._valuesEnd[property] === "string") {
            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
          }
          if (this._yoyo) {
            this._swapEndStartRepeatValues(property);
          }
          this._valuesStart[property] = this._valuesStartRepeat[property];
        }
        if (this._yoyo) {
          this._reversed = !this._reversed;
        }
        if (this._repeatDelayTime !== void 0) {
          this._startTime = time + this._repeatDelayTime;
        } else {
          this._startTime = time + this._delayTime;
        }
        if (this._onRepeatCallback) {
          this._onRepeatCallback(this._object);
        }
        return true;
      } else {
        if (this._onCompleteCallback) {
          this._onCompleteCallback(this._object);
        }
        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
          this._chainedTweens[i].start(this._startTime + this._duration);
        }
        this._isPlaying = false;
        return false;
      }
    }
    return true;
  };
  Tween2.prototype._updateProperties = function(_object, _valuesStart, _valuesEnd, value) {
    for (var property in _valuesEnd) {
      if (_valuesStart[property] === void 0) {
        continue;
      }
      var start = _valuesStart[property] || 0;
      var end = _valuesEnd[property];
      var startIsArray = Array.isArray(_object[property]);
      var endIsArray = Array.isArray(end);
      var isInterpolationList = !startIsArray && endIsArray;
      if (isInterpolationList) {
        _object[property] = this._interpolationFunction(end, value);
      } else if (typeof end === "object" && end) {
        this._updateProperties(_object[property], start, end, value);
      } else {
        end = this._handleRelativeValue(start, end);
        if (typeof end === "number") {
          _object[property] = start + (end - start) * value;
        }
      }
    }
  };
  Tween2.prototype._handleRelativeValue = function(start, end) {
    if (typeof end !== "string") {
      return end;
    }
    if (end.charAt(0) === "+" || end.charAt(0) === "-") {
      return start + parseFloat(end);
    } else {
      return parseFloat(end);
    }
  };
  Tween2.prototype._swapEndStartRepeatValues = function(property) {
    var tmp = this._valuesStartRepeat[property];
    var endValue = this._valuesEnd[property];
    if (typeof endValue === "string") {
      this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
    } else {
      this._valuesStartRepeat[property] = this._valuesEnd[property];
    }
    this._valuesEnd[property] = tmp;
  };
  return Tween2;
}();
var TWEEN = mainGroup;
TWEEN.getAll.bind(TWEEN);
TWEEN.removeAll.bind(TWEEN);
TWEEN.add.bind(TWEEN);
TWEEN.remove.bind(TWEEN);
TWEEN.update.bind(TWEEN);
const moveTo$1 = function(compiler, config) {
  const params = config.params;
  let object = compiler.getObject(params.target);
  if (!object) {
    console.error(`can not found vid object: ${params.target}`);
    return () => {
    };
  }
  let renderManager = compiler.engine.renderManager;
  const supportData = compiler.engine.dataSupportManager.getObjectConfig(params.target);
  if (!config) {
    console.error(`can not found object config: ${params.target}`);
    return () => {
    };
  }
  return () => {
    const tween = new Tween(object.position).to(params.position).duration(params.duration).delay(params.delay).easing(params.timingFunction).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.position.x = params.position.x;
      supportData.position.y = params.position.y;
      supportData.position.z = params.position.z;
    });
  };
};
const moveSpacing$1 = function(compiler, config) {
  const params = config.params;
  let object = compiler.getObject(params.target);
  if (!object) {
    console.error(`can not found vid object: ${params.target}`);
    return () => {
    };
  }
  let renderManager = compiler.engine.renderManager;
  const supportData = compiler.engine.dataSupportManager.getObjectConfig(params.target);
  return () => {
    let position = {
      x: object.position.x + params.spacing.x,
      y: object.position.y + params.spacing.y,
      z: object.position.z + params.spacing.z
    };
    const tween = new Tween(object.position).to(position).duration(params.duration).delay(params.delay).easing(params.timingFunction).start();
    const renderFun = (event) => {
      tween.update();
    };
    renderManager.addEventListener("render", renderFun);
    tween.onComplete(() => {
      renderManager.removeEventListener("render", renderFun);
      supportData.position.x = position.x;
      supportData.position.y = position.y;
      supportData.position.z = position.z;
    });
  };
};
var RealTimeAnimateLibrary = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  moveTo: moveTo$1,
  moveSpacing: moveSpacing$1
});
const _EventCompiler = class extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "engine");
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "funMap");
    __publicField(this, "objectMapSet");
    if (parameters) {
      this.target = parameters.target;
      this.engine = parameters.engine;
    } else {
      this.target = {};
    }
    this.map = new Map();
    this.funMap = new Map();
    this.objectMapSet = new Set();
  }
  getObject(vid) {
    for (const map of this.objectMapSet) {
      if (map.has(vid)) {
        return map.get(vid);
      }
    }
    return null;
  }
  getTargetObject(vid) {
    if (!this.map.has(vid)) {
      return null;
    }
    const structure = this.map.get(vid);
    return this.getObject(structure.target);
  }
  linkObjectMap(...map) {
    for (let objectMap of map) {
      if (!this.objectMapSet.has(objectMap)) {
        this.objectMapSet.add(objectMap);
      }
    }
    return this;
  }
  add(vid, config) {
    const structure = {
      target: config.target,
      [EVENTNAME.POINTERDOWN]: [],
      [EVENTNAME.POINTERUP]: [],
      [EVENTNAME.POINTERMOVE]: [],
      [EVENTNAME.POINTERENTER]: [],
      [EVENTNAME.POINTERLEAVE]: [],
      [EVENTNAME.CLICK]: [],
      [EVENTNAME.DBLCLICK]: [],
      [EVENTNAME.CONTEXTMENU]: []
    };
    this.map.set(vid, structure);
    for (let key in config) {
      let value = config[key];
      if (Array.isArray(value) && isValidEnum(EVENTNAME, key) && value.length) {
        for (let configure2 of value) {
          this.addEvent(vid, key, configure2);
        }
      }
    }
    return this;
  }
  addEvent(vid, eventName, config) {
    if (!this.map.has(vid)) {
      console.warn(`EventCompiler: No matching vid found: ${vid}`);
      return this;
    }
    if (!_EventCompiler.eventLibrary[config.name]) {
      console.warn(`EventCompiler: can not support this event: ${config.name}`);
      return this;
    }
    const targetObject = this.getTargetObject(vid);
    if (!targetObject) {
      console.warn(`EventCompiler: no object with matching vid found: ${vid}`);
      return this;
    }
    const fun = _EventCompiler.eventLibrary[config.name](this, config);
    const funSymbol = v4();
    this.funMap.set(funSymbol, fun);
    const structure = this.map.get(vid);
    structure[eventName].push(funSymbol);
    targetObject.addEventListener(eventName, fun);
    return this;
  }
  removeEvent(vid, eventName, index) {
    if (!this.map.has(vid)) {
      console.warn(`EventCompiler: No matching vid found: ${vid}`);
      return this;
    }
    const targetObject = this.getTargetObject(vid);
    if (!targetObject) {
      console.warn(`EventCompiler: no object with matching vid found: ${vid}`);
      return this;
    }
    const structure = this.map.get(vid);
    const funSymbol = structure[eventName][index];
    const fun = this.funMap.get(funSymbol);
    if (!fun) {
      console.warn(`EventCompiler: No matching fun found: ${vid}, ${eventName}, ${index}`);
      return this;
    }
    targetObject.removeEventListener(eventName, fun);
    this.funMap.delete(funSymbol);
    structure[eventName].splice(index, 1);
    return this;
  }
  updateEvent(vid, eventName, index) {
    this.removeEvent(vid, eventName, index);
    const config = this.target[vid][eventName][index];
    this.addEvent(vid, eventName, config);
  }
  remove(vid) {
    if (!this.map.has(vid)) {
      console.warn(`EventCompiler: No matching vid found: ${vid}`);
      return this;
    }
    const targetObject = this.getTargetObject(vid);
    if (!targetObject) {
      console.warn(`EventCompiler: no object with matching vid found: ${vid}`);
      return this;
    }
    const structure = this.map.get(vid);
    for (let key in structure) {
      let funSymbolList = structure[key];
      if (Array.isArray(funSymbolList) && isValidEnum(EVENTNAME, key) && funSymbolList.length) {
        for (let funSymbol of funSymbolList) {
          this.removeEvent(vid, key, funSymbol);
        }
      }
    }
    this.map.delete(vid);
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }
  dispose() {
    this.map.clear();
    this.funMap.clear();
    this.objectMapSet.clear();
    return this;
  }
};
let EventCompiler = _EventCompiler;
__publicField(EventCompiler, "eventLibrary", {});
__publicField(EventCompiler, "registerEvent", function(map) {
  _EventCompiler.eventLibrary = Object.assign(_EventCompiler.eventLibrary, map);
});
EventCompiler.registerEvent(BasicEventLbirary);
EventCompiler.registerEvent(RealTimeAnimateLibrary);
class LoadGeometry extends BufferGeometry {
  constructor(geometry) {
    super();
    __publicField(this, "type", "LoadBufferGeometry");
    geometry && this.copy(geometry);
  }
}
const _GeometryCompiler = class extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "constructMap");
    __publicField(this, "resourceMap");
    __publicField(this, "replaceGeometry");
    this.target = parameters.target;
    this.map = new Map();
    const constructMap = new Map();
    constructMap.set("BoxGeometry", (config) => {
      return _GeometryCompiler.transfromAnchor(new BoxBufferGeometry(config.width, config.height, config.depth, config.widthSegments, config.heightSegments, config.depthSegments), config);
    });
    constructMap.set("SphereGeometry", (config) => {
      return _GeometryCompiler.transfromAnchor(new SphereBufferGeometry(config.radius, config.widthSegments, config.heightSegments, config.phiStart, config.phiLength, config.thetaStart, config.thetaLength), config);
    });
    constructMap.set("LoadGeometry", (config) => {
      return _GeometryCompiler.transfromAnchor(new LoadGeometry(this.getRescource(config.url)), config);
    });
    this.constructMap = constructMap;
    this.resourceMap = new Map();
    this.replaceGeometry = new BoxBufferGeometry(10, 10, 10);
  }
  linkRescourceMap(map) {
    this.resourceMap = map;
    return this;
  }
  getRescource(url) {
    if (!this.resourceMap.has(url)) {
      console.error(`rescoure can not found url: ${url}`);
      return this.replaceGeometry.clone();
    }
    if (this.resourceMap.has(url) && this.resourceMap.get(url) instanceof BufferGeometry) {
      const geometry = this.resourceMap.get(url);
      return geometry.clone();
    } else {
      console.error(`url mapping rescource is not class with BufferGeometry: ${url}`);
      return this.replaceGeometry.clone();
    }
  }
  getMap() {
    return this.map;
  }
  setTarget() {
    return this;
  }
  add(vid, config) {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const geometry = this.constructMap.get(config.type)(config);
        this.map.set(vid, geometry);
      }
    } else {
      console.error(`geometry vid parameter is illegal: ${vid}`);
    }
    return this;
  }
  set(vid, path, value) {
    if (!validate(vid)) {
      console.warn(`geometry compiler set function vid parameters is illeage: '${vid}'`);
      return this;
    }
    if (!this.map.has(vid)) {
      console.warn(`geometry compiler set function can not found vid geometry: '${vid}'`);
      return this;
    }
    const currentGeometry = this.map.get(vid);
    const config = this.target[vid];
    const newGeometry = this.constructMap.get(config.type)(config);
    currentGeometry.copy(newGeometry);
    currentGeometry.uuid = newGeometry.uuid;
    newGeometry.dispose();
    return this;
  }
  compileAll() {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }
  dispose() {
    this.map.forEach((geometry, vid) => {
      geometry.dispose();
    });
    return this;
  }
};
let GeometryCompiler = _GeometryCompiler;
__publicField(GeometryCompiler, "transfromAnchor", function(geometry, config) {
  geometry.center();
  !geometry.boundingBox && geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  const position = config.position;
  const rotation = config.rotation;
  const scale = config.scale;
  const materix = new Matrix4();
  const vPostion = new Vector3((box.max.x - box.min.x) / 2 * position.x, (box.max.y - box.min.y) / 2 * position.y, (box.max.z - box.min.z) / 2 * position.z);
  const quaternion = new Quaternion().setFromEuler(new Euler(rotation.x, rotation.y, rotation.z, "XYZ"));
  const vScale = new Vector3(scale.x, scale.y, scale.z);
  materix.compose(vPostion, quaternion, vScale);
  geometry.applyMatrix4(materix);
  return geometry;
});
class GroupCompiler extends ObjectCompiler {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "COMPILER_NAME", MODULETYPE.GROUP);
    __publicField(this, "replaceMaterial", new Material());
    __publicField(this, "replaceGeometry", new BufferGeometry());
    __publicField(this, "filterAttribute");
    this.filterAttribute = {
      lookAt: true,
      children: true
    };
  }
  getReplaceMaterial() {
    console.warn(`GroupCompiler: can not use material in GroupCompiler.`);
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    console.warn(`GroupCompiler: can not use geometry in GroupCompiler.`);
    return this.replaceGeometry;
  }
  add(vid, config) {
    const group = new Group$1();
    Compiler.applyConfig(config, group, this.filterAttribute);
    this.map.set(vid, group);
    this.weakMap.set(group, vid);
    this.scene.add(group);
    for (let target of config.children) {
      this.addChildren(vid, target);
    }
    this.setLookAt(vid, config.lookAt);
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`GroupCompiler: can not found this vid mapping object: '${vid}'`);
      return this;
    }
    if (key === "lookAt") {
      this.setLookAt(vid, value);
      return this;
    }
    let object = this.map.get(vid);
    for (let key2 of path) {
      if (this.filterAttribute[key2]) {
        return this;
      }
      object = object[key2];
    }
    object[key] = value;
    return this;
  }
  addChildren(vid, target) {
    if (!this.map.has(vid)) {
      console.warn(`GroupCompiler: can not found this vid in compiler: ${vid}.`);
      return this;
    }
    const group = this.map.get(vid);
    const targetObject = this.getObject(target);
    if (!targetObject) {
      console.warn(`GroupCompiler: can not found this vid in compiler: ${target}.`);
      return this;
    }
    group.attach(targetObject);
    return this;
  }
  removeChildren(vid, target) {
    if (!this.map.has(vid)) {
      console.warn(`GroupCompiler: can not found this vid in compiler: ${vid}.`);
      return this;
    }
    const group = this.map.get(vid);
    const targetObject = this.getObject(target);
    if (!targetObject) {
      console.warn(`GroupCompiler: can not found this vid in compiler: ${target}.`);
      return this;
    }
    group.remove(targetObject);
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class LightCompiler extends ObjectCompiler {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "COMPILER_NAME", MODULETYPE.LIGHT);
    __publicField(this, "constructMap");
    __publicField(this, "filterAttribute");
    __publicField(this, "replaceMaterial", new Material());
    __publicField(this, "replaceGeometry", new BufferGeometry());
    this.constructMap = new Map();
    this.constructMap.set("PointLight", () => new PointLight());
    this.constructMap.set("SpotLight", () => new SpotLight());
    this.constructMap.set("AmbientLight", () => new AmbientLight());
    this.setLookAt = function(vid, target) {
      return this;
    };
    this.filterAttribute = {
      scale: true,
      rotation: true,
      lookAt: true
    };
  }
  getReplaceMaterial() {
    console.warn(`LightCompiler: can not use material in LightCompiler.`);
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    console.warn(`LightCompiler: can not use geometry in LightCompiler.`);
    return this.replaceGeometry;
  }
  add(vid, config) {
    if (config.type && this.constructMap.has(config.type)) {
      const light = this.constructMap.get(config.type)();
      Compiler.applyConfig(config, light, this.filterAttribute);
      light.color = new Color(config.color);
      this.map.set(vid, light);
      this.weakMap.set(light, vid);
      this.scene.add(light);
    } else {
      console.warn(`LightCompiler: can not support Light type: ${config.type}.`);
    }
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`LightCompiler: can not found this vid mapping object: '${vid}'`);
      return this;
    }
    if (this.filterAttribute[key]) {
      return this;
    }
    let object = this.map.get(vid);
    for (let key2 of path) {
      if (this.filterAttribute[key2]) {
        return this;
      }
      object = object[key2];
    }
    object[key] = value;
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class LineCompiler extends ObjectCompiler {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "COMPILER_NAME", MODULETYPE.LINE);
    __publicField(this, "replaceMaterial", new LineBasicMaterial({ color: "rgb(150, 150, 150)" }));
    __publicField(this, "replaceGeometry", new BoxBufferGeometry(10, 10, 10));
  }
  getReplaceMaterial() {
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    return this.replaceGeometry;
  }
  add(vid, config) {
    const object = new Line(this.getGeometry(config.geometry), this.getMaterial(config.material));
    Compiler.applyConfig(config, object, {
      geometry: true,
      material: true,
      lookAt: true
    });
    this.map.set(vid, object);
    this.weakMap.set(object, vid);
    this.setLookAt(vid, config.lookAt);
    this.scene.add(object);
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`model compiler can not found this vid mapping object: '${vid}'`);
      return this;
    }
    let mesh = this.map.get(vid);
    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }
    if (key === "material") {
      mesh.material = this.getMaterial(value);
      return this;
    }
    for (let key2 of path) {
      mesh = mesh[key2];
    }
    mesh[key] = value;
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class MaterialCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "constructMap");
    __publicField(this, "mapAttribute");
    __publicField(this, "colorAttribute");
    __publicField(this, "texturelMap");
    __publicField(this, "resourceMap");
    __publicField(this, "cachaColor");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
    } else {
      this.target = {};
    }
    this.map = new Map();
    this.texturelMap = new Map();
    this.resourceMap = new Map();
    this.cachaColor = new Color();
    const constructMap = new Map();
    constructMap.set(CONFIGTYPE.MESHSTANDARDMATERIAL, () => new MeshStandardMaterial());
    constructMap.set(CONFIGTYPE.MESHPHONGMATERIAL, () => new MeshPhongMaterial());
    constructMap.set(CONFIGTYPE.SPRITEMATERIAL, () => new SpriteMaterial());
    constructMap.set(CONFIGTYPE.LINEBASICMATERIAL, () => new LineBasicMaterial());
    constructMap.set(CONFIGTYPE.POINTSMATERIAL, () => new PointsMaterial());
    this.constructMap = constructMap;
    this.colorAttribute = {
      "color": true,
      "emissive": true
    };
    this.mapAttribute = {
      "roughnessMap": true,
      "normalMap": true,
      "metalnessMap": true,
      "map": true,
      "lightMap": true,
      "envMap": true,
      "emissiveMap": true,
      "displacementMap": true,
      "bumpMap": true,
      "alphaMap": true,
      "aoMap": true,
      "specularMap": true
    };
  }
  getTexture(vid) {
    if (this.texturelMap.has(vid)) {
      const texture = this.texturelMap.get(vid);
      if (texture instanceof Texture) {
        return texture;
      } else {
        console.error(`this object which mapped by vid is not instance of Texture: ${vid}`);
        return null;
      }
    } else {
      console.error(`texture map can not found this vid: ${vid}`);
      return null;
    }
  }
  linkRescourceMap(map) {
    this.resourceMap = map;
    return this;
  }
  linkTextureMap(textureMap) {
    this.texturelMap = textureMap;
    return this;
  }
  add(vid, config) {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const material = this.constructMap.get(config.type)();
        const tempConfig = JSON.parse(JSON.stringify(config));
        const filterMap = {};
        const colorAttribute = this.colorAttribute;
        for (const key in colorAttribute) {
          if (tempConfig[key]) {
            material[key] = new Color(tempConfig[key]);
            filterMap[key] = true;
          }
        }
        const mapAttribute = this.mapAttribute;
        for (const key in mapAttribute) {
          if (tempConfig[key]) {
            material[key] = this.getTexture(tempConfig[key]);
            filterMap[key] = true;
          }
        }
        Compiler.applyConfig(config, material, filterMap);
        material.needsUpdate = true;
        this.map.set(vid, material);
      } else {
        console.warn(`material compiler can not support this type: ${config.type}`);
      }
    } else {
      console.error(`material vid parameter is illegal: ${vid}`);
    }
    return this;
  }
  set(vid, path, key, value) {
    if (!validate(vid)) {
      console.warn(`material compiler set function: vid is illeage: '${vid}'`);
      return this;
    }
    if (!this.map.has(vid)) {
      console.warn(`material compiler set function: can not found material which vid is: '${vid}'`);
      return this;
    }
    const material = this.map.get(vid);
    if (this.colorAttribute[key]) {
      material[key] = new Color(value);
      return this;
    }
    if (this.mapAttribute[key]) {
      material[key] = this.getTexture(value);
      material.needsUpdate = true;
      return this;
    }
    let config = material;
    path.forEach((key2, i, arr) => {
      config = config[key2];
    });
    config[key] = value;
    return this;
  }
  getMap() {
    return this.map;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }
  dispose() {
    this.map.forEach((material, vid) => {
      material.dispose();
    });
    return this;
  }
}
class MeshCompiler extends ObjectCompiler {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "COMPILER_NAME", MODULETYPE.MESH);
    __publicField(this, "replaceMaterial", new MeshBasicMaterial({ color: "rgb(150, 150, 150)" }));
    __publicField(this, "replaceGeometry", new BoxBufferGeometry(10, 10, 10));
  }
  getReplaceMaterial() {
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    return this.replaceGeometry;
  }
  add(vid, config) {
    const object = new Mesh(this.getGeometry(config.geometry), this.getMaterial(config.material));
    Compiler.applyConfig(config, object, {
      geometry: true,
      material: true,
      lookAt: true
    });
    this.map.set(vid, object);
    this.weakMap.set(object, vid);
    this.setLookAt(vid, config.lookAt);
    this.scene.add(object);
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`model compiler can not found this vid mapping object: '${vid}'`);
      return this;
    }
    let mesh = this.map.get(vid);
    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }
    if (key === "material") {
      mesh.material = this.getMaterial(value);
      return this;
    }
    for (let key2 of path) {
      mesh = mesh[key2];
    }
    mesh[key] = value;
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class PointsCompiler extends ObjectCompiler {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "COMPILER_NAME", MODULETYPE.POINTS);
    __publicField(this, "replaceMaterial", new PointsMaterial({ color: "rgb(150, 150, 150)" }));
    __publicField(this, "replaceGeometry", new DodecahedronBufferGeometry(5));
  }
  getReplaceMaterial() {
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    return this.replaceGeometry;
  }
  add(vid, config) {
    const object = new Points(this.getGeometry(config.geometry), this.getMaterial(config.material));
    Compiler.applyConfig(config, object, {
      geometry: true,
      material: true,
      lookAt: true
    });
    this.map.set(vid, object);
    this.weakMap.set(object, vid);
    this.setLookAt(vid, config.lookAt);
    this.scene.add(object);
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`PointsCompiler: can not found this vid mapping object: '${vid}'`);
      return this;
    }
    let mesh = this.map.get(vid);
    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }
    if (key === "material") {
      mesh.material = this.getMaterial(value);
      return this;
    }
    for (let key2 of path) {
      mesh = mesh[key2];
    }
    mesh[key] = value;
    return this;
  }
  dispose() {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class WebGLRendererCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "renderer");
    __publicField(this, "engine");
    __publicField(this, "target");
    __publicField(this, "rendererCacheData");
    this.engine = parameters.engine;
    this.target = parameters.target;
    this.renderer = this.engine.webGLRenderer;
    this.rendererCacheData = {};
  }
  setClearColor(value) {
    const alpha = Number(value.slice(0, -1).split(",").pop().trim());
    this.renderer.setClearColor(value, alpha);
    this.renderer.clear();
    return this;
  }
  setPixelRatio(value) {
    this.renderer.setPixelRatio(value);
    this.renderer.clear();
    return this;
  }
  setSize(vector2) {
    const renderer = this.renderer;
    if (vector2) {
      renderer.setSize(vector2.x, vector2.y);
    } else {
      const domElement = renderer.domElement;
      renderer.setSize(domElement.offsetWidth, domElement.offsetHeight);
    }
    return this;
  }
  setViewpoint(config) {
    const renderer = this.renderer;
    if (config) {
      renderer.setViewport(config.x, config.y, config.width, config.height);
    } else {
      const domElement = renderer.domElement;
      renderer.setViewport(0, 0, domElement.offsetWidth, domElement.offsetHeight);
    }
    return this;
  }
  setScissor(config) {
    const renderer = this.renderer;
    if (config) {
      renderer.setScissorTest(true);
      renderer.setScissor(config.x, config.y, config.width, config.height);
    } else {
      renderer.setScissorTest(false);
      const domElement = renderer.domElement;
      renderer.setScissor(0, 0, domElement.offsetWidth, domElement.offsetHeight);
    }
    return this;
  }
  setAdaptiveCamera(value) {
    if (!this.engine) {
      console.warn(`renderer compiler is not set engine.`);
      return this;
    }
    const renderer = this.renderer;
    const engine = this.engine;
    const renderManager = engine.renderManager;
    if (!value) {
      if (!this.rendererCacheData.adaptiveCameraFun) {
        return this;
      }
      if (this.rendererCacheData.adaptiveCameraFun) {
        renderManager.removeEventListener("render", this.rendererCacheData.adaptiveCameraFun);
        this.rendererCacheData.adaptiveCameraFun = void 0;
        return this;
      }
    }
    if (value) {
      if (this.rendererCacheData.adaptiveCameraFun) {
        renderManager.addEventListener("render", this.rendererCacheData.adaptiveCameraFun);
        return this;
      }
      const adaptiveCameraFun = (event) => {
        const camera = engine.currentCamera;
        const domWidth = renderer.domElement.offsetWidth;
        const domHeight = renderer.domElement.offsetHeight;
        let width = 0;
        let height = 0;
        let offsetX = 0;
        let offsetY = 0;
        let aspect = 0;
        if (camera instanceof PerspectiveCamera) {
          aspect = camera.aspect;
        } else if (camera instanceof OrthographicCamera) {
          width = camera.right - camera.left;
          height = camera.top - camera.bottom;
          aspect = width / height;
        } else {
          console.warn(`renderer compiler can not support this camera`, camera);
          return;
        }
        if (aspect >= 1) {
          width = domWidth;
          height = width / aspect;
          offsetY = domHeight / 2 - height / 2;
        } else {
          height = domHeight;
          width = height * aspect;
          offsetX = domWidth / 2 - width / 2;
        }
        renderer.setScissor(offsetX, offsetY, width, height);
        renderer.setViewport(offsetX, offsetY, width, height);
        renderer.setScissorTest(true);
      };
      this.rendererCacheData.adaptiveCameraFun = adaptiveCameraFun;
      renderManager.addEventListener("render", this.rendererCacheData.adaptiveCameraFun);
    }
    return this;
  }
  set(path, key, value) {
    const actionMap = {
      clearColor: () => this.setClearColor(value),
      pixelRatio: () => this.setPixelRatio(value),
      size: () => this.setSize(this.target.size),
      viewport: () => this.setViewpoint(this.target.viewport),
      scissor: () => this.setScissor(this.target.scissor),
      adaptiveCamera: () => this.setAdaptiveCamera(value)
    };
    if (actionMap[path[0] || key]) {
      actionMap[path[0] || key]();
      return this;
    }
    let config = this.renderer;
    path.forEach((key2, i, arr) => {
      config = config[key2];
    });
    config[key] = value;
    this.renderer.clear();
    return this;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    const target = this.target;
    this.setClearColor(target.clearColor);
    this.setPixelRatio(target.pixelRatio);
    this.setSize(target.size);
    this.setViewpoint(target.viewport);
    this.setScissor(target.scissor);
    this.setAdaptiveCamera(target.adaptiveCamera);
    const otherConfig = JSON.parse(JSON.stringify(target));
    delete otherConfig.vid;
    delete otherConfig.type;
    delete otherConfig.clearColor;
    delete otherConfig.pixelRatio;
    delete otherConfig.size;
    delete otherConfig.viewport;
    delete otherConfig.scissor;
    delete otherConfig.adaptiveCamera;
    Compiler.applyConfig(otherConfig, this.renderer);
    this.renderer.clear();
    return this;
  }
  dispose() {
    this.renderer.dispose();
    return this;
  }
}
class RendererCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "engine");
    __publicField(this, "map");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.engine && (this.engine = parameters.engine);
    } else {
      this.target = {};
      this.engine = new Engine();
    }
    this.map = {};
  }
  add(type, config) {
    if (type === "WebGLRenderer") {
      const rendererCompiler = new WebGLRendererCompiler({
        engine: this.engine,
        target: config
      });
      rendererCompiler.compileAll();
      this.map[type] = rendererCompiler;
    }
  }
  set(path, key, value) {
    const rendererType = path.shift();
    if (!rendererType) {
      this.map[key].setTarget(value).compileAll();
      return this;
    }
    if (this.map[rendererType]) {
      this.map[rendererType].set(path, key, value);
      return this;
    } else {
      console.warn(`renderer compiler can not support this type: ${rendererType}`);
      return this;
    }
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    const target = this.target;
    Object.keys(target).forEach((type) => {
      this.add(type, target[type]);
    });
    return this;
  }
  dispose() {
    return this;
  }
}
class SceneCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "textureMap");
    __publicField(this, "target");
    __publicField(this, "scene");
    __publicField(this, "fogCache");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.scene && (this.scene = parameters.scene);
    } else {
      this.target = {
        scene: getSceneConfig()
      };
      this.scene = new Scene();
    }
    this.textureMap = new Map();
    this.fogCache = null;
  }
  background(value) {
    if (!value) {
      this.scene.background = null;
      return;
    }
    if (validate(value)) {
      if (this.textureMap.has(value)) {
        this.scene.background = this.textureMap.get(value);
      } else {
        console.warn(`scene compiler can not found this vid texture : '${value}'`);
      }
    } else {
      this.scene.background = new Color(value);
    }
  }
  environment(value) {
    if (!value) {
      this.scene.environment = null;
      return;
    }
    if (validate(value)) {
      if (this.textureMap.has(value)) {
        this.scene.environment = this.textureMap.get(value);
      } else {
        console.warn(`scene compiler can not found this vid texture : '${value}'`);
      }
    } else {
      console.warn(`this vid is illegal: '${value}'`);
    }
  }
  fog(config) {
    if (!config) {
      this.scene.fog = null;
      return;
    }
    if (config.type === "Fog") {
      if (this.fogCache instanceof Fog) {
        const fog = this.fogCache;
        fog.color = new Color(config.color);
        fog.near = config.near;
        fog.far = config.far;
      } else {
        this.scene.fog = new Fog(config.color, config.near, config.far);
        this.fogCache = this.scene.fog;
      }
    } else if (config.type === "FogExp2") {
      if (this.fogCache instanceof FogExp2) {
        const fog = this.fogCache;
        fog.color = new Color(config.color);
        fog.density = config.density;
      } else {
        this.scene.fog = new FogExp2(config.color, config.density);
        this.fogCache = this.scene.fog;
      }
    } else {
      console.warn(`scene compiler can not support this type fog:'${config.type}'`);
    }
  }
  linkTextureMap(map) {
    this.textureMap = map;
    return this;
  }
  set(path, key, value) {
    const sceneType = path.shift();
    if (sceneType === "scene") {
      const actionMap = {
        background: () => this.background(value),
        environment: () => this.environment(value),
        fog: () => this.fog(this.target.scene.fog)
      };
      actionMap[key] && actionMap[key]();
      return this;
    } else {
      console.warn(`scene compiler can not support this type: ${sceneType}`);
      return this;
    }
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    const sceneTarget = this.target.scene;
    this.background(sceneTarget.background);
    this.environment(sceneTarget.environment);
    this.fog(sceneTarget.fog);
    return this;
  }
  dispose() {
    return this;
  }
}
class SpriteCompiler extends ObjectCompiler {
  constructor(parametes) {
    super(parametes);
    __publicField(this, "COMPILER_NAME", MODULETYPE.SPRITE);
    __publicField(this, "replaceMaterial", new SpriteMaterial({ color: "rgb(150, 150, 150)" }));
    __publicField(this, "replaceGeometry", new PlaneBufferGeometry(10, 10, 10));
  }
  getReplaceMaterial() {
    return this.replaceMaterial;
  }
  getReplaceGeometry() {
    console.warn(`SpriteCompiler: can not use geometry in SpriteCompiler.`);
    return this.replaceGeometry;
  }
  getSpriteMaterial(vid) {
    const tempMaterial = this.getMaterial(vid);
    if (tempMaterial instanceof SpriteMaterial) {
      return tempMaterial;
    } else {
      console.warn(`SpriteCompiler: sprite object can not support this type material: ${tempMaterial.type}, vid: ${vid}.`);
      return this.getReplaceMaterial();
    }
  }
  add(vid, config) {
    const sprite = new Sprite();
    this.map.set(vid, sprite);
    this.weakMap.set(sprite, vid);
    sprite.material = this.getSpriteMaterial(config.material);
    sprite.center.set(config.center.x, config.center.y);
    Compiler.applyConfig(config, sprite, {
      center: true,
      material: true
    });
    this.scene.add(sprite);
    return this;
  }
  set(vid, path, key, value) {
    if (!this.map.has(vid)) {
      console.warn(`SpriteCompiler: can not found this vid mapping object: '${vid}'`);
      return this;
    }
    let sprite = this.map.get(vid);
    if (key === "material") {
      sprite.material = this.getSpriteMaterial(value);
      return this;
    }
    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }
    for (let key2 of path) {
      sprite = sprite[key2];
    }
    sprite[key] = value;
    return this;
  }
  dispose() {
    this.map.forEach((sprite, vid) => {
      sprite.geometry.dispose();
    });
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
class ImageTexture extends Texture {
  constructor(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
    super(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
  }
}
class TextureCompiler extends Compiler {
  constructor(parameters) {
    super();
    __publicField(this, "target");
    __publicField(this, "map");
    __publicField(this, "constructMap");
    __publicField(this, "resourceMap");
    if (parameters) {
      parameters.target && (this.target = parameters.target);
    } else {
      this.target = {};
    }
    this.map = new Map();
    this.resourceMap = new Map();
    const constructMap = new Map();
    constructMap.set(CONFIGTYPE.IMAGETEXTURE, () => new ImageTexture());
    constructMap.set(CONFIGTYPE.CUBETEXTURE, () => new CubeTexture());
    constructMap.set(CONFIGTYPE.CANVASTEXTURE, () => new CanvasTexture(document.createElement("canvas")));
    this.constructMap = constructMap;
  }
  getResource(url) {
    const resourceMap = this.resourceMap;
    if (resourceMap.has(url)) {
      const resource = resourceMap.get(url);
      if (resource instanceof HTMLImageElement || resource instanceof HTMLCanvasElement || resource instanceof HTMLVideoElement) {
        return resource;
      } else {
        console.error(`this url mapping resource is not a texture image class: ${url}`);
        return null;
      }
    } else {
      console.warn(`resource can not font url: ${url}`);
      return null;
    }
  }
  linkRescourceMap(map) {
    this.resourceMap = map;
    return this;
  }
  add(vid, config) {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const texture = this.constructMap.get(config.type)();
        const tempConfig = JSON.parse(JSON.stringify(config));
        delete tempConfig.type;
        delete tempConfig.vid;
        if (config.type === CONFIGTYPE.IMAGETEXTURE || config.type === CONFIGTYPE.CANVASTEXTURE) {
          texture.image = this.getResource(tempConfig.url);
          delete tempConfig.url;
        } else if (config.type === CONFIGTYPE.CUBETEXTURE) {
          const cube = config.cube;
          const images = [
            this.getResource(cube.px),
            this.getResource(cube.nx),
            this.getResource(cube.py),
            this.getResource(cube.ny),
            this.getResource(cube.pz),
            this.getResource(cube.nz)
          ];
          texture.image = images;
          delete tempConfig.cube;
        }
        Compiler.applyConfig(tempConfig, texture);
        texture.needsUpdate = true;
        this.map.set(vid, texture);
      } else {
        console.warn(`texture compiler can not support this type: ${config.type}`);
      }
    } else {
      console.error(`texture vid parameter is illegal: ${vid}`);
    }
    return this;
  }
  set(vid, path, key, value) {
    if (!validate(vid)) {
      console.warn(`texture compiler set function: vid is illeage: '${vid}'`);
      return this;
    }
    if (!this.map.has(vid)) {
      console.warn(`texture compiler set function: can not found texture which vid is: '${vid}'`);
      return this;
    }
    const texture = this.map.get(vid);
    if (key === "needsUpdate") {
      if (value) {
        texture.needsUpdate = true;
        const config2 = this.target[vid];
        config2.needsUpdate = false;
      }
      return this;
    }
    let config = texture;
    path.forEach((key2, i, arr) => {
      config = config[key2];
    });
    config[key] = value;
    texture.needsUpdate = true;
    return this;
  }
  getMap() {
    return this.map;
  }
  setTarget(target) {
    this.target = target;
    return this;
  }
  compileAll() {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }
  dispose() {
    return this;
  }
}
class CompilerManager {
  constructor(parameters) {
    __publicField(this, "cameraCompiler");
    __publicField(this, "lightCompiler");
    __publicField(this, "geometryCompiler");
    __publicField(this, "textureCompiler");
    __publicField(this, "materialCompiler");
    __publicField(this, "rendererCompiler");
    __publicField(this, "sceneCompiler");
    __publicField(this, "controlsCompiler");
    __publicField(this, "spriteCompiler");
    __publicField(this, "eventCompiler");
    __publicField(this, "lineCompiler");
    __publicField(this, "meshCompiler");
    __publicField(this, "pointsCompiler");
    __publicField(this, "groupCompiler");
    __publicField(this, "objectCompilerList");
    this.objectCompilerList = [];
    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        this[key] = parameters[key];
        parameters[key].IS_OBJECTCOMPILER && this.objectCompilerList.push(parameters[key]);
      });
    }
  }
  support(engine) {
    const dataSupportManager = engine.dataSupportManager;
    const textureDataSupport = dataSupportManager.textureDataSupport;
    const materialDataSupport = dataSupportManager.materialDataSupport;
    const cameraDataSupport = dataSupportManager.cameraDataSupport;
    const lightDataSupport = dataSupportManager.lightDataSupport;
    const geometryDataSupport = dataSupportManager.geometryDataSupport;
    const rendererDataSupport = dataSupportManager.rendererDataSupport;
    const sceneDataSupport = dataSupportManager.sceneDataSupport;
    const controlsDataSupport = dataSupportManager.controlsDataSupport;
    const spriteDataSupport = dataSupportManager.spriteDataSupport;
    const eventDataSupport = dataSupportManager.eventDataSupport;
    const lineDataSupport = dataSupportManager.lineDataSupport;
    const meshDataSupport = dataSupportManager.meshDataSupport;
    const pointsDataSupport = dataSupportManager.pointsDataSupport;
    const groupDataSupport = dataSupportManager.groupDataSupport;
    const textureCompiler = new TextureCompiler({
      target: textureDataSupport.getData()
    });
    this.textureCompiler = textureCompiler;
    const materialCompiler = new MaterialCompiler({
      target: materialDataSupport.getData()
    });
    this.materialCompiler = materialCompiler;
    const geometryCompiler = new GeometryCompiler({
      target: geometryDataSupport.getData()
    });
    this.geometryCompiler = geometryCompiler;
    const cameraCompiler = new CameraCompiler({
      target: cameraDataSupport.getData(),
      scene: engine.scene,
      engine
    });
    this.cameraCompiler = cameraCompiler;
    this.objectCompilerList.push(cameraCompiler);
    const lightCompiler = new LightCompiler({
      scene: engine.scene,
      target: lightDataSupport.getData()
    });
    this.lightCompiler = lightCompiler;
    this.objectCompilerList.push(lightCompiler);
    const spriteCompiler = new SpriteCompiler({
      target: spriteDataSupport.getData(),
      scene: engine.scene
    });
    this.spriteCompiler = spriteCompiler;
    this.objectCompilerList.push(spriteCompiler);
    const lineCompiler = new LineCompiler({
      target: lineDataSupport.getData(),
      scene: engine.scene
    });
    this.lineCompiler = lineCompiler;
    this.objectCompilerList.push(lineCompiler);
    const meshCompiler = new MeshCompiler({
      target: meshDataSupport.getData(),
      scene: engine.scene
    });
    this.meshCompiler = meshCompiler;
    this.objectCompilerList.push(meshCompiler);
    const pointsCompiler = new PointsCompiler({
      target: pointsDataSupport.getData(),
      scene: engine.scene
    });
    this.pointsCompiler = pointsCompiler;
    this.objectCompilerList.push(pointsCompiler);
    const groupCompiler = new GroupCompiler({
      target: groupDataSupport.getData(),
      scene: engine.scene
    });
    this.groupCompiler = groupCompiler;
    this.objectCompilerList.push(groupCompiler);
    const rendererCompiler = new RendererCompiler({
      target: rendererDataSupport.getData(),
      engine
    });
    this.rendererCompiler = rendererCompiler;
    const sceneCompiler = new SceneCompiler({
      target: sceneDataSupport.getData(),
      scene: engine.scene
    });
    this.sceneCompiler = sceneCompiler;
    const controlsCompiler = new ControlsCompiler({
      target: controlsDataSupport.getData(),
      transformControls: engine.transformControls
    });
    this.controlsCompiler = controlsCompiler;
    const eventCompiler = new EventCompiler({
      target: eventDataSupport.getData(),
      engine
    });
    this.eventCompiler = eventCompiler;
    const resourceManager = engine.resourceManager;
    sceneCompiler.linkTextureMap(textureCompiler.getMap());
    materialCompiler.linkTextureMap(textureCompiler.getMap());
    const objectMapList = this.objectCompilerList.map((elem) => elem.getMap());
    for (let objectCompiler of this.objectCompilerList) {
      objectCompiler.linkGeometryMap(geometryCompiler.getMap()).linkMaterialMap(materialCompiler.getMap()).linkObjectMap(...objectMapList);
    }
    eventCompiler.linkObjectMap(...objectMapList);
    textureCompiler.linkRescourceMap(resourceManager.resourceMap);
    geometryCompiler.linkRescourceMap(resourceManager.resourceMap);
    textureDataSupport.addCompiler(textureCompiler);
    materialDataSupport.addCompiler(materialCompiler);
    cameraDataSupport.addCompiler(cameraCompiler);
    lightDataSupport.addCompiler(lightCompiler);
    geometryDataSupport.addCompiler(geometryCompiler);
    rendererDataSupport.addCompiler(rendererCompiler);
    sceneDataSupport.addCompiler(sceneCompiler);
    controlsDataSupport.addCompiler(controlsCompiler);
    spriteDataSupport.addCompiler(spriteCompiler);
    lineDataSupport.addCompiler(lineCompiler);
    meshDataSupport.addCompiler(meshCompiler);
    pointsDataSupport.addCompiler(pointsCompiler);
    groupDataSupport.addCompiler(groupCompiler);
    eventDataSupport.addCompiler(eventCompiler);
    return this;
  }
  getObjectSymbol(object) {
    const objectCompilerList = this.objectCompilerList;
    for (let compiler of objectCompilerList) {
      const vid = compiler.getObjectSymbol(object);
      if (vid) {
        return vid;
      }
    }
    return null;
  }
  getMaterial(vid) {
    if (!validate(vid)) {
      console.warn(`compiler manager vid is illeage: ${vid}`);
      return void 0;
    }
    const materialCompiler = this.materialCompiler;
    return materialCompiler.getMap().get(vid);
  }
  getTexture(vid) {
    if (!validate(vid)) {
      console.warn(`compiler manager vid is illeage: ${vid}`);
      return void 0;
    }
    const textureCompiler = this.textureCompiler;
    return textureCompiler.getMap().get(vid);
  }
  getObject(vid) {
    return void 0;
  }
  getObjectCompilerList() {
    return this.objectCompilerList;
  }
  dispose() {
    Object.keys(this).forEach((key) => {
      if (this[key] instanceof Compiler) {
        this[key].dispose();
      }
    });
    this.objectCompilerList = [];
    return this;
  }
}
const CompilerManagerPlugin = function(params) {
  if (this.compilerManager) {
    console.warn("engine has installed compilerManager plugin.");
    return false;
  }
  const compilerManager = new CompilerManager();
  this.compilerManager = compilerManager;
  this.addEventListener("dispose", () => {
    this.compilerManager.dispose();
  });
  this.completeSet.add(() => {
    if (!this.webGLRenderer) {
      console.warn(`must install webGLRenderer before compilerManager plugin.`);
      return;
    }
    if (!this.scene) {
      console.warn(`must install scene before compilerManager plugin.`);
      return;
    }
    if (!this.renderManager) {
      console.warn(`must install renderManager before compilerManager plugin.`);
      return;
    }
    if (!this.dataSupportManager) {
      console.warn("must install dataSupportManager before compilerManager plugin.");
      return;
    }
    this.compilerManager.support(this);
  });
  return true;
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var keyboard = { exports: {} };
(function(module, exports) {
  (function(global2, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr))
        return _arrayLikeToArray(arr);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
        return Array.from(iter);
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var KeyCombo = /* @__PURE__ */ function() {
      function KeyCombo2(keyComboStr) {
        _classCallCheck(this, KeyCombo2);
        this.sourceStr = keyComboStr;
        this.subCombos = KeyCombo2.parseComboStr(keyComboStr);
        this.keyNames = this.subCombos.reduce(function(memo, nextSubCombo) {
          return memo.concat(nextSubCombo);
        }, []);
      }
      _createClass(KeyCombo2, [{
        key: "check",
        value: function check(pressedKeyNames) {
          var startingKeyNameIndex = 0;
          for (var i = 0; i < this.subCombos.length; i += 1) {
            startingKeyNameIndex = this._checkSubCombo(this.subCombos[i], startingKeyNameIndex, pressedKeyNames);
            if (startingKeyNameIndex === -1) {
              return false;
            }
          }
          return true;
        }
      }, {
        key: "isEqual",
        value: function isEqual(otherKeyCombo) {
          if (!otherKeyCombo || typeof otherKeyCombo !== "string" && _typeof(otherKeyCombo) !== "object") {
            return false;
          }
          if (typeof otherKeyCombo === "string") {
            otherKeyCombo = new KeyCombo2(otherKeyCombo);
          }
          if (this.subCombos.length !== otherKeyCombo.subCombos.length) {
            return false;
          }
          for (var i = 0; i < this.subCombos.length; i += 1) {
            if (this.subCombos[i].length !== otherKeyCombo.subCombos[i].length) {
              return false;
            }
          }
          for (var _i = 0; _i < this.subCombos.length; _i += 1) {
            var subCombo = this.subCombos[_i];
            var otherSubCombo = otherKeyCombo.subCombos[_i].slice(0);
            for (var j = 0; j < subCombo.length; j += 1) {
              var keyName = subCombo[j];
              var index = otherSubCombo.indexOf(keyName);
              if (index > -1) {
                otherSubCombo.splice(index, 1);
              }
            }
            if (otherSubCombo.length !== 0) {
              return false;
            }
          }
          return true;
        }
      }, {
        key: "_checkSubCombo",
        value: function _checkSubCombo(subCombo, startingKeyNameIndex, pressedKeyNames) {
          subCombo = subCombo.slice(0);
          pressedKeyNames = pressedKeyNames.slice(startingKeyNameIndex);
          var endIndex = startingKeyNameIndex;
          for (var i = 0; i < subCombo.length; i += 1) {
            var keyName = subCombo[i];
            if (keyName[0] === "\\") {
              var escapedKeyName = keyName.slice(1);
              if (escapedKeyName === KeyCombo2.comboDeliminator || escapedKeyName === KeyCombo2.keyDeliminator) {
                keyName = escapedKeyName;
              }
            }
            var index = pressedKeyNames.indexOf(keyName);
            if (index > -1) {
              subCombo.splice(i, 1);
              i -= 1;
              if (index > endIndex) {
                endIndex = index;
              }
              if (subCombo.length === 0) {
                return endIndex;
              }
            }
          }
          return -1;
        }
      }]);
      return KeyCombo2;
    }();
    KeyCombo.comboDeliminator = ">";
    KeyCombo.keyDeliminator = "+";
    KeyCombo.parseComboStr = function(keyComboStr) {
      var subComboStrs = KeyCombo._splitStr(keyComboStr, KeyCombo.comboDeliminator);
      var combo = [];
      for (var i = 0; i < subComboStrs.length; i += 1) {
        combo.push(KeyCombo._splitStr(subComboStrs[i], KeyCombo.keyDeliminator));
      }
      return combo;
    };
    KeyCombo._splitStr = function(str, deliminator) {
      var s = str;
      var d = deliminator;
      var c = "";
      var ca = [];
      for (var ci = 0; ci < s.length; ci += 1) {
        if (ci > 0 && s[ci] === d && s[ci - 1] !== "\\") {
          ca.push(c.trim());
          c = "";
          ci += 1;
        }
        c += s[ci];
      }
      if (c) {
        ca.push(c.trim());
      }
      return ca;
    };
    var Locale = /* @__PURE__ */ function() {
      function Locale2(name) {
        _classCallCheck(this, Locale2);
        this.localeName = name;
        this.activeTargetKeys = [];
        this.pressedKeys = [];
        this._appliedMacros = [];
        this._keyMap = {};
        this._killKeyCodes = [];
        this._macros = [];
      }
      _createClass(Locale2, [{
        key: "bindKeyCode",
        value: function bindKeyCode(keyCode, keyNames) {
          if (typeof keyNames === "string") {
            keyNames = [keyNames];
          }
          this._keyMap[keyCode] = keyNames;
        }
      }, {
        key: "bindMacro",
        value: function bindMacro(keyComboStr, keyNames) {
          if (typeof keyNames === "string") {
            keyNames = [keyNames];
          }
          var handler = null;
          if (typeof keyNames === "function") {
            handler = keyNames;
            keyNames = null;
          }
          var macro = {
            keyCombo: new KeyCombo(keyComboStr),
            keyNames,
            handler
          };
          this._macros.push(macro);
        }
      }, {
        key: "getKeyCodes",
        value: function getKeyCodes(keyName) {
          var keyCodes = [];
          for (var keyCode in this._keyMap) {
            var index = this._keyMap[keyCode].indexOf(keyName);
            if (index > -1) {
              keyCodes.push(keyCode | 0);
            }
          }
          return keyCodes;
        }
      }, {
        key: "getKeyNames",
        value: function getKeyNames(keyCode) {
          return this._keyMap[keyCode] || [];
        }
      }, {
        key: "setKillKey",
        value: function setKillKey(keyCode) {
          if (typeof keyCode === "string") {
            var keyCodes = this.getKeyCodes(keyCode);
            for (var i = 0; i < keyCodes.length; i += 1) {
              this.setKillKey(keyCodes[i]);
            }
            return;
          }
          this._killKeyCodes.push(keyCode);
        }
      }, {
        key: "pressKey",
        value: function pressKey(keyCode) {
          if (typeof keyCode === "string") {
            var keyCodes = this.getKeyCodes(keyCode);
            for (var i = 0; i < keyCodes.length; i += 1) {
              this.pressKey(keyCodes[i]);
            }
            return;
          }
          this.activeTargetKeys.length = 0;
          var keyNames = this.getKeyNames(keyCode);
          for (var _i = 0; _i < keyNames.length; _i += 1) {
            this.activeTargetKeys.push(keyNames[_i]);
            if (this.pressedKeys.indexOf(keyNames[_i]) === -1) {
              this.pressedKeys.push(keyNames[_i]);
            }
          }
          this._applyMacros();
        }
      }, {
        key: "releaseKey",
        value: function releaseKey(keyCode) {
          if (typeof keyCode === "string") {
            var keyCodes = this.getKeyCodes(keyCode);
            for (var i = 0; i < keyCodes.length; i += 1) {
              this.releaseKey(keyCodes[i]);
            }
          } else {
            var keyNames = this.getKeyNames(keyCode);
            var killKeyCodeIndex = this._killKeyCodes.indexOf(keyCode);
            if (killKeyCodeIndex !== -1) {
              this.pressedKeys.length = 0;
            } else {
              for (var _i2 = 0; _i2 < keyNames.length; _i2 += 1) {
                var index = this.pressedKeys.indexOf(keyNames[_i2]);
                if (index > -1) {
                  this.pressedKeys.splice(index, 1);
                }
              }
            }
            this.activeTargetKeys.length = 0;
            this._clearMacros();
          }
        }
      }, {
        key: "_applyMacros",
        value: function _applyMacros() {
          var macros = this._macros.slice(0);
          for (var i = 0; i < macros.length; i += 1) {
            var macro = macros[i];
            if (macro.keyCombo.check(this.pressedKeys)) {
              if (macro.handler) {
                macro.keyNames = macro.handler(this.pressedKeys);
              }
              for (var j = 0; j < macro.keyNames.length; j += 1) {
                if (this.pressedKeys.indexOf(macro.keyNames[j]) === -1) {
                  this.pressedKeys.push(macro.keyNames[j]);
                }
              }
              this._appliedMacros.push(macro);
            }
          }
        }
      }, {
        key: "_clearMacros",
        value: function _clearMacros() {
          for (var i = 0; i < this._appliedMacros.length; i += 1) {
            var macro = this._appliedMacros[i];
            if (!macro.keyCombo.check(this.pressedKeys)) {
              for (var j = 0; j < macro.keyNames.length; j += 1) {
                var index = this.pressedKeys.indexOf(macro.keyNames[j]);
                if (index > -1) {
                  this.pressedKeys.splice(index, 1);
                }
              }
              if (macro.handler) {
                macro.keyNames = null;
              }
              this._appliedMacros.splice(i, 1);
              i -= 1;
            }
          }
        }
      }]);
      return Locale2;
    }();
    var Keyboard = /* @__PURE__ */ function() {
      function Keyboard2(targetWindow, targetElement, targetPlatform, targetUserAgent) {
        _classCallCheck(this, Keyboard2);
        this._locale = null;
        this._currentContext = "";
        this._contexts = {};
        this._listeners = [];
        this._appliedListeners = [];
        this._locales = {};
        this._targetElement = null;
        this._targetWindow = null;
        this._targetPlatform = "";
        this._targetUserAgent = "";
        this._isModernBrowser = false;
        this._targetKeyDownBinding = null;
        this._targetKeyUpBinding = null;
        this._targetResetBinding = null;
        this._paused = false;
        this._contexts.global = {
          listeners: this._listeners,
          targetWindow,
          targetElement,
          targetPlatform,
          targetUserAgent
        };
        this.setContext("global");
      }
      _createClass(Keyboard2, [{
        key: "setLocale",
        value: function setLocale(localeName, localeBuilder) {
          var locale = null;
          if (typeof localeName === "string") {
            if (localeBuilder) {
              locale = new Locale(localeName);
              localeBuilder(locale, this._targetPlatform, this._targetUserAgent);
            } else {
              locale = this._locales[localeName] || null;
            }
          } else {
            locale = localeName;
            localeName = locale._localeName;
          }
          this._locale = locale;
          this._locales[localeName] = locale;
          if (locale) {
            this._locale.pressedKeys = locale.pressedKeys;
          }
          return this;
        }
      }, {
        key: "getLocale",
        value: function getLocale(localName) {
          localName || (localName = this._locale.localeName);
          return this._locales[localName] || null;
        }
      }, {
        key: "bind",
        value: function bind(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault2) {
          if (keyComboStr === null || typeof keyComboStr === "function") {
            preventRepeatByDefault2 = releaseHandler;
            releaseHandler = pressHandler;
            pressHandler = keyComboStr;
            keyComboStr = null;
          }
          if (keyComboStr && _typeof(keyComboStr) === "object" && typeof keyComboStr.length === "number") {
            for (var i = 0; i < keyComboStr.length; i += 1) {
              this.bind(keyComboStr[i], pressHandler, releaseHandler);
            }
            return this;
          }
          this._listeners.push({
            keyCombo: keyComboStr ? new KeyCombo(keyComboStr) : null,
            pressHandler: pressHandler || null,
            releaseHandler: releaseHandler || null,
            preventRepeat: preventRepeatByDefault2 || false,
            preventRepeatByDefault: preventRepeatByDefault2 || false,
            executingHandler: false
          });
          return this;
        }
      }, {
        key: "addListener",
        value: function addListener(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault2) {
          return this.bind(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault2);
        }
      }, {
        key: "on",
        value: function on(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault2) {
          return this.bind(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault2);
        }
      }, {
        key: "bindPress",
        value: function bindPress(keyComboStr, pressHandler, preventRepeatByDefault2) {
          return this.bind(keyComboStr, pressHandler, null, preventRepeatByDefault2);
        }
      }, {
        key: "bindRelease",
        value: function bindRelease(keyComboStr, releaseHandler) {
          return this.bind(keyComboStr, null, releaseHandler, preventRepeatByDefault);
        }
      }, {
        key: "unbind",
        value: function unbind(keyComboStr, pressHandler, releaseHandler) {
          if (keyComboStr === null || typeof keyComboStr === "function") {
            releaseHandler = pressHandler;
            pressHandler = keyComboStr;
            keyComboStr = null;
          }
          if (keyComboStr && _typeof(keyComboStr) === "object" && typeof keyComboStr.length === "number") {
            for (var i = 0; i < keyComboStr.length; i += 1) {
              this.unbind(keyComboStr[i], pressHandler, releaseHandler);
            }
            return this;
          }
          for (var _i = 0; _i < this._listeners.length; _i += 1) {
            var listener = this._listeners[_i];
            var comboMatches = !keyComboStr && !listener.keyCombo || listener.keyCombo && listener.keyCombo.isEqual(keyComboStr);
            var pressHandlerMatches = !pressHandler && !releaseHandler || !pressHandler && !listener.pressHandler || pressHandler === listener.pressHandler;
            var releaseHandlerMatches = !pressHandler && !releaseHandler || !releaseHandler && !listener.releaseHandler || releaseHandler === listener.releaseHandler;
            if (comboMatches && pressHandlerMatches && releaseHandlerMatches) {
              this._listeners.splice(_i, 1);
              _i -= 1;
            }
          }
          return this;
        }
      }, {
        key: "removeListener",
        value: function removeListener(keyComboStr, pressHandler, releaseHandler) {
          return this.unbind(keyComboStr, pressHandler, releaseHandler);
        }
      }, {
        key: "off",
        value: function off(keyComboStr, pressHandler, releaseHandler) {
          return this.unbind(keyComboStr, pressHandler, releaseHandler);
        }
      }, {
        key: "setContext",
        value: function setContext(contextName) {
          if (this._locale) {
            this.releaseAllKeys();
          }
          if (!this._contexts[contextName]) {
            var globalContext = this._contexts.global;
            this._contexts[contextName] = {
              listeners: [],
              targetWindow: globalContext.targetWindow,
              targetElement: globalContext.targetElement,
              targetPlatform: globalContext.targetPlatform,
              targetUserAgent: globalContext.targetUserAgent
            };
          }
          var context = this._contexts[contextName];
          this._currentContext = contextName;
          this._listeners = context.listeners;
          this.stop();
          this.watch(context.targetWindow, context.targetElement, context.targetPlatform, context.targetUserAgent);
          return this;
        }
      }, {
        key: "getContext",
        value: function getContext() {
          return this._currentContext;
        }
      }, {
        key: "withContext",
        value: function withContext(contextName, callback) {
          var previousContextName = this.getContext();
          this.setContext(contextName);
          callback();
          this.setContext(previousContextName);
          return this;
        }
      }, {
        key: "watch",
        value: function watch(targetWindow, targetElement, targetPlatform, targetUserAgent) {
          var _this = this;
          this.stop();
          var win = typeof globalThis !== "undefined" ? globalThis : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : {};
          if (!targetWindow) {
            if (!win.addEventListener && !win.attachEvent) {
              throw new Error("Cannot find window functions addEventListener or attachEvent.");
            }
            targetWindow = win;
          }
          if (typeof targetWindow.nodeType === "number") {
            targetUserAgent = targetPlatform;
            targetPlatform = targetElement;
            targetElement = targetWindow;
            targetWindow = win;
          }
          if (!targetWindow.addEventListener && !targetWindow.attachEvent) {
            throw new Error("Cannot find addEventListener or attachEvent methods on targetWindow.");
          }
          this._isModernBrowser = !!targetWindow.addEventListener;
          var userAgent = targetWindow.navigator && targetWindow.navigator.userAgent || "";
          var platform = targetWindow.navigator && targetWindow.navigator.platform || "";
          targetElement && targetElement !== null || (targetElement = targetWindow.document);
          targetPlatform && targetPlatform !== null || (targetPlatform = platform);
          targetUserAgent && targetUserAgent !== null || (targetUserAgent = userAgent);
          this._targetKeyDownBinding = function(event) {
            _this.pressKey(event.keyCode, event);
            _this._handleCommandBug(event, platform);
          };
          this._targetKeyUpBinding = function(event) {
            _this.releaseKey(event.keyCode, event);
          };
          this._targetResetBinding = function(event) {
            _this.releaseAllKeys(event);
          };
          this._bindEvent(targetElement, "keydown", this._targetKeyDownBinding);
          this._bindEvent(targetElement, "keyup", this._targetKeyUpBinding);
          this._bindEvent(targetWindow, "focus", this._targetResetBinding);
          this._bindEvent(targetWindow, "blur", this._targetResetBinding);
          this._targetElement = targetElement;
          this._targetWindow = targetWindow;
          this._targetPlatform = targetPlatform;
          this._targetUserAgent = targetUserAgent;
          var currentContext = this._contexts[this._currentContext];
          currentContext.targetWindow = this._targetWindow;
          currentContext.targetElement = this._targetElement;
          currentContext.targetPlatform = this._targetPlatform;
          currentContext.targetUserAgent = this._targetUserAgent;
          return this;
        }
      }, {
        key: "stop",
        value: function stop() {
          if (!this._targetElement || !this._targetWindow) {
            return;
          }
          this._unbindEvent(this._targetElement, "keydown", this._targetKeyDownBinding);
          this._unbindEvent(this._targetElement, "keyup", this._targetKeyUpBinding);
          this._unbindEvent(this._targetWindow, "focus", this._targetResetBinding);
          this._unbindEvent(this._targetWindow, "blur", this._targetResetBinding);
          this._targetWindow = null;
          this._targetElement = null;
          return this;
        }
      }, {
        key: "pressKey",
        value: function pressKey(keyCode, event) {
          if (this._paused) {
            return this;
          }
          if (!this._locale) {
            throw new Error("Locale not set");
          }
          this._locale.pressKey(keyCode);
          this._applyBindings(event);
          return this;
        }
      }, {
        key: "releaseKey",
        value: function releaseKey(keyCode, event) {
          if (this._paused) {
            return this;
          }
          if (!this._locale) {
            throw new Error("Locale not set");
          }
          this._locale.releaseKey(keyCode);
          this._clearBindings(event);
          return this;
        }
      }, {
        key: "releaseAllKeys",
        value: function releaseAllKeys(event) {
          if (this._paused) {
            return this;
          }
          if (!this._locale) {
            throw new Error("Locale not set");
          }
          this._locale.pressedKeys.length = 0;
          this._clearBindings(event);
          return this;
        }
      }, {
        key: "pause",
        value: function pause() {
          if (this._paused) {
            return this;
          }
          if (this._locale) {
            this.releaseAllKeys();
          }
          this._paused = true;
          return this;
        }
      }, {
        key: "resume",
        value: function resume() {
          this._paused = false;
          return this;
        }
      }, {
        key: "reset",
        value: function reset() {
          this.releaseAllKeys();
          this._listeners.length = 0;
          return this;
        }
      }, {
        key: "_bindEvent",
        value: function _bindEvent(targetElement, eventName, handler) {
          return this._isModernBrowser ? targetElement.addEventListener(eventName, handler, false) : targetElement.attachEvent("on" + eventName, handler);
        }
      }, {
        key: "_unbindEvent",
        value: function _unbindEvent(targetElement, eventName, handler) {
          return this._isModernBrowser ? targetElement.removeEventListener(eventName, handler, false) : targetElement.detachEvent("on" + eventName, handler);
        }
      }, {
        key: "_getGroupedListeners",
        value: function _getGroupedListeners() {
          var listenerGroups = [];
          var listenerGroupMap = [];
          var listeners = this._listeners;
          if (this._currentContext !== "global") {
            listeners = [].concat(_toConsumableArray(listeners), _toConsumableArray(this._contexts.global.listeners));
          }
          listeners.sort(function(a, b) {
            return (b.keyCombo ? b.keyCombo.keyNames.length : 0) - (a.keyCombo ? a.keyCombo.keyNames.length : 0);
          }).forEach(function(l) {
            var mapIndex = -1;
            for (var i = 0; i < listenerGroupMap.length; i += 1) {
              if (listenerGroupMap[i] === null && l.keyCombo === null || listenerGroupMap[i] !== null && listenerGroupMap[i].isEqual(l.keyCombo)) {
                mapIndex = i;
              }
            }
            if (mapIndex === -1) {
              mapIndex = listenerGroupMap.length;
              listenerGroupMap.push(l.keyCombo);
            }
            if (!listenerGroups[mapIndex]) {
              listenerGroups[mapIndex] = [];
            }
            listenerGroups[mapIndex].push(l);
          });
          return listenerGroups;
        }
      }, {
        key: "_applyBindings",
        value: function _applyBindings(event) {
          var _this2 = this;
          var preventRepeat = false;
          event || (event = {});
          event.preventRepeat = function() {
            preventRepeat = true;
          };
          event.pressedKeys = this._locale.pressedKeys.slice(0);
          var activeTargetKeys = this._locale.activeTargetKeys;
          var pressedKeys = this._locale.pressedKeys.slice(0);
          var listenerGroups = this._getGroupedListeners();
          var _loop = function _loop2(i2) {
            var listeners = listenerGroups[i2];
            var keyCombo = listeners[0].keyCombo;
            if (keyCombo === null || keyCombo.check(pressedKeys) && activeTargetKeys.some(function(k) {
              return keyCombo.keyNames.includes(k);
            })) {
              for (var j = 0; j < listeners.length; j += 1) {
                var listener = listeners[j];
                if (!listener.executingHandler && listener.pressHandler && !listener.preventRepeat) {
                  listener.executingHandler = true;
                  listener.pressHandler.call(_this2, event);
                  listener.executingHandler = false;
                  if (preventRepeat || listener.preventRepeatByDefault) {
                    listener.preventRepeat = true;
                    preventRepeat = false;
                  }
                }
                if (_this2._appliedListeners.indexOf(listener) === -1) {
                  _this2._appliedListeners.push(listener);
                }
              }
              if (keyCombo) {
                for (var _j = 0; _j < keyCombo.keyNames.length; _j += 1) {
                  var index = pressedKeys.indexOf(keyCombo.keyNames[_j]);
                  if (index !== -1) {
                    pressedKeys.splice(index, 1);
                    _j -= 1;
                  }
                }
              }
            }
          };
          for (var i = 0; i < listenerGroups.length; i += 1) {
            _loop(i);
          }
        }
      }, {
        key: "_clearBindings",
        value: function _clearBindings(event) {
          event || (event = {});
          event.pressedKeys = this._locale.pressedKeys.slice(0);
          for (var i = 0; i < this._appliedListeners.length; i += 1) {
            var listener = this._appliedListeners[i];
            var keyCombo = listener.keyCombo;
            if (keyCombo === null || !keyCombo.check(this._locale.pressedKeys)) {
              listener.preventRepeat = false;
              if (keyCombo !== null || event.pressedKeys.length === 0) {
                this._appliedListeners.splice(i, 1);
                i -= 1;
              }
              if (!listener.executingHandler && listener.releaseHandler) {
                listener.executingHandler = true;
                listener.releaseHandler.call(this, event);
                listener.executingHandler = false;
              }
            }
          }
        }
      }, {
        key: "_handleCommandBug",
        value: function _handleCommandBug(event, platform) {
          var modifierKeys = ["shift", "ctrl", "alt", "capslock", "tab", "command"];
          if (platform.match("Mac") && this._locale.pressedKeys.includes("command") && !modifierKeys.includes(this._locale.getKeyNames(event.keyCode)[0])) {
            this._targetKeyUpBinding(event);
          }
        }
      }]);
      return Keyboard2;
    }();
    function us(locale, platform, userAgent) {
      locale.bindKeyCode(3, ["cancel"]);
      locale.bindKeyCode(8, ["backspace"]);
      locale.bindKeyCode(9, ["tab"]);
      locale.bindKeyCode(12, ["clear"]);
      locale.bindKeyCode(13, ["enter"]);
      locale.bindKeyCode(16, ["shift"]);
      locale.bindKeyCode(17, ["ctrl"]);
      locale.bindKeyCode(18, ["alt", "menu"]);
      locale.bindKeyCode(19, ["pause", "break"]);
      locale.bindKeyCode(20, ["capslock"]);
      locale.bindKeyCode(27, ["escape", "esc"]);
      locale.bindKeyCode(32, ["space", "spacebar"]);
      locale.bindKeyCode(33, ["pageup"]);
      locale.bindKeyCode(34, ["pagedown"]);
      locale.bindKeyCode(35, ["end"]);
      locale.bindKeyCode(36, ["home"]);
      locale.bindKeyCode(37, ["left"]);
      locale.bindKeyCode(38, ["up"]);
      locale.bindKeyCode(39, ["right"]);
      locale.bindKeyCode(40, ["down"]);
      locale.bindKeyCode(41, ["select"]);
      locale.bindKeyCode(42, ["printscreen"]);
      locale.bindKeyCode(43, ["execute"]);
      locale.bindKeyCode(44, ["snapshot"]);
      locale.bindKeyCode(45, ["insert", "ins"]);
      locale.bindKeyCode(46, ["delete", "del"]);
      locale.bindKeyCode(47, ["help"]);
      locale.bindKeyCode(145, ["scrolllock", "scroll"]);
      locale.bindKeyCode(188, ["comma", ","]);
      locale.bindKeyCode(190, ["period", "."]);
      locale.bindKeyCode(191, ["slash", "forwardslash", "/"]);
      locale.bindKeyCode(192, ["graveaccent", "`"]);
      locale.bindKeyCode(219, ["openbracket", "["]);
      locale.bindKeyCode(220, ["backslash", "\\"]);
      locale.bindKeyCode(221, ["closebracket", "]"]);
      locale.bindKeyCode(222, ["apostrophe", "'"]);
      locale.bindKeyCode(48, ["zero", "0"]);
      locale.bindKeyCode(49, ["one", "1"]);
      locale.bindKeyCode(50, ["two", "2"]);
      locale.bindKeyCode(51, ["three", "3"]);
      locale.bindKeyCode(52, ["four", "4"]);
      locale.bindKeyCode(53, ["five", "5"]);
      locale.bindKeyCode(54, ["six", "6"]);
      locale.bindKeyCode(55, ["seven", "7"]);
      locale.bindKeyCode(56, ["eight", "8"]);
      locale.bindKeyCode(57, ["nine", "9"]);
      locale.bindKeyCode(96, ["numzero", "num0"]);
      locale.bindKeyCode(97, ["numone", "num1"]);
      locale.bindKeyCode(98, ["numtwo", "num2"]);
      locale.bindKeyCode(99, ["numthree", "num3"]);
      locale.bindKeyCode(100, ["numfour", "num4"]);
      locale.bindKeyCode(101, ["numfive", "num5"]);
      locale.bindKeyCode(102, ["numsix", "num6"]);
      locale.bindKeyCode(103, ["numseven", "num7"]);
      locale.bindKeyCode(104, ["numeight", "num8"]);
      locale.bindKeyCode(105, ["numnine", "num9"]);
      locale.bindKeyCode(106, ["nummultiply", "num*"]);
      locale.bindKeyCode(107, ["numadd", "num+"]);
      locale.bindKeyCode(108, ["numenter"]);
      locale.bindKeyCode(109, ["numsubtract", "num-"]);
      locale.bindKeyCode(110, ["numdecimal", "num."]);
      locale.bindKeyCode(111, ["numdivide", "num/"]);
      locale.bindKeyCode(144, ["numlock", "num"]);
      locale.bindKeyCode(112, ["f1"]);
      locale.bindKeyCode(113, ["f2"]);
      locale.bindKeyCode(114, ["f3"]);
      locale.bindKeyCode(115, ["f4"]);
      locale.bindKeyCode(116, ["f5"]);
      locale.bindKeyCode(117, ["f6"]);
      locale.bindKeyCode(118, ["f7"]);
      locale.bindKeyCode(119, ["f8"]);
      locale.bindKeyCode(120, ["f9"]);
      locale.bindKeyCode(121, ["f10"]);
      locale.bindKeyCode(122, ["f11"]);
      locale.bindKeyCode(123, ["f12"]);
      locale.bindKeyCode(124, ["f13"]);
      locale.bindKeyCode(125, ["f14"]);
      locale.bindKeyCode(126, ["f15"]);
      locale.bindKeyCode(127, ["f16"]);
      locale.bindKeyCode(128, ["f17"]);
      locale.bindKeyCode(129, ["f18"]);
      locale.bindKeyCode(130, ["f19"]);
      locale.bindKeyCode(131, ["f20"]);
      locale.bindKeyCode(132, ["f21"]);
      locale.bindKeyCode(133, ["f22"]);
      locale.bindKeyCode(134, ["f23"]);
      locale.bindKeyCode(135, ["f24"]);
      locale.bindMacro("shift + `", ["tilde", "~"]);
      locale.bindMacro("shift + 1", ["exclamation", "exclamationpoint", "!"]);
      locale.bindMacro("shift + 2", ["at", "@"]);
      locale.bindMacro("shift + 3", ["number", "#"]);
      locale.bindMacro("shift + 4", ["dollar", "dollars", "dollarsign", "$"]);
      locale.bindMacro("shift + 5", ["percent", "%"]);
      locale.bindMacro("shift + 6", ["caret", "^"]);
      locale.bindMacro("shift + 7", ["ampersand", "and", "&"]);
      locale.bindMacro("shift + 8", ["asterisk", "*"]);
      locale.bindMacro("shift + 9", ["openparen", "("]);
      locale.bindMacro("shift + 0", ["closeparen", ")"]);
      locale.bindMacro("shift + -", ["underscore", "_"]);
      locale.bindMacro("shift + =", ["plus", "+"]);
      locale.bindMacro("shift + [", ["opencurlybrace", "opencurlybracket", "{"]);
      locale.bindMacro("shift + ]", ["closecurlybrace", "closecurlybracket", "}"]);
      locale.bindMacro("shift + \\", ["verticalbar", "|"]);
      locale.bindMacro("shift + ;", ["colon", ":"]);
      locale.bindMacro("shift + '", ["quotationmark", "'"]);
      locale.bindMacro("shift + !,", ["openanglebracket", "<"]);
      locale.bindMacro("shift + .", ["closeanglebracket", ">"]);
      locale.bindMacro("shift + /", ["questionmark", "?"]);
      if (platform.match("Mac")) {
        locale.bindMacro("command", ["mod", "modifier"]);
      } else {
        locale.bindMacro("ctrl", ["mod", "modifier"]);
      }
      for (var keyCode = 65; keyCode <= 90; keyCode += 1) {
        var keyName = String.fromCharCode(keyCode + 32);
        var capitalKeyName = String.fromCharCode(keyCode);
        locale.bindKeyCode(keyCode, keyName);
        locale.bindMacro("shift + " + keyName, capitalKeyName);
        locale.bindMacro("capslock + " + keyName, capitalKeyName);
      }
      var semicolonKeyCode = userAgent.match("Firefox") ? 59 : 186;
      var dashKeyCode = userAgent.match("Firefox") ? 173 : 189;
      var equalKeyCode = userAgent.match("Firefox") ? 61 : 187;
      var leftCommandKeyCode;
      var rightCommandKeyCode;
      if (platform.match("Mac") && (userAgent.match("Safari") || userAgent.match("Chrome"))) {
        leftCommandKeyCode = 91;
        rightCommandKeyCode = 93;
      } else if (platform.match("Mac") && userAgent.match("Opera")) {
        leftCommandKeyCode = 17;
        rightCommandKeyCode = 17;
      } else if (platform.match("Mac") && userAgent.match("Firefox")) {
        leftCommandKeyCode = 224;
        rightCommandKeyCode = 224;
      }
      locale.bindKeyCode(semicolonKeyCode, ["semicolon", ";"]);
      locale.bindKeyCode(dashKeyCode, ["dash", "-"]);
      locale.bindKeyCode(equalKeyCode, ["equal", "equalsign", "="]);
      locale.bindKeyCode(leftCommandKeyCode, ["command", "windows", "win", "super", "leftcommand", "leftwindows", "leftwin", "leftsuper"]);
      locale.bindKeyCode(rightCommandKeyCode, ["command", "windows", "win", "super", "rightcommand", "rightwindows", "rightwin", "rightsuper"]);
      locale.setKillKey("command");
    }
    var keyboard2 = new Keyboard();
    keyboard2.setLocale("us", us);
    keyboard2.Keyboard = Keyboard;
    keyboard2.Locale = Locale;
    keyboard2.KeyCombo = KeyCombo;
    return keyboard2;
  });
})(keyboard);
var keyboardjs = keyboard.exports;
class KeyboardManager extends EventDispatcher {
  constructor() {
    super();
    __publicField(this, "map", new Map());
  }
  generateSymbol(entity) {
    if (Array.isArray(entity)) {
      return entity.join(" + ");
    }
    return entity.shortcutKey.join(" + ");
  }
  register(entity) {
    const symbol = this.generateSymbol(entity);
    if (this.map.has(symbol)) {
      console.warn(`KeyboardManager: shortcutKey already exist: ${symbol}. desp: ${this.map.get(symbol).desp}`);
      return this;
    }
    keyboardjs.bind(symbol, entity.keydown || null, entity.keyup);
    this.map.set(symbol, entity);
    return this;
  }
  update(entity) {
    const symbol = this.generateSymbol(entity);
    if (!this.map.has(symbol)) {
      console.warn(`KeyboardManager: shortcutKey unregister then exec register function`);
      this.register(entity);
      return this;
    }
    this.cancel(entity.shortcutKey);
    this.register(entity);
    return this;
  }
  cancel(keyArray) {
    const symbol = this.generateSymbol(keyArray);
    if (this.map.has(symbol)) {
      const entity = this.map.get(symbol);
      keyboardjs.unbind(symbol, entity.keydown || null, entity.keyup);
      this.map.delete(symbol);
    }
    return this;
  }
  checkRepeat(keyArray) {
    const symbol = this.generateSymbol(keyArray);
    return this.map.has(symbol);
  }
}
const KeyboardManagerPlugin = function(params) {
  if (this.keyboardManager) {
    console.warn("engine has installed keyboardManager plugin.");
    return false;
  }
  const keyboardManager = new KeyboardManager();
  this.keyboardManager = keyboardManager;
  this.completeSet.add(() => {
    if (this.transformControls) {
      if (this.IS_ENGINESUPPORT) {
        const transformControls = this.dataSupportManager.controlsDataSupport.getData()[CONFIGTYPE.TRNASFORMCONTROLS];
        keyboardManager.register({
          shortcutKey: ["r"],
          desp: "tranformControls rotate mode",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.mode = "rotate";
          }
        }).register({
          shortcutKey: ["t"],
          desp: "tranformControls translate mode",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.mode = "translate";
          }
        }).register({
          shortcutKey: ["e"],
          desp: "tranformControls scale mode",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.mode = "scale";
          }
        }).register({
          shortcutKey: ["x"],
          desp: "tranformControls switch x axis",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.showX = !transformControls.showX;
          }
        }).register({
          shortcutKey: ["y"],
          desp: "tranformControls switch y axis",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.showY = !transformControls.showY;
          }
        }).register({
          shortcutKey: ["z"],
          desp: "tranformControls switch z axis",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.showZ = !transformControls.showZ;
          }
        }).register({
          shortcutKey: ["space"],
          desp: "tranformControls switch coordinate space",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.space = transformControls.space === "local" ? "world" : "local";
          }
        }).register({
          shortcutKey: ["shift"],
          desp: "tranformControls switch tranform numeric value",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.snapAllow = false;
          },
          keydown: (event) => {
            event == null ? void 0 : event.preventDefault();
            event == null ? void 0 : event.preventRepeat();
            transformControls.snapAllow = true;
          }
        });
      } else {
        const transformControls = this.transformControls;
        keyboardManager.register({
          shortcutKey: ["r"],
          desp: "tranformControls rotate mode",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.mode = "rotate";
          }
        }).register({
          shortcutKey: ["t"],
          desp: "tranformControls translate mode",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.mode = "translate";
          }
        }).register({
          shortcutKey: ["e"],
          desp: "tranformControls scale mode",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.mode = "scale";
          }
        }).register({
          shortcutKey: ["x"],
          desp: "tranformControls switch x axis",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.showX = !transformControls.showX;
          }
        }).register({
          shortcutKey: ["y"],
          desp: "tranformControls switch y axis",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.showY = !transformControls.showY;
          }
        }).register({
          shortcutKey: ["z"],
          desp: "tranformControls switch z axis",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.showZ = !transformControls.showZ;
          }
        }).register({
          shortcutKey: ["space"],
          desp: "tranformControls switch coordinate space",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.space = transformControls.space === "local" ? "world" : "local";
          }
        }).register({
          shortcutKey: ["shift"],
          desp: "tranformControls switch tranform numeric value",
          keyup: (event) => {
            event == null ? void 0 : event.preventDefault();
            transformControls.translationSnap = null;
            transformControls.rotationSnap = null;
            transformControls.scaleSnap = null;
          },
          keydown: (event) => {
            event == null ? void 0 : event.preventDefault();
            event == null ? void 0 : event.preventRepeat();
            transformControls.translationSnap = 5;
            transformControls.rotationSnap = Math.PI / 180 * 10;
            transformControls.scaleSnap = 0.1;
          }
        });
      }
    }
  });
  return true;
};
var ENGINEPLUGIN;
(function(ENGINEPLUGIN2) {
  ENGINEPLUGIN2["WEBGLRENDERER"] = "WebGLRenderer";
  ENGINEPLUGIN2["SCENE"] = "Scene";
  ENGINEPLUGIN2["MODELINGSCENE"] = "ModelingScene";
  ENGINEPLUGIN2["RENDERMANAGER"] = "RenderManager";
  ENGINEPLUGIN2["ORBITCONTROLS"] = "OrbitControls";
  ENGINEPLUGIN2["STATS"] = "Stats";
  ENGINEPLUGIN2["EFFECTCOMPOSER"] = "EffectComposer";
  ENGINEPLUGIN2["POINTERMANAGER"] = "PointerManager";
  ENGINEPLUGIN2["EVENTMANAGER"] = "EventManager";
  ENGINEPLUGIN2["TRANSFORMCONTROLS"] = "TransformControls";
  ENGINEPLUGIN2["LOADERMANAGER"] = "LoaderManager";
  ENGINEPLUGIN2["RESOURCEMANAGER"] = "ResourceManager";
  ENGINEPLUGIN2["DATASUPPORTMANAGER"] = "DataSupportManager";
  ENGINEPLUGIN2["COMPILERMANAGER"] = "CompilerManager";
  ENGINEPLUGIN2["KEYBOARDMANAGER"] = "KeyboardManager";
})(ENGINEPLUGIN || (ENGINEPLUGIN = {}));
let pluginHandler = new Map();
pluginHandler.set(ENGINEPLUGIN.WEBGLRENDERER, WebGLRendererPlugin);
pluginHandler.set(ENGINEPLUGIN.EFFECTCOMPOSER, EffectComposerPlugin);
pluginHandler.set(ENGINEPLUGIN.SCENE, ScenePlugin);
pluginHandler.set(ENGINEPLUGIN.MODELINGSCENE, ModelingScenePlugin);
pluginHandler.set(ENGINEPLUGIN.RENDERMANAGER, RenderManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.POINTERMANAGER, PointerManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.EVENTMANAGER, EventManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.LOADERMANAGER, LoaderManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.RESOURCEMANAGER, ResourceManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.DATASUPPORTMANAGER, DataSupportManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.COMPILERMANAGER, CompilerManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.KEYBOARDMANAGER, KeyboardManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.ORBITCONTROLS, OrbitControlsPlugin);
pluginHandler.set(ENGINEPLUGIN.TRANSFORMCONTROLS, TransformControlsPlugin);
pluginHandler.set(ENGINEPLUGIN.STATS, StatsPlugin);
const _Engine = class extends EventDispatcher {
  constructor() {
    super();
    __publicField(this, "completeSet");
    __publicField(this, "IS_ENGINESUPPORT", false);
    __publicField(this, "dom");
    __publicField(this, "webGLRenderer");
    __publicField(this, "currentCamera");
    __publicField(this, "scene");
    __publicField(this, "orbitControls");
    __publicField(this, "transformControls");
    __publicField(this, "effectComposer");
    __publicField(this, "renderManager");
    __publicField(this, "pointerManager");
    __publicField(this, "eventManager");
    __publicField(this, "loaderManager");
    __publicField(this, "resourceManager");
    __publicField(this, "dataSupportManager");
    __publicField(this, "compilerManager");
    __publicField(this, "keyboardManager");
    __publicField(this, "stats");
    __publicField(this, "transing");
    __publicField(this, "setSize");
    __publicField(this, "setCamera");
    __publicField(this, "setDom");
    __publicField(this, "setStats");
    __publicField(this, "setTransformControls");
    __publicField(this, "loadResources");
    __publicField(this, "loadResourcesAsync");
    __publicField(this, "registerResources");
    __publicField(this, "toJSON");
    __publicField(this, "play");
    __publicField(this, "stop");
    __publicField(this, "render");
    this.completeSet = new Set();
    this.render = function() {
      console.warn("can not install some plugin");
      return this;
    };
  }
  optimizeMemory() {
    Object.keys(this).forEach((key) => {
      if (this[key] === void 0) {
        delete this[key];
      }
    });
  }
  install(plugin, params) {
    if (_Engine.pluginHandler.has(plugin)) {
      _Engine.pluginHandler.get(plugin).call(this, params);
    } else {
      console.error(`engine can not support ${plugin} plugin.`);
    }
    return this;
  }
  complete() {
    this.completeSet.forEach((fun) => {
      fun(this);
    });
    this.completeSet.clear();
    return this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
    return this;
  }
};
let Engine = _Engine;
__publicField(Engine, "pluginHandler", pluginHandler);
__publicField(Engine, "register", function(name, handler) {
  _Engine.pluginHandler && _Engine.pluginHandler.set(name, handler);
});
__publicField(Engine, "dispose", function() {
  _Engine.pluginHandler = void 0;
});
class DisplayEngine extends Engine {
  constructor() {
    super();
    this.install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    });
    this.install(ENGINEPLUGIN.SCENE);
    this.install(ENGINEPLUGIN.RENDERMANAGER);
    this.install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    });
    this.install(ENGINEPLUGIN.ORBITCONTROLS);
    this.install(ENGINEPLUGIN.POINTERMANAGER);
    this.install(ENGINEPLUGIN.EVENTMANAGER);
  }
}
class ModelingEngine extends Engine {
  constructor() {
    super();
    this.install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    }).install(ENGINEPLUGIN.MODELINGSCENE, {
      hasDefaultPerspectiveCamera: true,
      hasDefaultOrthographicCamera: true,
      hasAxesHelper: true,
      hasGridHelper: true,
      hasDisplayMode: true,
      displayMode: "env"
    }).install(ENGINEPLUGIN.RENDERMANAGER).install(ENGINEPLUGIN.STATS).install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    }).install(ENGINEPLUGIN.ORBITCONTROLS).install(ENGINEPLUGIN.POINTERMANAGER).install(ENGINEPLUGIN.EVENTMANAGER).install(ENGINEPLUGIN.KEYBOARDMANAGER).install(ENGINEPLUGIN.TRANSFORMCONTROLS).complete();
  }
}
const _SupportDataGenerator = class {
  constructor() {
    __publicField(this, "supportData");
    __publicField(this, "supportDataType");
  }
  create(type) {
    if (!type) {
      console.warn("you must give a module type in create params");
      return this;
    }
    this.supportData = {};
    this.supportDataType = type;
    return this;
  }
  add(config) {
    if (!this.supportData || !this.supportDataType) {
      console.warn(`you must call 'create' method before the 'add' method`);
      return this;
    }
    if (!config.type) {
      console.warn(`config can not found attribute 'type'`);
      return this;
    }
    if (_SupportDataGenerator.configModelMap[config.type] !== this.supportDataType) {
      console.warn(`current generator create config which module is in: ${this.supportDataType}, but you provide type is '${config.type}'`);
      return this;
    }
    this.supportData[config.vid] = generateConfig(config.type, config);
    return this;
  }
  get() {
    this.supportDataType = void 0;
    if (this.supportData) {
      return this.supportData;
    } else {
      return {};
    }
  }
};
let SupportDataGenerator = _SupportDataGenerator;
__publicField(SupportDataGenerator, "configModelMap", getConfigModelMap());
var OBJECTEVENT;
(function(OBJECTEVENT2) {
  OBJECTEVENT2["ACTIVE"] = "active";
  OBJECTEVENT2["HOVER"] = "hover";
})(OBJECTEVENT || (OBJECTEVENT = {}));
const pointLight = new PointLight("rgb(255, 255, 255)", 0.5, 200, 1);
pointLight.position.set(-30, 5, 20);
pointLight.castShadow = true;
const plane = new Mesh(new BoxBufferGeometry(80, 2, 80), new MeshStandardMaterial({
  color: "rgb(255, 255, 255)"
}));
plane.position.set(0, -11, 0);
plane.receiveShadow = true;
plane.castShadow = true;
const _MaterialDisplayer = class {
  constructor(parameters) {
    __publicField(this, "material");
    __publicField(this, "dom");
    __publicField(this, "renderer");
    __publicField(this, "scene");
    __publicField(this, "camera");
    __publicField(this, "object");
    const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("rgb(150, 150, 150)");
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 35);
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(new Vector3(0, 0, 0));
    scene.add(_MaterialDisplayer.ambientLight);
    scene.add(_MaterialDisplayer.pointLight);
    scene.add(_MaterialDisplayer.plane);
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    this.object = new Object3D();
    (parameters == null ? void 0 : parameters.material) && this.setMaterial(parameters.material);
    (parameters == null ? void 0 : parameters.dom) && this.setDom(parameters.dom);
  }
  setMaterial(material) {
    this.scene.remove(this.object);
    this.material = material;
    if (material.type.includes("Mesh")) {
      this.object = new Mesh(_MaterialDisplayer.geometry, material);
    } else if (material.type.includes("Line")) {
      this.object = new Line(_MaterialDisplayer.geometry, material);
    } else if (material.type.includes("Ponits")) {
      this.object = new Points(_MaterialDisplayer.geometry, material);
    } else if (material.type.includes("Sprite")) {
      this.object = new Sprite(material);
    } else {
      console.warn(`material displayer can not support this type material: '${material.type}'`);
      return this;
    }
    this.object.castShadow = true;
    this.object.receiveShadow = true;
    this.scene.add(this.object);
    return this;
  }
  setDom(dom) {
    this.dom = dom;
    this.setSize();
    dom.appendChild(this.renderer.domElement);
    return this;
  }
  setSize(width, height) {
    if (width && height) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, true);
    } else {
      if (!this.dom) {
        console.warn(`material displayer must set dom before setSize with empty parameters`);
        return this;
      }
      const dom = this.dom;
      this.camera.aspect = dom.offsetWidth / dom.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
    }
    return this;
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  dispose() {
    this.renderer.dispose();
  }
};
let MaterialDisplayer = _MaterialDisplayer;
__publicField(MaterialDisplayer, "ambientLight", new AmbientLight("rgb(255, 255, 255)", 0.7));
__publicField(MaterialDisplayer, "pointLight", pointLight);
__publicField(MaterialDisplayer, "geometry", new SphereBufferGeometry(10, 12, 12));
__publicField(MaterialDisplayer, "plane", plane);
__publicField(MaterialDisplayer, "dispose", () => {
  _MaterialDisplayer.geometry.dispose();
  _MaterialDisplayer.plane.geometry.dispose();
});
const _TextureDisplayer = class {
  constructor(parameters) {
    __publicField(this, "dom");
    __publicField(this, "texture");
    __publicField(this, "renderer");
    __publicField(this, "scene");
    __publicField(this, "camera");
    const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("rgb(150, 150, 150)");
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 35);
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(new Vector3(0, 0, 0));
    scene.add(_TextureDisplayer.ambientLight);
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    (parameters == null ? void 0 : parameters.texture) && this.setTexture(parameters.texture);
    (parameters == null ? void 0 : parameters.dom) && this.setDom(parameters.dom);
  }
  setTexture(texture) {
    this.scene.background = texture;
    return this;
  }
  setDom(dom) {
    this.dom = dom;
    this.setSize();
    dom.appendChild(this.renderer.domElement);
    return this;
  }
  setSize(width, height) {
    if (width && height) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, true);
    } else {
      if (!this.dom) {
        console.warn(`texture displayer must set dom before setSize with empty parameters`);
        return this;
      }
      const dom = this.dom;
      this.camera.aspect = dom.offsetWidth / dom.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
    }
    return this;
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  dispose() {
    this.renderer.dispose();
  }
};
let TextureDisplayer = _TextureDisplayer;
__publicField(TextureDisplayer, "ambientLight", new AmbientLight("rgb(255, 255, 255)", 1));
class CanvasTextureGenerator {
  constructor(parameters) {
    __publicField(this, "canvas");
    this.canvas = document.createElement("canvas");
    const devicePixelRatio = window.devicePixelRatio;
    this.canvas.width = ((parameters == null ? void 0 : parameters.width) || 512) * devicePixelRatio;
    this.canvas.height = ((parameters == null ? void 0 : parameters.height) || 512) * devicePixelRatio;
    this.canvas.style.backgroundColor = (parameters == null ? void 0 : parameters.bgColor) || "rgb(255, 255, 255)";
  }
  get() {
    return this.canvas;
  }
  draw(fun) {
    const ctx = this.canvas.getContext("2d");
    ctx == null ? void 0 : ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    if (ctx) {
      fun(ctx);
      return this;
    } else {
      console.warn(`you browser can not support canvas 2d`);
      return this;
    }
  }
  preview(parameters) {
    const canvas = this.canvas;
    canvas.style.position = "fixed";
    canvas.style.top = (parameters == null ? void 0 : parameters.top) || "5%";
    canvas.style.left = (parameters == null ? void 0 : parameters.left) || "5%";
    canvas.style.right = (parameters == null ? void 0 : parameters.right) || "unset";
    canvas.style.bottom = (parameters == null ? void 0 : parameters.bottom) || "unset";
    document.body.appendChild(this.canvas);
    return this;
  }
}
class EngineSupport extends Engine {
  constructor(parameters) {
    super();
    __publicField(this, "IS_ENGINESUPPORT", true);
    this.install(ENGINEPLUGIN.LOADERMANAGER).install(ENGINEPLUGIN.RESOURCEMANAGER).install(ENGINEPLUGIN.DATASUPPORTMANAGER, parameters).install(ENGINEPLUGIN.COMPILERMANAGER);
  }
  loadConfig(config, callback) {
    const loadLifeCycle = () => {
      const dataSupportManager = this.dataSupportManager;
      config.texture && dataSupportManager.load({ texture: config.texture });
      config.material && dataSupportManager.load({ material: config.material });
      delete config.texture;
      delete config.material;
      dataSupportManager.load(config);
    };
    if (config.assets && config.assets.length) {
      this.loaderManager.reset().load(config.assets);
      const mappedFun = (event) => {
        delete config.assets;
        loadLifeCycle();
        this.resourceManager.removeEventListener("mapped", mappedFun);
        callback && callback(event);
      };
      this.resourceManager.addEventListener("mapped", mappedFun);
    } else {
      loadLifeCycle();
      callback && callback();
    }
    return this;
  }
  loadConfigAsync(config) {
    return new Promise((resolve, reject) => {
      const loadLifeCycle = () => {
        const dataSupportManager = this.dataSupportManager;
        config.texture && dataSupportManager.load({ texture: config.texture });
        config.material && dataSupportManager.load({ material: config.material });
        delete config.texture;
        delete config.material;
        dataSupportManager.load(config);
      };
      if (config.assets && config.assets.length) {
        this.loaderManager.reset().load(config.assets);
        const mappedFun = (event) => {
          delete config.assets;
          loadLifeCycle();
          this.resourceManager.removeEventListener("mapped", mappedFun);
          resolve(event);
        };
        this.resourceManager.addEventListener("mapped", mappedFun);
      } else {
        loadLifeCycle();
        resolve(void 0);
      }
    });
  }
}
class ModelingEngineSupport extends EngineSupport {
  constructor(parameters) {
    super(parameters);
    __publicField(this, "IS_ENGINESUPPORT", true);
    this.install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    }).install(ENGINEPLUGIN.MODELINGSCENE, {
      hasDefaultPerspectiveCamera: true,
      hasDefaultOrthographicCamera: true,
      hasAxesHelper: true,
      hasGridHelper: true,
      hasDisplayMode: true,
      displayMode: "env"
    }).install(ENGINEPLUGIN.RENDERMANAGER).install(ENGINEPLUGIN.STATS).install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    }).install(ENGINEPLUGIN.ORBITCONTROLS).install(ENGINEPLUGIN.POINTERMANAGER).install(ENGINEPLUGIN.EVENTMANAGER).install(ENGINEPLUGIN.KEYBOARDMANAGER).install(ENGINEPLUGIN.TRANSFORMCONTROLS).complete();
  }
}
class DisplayEngineSupport extends EngineSupport {
  constructor(parameters) {
    super();
    this.install(ENGINEPLUGIN.WEBGLRENDERER, {
      antialias: true,
      alpha: true
    });
    this.install(ENGINEPLUGIN.SCENE);
    this.install(ENGINEPLUGIN.RENDERMANAGER);
    this.install(ENGINEPLUGIN.EFFECTCOMPOSER, {
      WebGLMultisampleRenderTarget: true
    });
    this.install(ENGINEPLUGIN.ORBITCONTROLS);
    this.install(ENGINEPLUGIN.POINTERMANAGER);
    this.install(ENGINEPLUGIN.EVENTMANAGER).complete();
  }
}
const openWindow = generateConfigFunction({
  name: "openWindow",
  desp: "\u6253\u5F00url\u6D4F\u89C8\u7A97\u53E3",
  params: {
    url: ""
  }
});
var configure$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  openWindow
});
const moveTo = generateConfigFunction({
  name: "moveTo",
  desp: "\u7269\u4F53\u79FB\u52A8\u5230",
  params: {
    target: "",
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1e3,
    timingFunction: Easing.Quadratic.InOut
  }
});
const moveSpacing = generateConfigFunction({
  name: "moveSpacing",
  desp: "\u7269\u4F53\u79FB\u52A8\u95F4\u8DDD",
  params: {
    target: "",
    spacing: {
      x: 10,
      y: 10,
      z: 10
    },
    delay: 0,
    duration: 1e3,
    timingFunction: Easing.Quadratic.InOut
  }
});
var configure = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  moveTo,
  moveSpacing
});
if (!window.__THREE__) {
  console.error(`vis-three dependent on three.js module, pleace run 'npm i three' first.`);
}
export { configure$1 as BasicEventLibrary, CONFIGTYPE, CameraDataSupport, CameraHelper, CanvasTextureGenerator, ControlsDataSupport, DataSupportManager, DisplayEngine, DisplayEngineSupport, ENGINEPLUGIN, EVENTTYPE, Engine, EngineSupport, GeometryDataSupport, GroupHelper, LightDataSupport, LineDataSupport, LoaderManager, MODULETYPE, MaterialDataSupport, MaterialDisplayer, MeshDataSupport, ModelingEngine, ModelingEngineSupport, ModelingScene, OBJECTEVENT, PointLightHelper, PointsDataSupport, RESOURCEEVENTTYPE, configure as RealTimeAnimateLibrary, RendererDataSupport, ResourceManager, SCENEDISPLAYMODE, SCENEVIEWPOINT, SceneDataSupport, SpriteDataSupport, SupportDataGenerator, TextureDataSupport, TextureDisplayer, generateConfig };
