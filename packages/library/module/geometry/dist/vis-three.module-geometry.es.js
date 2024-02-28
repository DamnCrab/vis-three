var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { getSymbolConfig, defineProcessor, MODULETYPE, Compiler, Rule, Bus, COMPILER_EVENT, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { Quaternion, Euler, BoxBufferGeometry, CircleBufferGeometry, ConeBufferGeometry, Vector2, BufferGeometry, CurvePath, CubicBezierCurve3, LineCurve3, QuadraticBezierCurve3, CatmullRomCurve3, ShapeBufferGeometry, Shape, TubeGeometry, Path, Vector3, Float32BufferAttribute, CylinderBufferGeometry, EdgesGeometry, PlaneBufferGeometry, RingBufferGeometry, SphereBufferGeometry, TorusGeometry, ExtrudeBufferGeometry, LatheGeometry, Mesh } from "three";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry";
const transfromAnchor = function(geometry, config) {
  config.center && geometry.center();
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  const position = config.position;
  const rotation = config.rotation;
  const scale = config.scale;
  const quaternion = new Quaternion().setFromEuler(
    new Euler(rotation.x, rotation.y, rotation.z, "XYZ")
  );
  geometry.applyQuaternion(quaternion);
  geometry.scale(scale.x, scale.y, scale.z);
  config.center && geometry.center();
  geometry.computeBoundingBox();
  geometry.translate(
    (box.max.x - box.min.x) / 2 * position.x,
    (box.max.y - box.min.y) / 2 * position.y,
    (box.max.z - box.min.z) / 2 * position.z
  );
  return geometry;
};
const commonRegCommand = {
  reg: new RegExp(".*"),
  handler({
    config,
    target,
    processor,
    engine,
    compiler
  }) {
    const newGeometry = processor.create(config, engine, compiler);
    target.copy(newGeometry);
    target.uuid = newGeometry.uuid;
    processor.dispose(newGeometry, engine, compiler);
  }
};
const commands = {
  add: {
    groups({ target, value }) {
      target.addGroup(value.start, value.count, value.materialIndex);
    },
    $reg: [commonRegCommand]
  },
  set: {
    groups(params) {
      const { path, target, config } = params;
      if (path[1] !== void 0) {
        target.groups.splice(Number(params.path[1]), 1);
        const group = config.groups[path[1]];
        target.addGroup(group.start, group.count, group.materialIndex);
      } else {
        console.warn(`geometry processor can not set group`, params);
      }
    },
    $reg: [commonRegCommand]
  },
  delete: {
    groups({ target, key }) {
      target.groups.splice(Number(key), 1);
    },
    $reg: [commonRegCommand]
  }
};
const create = function(target, config) {
  target.clearGroups();
  for (const group of config.groups) {
    target.addGroup(group.start, group.count, group.materialIndex);
  }
  return transfromAnchor(target, config);
};
const dispose = function(target) {
  target.dispose();
};
const getGeometryConfig = function() {
  return Object.assign(getSymbolConfig(), {
    center: true,
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
    },
    groups: []
  });
};
const getBoxGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
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
    radius: 3,
    widthSegments: 32,
    heightSegments: 32,
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI
  });
};
const getPlaneGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    width: 5,
    height: 5,
    widthSegments: 1,
    heightSegments: 1
  });
};
const getCircleGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    radius: 3,
    segments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  });
};
const getConeGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    radius: 3,
    height: 5,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  });
};
const getTorusGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    radius: 3,
    tube: 0.4,
    radialSegments: 8,
    tubularSegments: 6,
    arc: Math.PI * 2
  });
};
const getRingGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    innerRadius: 2,
    outerRadius: 3,
    thetaSegments: 8,
    phiSegments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  });
};
const getLoadGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    url: ""
  });
};
const getCustomGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    attribute: {
      position: [],
      color: [],
      index: [],
      normal: [],
      uv: [],
      uv2: []
    }
  });
};
const getCylinderGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    radiusTop: 3,
    radiusBottom: 3,
    height: 5,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: Math.PI * 2
  });
};
const getEdgesGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    target: "",
    thresholdAngle: 1
  });
};
const getCurveGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    center: false,
    path: [],
    divisions: 36,
    space: true
  });
};
const getLineCurveGeometryConfig = function() {
  return Object.assign(getCurveGeometryConfig(), { center: false });
};
const getSplineCurveGeometryConfig = function() {
  return Object.assign(getCurveGeometryConfig(), { center: false });
};
const getCubicBezierCurveGeometryConfig = function() {
  return Object.assign(getCurveGeometryConfig(), { center: false });
};
const getQuadraticBezierCurveGeometryConfig = function() {
  return Object.assign(getCurveGeometryConfig(), { center: false });
};
const getTubeGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    center: false,
    path: [],
    tubularSegments: 64,
    radius: 1,
    radialSegments: 8,
    closed: false
  });
};
const getLineTubeGeometryConfig = function() {
  return Object.assign(getTubeGeometryConfig(), { center: false });
};
const getSplineTubeGeometryConfig = function() {
  return Object.assign(getTubeGeometryConfig(), { center: false });
};
const getPathTubeGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    center: false,
    path: "",
    tubularSegments: 64,
    radius: 1,
    radialSegments: 8,
    closed: false
  });
};
const getShapeGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    center: false,
    shape: "",
    curveSegments: 12
  });
};
const getLineShapeGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    center: false,
    path: [],
    curveSegments: 12
  });
};
const getExtrudeGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    center: false,
    shapes: "",
    options: {
      curveSegments: 12,
      steps: 1,
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 3,
      extrudePath: "",
      UVGenerator: "default"
    }
  });
};
const getPathGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    center: false,
    path: "",
    space: false,
    divisions: 36
  });
};
const getLatheGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    path: "",
    divisions: 32,
    segments: 12,
    phiStart: 0,
    phiLength: Math.PI * 2
  });
};
const getDecalGeometryConfig = function() {
  return Object.assign(getGeometryConfig(), {
    center: false,
    target: {
      geometry: "",
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 0, y: 0, z: 0 }
    },
    point: { x: 0, y: 0, z: 0 },
    orientation: { x: 0, y: 0, z: 0 },
    size: { x: 0, y: 0, z: 0 }
  });
};
var BoxGeometryProcessor = defineProcessor({
  type: "BoxGeometry",
  config: getBoxGeometryConfig,
  commands,
  create: (config) => create(
    new BoxBufferGeometry(
      config.width,
      config.height,
      config.depth,
      config.widthSegments,
      config.heightSegments,
      config.depthSegments
    ),
    config
  ),
  dispose
});
var CircleGeometryProcessor = defineProcessor({
  type: "CircleGeometry",
  config: getCircleGeometryConfig,
  commands,
  create: (config) => create(
    new CircleBufferGeometry(
      config.radius,
      config.segments,
      config.thetaStart,
      config.thetaLength
    ),
    config
  ),
  dispose
});
var ConeGeometryProcessor = defineProcessor({
  type: "ConeGeometry",
  config: getConeGeometryConfig,
  commands,
  create: (config) => create(
    new ConeBufferGeometry(
      config.radius,
      config.height,
      config.radialSegments,
      config.heightSegments,
      config.openEnded,
      config.thetaStart,
      config.thetaLength
    ),
    config
  ),
  dispose
});
const limit = function(number) {
  return number > 1 ? 1 : number < 0 ? 0 : number;
};
const cover = {
  generateTopUV(geometry, vertices, indexA, indexB, indexC) {
    const a_x = vertices[indexA * 3];
    const a_y = vertices[indexA * 3 + 1];
    const b_x = vertices[indexB * 3];
    const b_y = vertices[indexB * 3 + 1];
    const c_x = vertices[indexC * 3];
    const c_y = vertices[indexC * 3 + 1];
    return [
      new Vector2(limit(a_x), limit(a_y)),
      new Vector2(limit(b_x), limit(b_y)),
      new Vector2(limit(c_x), limit(c_y))
    ];
  },
  generateSideWallUV(geometry, vertices, indexA, indexB, indexC, indexD) {
    const a_x = vertices[indexA * 3];
    const a_y = vertices[indexA * 3 + 1];
    const a_z = vertices[indexA * 3 + 2];
    const b_x = vertices[indexB * 3];
    const b_y = vertices[indexB * 3 + 1];
    const b_z = vertices[indexB * 3 + 2];
    const c_x = vertices[indexC * 3];
    const c_y = vertices[indexC * 3 + 1];
    const c_z = vertices[indexC * 3 + 2];
    const d_x = vertices[indexD * 3];
    const d_y = vertices[indexD * 3 + 1];
    const d_z = vertices[indexD * 3 + 2];
    if (Math.abs(a_y - b_y) < Math.abs(a_x - b_x)) {
      return [
        new Vector2(limit(a_x), limit(1 - a_z)),
        new Vector2(limit(b_x), limit(1 - b_z)),
        new Vector2(limit(c_x), limit(1 - c_z)),
        new Vector2(limit(d_x), limit(1 - d_z))
      ];
    } else {
      return [
        new Vector2(limit(a_y), limit(1 - a_z)),
        new Vector2(limit(b_y), limit(1 - b_z)),
        new Vector2(limit(c_y), limit(1 - c_z)),
        new Vector2(limit(d_y), limit(1 - d_z))
      ];
    }
  }
};
var ExtrudeUVGenerator = { default: void 0, cover };
class LoadGeometry extends BufferGeometry {
  constructor(geometry) {
    super();
    __publicField(this, "type", "LoadBufferGeometry");
    geometry && this.copy(geometry);
  }
}
class CurveGeometry extends BufferGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super();
    __publicField(this, "parameters");
    this.type = "CurveGeometry";
    this.parameters = {
      path: path.map((vector3) => vector3.clone()),
      space,
      divisions
    };
  }
}
class CubicBezierCurveGeometry extends CurveGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super(path, divisions, space);
    this.type = "CubicBezierCurveGeometry";
    const curvePath = new CurvePath();
    if (path.length < 4) {
      console.warn(`CubicBezierCurveGeometry path length at least 4.`);
      return;
    }
    const length = 4 + (path.length - 4) - (path.length - 4) % 3;
    for (let i = 2; i < length; i += 3) {
      curvePath.add(
        new CubicBezierCurve3(path[i - 2], path[i - 1], path[i], path[i + 1])
      );
    }
    const totalArcLengthDivisions = curvePath.curves.reduce((sum, curve) => {
      return sum += curve.arcLengthDivisions;
    }, 0);
    if (divisions > totalArcLengthDivisions) {
      const mutily = Math.ceil(
        (divisions - totalArcLengthDivisions) / curvePath.curves.length
      );
      curvePath.curves.forEach((curve) => {
        curve.arcLengthDivisions = curve.arcLengthDivisions * (mutily + 1);
        curve.updateArcLengths();
      });
    }
    this.setFromPoints(
      space ? curvePath.getSpacedPoints(divisions) : curvePath.getPoints(divisions)
    );
  }
}
class LineCurveGeometry extends CurveGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super(path, divisions, space);
    this.type = "LineCurveGeometry";
    if (!path.length) {
      console.warn(`LineCurveGeometry path length at least 1.`);
      return;
    }
    const curvePath = new CurvePath();
    for (let i = 1; i < path.length; i += 1) {
      curvePath.add(new LineCurve3(path[i - 1], path[i]));
    }
    const totalArcLengthDivisions = curvePath.curves.reduce((sum, curve) => {
      return sum += curve.arcLengthDivisions;
    }, 0);
    if (divisions > totalArcLengthDivisions) {
      const mutily = Math.ceil(
        (divisions - totalArcLengthDivisions) / curvePath.curves.length
      );
      curvePath.curves.forEach((curve) => {
        curve.arcLengthDivisions = curve.arcLengthDivisions * (mutily + 1);
        curve.updateArcLengths();
      });
    }
    this.setFromPoints(
      space ? curvePath.getSpacedPoints(divisions) : curvePath.getPoints(divisions)
    );
  }
}
class QuadraticBezierCurveGeometry extends CurveGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super(path, divisions, space);
    this.type = "QuadraticBezierCurveGeometry";
    const curvePath = new CurvePath();
    if (path.length < 3) {
      console.warn(`QuadraticBezierCurveGeometry path length at least 3.`);
      return;
    }
    const length = 3 + (path.length - 3) - (path.length - 3) % 2;
    for (let i = 1; i < length; i += 2) {
      curvePath.add(
        new QuadraticBezierCurve3(path[i - 1], path[i], path[i + 1])
      );
    }
    const totalArcLengthDivisions = curvePath.curves.reduce((sum, curve) => {
      return sum += curve.arcLengthDivisions;
    }, 0);
    if (divisions > totalArcLengthDivisions) {
      const mutily = Math.ceil(
        (divisions - totalArcLengthDivisions) / curvePath.curves.length
      );
      curvePath.curves.forEach((curve) => {
        curve.arcLengthDivisions = curve.arcLengthDivisions * (mutily + 1);
        curve.updateArcLengths();
      });
    }
    this.setFromPoints(
      space ? curvePath.getSpacedPoints(divisions) : curvePath.getPoints(divisions)
    );
  }
}
class SplineCurveGeometry extends CurveGeometry {
  constructor(path = [], divisions = 36, space = true) {
    super(path, divisions, space);
    this.type = "SplineCurveGeometry";
    if (!path.length) {
      console.warn(`SplineCurveGeometry path length at least 1.`);
      return;
    }
    const splineCurve = new CatmullRomCurve3(path);
    this.setFromPoints(
      space ? splineCurve.getSpacedPoints(divisions) : splineCurve.getPoints(divisions)
    );
  }
}
class LineShapeGeometry extends ShapeBufferGeometry {
  constructor(path = [new Vector2(0, 0)], curveSegments = 12) {
    const lineShape = new Shape();
    const move = path[0];
    if (move) {
      lineShape.moveTo(move.x, move.y);
      for (let i = 1; i < path.length; i += 1) {
        lineShape.lineTo(path[i].x, path[i].y);
      }
    }
    super(lineShape, curveSegments);
    this.type = "LineShapeGeometry";
  }
}
class LineTubeGeometry extends TubeGeometry {
  constructor(path = [], tubularSegments = 64, radius = 1, radialSegments = 8, closed = false) {
    if (!path.length) {
      console.warn(`LineTubeGeometry path length at least 1.`);
      return;
    }
    const curvePath = new CurvePath();
    for (let i = 1; i < path.length; i += 1) {
      curvePath.add(new LineCurve3(path[i - 1], path[i]));
    }
    super(curvePath, tubularSegments, radius, radialSegments, closed);
    this.type = "LineTubeGeometry";
  }
}
class SplineTubeGeometry extends TubeGeometry {
  constructor(path = [], tubularSegments = 64, radius = 1, radialSegments = 8, closed = false) {
    if (!path.length) {
      console.warn(`SplineTubeGeometry path length at least 1.`);
      return;
    }
    const splineCurve = new CatmullRomCurve3(path);
    super(splineCurve, tubularSegments, radius, radialSegments, closed);
    this.type = "SplineTubeGeometry";
  }
}
class PathTubeGeometry extends TubeGeometry {
  constructor(path = new Path(), tubularSegments = 64, radius = 1, radialSegments = 8, closed = false) {
    super(path, tubularSegments, radius, radialSegments, closed);
    this.type = "PathTubeGeometry";
  }
}
class PathGeometry extends BufferGeometry {
  constructor(path = new Path(), divisions = 36, space = true) {
    super();
    __publicField(this, "parameters");
    this.type = "PathGeometry";
    this.parameters = {
      path,
      space,
      divisions
    };
    path.curves.length && this.setFromPoints(
      space ? path.getSpacedPoints(divisions) : path.getPoints(divisions)
    );
  }
}
var CubicBezierCurveGeometryProcessor = defineProcessor({
  type: "CubicBezierCurveGeometry",
  config: getCubicBezierCurveGeometryConfig,
  commands,
  create: (config) => create(
    new CubicBezierCurveGeometry(
      config.path.map(
        (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
      ),
      config.divisions,
      config.space
    ),
    config
  ),
  dispose
});
const generateGeometry = function(attribute) {
  const geometry = new BufferGeometry();
  attribute.position.length && geometry.setAttribute(
    "position",
    new Float32BufferAttribute(attribute.position, 3)
  );
  attribute.color.length && geometry.setAttribute(
    "color",
    new Float32BufferAttribute(attribute.color, 3)
  );
  attribute.normal.length && geometry.setAttribute(
    "normal",
    new Float32BufferAttribute(attribute.normal, 3)
  );
  attribute.uv.length && geometry.setAttribute("uv", new Float32BufferAttribute(attribute.uv, 2));
  attribute.uv2.length && geometry.setAttribute("uv2", new Float32BufferAttribute(attribute.uv2, 2));
  attribute.index.length && geometry.setIndex(attribute.index);
  return geometry;
};
var CustomGeometryProcessor = defineProcessor({
  type: "CustomGeometry",
  config: getCustomGeometryConfig,
  commands,
  create(config) {
    return create(generateGeometry(config.attribute), config);
  },
  dispose(target) {
    target.dispose();
  }
});
var CylinderGeometryProcessor = defineProcessor({
  type: "CylinderGeometry",
  config: getCylinderGeometryConfig,
  commands,
  create: (config) => create(
    new CylinderBufferGeometry(
      config.radiusTop,
      config.radiusBottom,
      config.height,
      config.radialSegments,
      config.heightSegments,
      config.openEnded,
      config.thetaStart,
      config.thetaLength
    ),
    config
  ),
  dispose
});
const occupyGeometry = new EdgesGeometry(new BoxBufferGeometry(5, 5, 5));
var EdgesGeometryProcessor = defineProcessor({
  type: "EdgesGeometry",
  config: getEdgesGeometryConfig,
  commands,
  create(config, engine) {
    const geometry = engine.compilerManager.getObjectfromModule(
      MODULETYPE.GEOMETRY,
      config.target
    );
    if (!geometry || !(geometry instanceof BufferGeometry)) {
      console.error(`engine rescoure can not found url: ${config.target}`);
      return occupyGeometry;
    }
    return create(
      new EdgesGeometry(geometry, config.thresholdAngle),
      config
    );
  },
  dispose(target) {
    target.dispose();
  }
});
class GeometryCompiler extends Compiler {
  constructor() {
    super();
  }
}
const GeometryRule = function(notice, compiler) {
  Rule(notice, compiler);
};
var LineCurveGeometryProcessor = defineProcessor({
  type: "LineCurveGeometry",
  config: getLineCurveGeometryConfig,
  commands,
  create: (config) => create(
    new LineCurveGeometry(
      config.path.map(
        (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
      ),
      config.divisions,
      config.space
    ),
    config
  ),
  dispose
});
var LineShapeGeometryProcessor = defineProcessor({
  type: "LineShapeGeometry",
  config: getLineShapeGeometryConfig,
  commands,
  create: (config) => create(
    new LineShapeGeometry(
      config.path.map((vector2) => new Vector2(vector2.x, vector2.y)),
      config.curveSegments
    ),
    config
  ),
  dispose
});
var LineTubeGeometryProcessor = defineProcessor({
  type: "LineTubeGeometry",
  config: getLineTubeGeometryConfig,
  commands,
  create: (config) => create(
    new LineTubeGeometry(
      config.path.map(
        (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
      ),
      config.tubularSegments,
      config.radius,
      config.radialSegments,
      config.closed
    ),
    config
  ),
  dispose
});
var LoadGeometryProcessor = defineProcessor({
  type: "LoadGeometry",
  config: getLoadGeometryConfig,
  commands,
  create(config, engine) {
    const originGeometry = engine.resourceManager.resourceMap.get(config.url);
    if (!originGeometry && !(originGeometry instanceof BufferGeometry)) {
      console.error(`engine rescoure can not found url: ${config.url}`);
      return new BoxBufferGeometry(5, 5, 5);
    }
    return create(new LoadGeometry(originGeometry), config);
  },
  dispose(target) {
    target.dispose();
  }
});
var PlaneGeometryProcessor = defineProcessor({
  type: "PlaneGeometry",
  config: getPlaneGeometryConfig,
  commands,
  create: (config) => create(
    new PlaneBufferGeometry(
      config.width,
      config.height,
      config.widthSegments,
      config.heightSegments
    ),
    config
  ),
  dispose
});
var QuadraticBezierCurveGeometryProcessor = defineProcessor({
  type: "QuadraticBezierCurveGeometry",
  config: getQuadraticBezierCurveGeometryConfig,
  commands,
  create: (config) => create(
    new QuadraticBezierCurveGeometry(
      config.path.map(
        (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
      ),
      config.divisions,
      config.space
    ),
    config
  ),
  dispose
});
var RingGeometryProcessor = defineProcessor({
  type: "RingGeometry",
  config: getRingGeometryConfig,
  commands,
  create: (config) => create(
    new RingBufferGeometry(
      config.innerRadius,
      config.outerRadius,
      config.thetaSegments,
      config.phiSegments,
      config.thetaStart,
      config.thetaLength
    ),
    config
  ),
  dispose
});
var SphereGeometryProcessor = defineProcessor({
  type: "SphereGeometry",
  config: getSphereGeometryConfig,
  commands,
  create: (config) => create(
    new SphereBufferGeometry(
      config.radius,
      config.widthSegments,
      config.heightSegments,
      config.phiStart,
      config.phiLength,
      config.thetaStart,
      config.thetaLength
    ),
    config
  ),
  dispose
});
var SplineCurveGeometryProcessor = defineProcessor({
  type: "SplineCurveGeometry",
  config: getSplineCurveGeometryConfig,
  commands,
  create: (config) => create(
    new SplineCurveGeometry(
      config.path.map(
        (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
      ),
      config.divisions,
      config.space
    ),
    config
  ),
  dispose
});
var SplineTubeGeometryProcessor = defineProcessor({
  type: "SplineTubeGeometry",
  config: getSplineTubeGeometryConfig,
  commands,
  create: (config) => create(
    new SplineTubeGeometry(
      config.path.map(
        (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
      ),
      config.tubularSegments,
      config.radius,
      config.radialSegments,
      config.closed
    ),
    config
  ),
  dispose
});
var TorusGeometryProcessor = defineProcessor({
  type: "TorusGeometry",
  config: getTorusGeometryConfig,
  commands,
  create: (config) => create(
    new TorusGeometry(
      config.radius,
      config.tube,
      config.radialSegments,
      config.tubularSegments,
      config.arc
    ),
    config
  ),
  dispose
});
const cacheBusMap$4 = /* @__PURE__ */ new WeakMap();
const cacheBusObject$4 = function(geometry, object, fun) {
  if (!cacheBusMap$4.has(geometry)) {
    cacheBusMap$4.set(geometry, /* @__PURE__ */ new Set());
  }
  const set = cacheBusMap$4.get(geometry);
  set.add({
    target: object,
    eventFun: fun
  });
};
var ExtrudeGeometryProcessor = defineProcessor({
  type: "ExtrudeGeometry",
  config: getExtrudeGeometryConfig,
  commands,
  create(config, engine) {
    const shape = engine.compilerManager.getObjectfromModule(
      MODULETYPE.SHAPE,
      config.shapes
    ) || void 0;
    const extrudePath = engine.compilerManager.getObjectfromModule(
      MODULETYPE.PATH,
      config.options.extrudePath
    ) || void 0;
    const geometry = new ExtrudeBufferGeometry(
      shape,
      Object.assign({}, config.options, {
        extrudePath,
        UVGenerator: ExtrudeUVGenerator[config.options.UVGenerator || "default"]
      })
    );
    if (shape) {
      const eventFun = () => {
        config.shapes = config.shapes;
      };
      Bus.compilerEvent.on(shape, COMPILER_EVENT.UPDATE, eventFun);
      cacheBusObject$4(geometry, shape, eventFun);
    }
    if (extrudePath) {
      const eventFun = () => {
        config.options.extrudePath = config.options.extrudePath;
      };
      Bus.compilerEvent.on(extrudePath, COMPILER_EVENT.UPDATE, eventFun);
      cacheBusObject$4(geometry, extrudePath, eventFun);
    }
    return create(geometry, config);
  },
  dispose(target, engine, compiler) {
    const set = cacheBusMap$4.get(target);
    if (set) {
      set.forEach((params) => {
        Bus.compilerEvent.off(
          params.target,
          COMPILER_EVENT.UPDATE,
          params.eventFun
        );
      });
    }
    cacheBusMap$4.delete(target);
    dispose(target);
  }
});
const cacheBusMap$3 = /* @__PURE__ */ new WeakMap();
const cacheBusObject$3 = function(geometry, object, fun) {
  cacheBusMap$3.set(geometry, {
    target: object,
    eventFun: fun
  });
};
var PathGeometryProcessor = defineProcessor({
  type: "PathGeometry",
  config: getPathGeometryConfig,
  commands,
  create(config, engine) {
    const path = engine.compilerManager.getObjectfromModule(
      MODULETYPE.PATH,
      config.path
    ) || void 0;
    const geometry = new PathGeometry(path, config.divisions, config.space);
    if (path) {
      const eventFun = () => {
        config.path = config.path;
      };
      Bus.compilerEvent.on(path, COMPILER_EVENT.UPDATE, eventFun);
      cacheBusObject$3(geometry, path, eventFun);
    }
    return create(geometry, config);
  },
  dispose(target, engine, compiler) {
    const params = cacheBusMap$3.get(target);
    if (params) {
      Bus.compilerEvent.off(
        params.target,
        COMPILER_EVENT.UPDATE,
        params.eventFun
      );
    }
    cacheBusMap$3.delete(target);
    dispose(target);
  }
});
const cacheBusMap$2 = /* @__PURE__ */ new WeakMap();
const cacheBusObject$2 = function(geometry, object, fun) {
  cacheBusMap$2.set(geometry, {
    target: object,
    eventFun: fun
  });
};
var ShapeGeometryProcessor = defineProcessor({
  type: "ShapeGeometry",
  config: getShapeGeometryConfig,
  commands,
  create(config, engine) {
    const shape = engine.compilerManager.getObjectfromModule(
      MODULETYPE.SHAPE,
      config.shape
    ) || void 0;
    const geometry = new ShapeBufferGeometry(shape, config.curveSegments);
    if (shape) {
      const eventFun = () => {
        config.shape = config.shape;
      };
      Bus.compilerEvent.on(shape, COMPILER_EVENT.UPDATE, eventFun);
      cacheBusObject$2(geometry, shape, eventFun);
    }
    return create(geometry, config);
  },
  dispose(target, engine, compiler) {
    const params = cacheBusMap$2.get(target);
    if (params) {
      Bus.compilerEvent.off(
        params.target,
        COMPILER_EVENT.UPDATE,
        params.eventFun
      );
    }
    cacheBusMap$2.delete(target);
    dispose(target);
  }
});
const cacheBusMap$1 = /* @__PURE__ */ new WeakMap();
const cacheBusObject$1 = function(geometry, object, fun) {
  cacheBusMap$1.set(geometry, {
    target: object,
    eventFun: fun
  });
};
var LatheGeometryProcessor = defineProcessor({
  type: "LatheGeometry",
  config: getLatheGeometryConfig,
  commands,
  create(config, engine) {
    const path = engine.compilerManager.getObjectfromModule(
      MODULETYPE.PATH,
      config.path
    ) || void 0;
    const geometry = new LatheGeometry(
      path ? path.getPoints(config.divisions) : void 0,
      config.segments,
      config.phiStart,
      config.phiLength
    );
    if (path) {
      const eventFun = () => {
        config.path = config.path;
      };
      Bus.compilerEvent.on(path, COMPILER_EVENT.UPDATE, eventFun);
      cacheBusObject$1(geometry, path, eventFun);
    }
    return create(geometry, config);
  },
  dispose(target) {
    const params = cacheBusMap$1.get(target);
    if (params) {
      Bus.compilerEvent.off(
        params.target,
        COMPILER_EVENT.UPDATE,
        params.eventFun
      );
    }
    cacheBusMap$1.delete(target);
    dispose(target);
  }
});
const tempGeometry = new BufferGeometry();
const tempMesh = new Mesh();
var DecalGeometryProcessor = defineProcessor({
  type: "DecalGeometry",
  config: getDecalGeometryConfig,
  commands,
  create: (config, engine) => {
    const geometry = config.target.geometry ? engine.getObjectBySymbol(config.target.geometry) || tempGeometry : tempGeometry;
    tempMesh.geometry = geometry;
    tempMesh.matrixWorld.compose(
      new Vector3(
        config.target.position.x,
        config.target.position.y,
        config.target.position.z
      ),
      new Quaternion().setFromEuler(
        new Euler(
          config.target.rotation.x,
          config.target.rotation.y,
          config.target.rotation.z
        )
      ),
      new Vector3(
        config.target.scale.x,
        config.target.scale.y,
        config.target.scale.z
      )
    );
    return create(
      new DecalGeometry(
        tempMesh,
        new Vector3(config.point.x, config.point.y, config.point.z),
        new Euler(
          config.orientation.x,
          config.orientation.y,
          config.orientation.z
        ),
        new Vector3(config.size.x, config.size.y, config.size.z)
      ),
      config
    );
  },
  dispose
});
const cacheBusMap = /* @__PURE__ */ new WeakMap();
const cacheBusObject = function(geometry, object, fun) {
  cacheBusMap.set(geometry, {
    target: object,
    eventFun: fun
  });
};
let restrictor = 0;
var PathTubeGeometryProcessor = defineProcessor({
  type: "PathTubeGeometry",
  config: getPathTubeGeometryConfig,
  commands,
  create: (config, engine) => {
    const path = engine.compilerManager.getObjectfromModule(
      MODULETYPE.PATH,
      config.path
    ) || void 0;
    const geometry = new PathTubeGeometry(
      path,
      config.tubularSegments,
      config.radius,
      config.radialSegments,
      config.closed
    );
    if (path) {
      const eventFun = () => {
        if (restrictor) {
          return;
        }
        restrictor = window.setTimeout(() => {
          config.path = config.path;
          restrictor = 0;
        }, 1e3 / 30);
      };
      Bus.compilerEvent.on(path, COMPILER_EVENT.UPDATE, eventFun);
      cacheBusObject(geometry, path, eventFun);
    }
    return create(
      new PathTubeGeometry(
        engine.getObjectBySymbol(config.path),
        config.tubularSegments,
        config.radius,
        config.radialSegments,
        config.closed
      ),
      config
    );
  },
  dispose(target, engine, compiler) {
    const params = cacheBusMap.get(target);
    if (params) {
      Bus.compilerEvent.off(
        params.target,
        COMPILER_EVENT.UPDATE,
        params.eventFun
      );
    }
    cacheBusMap.delete(target);
    dispose(target);
  }
});
var index = {
  type: "geometry",
  compiler: GeometryCompiler,
  rule: GeometryRule,
  lifeOrder: SUPPORT_LIFE_CYCLE.TWO,
  processors: [
    BoxGeometryProcessor,
    CircleGeometryProcessor,
    ConeGeometryProcessor,
    CubicBezierCurveGeometryProcessor,
    CustomGeometryProcessor,
    CylinderGeometryProcessor,
    EdgesGeometryProcessor,
    LineCurveGeometryProcessor,
    LineShapeGeometryProcessor,
    LineTubeGeometryProcessor,
    LoadGeometryProcessor,
    PlaneGeometryProcessor,
    QuadraticBezierCurveGeometryProcessor,
    RingGeometryProcessor,
    SphereGeometryProcessor,
    SplineCurveGeometryProcessor,
    SplineTubeGeometryProcessor,
    TorusGeometryProcessor,
    ExtrudeGeometryProcessor,
    PathGeometryProcessor,
    ShapeGeometryProcessor,
    LatheGeometryProcessor,
    DecalGeometryProcessor,
    PathTubeGeometryProcessor
  ]
};
export { CubicBezierCurveGeometry, CurveGeometry, ExtrudeUVGenerator, GeometryCompiler, LineCurveGeometry, LineShapeGeometry, LineTubeGeometry, LoadGeometry, PathGeometry, PathTubeGeometry, QuadraticBezierCurveGeometry, SplineCurveGeometry, SplineTubeGeometry, index as default };
