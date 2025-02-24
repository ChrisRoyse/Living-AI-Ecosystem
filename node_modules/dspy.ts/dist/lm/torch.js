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
exports.TorchModel = void 0;
const torch = __importStar(require("js-pytorch"));
const base_1 = require("./base");
/**
 * Simple transformer model implementation
 * This is a basic implementation for MVP - can be expanded later
 */
class SimpleTransformer {
    constructor(config) {
        if (!config)
            throw new Error('Architecture config required');
        const { inputSize, hiddenSize, outputSize, numLayers = 1 } = config;
        // Create a simple feed-forward network
        this.layers = [
            new torch.nn.Linear(inputSize, hiddenSize),
            new torch.nn.ReLU(),
            ...Array(numLayers - 1).fill(null).map(() => [
                new torch.nn.Linear(hiddenSize, hiddenSize),
                new torch.nn.ReLU()
            ]).flat(),
            new torch.nn.Linear(hiddenSize, outputSize)
        ];
    }
    forward(x) {
        let output = x;
        for (const layer of this.layers) {
            output = layer.forward(output);
        }
        return output;
    }
    to(device) {
        this.layers.forEach(layer => {
            if (layer.to)
                layer.to(device);
        });
    }
    eval() {
        this.layers.forEach(layer => {
            if (layer.eval)
                layer.eval();
        });
    }
    load_state_dict(stateDict) {
        // Implementation for loading weights
        // This is a simplified version - real implementation would need to match state dict keys
        Object.entries(stateDict).forEach(([key, value]) => {
            const [layerIdx, param] = key.split('.');
            if (this.layers[parseInt(layerIdx)][param]) {
                this.layers[parseInt(layerIdx)][param].copy_(value);
            }
        });
    }
}
/**
 * TorchModel implements LMDriver using JS-PyTorch.
 * This implementation can either load pre-trained weights or
 * create a new model using the specified architecture.
 */
class TorchModel {
    constructor(config) {
        this.model = null;
        this.config = config;
    }
    /**
     * Initialize the Torch model
     */
    async init() {
        try {
            // Set up device
            this.device = this.config.deviceType === 'webgl'
                ? torch.device('webgl')
                : torch.device('cpu');
            if (this.config.modelPath) {
                // Load pre-trained model
                await this.loadModel();
            }
            else if (this.config.architecture) {
                // Create new model with specified architecture
                await this.createModel();
            }
            else {
                throw new base_1.LMError('Either modelPath or architecture must be specified');
            }
        }
        catch (error) {
            throw new base_1.LMError('Failed to initialize Torch model', error);
        }
    }
    /**
     * Generate output using the Torch model
     */
    async generate(prompt, options) {
        if (!this.model) {
            throw new base_1.LMError('Torch model not initialized. Call init() first.');
        }
        try {
            // Convert prompt to tensor
            const inputTensor = await this.prepareInput(prompt);
            // Move input to correct device
            const deviceInput = inputTensor.to(this.device);
            // Run forward pass
            const output = this.model.forward(deviceInput);
            // Process output tensor to text
            return this.processOutput(output, options);
        }
        catch (error) {
            throw new base_1.LMError('Torch model inference failed', error);
        }
    }
    /**
     * Clean up resources
     */
    async cleanup() {
        try {
            if (this.model) {
                // Clear model from memory
                this.model = null;
                // Force garbage collection if available
                if (global.gc) {
                    global.gc();
                }
            }
        }
        catch (error) {
            throw new base_1.LMError('Failed to cleanup Torch model', error);
        }
    }
    /**
     * Load a pre-trained model from path
     */
    async loadModel() {
        if (!this.config.modelPath) {
            throw new base_1.LMError('Model path not specified');
        }
        try {
            // Load state dict
            const stateDict = await torch.load(this.config.modelPath);
            // Create model and load weights
            this.model = new SimpleTransformer(this.config.architecture);
            this.model.load_state_dict(stateDict);
            // Move model to device
            this.model.to(this.device);
            this.model.eval(); // Set to evaluation mode
        }
        catch (error) {
            throw new base_1.LMError('Failed to load model from path', error);
        }
    }
    /**
     * Create a new model with specified architecture
     */
    async createModel() {
        if (!this.config.architecture) {
            throw new base_1.LMError('Model architecture not specified');
        }
        try {
            // Create new model instance
            this.model = new SimpleTransformer(this.config.architecture);
            // Move to device
            this.model.to(this.device);
            this.model.eval();
        }
        catch (error) {
            throw new base_1.LMError('Failed to create model', error);
        }
    }
    /**
     * Prepare input tensor from prompt text
     */
    async prepareInput(prompt) {
        // For MVP, create a simple tensor from the prompt length
        // This will be replaced with actual tokenization in future phases
        return torch.tensor([prompt.length], {
            requiresGrad: false
        });
    }
    /**
     * Process output tensor to text
     */
    processOutput(output, options) {
        // For MVP, return a simple string based on the output tensor
        // This will be replaced with actual detokenization in future phases
        const shape = output.shape.join('x');
        const data = Array.from(output.dataSync());
        return `Torch model output (shape: ${shape}, values: ${data.join(', ')})`;
    }
}
exports.TorchModel = TorchModel;
//# sourceMappingURL=torch.js.map