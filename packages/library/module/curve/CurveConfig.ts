import {
  SymbolConfig,
  Vector2Config,
  getSymbolConfig,
} from "@vis-three/middleware";

export interface CurveConfig extends SymbolConfig {
  arcLengthDivisions: number;
}

export interface ArcCurveConfig extends CurveConfig {
  start: Vector2Config;
  end: Vector2Config;
  radius: number;
  clockwise: boolean;
}

export const getCurveConfig = function (): CurveConfig {
  return Object.assign(getSymbolConfig(), {
    arcLengthDivisions: 200,
  });
};

export const getArcCurveConfig = function (): ArcCurveConfig {
  return Object.assign(getCurveConfig(), {
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 0,
      y: 0,
    },
    radius: 5,
    clockwise: false,
  });
};