const Joi = require('joi');

const produtoSchema = Joi.object({
  nome: Joi.string().max(100).required(),
  preco: Joi.number().greater(0).required(),
});

const produtoValidation = (produto) => {
  const { error } = produtoSchema.validate(produto);
  const resposta = {};

  if (error) {
    resposta.code = 400;
    resposta.isError = true;
    resposta.msg = error.details[0].message;
  } else {
    resposta.isError = false;
  }

  return resposta;
};

module.exports = {
  produtoValidation,
};