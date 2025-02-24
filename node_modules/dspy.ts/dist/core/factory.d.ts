import { Module } from './module';
import { Signature } from './signature';
/**
 * Options for creating a module
 */
export interface ModuleOptions<TInput extends Record<string, any>, TOutput extends Record<string, any>> {
    name: string;
    signature: Signature;
    promptTemplate: (input: TInput) => string;
    strategy?: 'Predict' | 'ChainOfThought' | 'ReAct';
}
/**
 * Factory function to create modules based on strategy
 */
export declare function defineModule<TInput extends Record<string, any>, TOutput extends Record<string, any>>(options: ModuleOptions<TInput, TOutput>): Module<TInput, TOutput>;
