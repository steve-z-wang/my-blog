import { z } from 'zod';

/**
 * Helper function to validate and convert any request/response type to JSON
 * @param value The value to convert
 * @param schema The Zod schema to validate against
 * @returns JSON string of the validated data
 */
export function toJSON<T>(value: T, schema: z.ZodType<T>): string {
    const validated = schema.parse(value);
    return JSON.stringify(validated);
} 