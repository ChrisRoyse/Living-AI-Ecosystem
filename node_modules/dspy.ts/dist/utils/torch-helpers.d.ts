import * as torch from 'js-pytorch';
/**
 * Helper functions for Torch model operations
 */
export declare class TorchUtils {
    /**
     * Create a tensor from array data
     */
    static createTensor(data: number[] | Float32Array, options?: {
        requiresGrad?: boolean;
    }): torch.Tensor;
    /**
     * Move tensor to specified device
     */
    static toDevice(tensor: torch.Tensor, device: 'cpu' | 'webgl'): torch.Tensor;
    /**
     * Extract data from tensor
     */
    static extractTensorData(tensor: torch.Tensor): number[];
    /**
     * Calculate memory usage of tensor
     */
    static calculateTensorMemory(tensor: torch.Tensor): number;
}
