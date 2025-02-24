import * as ort from 'onnxruntime-web';
/**
 * Helper functions for ONNX model operations
 */
export declare class ONNXUtils {
    /**
     * Validate model metadata
     */
    static validateModelMetadata(session: ort.InferenceSession): void;
    /**
     * Create a tensor from array data
     */
    static createTensor(data: number[] | Float32Array, dims: number[], type?: 'float32' | 'int64'): ort.Tensor;
    /**
     * Extract data from output tensor
     */
    static extractTensorData(tensor: ort.Tensor): number[];
}
