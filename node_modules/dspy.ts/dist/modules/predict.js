"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictModule = void 0;
const module_1 = require("../core/module");
const index_1 = require("../index");
/**
 * PredictModule implements a simple single-step prediction module.
 * It formats a prompt, calls the LM, and parses the response.
 */
class PredictModule extends module_1.Module {
    constructor(options) {
        super({
            name: options.name,
            signature: options.signature,
            promptTemplate: options.promptTemplate,
            strategy: 'Predict'
        });
    }
    /**
     * Run the module with the given input
     */
    async run(input) {
        try {
            // Validate input against signature
            this.validateInput(input);
            // Format the prompt using the template
            const prompt = this.promptTemplate(input);
            // Get the global LM instance
            const lm = (0, index_1.getLM)();
            // Generate response from LM
            const response = await lm.generate(prompt);
            // Parse the response into structured output
            const output = this.parseResponse(response);
            // Validate output against signature
            this.validateOutput(output);
            return output;
        }
        catch (error) {
            throw new Error(`Error in ${this.name}: ${error.message}`);
        }
    }
    /**
     * Parse LM response into structured output
     * This is a basic implementation - extend for specific needs
     */
    parseResponse(response) {
        try {
            // For MVP, attempt to parse as JSON
            // In practice, you might need more sophisticated parsing
            return JSON.parse(response);
        }
        catch (_a) {
            // If JSON parsing fails, return response as-is if output signature has a single string field
            if (this.signature.outputs.length === 1 && this.signature.outputs[0].type === 'string') {
                return { [this.signature.outputs[0].name]: response };
            }
            throw new Error('Failed to parse LM response');
        }
    }
    /**
     * Validate input against module signature
     */
    validateInput(input) {
        for (const field of this.signature.inputs) {
            const value = input[field.name];
            if (field.required !== false && value === undefined) {
                throw new Error(`Missing required input field: ${field.name}`);
            }
            if (value !== undefined && typeof value !== field.type) {
                throw new Error(`Invalid type for input field ${field.name}. Expected ${field.type}, got ${typeof value}`);
            }
        }
    }
    /**
     * Validate output against module signature
     */
    validateOutput(output) {
        for (const field of this.signature.outputs) {
            const value = output[field.name];
            if (field.required !== false && value === undefined) {
                throw new Error(`Missing required output field: ${field.name}`);
            }
            if (value !== undefined && typeof value !== field.type) {
                throw new Error(`Invalid type for output field ${field.name}. Expected ${field.type}, got ${typeof value}`);
            }
        }
    }
}
exports.PredictModule = PredictModule;
//# sourceMappingURL=predict.js.map