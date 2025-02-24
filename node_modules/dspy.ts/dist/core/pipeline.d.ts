import { Module } from './module';
/**
 * Configuration options for pipeline execution
 */
export interface PipelineConfig {
    stopOnError?: boolean;
    debug?: boolean;
    maxRetries?: number;
    retryDelay?: number;
}
/**
 * Result of a pipeline execution step
 */
interface StepResult {
    moduleName: string;
    input: any;
    output: any;
    duration: number;
    error?: Error;
}
/**
 * Pipeline execution result
 */
export interface PipelineResult {
    finalOutput: any;
    steps: StepResult[];
    totalDuration: number;
    success: boolean;
    error?: Error;
}
/**
 * Executes a series of DSPy.ts modules as a pipeline
 */
export declare class Pipeline {
    private modules;
    private config;
    constructor(modules: Module<any, any>[], config?: PipelineConfig);
    /**
     * Execute the pipeline with initial input
     */
    run(initialInput: any): Promise<PipelineResult>;
    /**
     * Execute a single pipeline step with retry logic
     */
    private executeStep;
    /**
     * Create error result object
     */
    private createErrorResult;
    /**
     * Log debug message if debug mode is enabled
     */
    private logDebug;
    /**
     * Helper to create a delay promise
     */
    private delay;
}
export {};
