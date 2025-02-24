import { Module } from '../core/module';
import { Signature } from '../core/signature';
/**
 * PredictModule implements a simple single-step prediction module.
 * It formats a prompt, calls the LM, and parses the response.
 */
export declare class PredictModule<TInput extends Record<string, any>, TOutput extends Record<string, any>> extends Module<TInput, TOutput> {
    constructor(options: {
        name: string;
        signature: Signature;
        promptTemplate: (input: TInput) => string;
    });
    /**
     * Run the module with the given input
     */
    run(input: TInput): Promise<TOutput>;
    /**
     * Parse LM response into structured output
     * This is a basic implementation - extend for specific needs
     */
    private parseResponse;
    /**
     * Validate input against module signature
     */
    protected validateInput(input: TInput): void;
    /**
     * Validate output against module signature
     */
    protected validateOutput(output: TOutput): void;
}
