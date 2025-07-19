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

export default schema