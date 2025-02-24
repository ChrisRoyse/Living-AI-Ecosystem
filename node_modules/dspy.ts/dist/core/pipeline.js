"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipeline = void 0;
/**
 * Executes a series of DSPy.ts modules as a pipeline
 */
class Pipeline {
    constructor(modules, config = {}) {
        this.modules = modules;
        this.config = Object.assign({ stopOnError: true, debug: false, maxRetries: 0, retryDelay: 1000 }, config);
    }
    /**
     * Execute the pipeline with initial input
     */
    async run(initialInput) {
        const startTime = Date.now();
        const steps = [];
        let currentData = initialInput;
        try {
            for (const module of this.modules) {
                const stepResult = await this.executeStep(module, currentData);
                steps.push(stepResult);
                if (stepResult.error) {
                    if (this.config.stopOnError) {
                        return this.createErrorResult(steps, startTime, stepResult.error);
                    }
                    // If not stopping on error, continue with original input
                    this.logDebug(`Continuing after error in ${module.name}`);
                }
                else {
                    // Only update current data if step succeeded
                    currentData = stepResult.output;
                }
            }
            return {
                finalOutput: currentData,
                steps,
                totalDuration: Date.now() - startTime,
                success: true
            };
        }
        catch (error) {
            return this.createErrorResult(steps, startTime, error);
        }
    }
    /**
     * Execute a single pipeline step with retry logic
     */
    async executeStep(module, input) {
        const stepStart = Date.now();
        let lastError;
        for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
            try {
                if (attempt > 0) {
                    this.logDebug(`Retrying ${module.name} (attempt ${attempt + 1})`);
                    await this.delay(this.config.retryDelay);
                }
                const output = await module.run(input);
                return {
                    moduleName: module.name,
                    input,
                    output,
                    duration: Date.now() - stepStart
                };
            }
            catch (error) {
                lastError = error;
                this.logDebug(`Error in ${module.name}: ${error}`);
            }
        }
        return {
            moduleName: module.name,
            input,
            output: input, // On failure, pass through original input
            duration: Date.now() - stepStart,
            error: lastError
        };
    }
    /**
     * Create error result object
     */
    createErrorResult(steps, startTime, error) {
        return {
            finalOutput: null,
            steps,
            totalDuration: Date.now() - startTime,
            success: false,
            error
        };
    }
    /**
     * Log debug message if debug mode is enabled
     */
    logDebug(message) {
        if (this.config.debug) {
            console.log(`[Pipeline Debug] ${message}`);
        }
    }
    /**
     * Helper to create a delay promise
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.Pipeline = Pipeline;
//# sourceMappingURL=pipeline.js.map