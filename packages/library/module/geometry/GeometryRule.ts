import { ProxyNotice, Rule } from "@vis-three/middleware";
import { GeometryCompiler } from "./GeometryCompiler";

export const GeometryRule: Rule<GeometryCompiler> = function (
  notice: ProxyNotice,
  compiler: GeometryCompiler
) {
  Rule(notice, compiler);
};
