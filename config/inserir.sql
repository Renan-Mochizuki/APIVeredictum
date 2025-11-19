INSERT INTO PaisOrigem (paisNome) VALUES
('Brasil'), ('Estados Unidos'), ('Reino Unido'), ('Canadá'), ('França'),
('Alemanha'), ('Itália'), ('Espanha'), ('Japão'), ('China'),
('Coreia do Sul'), ('Índia'), ('México'), ('Argentina'), ('Austrália'),
('Nova Zelândia'), ('Rússia'), ('Suécia'), ('Noruega'), ('Dinamarca'),
('Finlândia'), ('Bélgica'), ('Holanda'), ('Suíça'), ('África do Sul'),
('Egito'), ('Turquia'), ('Irã'), ('Israel'), ('Arábia Saudita'),
('Emirados Árabes Unidos'), ('Tailândia'), ('Filipinas'), ('Malásia'), ('Singapura'),
('Indonésia'), ('Paquistão'), ('Bangladesh'), ('Nigéria'), ('Quênia'),
('Marrocos'), ('Chile'), ('Colômbia'), ('Peru'), ('Venezuela'),
('Polônia'), ('Hungria'), ('República Tcheca'), ('Grécia'), ('Portugal');

INSERT INTO Categoria (cateNome) VALUES
('Ação'), ('Aventura'), ('Comédia'), ('Drama'), ('Romance'),
('Ficção Científica'), ('Fantasia'), ('Terror'), ('Suspense'), ('Mistério'),
('Documentário'), ('Animação'), ('Musical'), ('Histórico'), ('Guerra'),
('Biografia'), ('Crime'), ('Esporte'), ('Infantil'), ('Thriller');

INSERT INTO TipoObra (tipoNome) VALUES 
('Filme'), ('Série'), ('Anime'), ('Curta'), ('Documentário');

INSERT INTO Funcao (funcTipo) VALUES
-- Interpretação
('Ator'),
('Atriz'),
('Dublador'),
('Narrador'),
('Performer'),
('Figurante'),

-- Direção
('Diretor'),
('Co-Diretor'),
('Assistente de Direção'),
('Diretor de Segunda Unidade'),
('Diretor de Fotografia'),
('Diretor de Arte'),
('Diretor Musical'),
('Diretor de Produção'),

-- Roteiro
('Roteirista'),
('Argumentista'),
('Storyboard Artist'),
('Supervisor de Roteiro'),
('Editor de Roteiro'),

-- Arte / Cenografia
('Cenógrafo'),
('Assistente de Arte'),
('Figurinista'),
('Maquiador'),
('Stylist'),
('Designer de Produção'),
('Aderecista'),
('Criador de Props'),

-- Som / Música
('Compositor'),
('Músico'),
('Técnico de Som'),
('Operador de Boom'),
('Editor de Som'),
('Mixador'),
('Sound Designer'),
('Engenheiro de Áudio'),

-- Câmera / Foto
('Operador de Câmera'),
('Assistente de Câmera'),
('Foquista'),
('Fotógrafo Still'),
('Técnico de Iluminação'),
('Gaffer'),
('Best Boy'),

-- Produção
('Produtor'),
('Co-Produtor'),
('Produtor Executivo'),
('Produtor Associado'),
('Assistente de Produção'),
('Coordenador de Produção'),
('Supervisor de Produção'),
('Gerente de Locação'),

-- Edição / Pós-produção
('Editor'),
('Montador'),
('Colorista'),
('Supervisor de VFX'),
('Artista de VFX'),
('Artista 3D'),
('Compositor Digital'),
('Animador'),
('Motion Designer'),

-- Marketing / Divulgação
('Gerente de Marketing'),
('Social Media'),
('Relações Públicas'),
('Assessoria de Imprensa'),
('Analista de Divulgação'),
('Gerente de Comunidade'),

-- Logística / Técnica
('Motorista'),
('Técnico de Equipamentos'),
('Eletricista de Set'),
('Maquinista'),
('Coordenador de Segurança'),
('Coordenador de Stunts'),
('Dublê'),
('Coordenador de Figurino'),

-- Organizações / Empresas
('Produtora'),
('Co-Produtora'),
('Estúdio'),
('Estúdio de Animação'),
('Estúdio de Pós-Produção'),
('Estúdio de Som'),
('Estúdio de Dublagem'),
('Estúdio de VFX'),
('Distribuidora'),
('Plataforma de Streaming'),
('Canal de TV'),
('Rede de Cinemas'),
('Agregadora'),

-- Marketing e comercial (Organizações)
('Agência de Publicidade'),
('Agência de Marketing'),
('Agência de Relações Públicas'),
('Empresa de Mídia'),
('Agência de Talentos'),

-- Som e Música (Organizações)
('Gravadora'),
('Selo Musical'),
('Estúdio de Gravação'),

-- Serviços técnicos (Organizações)
('Empresa de VFX'),
('Laboratório de Imagem'),
('Empresa de Locação de Equipamentos'),
('Empresa de Edição'),
('Empresa de Legendagem'),
('Empresa de Dublagem'),

-- Infraestrutura (Organizações)
('Empresa de Catering'),
('Empresa de Segurança'),
('Empresa de Logística'),
('Locadora de Veículos'),
('Empresa de Cenografia'),
('Oficina de Figurino');

