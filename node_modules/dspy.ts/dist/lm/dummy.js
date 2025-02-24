"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyLM = void 0;
const base_1 = require("./base");
/**
 * DummyLM provides a mock implementation of the LM interface.
 * Useful for testing and as a fallback during development.
 */
class DummyLM {
    constructor(customResponses) {
        this.initialized = false;
        this.responses = customResponses || new Map();
    }
    /**
     * Initialize the dummy LM
     */
    async init() {
        this.initialized = true;
    }
    /**
     * Generate a response based on the prompt.
     * Returns either a custom response if defined, or a default response.
     */
    async generate(prompt, options) {
        if (!this.initialized) {
            throw new base_1.LMError('DummyLM not initialized. Call init() first.');
        }
        // If a custom response is defined for this prompt, return it
        if (this.responses.has(prompt)) {
            return this.responses.get(prompt);
        }
        // Generate a deterministic but unique response based on the prompt
        return this.generateDefaultResponse(prompt, options);
    }
    /**
     * Clean up any resources (no-op for DummyLM)
     */
    async cleanup() {
        this.initialized = false;
    }
    /**
     * Add or update a custom response for a specific prompt
     */
    setResponse(prompt, response) {
        this.responses.set(prompt, response);
    }
    /**
     * Clear all custom responses
     */
    clearResponses() {
        this.responses.clear();
    }
    /**
     * Generate a default response for prompts without custom responses
     */
    generateDefaultResponse(prompt, options) {
        const maxTokens = (options === null || options === void 0 ? void 0 : options.maxTokens) || 100;
        return `DummyLM response for prompt: "${prompt}" (limited to ${maxTokens} tokens)`;
    }
}
exports.DummyLM = DummyLM;
//# sourceMappingURL=dummy.js.map