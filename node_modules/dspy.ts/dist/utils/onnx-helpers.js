"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONNXUtils = void 0;
const ort = __importStar(require("onnxruntime-web"));
/**
 * Helper functions for ONNX model operations
 */
class ONNXUtils {
    /**
     * Validate model metadata
     */
    static validateModelMetadata(session) {
        const inputNames = session.inputNames;
        const outputNames = session.outputNames;
        if (!inputNames.length || !outputNames.length) {
            throw new Error('Invalid model: missing input/output names');
        }
    }
    /**
     * Create a tensor from array data
     */
    static createTensor(data, dims, type = 'float32') {
        const arrayData = data instanceof Float32Array ? data : new Float32Array(data);
        return new ort.Tensor(type, arrayData, dims);
    }
    /**
     * Extract data from output tensor
     */
    static extractTensorData(tensor) {
        return Array.from(tensor.data);
    }
}
exports.ONNXUtils = ONNXUtils;
//# sourceMappingURL=onnx-helpers.js.map