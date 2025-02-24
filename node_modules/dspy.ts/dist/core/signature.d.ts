/**
 * Defines the structure for input and output fields of a DSPy.ts module.
 */
export interface FieldDefinition {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'object';
    description?: string;
    required?: boolean;
}
/**
 * The signature interface describes the expected input and output fields for a module.
 */
export interface Signature {
    inputs: FieldDefinition[];
    outputs: FieldDefinition[];
}
/**
 * Type guard to validate field definitions
 */
export declare function isValidFieldDefinition(field: any): field is FieldDefinition;
