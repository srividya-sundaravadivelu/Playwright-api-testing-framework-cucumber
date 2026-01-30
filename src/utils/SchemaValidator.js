import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv); // 👈 enables "date", "date-time", etc.

export function validateSchema(data, schema) {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        throw new Error(
            'Schema validation failed:\n' +
            JSON.stringify(validate.errors, null, 2)
        );
    }
}
