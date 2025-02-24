"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidFieldDefinition = isValidFieldDefinition;
/**
 * Type guard to validate field definitions
 */
function isValidFieldDefinition(field) {
    if (!field || typeof field !== 'object') {
        return false;
    }
    // Check required properties
    if (typeof field.name !== 'string') {
        return false;
    }
    // Validate type is one of the allowed values
    if (!['string', 'number', 'boolean', 'object'].includes(field.type)) {
        return false;
    }
    // Optional properties type checking
    if (field.description !== undefined && typeof field.description !== 'string') {
        return false;
    }
    if (field.required !== undefined && typeof field.required !== 'boolean') {
        return false;
    }
    return true;
}
//# sourceMappingURL=signature.js.map