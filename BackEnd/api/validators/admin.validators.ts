import joi from 'joi'

 export const adminSchema = joi.object({
  adminName: joi.string().max(50).required().messages({
      'string.base': 'O campo admin deve ser um conjunto de letras.',
      'string.empty': 'O campo admin deve ser preenchido.',
      'any.required': 'O admin deve ser preenchido.',
      'string.max': 'O campo admin deve ter menos de 51 letras.'
  }),
  passWord: joi.string().min(6).max(50).required().messages({
      'string.base': 'O campo senha deve ser um conjunto de letras.',
      'string.empty': 'O campo senha deve ser preenchido.',
      'any.required': 'O campo passWord deve ser preenchido.',
      'string.max': 'O campo senha deve ter menos de 51 letras.',
      'string.min': 'A senha deve ter pelomenos 6 letras.'
  })
})

export const updateCredentialsSchema = joi.object({
  newAdminName: joi.string().max(50).required().messages({
    'string.base': 'O nome do novo administrador deve ser um texto.',
    'string.empty': 'O nome do novo administrador é obrigatório.',
    'any.required': 'Informe o nome do novo administrador.',
    'string.max': 'O nome do novo administrador deve ter no máximo 50 caracteres.'
  }),

  oldAdminName: joi.any().optional(),

  id: joi.number().integer().required().messages({
    'number.base': 'O ID do administrador deve ser um número inteiro.',
    'number.integer': 'O ID do administrador deve ser um número inteiro.',
    'any.required': 'Informe o ID do administrador.'
  }),

  newPassWord: joi.string().min(6).max(50).required().messages({
    'string.base': 'A nova senha deve ser um texto.',
    'string.empty': 'A nova senha é obrigatória.',
    'any.required': 'Informe a nova senha.',
    'string.min': 'A nova senha deve ter pelo menos 6 caracteres.',
    'string.max': 'A nova senha deve ter no máximo 50 caracteres.'
  })
});
