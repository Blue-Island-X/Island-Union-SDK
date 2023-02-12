"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataUtil = void 0;
const form_data_1 = __importDefault(require("form-data"));
class DataUtil {
    static object2FormData(input) {
        const formData = new form_data_1.default();
        for (const key in input) {
            formData.append(key, input[key]);
        }
        return formData;
    }
}
exports.DataUtil = DataUtil;
