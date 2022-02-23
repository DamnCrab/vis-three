import { CompilerManager } from "../manager/CompilerManager";
import { DataSupportManager, LoadOptions } from "../manager/DataSupportManager";
import { LoaderManager } from "../manager/LoaderManager";
import { MappedEvent, ResourceManager } from "../manager/ResourceManager";
import { Engine } from "./Engine";
export interface EngineSupportParameters {
    dataSupportManager: DataSupportManager;
}
export interface EngineSupportLoadOptions extends LoadOptions {
    assets?: string[];
}
export declare class EngineSupport extends Engine {
    IS_ENGINESUPPORT: boolean;
    loaderManager: LoaderManager;
    resourceManager: ResourceManager;
    dataSupportManager: DataSupportManager;
    compilerManager: CompilerManager;
    loadResources: (urlList: Array<string>) => this;
    registerResources: (resourceMap: {
        [key: string]: unknown;
    }) => this;
    toJSON: () => string;
    constructor(parameters?: EngineSupportParameters);
    loadConfig(config: EngineSupportLoadOptions, callback?: (event?: MappedEvent) => void): this;
    loadConfigAsync(config: EngineSupportLoadOptions): Promise<MappedEvent | undefined>;
}
