import { LMDriver, GenerationOptions } from './base';
/**
 * Configuration for the ONNX model
 */
export interface ONNXModelConfig {
    modelPath: string;
    executionProvider?: 'wasm' | 'webgl' | 'webgpu';
    maxTokens?: number;
    tokenizer?: {
        vocabPath: string;
        maxLength: number;
    };
}
/**
 * ONNXModel implements LMDriver to run ONNX-format language models.
 */
export declare class ONNXModel implements LMDriver {
    private session;
    private config;
    private tokenizer;
    constructor(config: ONNXModelConfig);
    /**
     * Initialize the ONNX model and tokenizer
     */
    init(): Promise<void>;
    /**
     * Generate text using the ONNX model
     */
    run(inputs: Record<string, any>): Promise<Record<string, any>>;
    /**
     * Clean up resources
     */
    cleanup(): Promise<void>;
    /**
     * Initialize the tokenizer (placeholder for future implementation)
     */
    private initializeTokenizer;
    /**
     * Prepare input tensor from prompt text
     */
    private prepareInputs;
    /**
     * Process output tensor to text
     */
    generate(prompt: string, options?: GenerationOptions): Promise<string>;
}
