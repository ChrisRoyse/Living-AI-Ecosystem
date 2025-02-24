import { LMDriver, GenerationOptions } from './base';
/**
 * DummyLM provides a mock implementation of the LM interface.
 * Useful for testing and as a fallback during development.
 */
export declare class DummyLM implements LMDriver {
    private initialized;
    private responses;
    constructor(customResponses?: Map<string, string>);
    /**
     * Initialize the dummy LM
     */
    init(): Promise<void>;
    /**
     * Generate a response based on the prompt.
     * Returns either a custom response if defined, or a default response.
     */
    generate(prompt: string, options?: GenerationOptions): Promise<string>;
    /**
     * Clean up any resources (no-op for DummyLM)
     */
    cleanup(): Promise<void>;
    /**
     * Add or update a custom response for a specific prompt
     */
    setResponse(prompt: string, response: string): void;
    /**
     * Clear all custom responses
     */
    clearResponses(): void;
    /**
     * Generate a default response for prompts without custom responses
     */
    private generateDefaultResponse;
}
