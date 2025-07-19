import joi from 'joi'

 const schema = joi.object({
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

  oldAdminName: joi.string().max(50).required().messages({
    'string.base': 'O nome atual do administrador deve ser um texto.',
    'string.empty': 'O nome atual do administrador é obrigatório.',
    'any.required': 'Informe o nome atual do administrador.',
    'string.max': 'O nome atual do administrador deve ter no máximo 50 caracteres.'
  }),

  oldPassWord: joi.string().min(6).max(50).required().messages({
    'string.base': 'A senha atual deve ser um texto.',
    'string.empty': 'A senha atual é obrigatória.',
    'any.required': 'Informe a senha atual.',
    'string.min': 'A senha atual deve ter pelo menos 6 caracteres.',
    'string.max': 'A senha atual deve ter no máximo 50 caracteres.'
  }),

  newPassWord: joi.string().min(6).max(50).required().messages({
    'string.base': 'A nova senha deve ser um texto.',
    'string.empty': 'A nova senha é obrigatória.',
    'any.required': 'Informe a nova senha.',
    'string.min': 'A nova senha deve ter pelo menos 6 caracteres.',
    'string.max': 'A nova senha deve ter no máximo 50 caracteres.'
  })
});

export default schema