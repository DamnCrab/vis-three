import { ReflectorConfig } from "./ReflectorConfig";
import { Reflector } from "three/examples/jsm/objects/Reflector";
import { ObjectCompiler } from "@vis-three/module-object";

export class ReflectorCompiler extends ObjectCompiler<
  ReflectorConfig,
  Reflector
> {
  constructor() {
    super();
  }
}