INSERT INTO Usuario (usuaApelido, usuaEmail, usuaSalt, usuaHash) VALUES ('Guilherme', 'guilherme@gmail.com', 'c4580a036b71500de0289c60986f2ab4', 'be5eaa80d7ec5dc28592877a42098c700dc065acd8b6aa9ff1b9a989e837a39e');
INSERT INTO Usuario (usuaApelido, usuaEmail, usuaSalt, usuaHash) VALUES ('Joao', 'joao@gmail.com', '9cb42959485dceb2d74439c27b6ad58a', '06bc804c2e7ef0efd8849e7a68396bc2c96230e49afb0d322d34af6990dfdebe');
INSERT INTO Usuario (usuaApelido, usuaEmail, usuaSalt, usuaHash) VALUES ('Fernando', 'fernando@gmail.com', '650edaa2d45d2e9702fc2ab0c512f372', '98283cf11f480043024039f04e0991acf18c90bd4b7f415850d336be62992d0e');
INSERT INTO Usuario (usuaApelido, usuaEmail, usuaSalt, usuaHash, usuaTipo) VALUES ('Roberto', 'roberto@gmail.com', 'a45ad34be840827fe86f2e7f3cd7a90b', 'a3225b8c245a2b44ac51d078fbbaad7a7819559961695f6ec1c904b994a90daa', 'critico');
INSERT INTO Usuario (usuaApelido, usuaEmail, usuaSalt, usuaHash, usuaTipo) VALUES ('Aurelio', 'aurelio@gmail.com', '047735395be2ade402ed1fc4f1b7224d', '05718b47ec65ddd6f19fa4c5da11ac57155caa1eaf354140a9ac59146c2e7225', 'moderador');

INSERT INTO Critico (usuaId, critNome, critBio) VALUES (4, 'Roberto dos Santos Menezes', 'Crítico de uma revista muito renomada');
INSERT INTO Moderador (usuaId, modePermissaoCatalogo, modePermissaoComunidade, modePermissaoVerificacao) VALUES (5, true, false, false);

INSERT INTO ListaUsuario (listUsuarioId, listTitulo, listDescricao, listPrivado) VALUES (1, 'Favoritos', NULL, false);
INSERT INTO ListaUsuario (listUsuarioId, listTitulo, listDescricao, listPrivado) VALUES (2, 'Legais', NULL, false);

INSERT INTO Organizacao (orgaNome) VALUES ('Organização 1'), ('Organização 2'), ('Organização 3'), ('Organização 4');
INSERT INTO Profissional (profNome) VALUES ('Profissional 1'), ('Profissional 2'), ('Profissional 3'), ('Profissional 4');

INSERT INTO Obra (obraTitulo, obraDescricao, obraTipoObraNome, obraDataLancamento, obraDuracao, obraImgUrl) VALUES ('Um filme 1', 'Descrição desse filme', 'Filme', '2023-01-01', 120, 'https://upload.wikimedia.org/wikipedia/pt/2/2a/The_Shape_of_Water_%28filme%29.png');

INSERT INTO Participacao (partObraId, partFuncaoId, partOrganizacaoId, partProfissionalId) VALUES (1, 'Ator', NULL, 'Profissional 1'), (1, 'Produtora', 'Organização 1', NULL), (1, 'Diretor', NULL, 'Profissional 2');

INSERT INTO Obra (obraTitulo, obraDescricao, obraTipoObraNome, obraDataLancamento, obraDuracao, obraImgUrl) VALUES ('Uma série 1', 'Descrição dessa série', 'Série', '2024-03-12', NULL, NULL);

INSERT INTO Participacao (partObraId, partFuncaoId, partOrganizacaoId, partProfissionalId) VALUES (2, 'Produtora', 'Organização 1', NULL), (2, 'Distribuidora', 'Organização 2', NULL), (2, 'Ator', NULL, 'Profissional 3');

INSERT INTO Temporada (tempNumero, tempTitulo, tempDataInicio, tempDataFim, tempObraId) VALUES (1, 'Temporada 1', NOW(), NOW(), 2);

INSERT INTO Episodio (episNumero, episDataLancamento, episTitulo, episDescricao, episTemporadaId) VALUES (1, NOW(), 'Titulo desse episódio', 'Descrição desse episódio', 1);
INSERT INTO Episodio (episNumero, episDataLancamento, episTitulo, episDescricao, episTemporadaId) VALUES (2, NOW(), 'Titulo desse episódio', 'Descrição desse episódio', 1);
INSERT INTO Episodio (episNumero, episDataLancamento, episTitulo, episDescricao, episTemporadaId) VALUES (3, NOW(), 'Titulo desse episódio', 'Descrição desse episódio', 1);

INSERT INTO Avaliacao (avalUsuarioId, avalObraId, avalEpisodioId, avalNota, avalComentario) VALUES (1, 1, NULL, 4, 'Comentário da avaliação desse filme');
INSERT INTO Avaliacao (avalUsuarioId, avalObraId, avalEpisodioId, avalNota, avalComentario) VALUES (4, 2, NULL, 4, 'Como crítico achei essa série boa');
INSERT INTO Avaliacao (avalUsuarioId, avalObraId, avalEpisodioId, avalNota, avalComentario) VALUES (4, NULL, 1, 4, 'O primeiro episódio da série foi o pior de todos');

INSERT INTO Obra_ListaUsuario (obraId, listaUsuarioId) VALUES (1, 1);
INSERT INTO Obra_ListaUsuario (obraId, listaUsuarioId) VALUES (2, 1);
INSERT INTO Obra_ListaUsuario (obraId, listaUsuarioId) VALUES (2, 2);

INSERT INTO Obra_Categoria (obraId, categoriaId) VALUES (1, 'Aventura');
INSERT INTO Obra_Categoria (obraId, categoriaId) VALUES (1, 'Comédia');
INSERT INTO Obra_Categoria (obraId, categoriaId) VALUES (2, 'Fantasia');

INSERT INTO Obra_PaisOrigem (obraId, paisOrigemId) VALUES (1, 'Brasil');
INSERT INTO Obra_PaisOrigem (obraId, paisOrigemId) VALUES (2, 'Estados Unidos');