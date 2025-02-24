"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineModule = defineModule;
const predict_1 = require("../modules/predict");
/**
 * Factory function to create modules based on strategy
 */
function defineModule(options) {
    const strategy = options.strategy || 'Predict';
    switch (strategy) {
        case 'Predict':
            return new predict_1.PredictModule(options);
        case 'ChainOfThought':
        case 'ReAct':
            // These will be implemented in future phases
            throw new Error(`Strategy ${strategy} not yet implemented`);
        default:
            throw new Error(`Unknown strategy: ${strategy}`);
    }
}
//# sourceMappingURL=factory.js.map