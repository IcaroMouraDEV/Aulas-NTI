const express = require('express');
const produtos = require('./data');
const { produtoValidation } = require('./validation');
const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({ msg: 'Hello World!' });
});

app.get('/api/produtos', (req, res) => {
  try {
    const { nome, precoMax } = req.query;
    let prod = [...produtos];
  
    if (nome) {
      prod = produtos.filter((p) => p.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    if (precoMax) {
      prod = prod.filter((p) => p.preco <= precoMax);
    }
  
    res.status(200).json(prod);
  } catch(error) {
    res.status(500).json({ msg: 'Server Internal Error' });
  }
});

app.get('/api/produtos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const resposta = { code: 500, msg: '' };
    const produto = produtos.find((p) => p.id == id);

    if (produto) {
      resposta.code = 200;
      resposta.msg = produto;
    } else {
      resposta.code = 404;
      resposta.msg = { msg: 'Produto não encontrado' };
    }

    res.status(resposta.code).json(resposta.msg);
  } catch(error) {
    res.status(500).json({ msg: 'Server Internal Error' });
  }
});

app.post('/api/produtos', (req, res) => {
  try {
    const data = req.body;
    const resposta = {};
    const validate = produtoValidation(data);
    
    if (validate.isError) {
      resposta.code = validate.code;
      resposta.msg = validate.msg;
    } else {
      const newId = produtos[produtos.length - 1].id + 1;
      const newProduto = { id: newId, ...data };

      produtos.push(newProduto);

      resposta.code = 201;
      resposta.msg = `Produto com o id ${newId} criado com sucesso`;
    }

    res.status(resposta.code).json({ msg: resposta.msg });
  } catch(error) {
    res.status(500).json({ msg: 'Server Internal Error' });
  }
})

app.get('/user', (req, res) => {
  res.status(200).json({ msg: 'User route' });
});

module.exports = app;
