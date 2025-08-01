import joi from 'joi';

const schema = joi.object({
  brand: joi.string().max(50).required().messages({
    'string.base': 'O campo Marca deve conter letras.',
    'any.required': 'O campo Marca é obrigatório.',
    'string.max': 'O campo Marca deve ter no máximo 50 caracteres.'
  }),
  model: joi.string().max(50).required().messages({
    'string.base': 'O campo Modelo deve conter letras.',
    'any.required': 'O campo Modelo é obrigatório.',
    'string.max': 'O campo Modelo deve ter no máximo 50 caracteres.'
  }),
  color: joi.string().max(30).required().messages({
    'string.base': 'O campo Cor deve conter letras.',
    'any.required': 'O campo Cor é obrigatório.',
    'string.max': 'O campo Cor deve ter no máximo 30 caracteres.'
  }),
  license_plate: joi.string().max(50).required().messages({
    'string.base': 'O campo Matrícula deve conter letras e números.',
    'any.required': 'O campo Matrícula é obrigatório.',
    'string.max': 'O campo Matrícula deve ter no máximo 50 caracteres.'
  }),
  engine_number: joi.string().max(50).required().messages({
    'string.base': 'O campo Número do Motor deve conter letras e números.',
    'any.required': 'O campo Número do Motor é obrigatório.',
    'string.max': 'O campo Número do Motor deve ter no máximo 50 caracteres.'
  }),
  chassis_number: joi.string().max(50).required().messages({
    'string.base': 'O campo Número do Quadro deve conter letras e números.',
    'any.required': 'O campo Número do Quadro é obrigatório.',
    'string.max': 'O campo Número do Quadro deve ter no máximo 50 caracteres.'
  }),
  tire_measurements: joi.string().max(50).required().messages({
    'string.base': 'O campo Medidas Pneumáticas deve conter letras e números.',
    'any.required': 'O campo Medidas Pneumáticas é obrigatório.',
    'string.max': 'O campo Medidas Pneumáticas deve ter no máximo 50 caracteres.'
  }),
  seating_capacity: joi.number().integer().min(1).max(20).required().messages({
    'number.base': 'O campo Lotação deve ser um número inteiro.',
    'any.required': 'O campo Lotação é obrigatório.',
    'number.min': 'O campo Lotação deve ser no mínimo 1.',
    'number.max': 'O campo Lotação deve ser no máximo 20.'
  }),
  fuel_type: joi.string().valid('Gasolina', 'Diesel', 'Flex', 'Elétrico', 'Híbrido', 'Outro').required().messages({
    'any.only': 'O campo Combustível deve ser um dos seguintes: Gasolina, Diesel, Flex, Elétrico, Híbrido ou Outro.',
    'any.required': 'O campo Combustível é obrigatório.'
  }),
  custom_fuel_type: joi.string().when('fuel_type', {
    is: 'Outro',
    then: joi.string().min(3).max(50).required().messages({
      'string.base': 'O campo Combustível Personalizado deve ser uma string válida.',
      'string.empty': 'O campo Combustível Personalizado não pode estar vazio.',
      'string.max': 'O campo Combustível Personalizado deve ter no máximo 50 caracteres.',
      'string.min': 'O campo Combustível Personalizado deve ter no mínimo 3 caracteres.',
      'any.required': 'O campo Combustível Personalizado é obrigatório quando o combustível for "Outro".'
    }),
    otherwise: joi.string().allow(null, '').optional()
  }),
  wheelbase_cm: joi.number().precision(2).min(0).max(9999.99).required().messages({
    'number.base': 'O campo Entre-Eixos deve ser um número.',
    'any.required': 'O campo Entre-Eixos é obrigatório.',
    'number.min': 'O campo Entre-Eixos deve ser positivo.',
    'number.max': 'O campo Entre-Eixos excede o valor máximo permitido.'
  }),
  transmission_type: joi.string().valid('Manual', 'Automático', 'CVT', 'Semi-automático', 'Outro').required().messages({
    'any.only': 'O campo Tipo de Caixa deve ser um dos seguintes: Manual, Automático, CVT, Semi-automático ou Outro.',
    'any.required': 'O campo Tipo de Caixa é obrigatório.'
  }),
  custom_transmission_type: joi.string().when('transmission_type', {
    is: 'Outro',
    then: joi.string().min(3).max(50).required().messages({
      'string.base': 'O campo Tipo de Caixa Personalizado deve ser uma string válida.',
      'string.empty': 'O campo Tipo de Caixa Personalizado não pode estar vazio.',
      'string.min': 'O campo Tipo de Caixa Personalizado deve ter no mínimo 3 caracteres.',
      'string.max': 'O campo Tipo de Caixa Personalizado deve ter no máximo 50 caracteres.',
      'any.required': 'O campo Tipo de Caixa Personalizado é obrigatório quando o tipo de caixa for "Outro".'
    }),
    otherwise: joi.string().allow(null, '').optional()
  }),
  acquisition_year: joi.number().integer().min(1900).max(new Date().getFullYear()).required().messages({
    'number.base': 'O campo Ano de Aquisição deve ser um número inteiro.',
    'any.required': 'O campo Ano de Aquisição é obrigatório.',
    'number.min': 'O campo Ano de Aquisição deve ser no mínimo 1900.',
    'number.max': `O campo Ano de Aquisição deve ser no máximo ${new Date().getFullYear()}.`
  }),
  displacement_cc: joi.number().integer().min(50).max(20000).required().messages({
    'number.base': 'O campo Cilindrada deve ser um número inteiro.',
    'any.required': 'O campo Cilindrada é obrigatório.',
    'number.min': 'O campo Cilindrada deve ser no mínimo 50.',
    'number.max': 'O campo Cilindrada deve ser no máximo 20000.'
  }),
  number_of_cylinders: joi.number().integer().min(1).max(16).required().messages({
    'number.base': 'O campo Número de Cilindros deve ser um número inteiro.',
    'any.required': 'O campo Número de Cilindros é obrigatório.',
    'number.min': 'O campo Número de Cilindros deve ser no mínimo 1.',
    'number.max': 'O campo Número de Cilindros deve ser no máximo 16.'
  }),
  gross_weight_kg: joi.number().integer().min(1).max(10000).required().messages({
    'number.base': 'O campo Peso Bruto deve ser um número inteiro.',
    'any.required': 'O campo Peso Bruto é obrigatório.',
    'number.min': 'O campo Peso Bruto deve ser no mínimo 1.',
    'number.max': 'O campo Peso Bruto deve ser no máximo 10000.'
  }),
  curb_weight_kg: joi.number().integer().min(1).max(10000).required().messages({
    'number.base': 'O campo Tara deve ser um número inteiro.',
    'any.required': 'O campo Tara é obrigatório.',
    'number.min': 'O campo Tara deve ser no mínimo 1.',
    'number.max': 'O campo Tara deve ser no máximo 10000.'
  }),
  vehicle_credential: joi.string().max(50).required().messages({
    'string.base': 'O campo Credencial do Veículo deve ser uma string.',
    'any.required': 'O campo Credencial do Veículo é obrigatório.',
    'string.max': 'O campo Credencial do Veículo deve ter no máximo 50 caracteres.'
  }),
  vehicle_type: joi.string().max(50).required().messages({
    'string.base': 'O campo Tipo de Veículo deve ser uma string.',
    'any.required': 'O campo Tipo de Veículo é obrigatório.',
    'string.max': 'O campo Tipo de Veículo deve ter no máximo 50 caracteres.'
  }),
});

export default schema;
