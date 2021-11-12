import { Camera, Light, Line, Mesh, Points, Scene, Sprite, MeshLambertMaterial, LineBasicMaterial, PointsMaterial, SpriteMaterial, Material, AmbientLight, DirectionalLight, Texture, PerspectiveCamera, OrthographicCamera, AxesHelper, GridHelper } from "three";
// 默认相机枚举
export var ModelingSceneCameraDefalutType;
(function (ModelingSceneCameraDefalutType) {
    ModelingSceneCameraDefalutType["DefaultPerspectiveCamera"] = "DefaultPerspectiveCamera";
    ModelingSceneCameraDefalutType["DefaultOrthograpbicCamera"] = "DefaultOrthograpbicCamera";
})(ModelingSceneCameraDefalutType || (ModelingSceneCameraDefalutType = {}));
// 默认视角枚举
export var ModelingSceneViewpoint;
(function (ModelingSceneViewpoint) {
    ModelingSceneViewpoint["DEFAULT"] = "default";
    ModelingSceneViewpoint["TOP"] = "top";
    ModelingSceneViewpoint["BOTTOM"] = "bottom";
    ModelingSceneViewpoint["LEFT"] = "left";
    ModelingSceneViewpoint["RIGHT"] = "right";
    ModelingSceneViewpoint["FRONT"] = "front";
    ModelingSceneViewpoint["BACK"] = "back";
})(ModelingSceneViewpoint || (ModelingSceneViewpoint = {}));
// 默认展示枚举
export var ModelingSceneDisplayMode;
(function (ModelingSceneDisplayMode) {
    ModelingSceneDisplayMode[ModelingSceneDisplayMode["GEOMETRY"] = 0] = "GEOMETRY";
    ModelingSceneDisplayMode[ModelingSceneDisplayMode["MATERIAL"] = 1] = "MATERIAL";
    ModelingSceneDisplayMode[ModelingSceneDisplayMode["LIGHT"] = 2] = "LIGHT";
    ModelingSceneDisplayMode[ModelingSceneDisplayMode["ENV"] = 3] = "ENV";
})(ModelingSceneDisplayMode || (ModelingSceneDisplayMode = {}));
export class ModelingScene extends Scene {
    cameraSet;
    lightSet;
    meshSet;
    lineSet;
    pointsSet;
    spriteSet;
    displayMode; // 展示mode
    meshOverrideMaterial;
    lineOverrideMaterial;
    pointsOverrideMaterial;
    spriteOverrideMaterial;
    materialCacheMap;
    defaultAmbientLight;
    defaultDirectionalLight;
    backgroundCache;
    environmentCache;
    defaultPerspectiveCamera; // 默认透视相机
    defaultOrthograpbicCamera; // 默认正交相机
    axesHelper; // 坐标轴辅助
    gridHelper; // 网格辅助
    showAxesHelper; // 是否展示坐标轴辅助
    showGridHelper; // 是否展示网格辅助
    getDefaultPerspectiveCamera; // 获取默认的透视相机
    getDefaultOrthographicCamera; // 获取默认正交相机
    setAxesHelper; // 设置坐标轴辅助
    setGridHelper; // 设置网格辅助
    setDispalyMode; // 设置场景的渲染模式
    constructor(config) {
        super();
        this.cameraSet = new Set();
        this.lightSet = new Set();
        this.meshSet = new Set();
        this.lineSet = new Set();
        this.pointsSet = new Set();
        this.spriteSet = new Set();
        // 初始化透视相机
        if (config.hasDefaultPerspectiveCamera) {
            if (config.defaultPerspectiveCameraSetting) {
                this.defaultPerspectiveCamera = new PerspectiveCamera(config.defaultPerspectiveCameraSetting.fov, config.defaultPerspectiveCameraSetting.aspect, config.defaultPerspectiveCameraSetting.near, config.defaultPerspectiveCameraSetting.far);
            }
            else {
                this.defaultPerspectiveCamera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
            }
            this.defaultPerspectiveCamera.position.set(30, 30, 30);
            this.defaultPerspectiveCamera.name = '默认透视相机';
            this.cameraSet.add(this.defaultPerspectiveCamera);
            // 获取默认透视相机
            this.getDefaultPerspectiveCamera = function () {
                return this.defaultPerspectiveCamera;
            };
        }
        // 初始化正交相机
        if (config.hasDefaultOrthographicCamera) {
            if (config.defaultOrthographicCameraSetting) {
                const setting = config.defaultOrthographicCameraSetting;
                this.defaultOrthograpbicCamera = new OrthographicCamera(setting.left, setting.right, setting.top, setting.bottom, setting.near, setting.far);
            }
            else {
                const domWidth = window.innerWidth / 2;
                const domHeight = window.innerHeight / 2;
                this.defaultOrthograpbicCamera = new OrthographicCamera(-domWidth / 8, domWidth / 8, domHeight / 8, -domHeight / 8, 1, 1000);
            }
            this.defaultOrthograpbicCamera.name = '默认正交相机';
            this.cameraSet.add(this.defaultOrthograpbicCamera);
            // 获取默认正交相机
            this.getDefaultOrthographicCamera = function () {
                return this.defaultOrthograpbicCamera;
            };
            // 视角监听
            this.addEventListener(`${ModelingSceneViewpoint.TOP}ViewPoint`, e => {
                this.defaultOrthograpbicCamera.position.set(0, 100, 0);
            });
            this.addEventListener(`${ModelingSceneViewpoint.BOTTOM}ViewPoint`, e => {
                this.defaultOrthograpbicCamera.position.set(0, -100, 0);
            });
            this.addEventListener(`${ModelingSceneViewpoint.RIGHT}ViewPoint`, e => {
                this.defaultOrthograpbicCamera.position.set(100, 0, 0);
            });
            this.addEventListener(`${ModelingSceneViewpoint.LEFT}ViewPoint`, e => {
                this.defaultOrthograpbicCamera.position.set(-100, 0, 0);
            });
            this.addEventListener(`${ModelingSceneViewpoint.FRONT}ViewPoint`, e => {
                this.defaultOrthograpbicCamera.position.set(0, 0, 100);
            });
            this.addEventListener(`${ModelingSceneViewpoint.BACK}ViewPoint`, e => {
                this.defaultOrthograpbicCamera.position.set(0, 0, -100);
            });
        }
        // 初始化坐标轴辅助
        if (config.hasAxesHelper) {
            this.axesHelper = new AxesHelper(500);
            this.axesHelper.matrixAutoUpdate = false;
            this.axesHelper.raycast = () => { };
            super.add(this.axesHelper);
            // 设置坐标轴辅助
            this.setAxesHelper = function (setting) {
                const axesHelper = this.axesHelper;
                if (setting.size) {
                    const position = axesHelper.geometry.getAttribute('position');
                    // 改变 1， 3， 5索引的x, y, z
                    position.setX(setting.size, 1);
                    position.setY(setting.size, 3);
                    position.setZ(setting.size, 5);
                    position.needsUpdate = true;
                }
                if (typeof setting.visiable !== undefined) {
                    axesHelper.visible = (setting.visiable);
                }
            };
            // 是否展示坐标轴
            this.showAxesHelper = (show) => {
                if (show) {
                    super.add(this.axesHelper);
                }
                else {
                    super.remove(this.axesHelper);
                }
            };
        }
        // 初始化网格
        if (config.hasGridHelper) {
            const gridHelper = new GridHelper(500, 50, 'rgb(130, 130, 130)', 'rgb(70, 70, 70)');
            if (gridHelper.material instanceof Material) {
                const material = gridHelper.material;
                material.transparent = true;
                material.opacity = 0.5;
                material.needsUpdate = true;
            }
            gridHelper.matrixAutoUpdate = false;
            gridHelper.raycast = () => { };
            this.gridHelper = gridHelper;
            super.add(gridHelper);
            // 视角监听
            this.addEventListener(`${ModelingSceneViewpoint.DEFAULT}ViewPoint`, e => {
                gridHelper.rotation.set(0, 0, 0);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            this.addEventListener(`${ModelingSceneViewpoint.TOP}ViewPoint`, e => {
                gridHelper.rotation.set(0, 0, 0);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            this.addEventListener(`${ModelingSceneViewpoint.BOTTOM}ViewPoint`, e => {
                gridHelper.rotation.set(0, 0, 0);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            this.addEventListener(`${ModelingSceneViewpoint.RIGHT}ViewPoint`, e => {
                gridHelper.rotation.set(0, 0, Math.PI / 2);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            this.addEventListener(`${ModelingSceneViewpoint.LEFT}ViewPoint`, e => {
                gridHelper.rotation.set(0, 0, Math.PI / 2);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            this.addEventListener(`${ModelingSceneViewpoint.FRONT}ViewPoint`, e => {
                gridHelper.rotation.set(Math.PI / 2, 0, 0);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            this.addEventListener(`${ModelingSceneViewpoint.BACK}ViewPoint`, e => {
                gridHelper.rotation.set(Math.PI / 2, 0, 0);
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
            // 是否展示网格
            this.showGridHelper = (show) => {
                if (show) {
                    super.add(this.gridHelper);
                }
                else {
                    super.remove(this.gridHelper);
                }
            };
        }
        // 初始化渲染模式
        if (config.hasDisplayMode) {
            // 场景默认覆盖材质
            const overrideColor = 'rgb(250, 250, 250)';
            this.meshOverrideMaterial = new MeshLambertMaterial({ color: overrideColor });
            this.lineOverrideMaterial = new LineBasicMaterial({ color: overrideColor });
            this.pointsOverrideMaterial = new PointsMaterial({ color: overrideColor, size: 5, sizeAttenuation: false });
            this.spriteOverrideMaterial = new SpriteMaterial({ color: overrideColor });
            this.materialCacheMap = new WeakMap();
            this.defaultAmbientLight = new AmbientLight('rgb(255, 255, 255)', 0.5);
            this.defaultAmbientLight.matrixAutoUpdate = false;
            this.defaultDirectionalLight = new DirectionalLight('rgb(255, 255, 255)', 0.3);
            this.defaultDirectionalLight.castShadow = false;
            this.defaultDirectionalLight.position.set(-100, 100, 100);
            this.defaultDirectionalLight.updateMatrix();
            this.defaultDirectionalLight.updateMatrixWorld();
            this.defaultDirectionalLight.matrixAutoUpdate = false;
            this.setDispalyMode = (mode) => {
                // 过滤材质
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
                // 还原材质
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
                // 过滤灯光
                const filterLight = () => {
                    this.lightSet.forEach((light) => {
                        super.remove(light);
                    });
                    super.add(this.defaultAmbientLight);
                    super.add(this.defaultDirectionalLight);
                };
                // 还原灯光
                const reduceLight = () => {
                    this.lightSet.forEach((light) => {
                        super.add(light);
                    });
                    super.remove(this.defaultAmbientLight);
                    super.remove(this.defaultDirectionalLight);
                };
                // 过滤场景设置
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
                // 还原场景
                const reduceScene = () => {
                    if (this.backgroundCache) {
                        this.background = this.backgroundCache;
                        this.backgroundCache = undefined;
                    }
                    if (this.environmentCache) {
                        this.environment = this.environmentCache;
                        this.environmentCache = undefined;
                    }
                };
                if (mode === ModelingSceneDisplayMode.GEOMETRY) {
                    filterMaterial();
                    filterScene();
                    filterLight();
                }
                else if (mode === ModelingSceneDisplayMode.MATERIAL) {
                    reduceMaterial();
                    filterScene();
                    filterLight();
                }
                else if (mode === ModelingSceneDisplayMode.LIGHT) {
                    reduceMaterial();
                    filterScene();
                    reduceLight();
                }
                else if (mode === ModelingSceneDisplayMode.ENV) {
                    reduceMaterial();
                    reduceScene();
                    reduceLight();
                }
                else {
                    console.warn(`VisScene can not set this mode: ${mode}`);
                }
            };
            if (config.displayMode) {
                this.displayMode = config.displayMode;
                this.setDispalyMode(this.displayMode);
            }
            else {
                this.displayMode = ModelingSceneDisplayMode.ENV;
                this.setDispalyMode(this.displayMode);
            }
        }
    }
    // 设置视角方向
    setViewPoint(direction) {
        this.dispatchEvent({ type: `${direction}ViewPoint` });
    }
    // 添加物体进入场景记录物体与分组 与 渲染模式
    add(...object) {
        object.forEach(elem => {
            if (elem instanceof Mesh) {
                this.meshSet.add(elem);
            }
            else if (elem instanceof Line) {
                this.lineSet.add(elem);
            }
            else if (elem instanceof Light) {
                this.lightSet.add(elem);
            }
            else if (elem instanceof Points) {
                this.pointsSet.add(elem);
            }
            else if (elem instanceof Sprite) {
                this.spriteSet.add(elem);
            }
            else if (elem instanceof Camera) {
                this.cameraSet.add(elem);
            }
        });
        if (this.displayMode !== undefined) {
            this.setDispalyMode(this.displayMode);
        }
        return super.add(...object);
    }
    // 清除不同物体组的缓存 材质缓存
    remove(...object) {
        const materialCacheMap = this.materialCacheMap;
        object.forEach(elem => {
            materialCacheMap && materialCacheMap.has(elem) && materialCacheMap.delete(elem);
            if (elem instanceof Mesh) {
                this.meshSet.delete(elem);
            }
            else if (elem instanceof Line) {
                this.lineSet.delete(elem);
            }
            else if (elem instanceof Light) {
                this.lightSet.delete(elem);
            }
            else if (elem instanceof Points) {
                this.pointsSet.delete(elem);
            }
            else if (elem instanceof Sprite) {
                this.spriteSet.delete(elem);
            }
            else if (elem instanceof Camera) {
                this.cameraSet.delete(elem);
            }
        });
        return super.remove(...object);
    }
    // 内部直接加入场景
    _add(...object) {
        return super.add(...object);
    }
    // 内部直接移出场景
    _remove(...object) {
        return super.remove(...object);
    }
}
//# sourceMappingURL=ModelingScene.js.map