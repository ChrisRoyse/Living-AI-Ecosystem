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
exports.ONNXModel = void 0;
const ort = __importStar(require("onnxruntime-web"));
const base_1 = require("./base");
/**
 * ONNXModel implements LMDriver to run ONNX-format language models.
 */
class ONNXModel {
    constructor(config) {
        this.session = null;
        this.tokenizer = null; // Will be implemented in future phases
        this.config = config;
    }
    /**
     * Initialize the ONNX model and tokenizer
     */
    async init() {
        try {
            // Configure session options
            const sessionOptions = {
                executionProviders: [this.config.executionProvider || 'wasm']
            };
            // Create inference session
            this.session = await ort.InferenceSession.create(this.config.modelPath, sessionOptions);
            // Initialize tokenizer if configured
            if (this.config.tokenizer) {
                await this.initializeTokenizer();
            }
        }
        catch (error) {
            throw new base_1.LMError('Failed to initialize ONNX model', error);
        }
    }
    /**
     * Generate text using the ONNX model
     */
    async run(inputs) {
        if (!this.session) {
            throw new base_1.LMError('ONNX model not initialized. Call init() first.');
        }
        try {
            // Convert inputs to tensors
            const inputTensors = await this.prepareInputs(inputs);
            // Run inference
            const outputs = await this.session.run(inputTensors);
            // Process output tensors
            if (!outputs || typeof outputs !== 'object') {
                throw new base_1.LMError('Invalid output tensor format');
            }
            return outputs;
        }
        catch (error) {
            throw new base_1.LMError('ONNX model inference failed', error);
        }
    }
    /**
     * Clean up resources
     */
    async cleanup() {
        try {
            if (this.session) {
                // Release the session resources
                await this.session.release();
                this.session = null;
            }
        }
        catch (error) {
            throw new base_1.LMError('Failed to cleanup ONNX model', error);
        }
    }
    /**
     * Initialize the tokenizer (placeholder for future implementation)
     */
    async initializeTokenizer() {
        if (!this.config.tokenizer)
            return;
        // TODO: Implement tokenizer initialization
        // This will be expanded in future phases to handle actual tokenization
        this.tokenizer = {
            encode: (text) => new Float32Array([text.length]), // Dummy implementation
            decode: (tokens) => 'Decoded text' // Dummy implementation
        };
    }
    /**
     * Prepare input tensor from prompt text
     */
    async prepareInputs(inputs) {
        const tensors = {};
        for (const [name, value] of Object.entries(inputs)) {
            if (value instanceof Float32Array) {
                tensors[name] = new ort.Tensor('float32', value, [1, value.length]);
            }
            else if (typeof value === 'string') {
                const inputData = new Float32Array([value.length]);
                tensors[name] = new ort.Tensor('float32', inputData, [1, 1]);
            }
            else {
                throw new base_1.LMError(`Unsupported input type for ${name}`);
            }
        }
        return tensors;
    }
    /**
     * Process output tensor to text
     */
    async generate(prompt, options) {
        throw new base_1.LMError('Text generation not supported by this model');
    }
}
exports.ONNXModel = ONNXModel;
//# sourceMappingURL=onnx.js.map