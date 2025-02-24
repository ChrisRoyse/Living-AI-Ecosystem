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
exports.TorchUtils = void 0;
const torch = __importStar(require("js-pytorch"));
/**
 * Helper functions for Torch model operations
 */
class TorchUtils {
    /**
     * Create a tensor from array data
     */
    static createTensor(data, options) {
        return torch.tensor(Array.from(data), {
            requiresGrad: (options === null || options === void 0 ? void 0 : options.requiresGrad) || false
        });
    }
    /**
     * Move tensor to specified device
     */
    static toDevice(tensor, device) {
        // WebGL acceleration is handled internally by js-pytorch
        return tensor.to(torch.device(device));
    }
    /**
     * Extract data from tensor
     */
    static extractTensorData(tensor) {
        return Array.from(tensor.dataSync());
    }
    /**
     * Calculate memory usage of tensor
     */
    static calculateTensorMemory(tensor) {
        // Get total number of elements
        const shape = tensor.shape;
        const totalElements = shape.reduce((a, b) => a * b, 1);
        // Assume float32 (4 bytes per element)
        return totalElements * 4;
    }
}
exports.TorchUtils = TorchUtils;
//# sourceMappingURL=torch-helpers.js.map