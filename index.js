const express = require('express');
const cors = require('cors');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config');
const usuarioRoutes = require('./routes/usuario');
const obraRoutes = require('./routes/obra');
const categoriasRoutes = require('./routes/categoria');
const tipoobrasRoutes = require('./routes/tipoobra');
const paisesRoutes = require('./routes/pais');
const temporadaRoutes = require('./routes/temporada');
const episodioRoutes = require('./routes/episodio');
const avaliacaoRoutes = require('./routes/avaliacao');

// Configuração do Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mostrando HTML estático na raiz
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/usuarios', usuarioRoutes);
app.use('/obras', obraRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/tipoobras', tipoobrasRoutes);
app.use('/paises', paisesRoutes);
app.use('/temporadas', temporadaRoutes);
app.use('/episodios', episodioRoutes);
app.use('/avaliacoes', avaliacaoRoutes);

// Iniciando servidor
const port = config.port || 3000;
app.listen(port, () => {
  console.log('Servidor Rodando. URL Local: http://localhost:' + port);
});
