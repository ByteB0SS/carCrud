import joi from 'joi'

const schema = joi.object({
    brand: joi.string().max(150).required().empty('').messages({
        'string.base': 'O campo brand deve ser um conjunto de letras.',
        'string.empty': 'Todos os campos devem ser preenchidos.',
        'any.required': 'Todos os campos devem ser preenchidos.',
        'string.max': 'O campo brand deve ter menos de 151 caracteres.'
    }),
    model: joi.string().max(150).required().empty('').messages({
        'string.base': 'O campo model deve ser um conjunto de letras.',
        'string.empty': 'Todos os campos devem ser preenchidos.',
        'any.required': 'Todos os campos devem ser preenchidos.',
        'string.max': 'O campo model deve ter menos de 151 caracteres.'
    }),
    color: joi.string().max(30).required().empty('').messages({
        'string.base': 'O campo color deve ser um conjunto de letras.',
        'string.empty': 'Todos os campos devem ser preenchidos.',
        'any.required': 'Todos os campos devem ser preenchidos.',
        'string.max': 'O campo color deve ter menos de 31 caracteres.'
    }),
    license_plate: joi.string().max(150).required().empty('').messages({
        'string.base': 'O campo license_plate deve ser um conjunto de letras e números.',
        'string.empty': 'Todos os campos devem ser preenchidos.',
        'any.required': 'Todos os campos devem ser preenchidos.',
        'string.max': 'O campo license_plate deve ter menos de 151 caracteres.'
    }),
    engine_number: joi.string().max(150).required().empty('').messages({
        'string.base': 'O campo engine_number deve ser um conjunto de letras e números.',
        'string.empty': 'Todos os campos devem ser preenchidos.',
        'any.required': 'Todos os campos devem ser preenchidos.',
        'string.max': 'O campo engine_number deve ter menos de 151 caracteres.'
    }),
    chassis_number: joi.string().max(150).required().empty('').messages({
        'string.base': 'O campo chassis_number deve ser um conjunto de letras e números.',
        'string.empty': 'Todos os campos devem ser preenchidos.',
        'any.required': 'Todos os campos devem ser preenchidos.',
        'string.max': 'O campo chassis_number deve ter menos de 151 caracteres.'
    }),
    tire_measurements: joi.string().max(150).required().empty('').messages({
        'string.base': 'O campo tire_measurements deve ser um conjunto de letras e números.',
        'string.empty': 'Todos os campos devem ser preenchidos.',
        'any.required': 'Todos os campos devem ser preenchidos.',
        'string.max': 'O campo tire_measurements deve ter menos de 151 caracteres.'
    }),
    // Os enums e números continuam iguais, só coloquei strings como exemplo
    seating_capacity: joi.number().integer().min(1).max(20).required().messages({
        'number.base': 'O campo seating_capacity deve ser um número inteiro.',
        'number.min': 'O campo seating_capacity deve ser no mínimo 1.',
        'number.max': 'O campo seating_capacity deve ser no máximo 20.',
        'any.required': 'Todos os campos devem ser preenchidos.'
    }),
    fuel_type: joi.string().valid('Gasolina', 'Diesel', 'Flex', 'Elétrico', 'Híbrido').required().messages({
        'any.only': 'O campo fuel_type deve ser um dos valores válidos.',
        'any.required': 'Todos os campos devem ser preenchidos.'
    }),
    wheelbase_cm: joi.number().precision(2).min(0).max(9999.99).required().messages({
        'number.base': 'O campo wheelbase_cm deve ser um número.',
        'number.min': 'O campo wheelbase_cm deve ser positivo.',
        'number.max': 'O campo wheelbase_cm excede o valor máximo permitido.',
        'any.required': 'Todos os campos devem ser preenchidos.'
    }),
    transmission_type: joi.string().valid('Manual', 'Automático', 'CVT', 'Semi-automático').required().messages({
        'any.only': 'O campo transmission_type deve ser um dos valores válidos.',
        'any.required': 'Todos os campos devem ser preenchidos.'
    }),
    acquisition_year: joi.number().integer().min(1900).max(new Date().getFullYear()).required().messages({
        'number.base': 'O campo acquisition_year deve ser um número inteiro.',
        'number.min': 'O campo acquisition_year deve ser maior ou igual a 1900.',
        'number.max': `O campo acquisition_year deve ser menor ou igual a ${new Date().getFullYear()}.`,
        'any.required': 'Todos os campos devem ser preenchidos.'
    }),
    displacement_cc: joi.number().integer().min(50).max(20000).required().messages({
        'number.base': 'O campo displacement_cc deve ser um número inteiro.',
        'number.min': 'O campo displacement_cc deve ser no mínimo 50.',
        'number.max': 'O campo displacement_cc deve ser no máximo 20000.',
        'any.required': 'Todos os campos devem ser preenchidos.'
    }),
    number_of_cylinders: joi.number().integer().min(1).max(16).required().messages({
        'number.base': 'O campo number_of_cylinders deve ser um número inteiro.',
        'number.min': 'O campo number_of_cylinders deve ser no mínimo 1.',
        'number.max': 'O campo number_of_cylinders deve ser no máximo 16.',
        'any.required': 'Todos os campos devem ser preenchidos.'
    }),
    gross_weight_kg: joi.number().integer().min(1).max(10000).required().messages({
        'number.base': 'O campo gross_weight_kg deve ser um número inteiro.',
        'number.min': 'O campo gross_weight_kg deve ser no mínimo 1.',
        'number.max': 'O campo gross_weight_kg deve ser no máximo 10000.',
        'any.required': 'Todos os campos devem ser preenchidos.'
    }),
    curb_weight_kg: joi.number().integer().min(1).max(10000).required().messages({
        'number.base': 'O campo curb_weight_kg deve ser um número inteiro.',
        'number.min': 'O campo curb_weight_kg deve ser no mínimo 1.',
        'number.max': 'O campo curb_weight_kg deve ser no máximo 10000.',
        'any.required': 'Todos os campos devem ser preenchidos.'
    }),
})
