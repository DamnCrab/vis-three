import {
  SymbolConfig,
  Vector2Config,
  getSymbolConfig,
} from "@vis-three/middleware";

export interface RendererConfig extends SymbolConfig {
  size: Vector2Config | null; // 为null 默认跟随canves
}

export interface CSS3DRendererConfig extends RendererConfig {}

export const getRendererConfig = function (): RendererConfig {
  return Object.assign(getSymbolConfig(), { size: null });
};
