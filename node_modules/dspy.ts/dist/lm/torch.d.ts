import { LMDriver, GenerationOptions } from './base';
/**
 * Configuration for the Torch model
 */
export interface TorchModelConfig {
    modelPath?: string;
    deviceType?: 'cpu' | 'webgl';
    architecture?: {
        inputSize: number;
        hiddenSize: number;
        outputSize: number;
        numLayers?: number;
    };
}
/**
 * TorchModel implements LMDriver using JS-PyTorch.
 * This implementation can either load pre-trained weights or
 * create a new model using the specified architecture.
 */
export declare class TorchModel implements LMDriver {
    private model;
    private config;
    private device;
    constructor(config: TorchModelConfig);
    /**
     * Initialize the Torch model
     */
    init(): Promise<void>;
    /**
     * Generate output using the Torch model
     */
    generate(prompt: string, options?: GenerationOptions): Promise<string>;
    /**
     * Clean up resources
     */
    cleanup(): Promise<void>;
    /**
     * Load a pre-trained model from path
     */
    private loadModel;
    /**
     * Create a new model with specified architecture
     */
    private createModel;
    /**
     * Prepare input tensor from prompt text
     */
    private prepareInput;
    /**
     * Process output tensor to text
     */
    private processOutput;
}
