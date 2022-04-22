import { BoxBufferGeometry, Mesh, MeshBasicMaterial, } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler, } from "../solidObject/SolidObjectCompiler";
export class MeshCompiler extends SolidObjectCompiler {
    COMPILER_NAME = MODULETYPE.MESH;
    replaceMaterial = new MeshBasicMaterial({
        color: "rgb(150, 150, 150)",
    });
    replaceGeometry = new BoxBufferGeometry(10, 10, 10);
    constructor(parameters) {
        super(parameters);
    }
    getReplaceMaterial() {
        return this.replaceMaterial;
    }
    getReplaceGeometry() {
        return this.replaceGeometry;
    }
    add(vid, config) {
        let material;
        if (typeof config.material === "string") {
            material = this.getMaterial(config.material);
        }
        else {
            material = config.material.map((vid) => this.getMaterial(vid));
        }
        const object = new Mesh(this.getGeometry(config.geometry), material);
        Compiler.applyConfig(config, object, {
            geometry: true,
            material: true,
            lookAt: true,
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
        for (const key of path) {
            mesh = mesh[key];
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
//# sourceMappingURL=MeshCompiler.js.map