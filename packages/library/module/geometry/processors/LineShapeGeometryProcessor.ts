import {
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/middleware";
import { Vector2 } from "three";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getLineShapeGeometryConfig } from "../GeometryConfig";
import { LineShapeGeometryConfig } from "../GeometryInterface";
import { LineShapeGeometry } from "../extends";

export default defineProcessor<
  LineShapeGeometryConfig,
  LineShapeGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "LineShapeGeometry",
  config: getLineShapeGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    LineShapeGeometryConfig,
    LineShapeGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config) =>
    create(
      new LineShapeGeometry(
        config.path.map((vector2) => new Vector2(vector2.x, vector2.y)),
        config.curveSegments
      ),
      config
    ),
  dispose: dispose,
});
