const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // ← Import para log

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Gaga9090.',
  database: 'AgendaDB'
});

// Função de validação
function validarContato(nome, telefones) {
  const nomeValido = /^[A-Za-zÀ-ú\s]+$/.test(nome); // apenas letras e espaços
  const telefonesValidos = telefones.every(t => /^\d+$/.test(t)); // apenas números
  return nomeValido && telefonesValidos;
}

// Listar contatos
app.get('/contatos', (req, res) => {
  const search = req.query.q || '';
  const sql = `
    SELECT c.id, c.nome, c.idade, GROUP_CONCAT(t.numero) AS telefones
    FROM Contato c
    LEFT JOIN Telefone t ON c.id = t.contato_id
    WHERE c.nome LIKE ? OR t.numero LIKE ?
    GROUP BY c.id
  `;
  db.query(sql, [`%${search}%`, `%${search}%`], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Adicionar contato
app.post('/contatos', (req, res) => {
  const { nome, idade, telefones } = req.body;
  const telArray = telefones || [];

  if (!validarContato(nome, telArray)) {
    return res.status(400).json({ error: 'Nome ou telefone inválido!' });
  }

  db.query('INSERT INTO Contato (nome, idade) VALUES (?, ?)', [nome, idade], (err, result) => {
    if (err) return res.status(500).json(err);
    const contatoId = result.insertId;

    if (telArray.length > 0) {
      const values = telArray.map(t => [contatoId, t]);
      db.query('INSERT INTO Telefone (contato_id, numero) VALUES ?', [values], (err2) => {
        if (err2) return res.status(500).json(err2);
        res.sendStatus(201);
      });
    } else {
      res.sendStatus(201);
    }
  });
});

// Excluir contato com log
app.delete('/contatos/:id', (req, res) => {
  const { id } = req.params;

  // Buscar o nome do contato antes de excluir
  db.query('SELECT nome FROM Contato WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).send('Contato não encontrado');

    const nomeContato = results[0].nome;
    const dataHora = new Date().toLocaleString();
    const log = `[${dataHora}] Contato excluído: ${nomeContato}\n`;

    // Gravar no log.txt
    fs.appendFile('log.txt', log, (err) => {
      if (err) console.error('Erro ao gravar log:', err);
    });

    // Excluir o contato
    db.query('DELETE FROM Contato WHERE id = ?', [id], (err2) => {
      if (err2) return res.status(500).json(err2);
      res.sendStatus(200);
    });
  });
});

// Editar contato
app.put('/contatos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, idade, telefones } = req.body;
  const telArray = telefones || [];

  if (!validarContato(nome, telArray)) {
    return res.status(400).json({ error: 'Nome ou telefone inválido!' });
  }

  db.query('UPDATE Contato SET nome=?, idade=? WHERE id=?', [nome, idade, id], (err) => {
    if (err) return res.status(500).json(err);

    db.query('DELETE FROM Telefone WHERE contato_id=?', [id], (err2) => {
      if (err2) return res.status(500).json(err2);

      if (telArray.length > 0) {
        const values = telArray.map(t => [id, t]);
        db.query('INSERT INTO Telefone (contato_id, numero) VALUES ?', [values], (err3) => {
          if (err3) return res.status(500).json(err3);
          res.sendStatus(200);
        });
      } else {
        res.sendStatus(200);
      }
    });
  });
});

// Servir front-end
app.use(express.static('public'));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
