import { Intersection, LineSegments, Mesh, PointLight, Raycaster, Sphere } from "three";
import { VisHelper } from "../common";
export declare class PointLightHelper extends LineSegments implements VisHelper {
    sphere: Sphere;
    target: PointLight;
    shape: Mesh;
    type: string;
    private cacheColor;
    private cacheDistance;
    private cacheVector3;
    constructor(pointLight: PointLight);
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}
