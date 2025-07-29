import joi from 'joi';

const schema = joi.object({
    brand: joi.string().max(150).required().messages({
        'string.base': 'O campo Marca deve ser um conjunto de letras.',
        'any.required': 'O campo Marca é obrigatório.',
        'string.max': 'O campo Marc deve ter menos de 151 caracteres.'
    }),
    model: joi.string().max(150).required().messages({
        'string.base': 'O campo Modelo deve ser um conjunto de letras.',
        'any.required': 'O campo Modelo é obrigatório.',
        'string.max': 'O campo Modelo deve ter menos de 151 caracteres.'
    }),
    color: joi.string().max(30).required().messages({
        'string.base': 'O campo Cor deve ser um conjunto de letras.',
        'any.required': 'O campo Cor é obrigatório.',
        'string.max': 'O campo Cor deve ter menos de 31 caracteres.'
    }),
    license_plate: joi.string().max(150).required().messages({
        'string.base': 'O campo license_plate deve ser um conjunto de letras e números.',
        'any.required': 'O campo license_plate é obrigatório.',
        'string.max': 'O campo license_plate deve ter menos de 151 caracteres.'
    }),
    engine_number: joi.string().max(150).required().messages({
        'string.base': 'O campo engine_number deve ser um conjunto de letras e números.',
        'any.required': 'O campo engine_number é obrigatório.',
        'string.max': 'O campo engine_number deve ter menos de 151 caracteres.'
    }),
    chassis_number: joi.string().max(150).required().messages({
        'string.base': 'O campo chassis_number deve ser um conjunto de letras e números.',
        'any.required': 'O campo chassis_number é obrigatório.',
        'string.max': 'O campo chassis_number deve ter menos de 151 caracteres.'
    }),
    tire_measurements: joi.string().max(150).required().messages({
        'string.base': 'O campo tire_measurements deve ser um conjunto de letras e números.',
        'any.required': 'O campo tire_measurements é obrigatório.',
        'string.max': 'O campo tire_measurements deve ter menos de 151 caracteres.'
    }),
    seating_capacity: joi.number().integer().min(1).max(20).required().messages({
        'number.base': 'O campo seating_capacity deve ser um número inteiro.',
        'any.required': 'O campo seating_capacity é obrigatório.',
        'number.min': 'O campo seating_capacity deve ser no mínimo 1.',
        'number.max': 'O campo seating_capacity deve ser no máximo 20.'
    }),

    fuel_type: joi.string().valid('Gasolina', 'Diesel', 'Flex', 'Elétrico', 'Híbrido', 'Outro').required().messages({
        'any.only': 'O campo fuel_type deve ser um dos valores válidos: Gasolina, Diesel, Flex, Elétrico, Híbrido ou Outro.',
        'any.required': 'O campo fuel_type é obrigatório.'
    }),

    custom_fuel_type: joi.string().when('fuel_type', {
        is: 'Outro', // Apenas valida se fuel_type for 'Outro'
        then: joi.string().min(3).max(50).required().messages({
            'string.base': 'O campo custom_fuel_type deve ser uma string válida.',
            'string.empty': 'O campo custom_fuel_type não pode ser vazio.',
            'string.min': 'O campo custom_fuel_type deve ter pelo menos 3 caracteres.',
            'string.max': 'O campo custom_fuel_type não pode exceder 50 caracteres.',
            'any.required': 'O campo custom_fuel_type é obrigatório quando fuel_type é "Outro".'
        }),
        otherwise: joi.string().allow(null, '').optional().messages({
            'string.base': 'O campo custom_fuel_type deve ser uma string válida.',
        })
    }),

    wheelbase_cm: joi.number().precision(2).min(0).max(9999.99).required().messages({
        'number.base': 'O campo wheelbase_cm deve ser um número.',
        'any.required': 'O campo wheelbase_cm é obrigatório.',
        'number.min': 'O campo wheelbase_cm deve ser positivo.',
        'number.max': 'O campo wheelbase_cm excede o valor máximo permitido.'
    }),

    transmission_type: joi.string().valid('Manual', 'Automático', 'CVT', 'Semi-automático', 'Outro').required().messages({
        'any.only': 'O campo transmission_type deve ser um dos valores válidos: Manual, Automático, CVT, Semi-automático ou Outro.',
        'any.required': 'O campo transmission_type é obrigatório.'
    }),

    custom_transmission_type: joi.string().when('transmission_type', {
        is: 'Outro', // Apenas valida se transmission_type for 'Outro'
        then: joi.string().min(3).max(50).required().messages({
            'string.base': 'O campo custom_transmission_type deve ser uma string válida.',
            'string.empty': 'O campo custom_transmission_type não pode ser vazio.',
            'string.min': 'O campo custom_transmission_type deve ter pelo menos 3 caracteres.',
            'string.max': 'O campo custom_transmission_type não pode exceder 50 caracteres.',
            'any.required': 'O campo custom_transmission_type é obrigatório quando transmission_type é "Outro".'
        }),
        otherwise: joi.string().allow(null, '').optional().messages({
            'string.base': 'O campo custom_transmission_type deve ser uma string válida.',
        })
    }),

    acquisition_year: joi.number().integer().min(1900).max(new Date().getFullYear()).required().messages({
        'number.base': 'O campo acquisition_year deve ser um número inteiro.',
        'any.required': 'O campo acquisition_year é obrigatório.',
        'number.min': 'O campo acquisition_year deve ser maior ou igual a 1900.',
        'number.max': `O campo acquisition_year deve ser menor ou igual a ${new Date().getFullYear()}.`
    }),

    displacement_cc: joi.number().integer().min(50).max(20000).required().messages({
        'number.base': 'O campo displacement_cc deve ser um número inteiro.',
        'any.required': 'O campo displacement_cc é obrigatório.',
        'number.min': 'O campo displacement_cc deve ser no mínimo 50.',
        'number.max': 'O campo displacement_cc deve ser no máximo 20000.'
    }),

    number_of_cylinders: joi.number().integer().min(1).max(16).required().messages({
        'number.base': 'O campo number_of_cylinders deve ser um número inteiro.',
        'any.required': 'O campo number_of_cylinders é obrigatório.',
        'number.min': 'O campo number_of_cylinders deve ser no mínimo 1.',
        'number.max': 'O campo number_of_cylinders deve ser no máximo 16.'
    }),

    gross_weight_kg: joi.number().integer().min(1).max(10000).required().messages({
        'number.base': 'O campo gross_weight_kg deve ser um número inteiro.',
        'any.required': 'O campo gross_weight_kg é obrigatório.',
        'number.min': 'O campo gross_weight_kg deve ser no mínimo 1.',
        'number.max': 'O campo gross_weight_kg deve ser no máximo 10000.'
    }),

    curb_weight_kg: joi.number().integer().min(1).max(10000).required().messages({
        'number.base': 'O campo curb_weight_kg deve ser um número inteiro.',
        'any.required': 'O campo curb_weight_kg é obrigatório.',
        'number.min': 'O campo curb_weight_kg deve ser no mínimo 1.',
        'number.max': 'O campo curb_weight_kg deve ser no máximo 10000.'
    }),
    vehicle_credential: joi.string().max(150).required().messages({
    'string.base': 'O campo vehicle_credential deve ser uma string.',
    'any.required': 'O campo vehicle_credential é obrigatório.',
    'string.max': 'O campo vehicle_credential deve ter no máximo 150 caracteres.'
    }),

    vehicle_type: joi.string().max(50).required().messages({
        'string.base': 'O campo vehicle_type deve ser uma string.',
        'any.required': 'O campo vehicle_type é obrigatório.',
        'string.max': 'O campo vehicle_type deve ter no máximo 50 caracteres.'
    }),
});

export default schema;
