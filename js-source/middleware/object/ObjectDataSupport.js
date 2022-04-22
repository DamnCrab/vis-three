import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
export class ObjectDataSupport extends DataSupport {
    MODULE = MODULETYPE.GROUP;
    constructor(rule, data) {
        !data && (data = Object.create(Object.prototype));
        super(rule, data);
    }
}
//# sourceMappingURL=ObjectDataSupport.js.map