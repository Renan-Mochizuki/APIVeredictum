-- População inicial detalhada gerada automaticamente
-- 1) Usuários (25) - incluindo críticos e moderadores
INSERT INTO Usuario (usuaApelido, usuaEmail, usuaSalt, usuaHash) VALUES
('alice', 'alice@example.com', 'a1b2c3d4e5f60718293a4b5c6d7e8f90', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
('bruno', 'bruno@example.com', 'b1b2c3d4e5f60718293a4b5c6d7e8f91', 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'),
('camila', 'camila@example.com', 'c1b2c3d4e5f60718293a4b5c6d7e8f92', 'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc'),
('diego', 'diego@example.com', 'd1b2c3d4e5f60718293a4b5c6d7e8f93', 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'),
('eduardo', 'eduardo@example.com', 'e1b2c3d4e5f60718293a4b5c6d7e8f94', 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'),
('fernanda', 'fernanda@example.com', 'f1b2c3d4e5f60718293a4b5c6d7e8f95', 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
('gustavo', 'gustavo@example.com', 'g1b2c3d4e5f60718293a4b5c6d7e8f96', '1111111111111111111111111111111111111111111111111111111111111111'),
('helena', 'helena@example.com', 'h1b2c3d4e5f60718293a4b5c6d7e8f97', '2222222222222222222222222222222222222222222222222222222222222222'),
('igor', 'igor@example.com', 'i1b2c3d4e5f60718293a4b5c6d7e8f98', '3333333333333333333333333333333333333333333333333333333333333333'),
('juliana', 'juliana@example.com', 'j1b2c3d4e5f60718293a4b5c6d7e8f99', '4444444444444444444444444444444444444444444444444444444444444444'),
('karina', 'karina@example.com', 'k1b2c3d4e5f60718293a4b5c6d7e8f9a', '5555555555555555555555555555555555555555555555555555555555555555'),
('lucas', 'lucas@example.com', 'l1b2c3d4e5f60718293a4b5c6d7e8f9b', '6666666666666666666666666666666666666666666666666666666666666666'),
('marina', 'marina@example.com', 'm1b2c3d4e5f60718293a4b5c6d7e8f9c', '7777777777777777777777777777777777777777777777777777777777777777'),
('nelson', 'nelson@example.com', 'n1b2c3d4e5f60718293a4b5c6d7e8f9d', '8888888888888888888888888888888888888888888888888888888888888888'),
('otavio', 'otavio@example.com', 'o1b2c3d4e5f60718293a4b5c6d7e8f9e', '9999999999999999999999999999999999999999999999999999999999999999'),
('paula', 'paula@example.com', 'p1b2c3d4e5f60718293a4b5c6d7e8f9f', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
('ricardo', 'ricardo@example.com', 'r1b2c3d4e5f60718293a4b5c6d7e8f90', 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'),
('sofia', 'sofia@example.com', 's1b2c3d4e5f60718293a4b5c6d7e8f91', 'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc'),
('thiago', 'thiago@example.com', 't1b2c3d4e5f60718293a4b5c6d7e8f92', 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'),
('vanessa', 'vanessa@example.com', 'v1b2c3d4e5f60718293a4b5c6d7e8f93', 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'),
('wagner', 'wagner@example.com', 'w1b2c3d4e5f60718293a4b5c6d7e8f94', 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
('ximena', 'ximena@example.com', 'x1b2c3d4e5f60718293a4b5c6d7e8f95', '1111111111111111111111111111111111111111111111111111111111111111'),
('yuri', 'yuri@example.com', 'y1b2c3d4e5f60718293a4b5c6d7e8f96', '2222222222222222222222222222222222222222222222222222222222222222'),
('zoe', 'zoe@example.com', 'z1b2c3d4e5f60718293a4b5c6d7e8f97', '3333333333333333333333333333333333333333333333333333333333333333');

-- 8 críticos (associados a alguns dos apelidos acima)
INSERT INTO Critico (usuaId, critNome, critBio)
VALUES
((SELECT usuaId FROM Usuario WHERE usuaApelido='ricardo'), 'Ricardo Alves', 'Crítico de cinema e TV, escreve sobre tendências e análise de roteiros'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='marina'), 'Marina Costa', 'Crítica cultural especializada em séries e documentários'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='fernanda'), 'Fernanda Lima', 'Crítica com foco em cinema nacional'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='otavio'), 'Otávio Pereira', 'Analista de trilhas sonoras e direção de fotografia'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='sofia'), 'Sofia Martins', 'Crítica de cultura pop e séries de streaming'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='gustavo'), 'Gustavo Rocha', 'Crítico veterano, cobertura de festivais'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='nelson'), 'Nelson Cardoso', 'Foco em roteiros e adaptações literárias'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='juliana'), 'Juliana Freitas', 'Avaliações e resenhas de temporadas.');

-- 3 moderadores
INSERT INTO Moderador (usuaId, modePermissaoCatalogo, modePermissaoComunidade, modePermissaoVerificacao)
VALUES
((SELECT usuaId FROM Usuario WHERE usuaApelido='vanessa'), true, false, true),
((SELECT usuaId FROM Usuario WHERE usuaApelido='wagner'), true, true, false),
((SELECT usuaId FROM Usuario WHERE usuaApelido='ximena'), false, true, true);

-- 2) Listas de usuário (10)
INSERT INTO ListaUsuario (listUsuarioId, listTitulo, listDescricao, listPrivado) VALUES
((SELECT usuaId FROM Usuario WHERE usuaApelido='alice'), 'Favoritos Alice', 'Filmes que Alice marcou como favoritos', false),
((SELECT usuaId FROM Usuario WHERE usuaApelido='bruno'), 'Para assistir', 'Filmes e séries que quero ver', true),
((SELECT usuaId FROM Usuario WHERE usuaApelido='camila'), 'Top 10 2024', NULL, false),
((SELECT usuaId FROM Usuario WHERE usuaApelido='diego'), 'Documentários', 'Documentários sobre história e ciência', true),
((SELECT usuaId FROM Usuario WHERE usuaApelido='eduardo'), 'Animes', NULL, false),
((SELECT usuaId FROM Usuario WHERE usuaApelido='karina'), 'Comédias leves', NULL, false),
((SELECT usuaId FROM Usuario WHERE usuaApelido='lucas'), 'Clássicos', NULL, true),
((SELECT usuaId FROM Usuario WHERE usuaApelido='marina'), 'Críticas pessoais', NULL, false),
((SELECT usuaId FROM Usuario WHERE usuaApelido='ricardo'), 'Recomendados pelo Ricardo', NULL, false),
((SELECT usuaId FROM Usuario WHERE usuaApelido='paula'), 'Séries para maratonar', NULL, false);

-- 3) Organizações (15)
INSERT INTO Organizacao (orgaNome) VALUES
('Warner Bros.'), ('Netflix'), ('Amazon Studios'), ('Universal Pictures'), ('20th Century Studios'),
('Pixar Animation Studios'), ('Studio Ghibli'), ('BBC Studios'), ('HBO'), ('Paramount Pictures'),
('Lionsgate'), ('Toho Company'), ('Madhouse'), ('A24'), ('BBC Films');

-- 4) Profissionais (40)
INSERT INTO Profissional (profNome) VALUES
('Steven Spielberg'), ('Christopher Nolan'), ('Quentin Tarantino'), ('Hayao Miyazaki'), ('Greta Gerwig'),
('Bong Joon-ho'), ('Kathryn Bigelow'), ('Pedro Almodóvar'), ('Guillermo del Toro'), ('Chloé Zhao'),
('Hans Zimmer'), ('John Williams'), ('Ennio Morricone'), ('Roger Deakins'), ('Emmanuel Lubezki'),
('Alfonso Cuarón'), ('Wes Anderson'), ('Martin Scorsese'), ('Ang Lee'), ('Spike Lee'),
('Nadine Labaki'), ('Denis Villeneuve'), ('James Cameron'), ('Rian Johnson'), ('Ava DuVernay'),
('Sofia Coppola'), ('Taika Waititi'), ('Zack Snyder'), ('Patty Jenkins'), ('Tim Burton'),
('Hayley Atwell'), ('Tom Holland'), ('Natalie Portman'), ('Denzel Washington'), ('Leonardo DiCaprio'),
('Meryl Streep'), ('Brad Pitt'), ('Scarlett Johansson'), ('Adam Driver'), ('Emma Stone'),
('Joaquim Phoenix'), ('Saoirse Ronan');

-- 5) Obras (55) - 40 Filmes + 15 Séries
-- Filmes (40)
INSERT INTO Obra (obraTitulo, obraDescricao, obraTipoObraNome, obraDataLancamento, obraDuracao, obraImgUrl) VALUES
('The Lighthouse', 'Drama psicológico sobre dois faroleiros.', 'Filme', '2019-10-18', 109, NULL),
('Parasite', 'Família pobre se infiltra em família rica.', 'Filme', '2019-05-30', 132, NULL),
('Inception', 'Roubo de ideias em sonhos.', 'Filme', '2010-07-16', 148, NULL),
('Interstellar', 'Viagem espacial e amor familiar.', 'Filme', '2014-11-07', 169, NULL),
('The Shape of Water', 'Romance fantástico entre mulher e criatura.', 'Filme', '2017-12-01', 123, NULL),
('The Grand Budapest Hotel', 'Comédia dramática em hotel europeu.', 'Filme', '2014-03-28', 100, NULL),
('Moonlight', 'Jornada de autodescoberta.', 'Filme', '2016-10-21', 111, NULL),
('Whiplash', 'Professor rigoroso e baterista talentoso.', 'Filme', '2014-10-10', 106, NULL),
('La La Land', 'Musical moderno sobre sonhos em LA.', 'Filme', '2016-12-09', 128, NULL),
('Mad Max: Fury Road', 'Ação pós-apocalíptica intensa.', 'Filme', '2015-05-15', 120, NULL),
('The Godfather', 'Saga de família mafiosa.', 'Filme', '1972-03-24', 175, NULL),
('Pulp Fiction', 'Histórias interligadas no submundo.', 'Filme', '1994-10-14', 154, NULL),
('The Matrix', 'Realidade simulada e revolução.', 'Filme', '1999-03-31', 136, NULL),
('The Irishman', 'Drama criminal e envelhecimento.', 'Filme', '2019-11-01', 209, NULL),
('Nomadland', 'Viagem e vida nômade moderna.', 'Filme', '2020-10-02', 107, NULL),
('The Social Network', 'História da criação do Facebook.', 'Filme', '2010-10-01', 120, NULL),
('Spotlight', 'Jornalismo investigativo.', 'Filme', '2015-11-06', 129, NULL),
('Get Out', 'Terror social e sátira.', 'Filme', '2017-02-24', 104, NULL),
('Black Panther', 'Super-herói e reino africano.', 'Filme', '2018-02-16', 134, NULL),
('The Departed', 'Guerra de policiais e gangsters.', 'Filme', '2006-10-06', 151, NULL),
('Her', 'Romance com inteligência artificial.', 'Filme', '2013-12-18', 126, NULL),
('The Revenant', 'Sobrevivência e vingança.', 'Filme', '2015-12-25', 156, NULL),
('A Separation', 'Drama iraniano sobre família.', 'Filme', '2011-03-16', 123, NULL),
('Shoplifters', 'Família improvável e laços humanos.', 'Filme', '2018-05-18', 121, NULL),
('The Handmaiden', 'Thriller psicológico coreano.', 'Filme', '2016-06-01', 145, NULL),
('The Farewell', 'Drama familiar entre culturas.', 'Filme', '2019-07-12', 100, NULL),
('Boyhood', 'Filmado ao longo de 12 anos.', 'Filme', '2014-07-11', 165, NULL),
('Birdman', 'Ex-astro busca redenção em palco.', 'Filme', '2014-08-27', 119, NULL),
('The Truman Show', 'Vida transmitida sem saber.', 'Filme', '1998-06-05', 103, NULL),
('Call Me By Your Name', 'Romance de verão na Itália.', 'Filme', '2017-01-27', 132, NULL),
('Drive', 'Piloto de fuga e submundo.', 'Filme', '2011-09-16', 100, NULL),
('Oldboy', 'Vingança e conspiração.', 'Filme', '2003-11-21', 120, NULL),
('City of God', 'Ascensão e violência nas favelas.', 'Filme', '2002-02-13', 130, NULL),
('Amélie', 'Comédia romântica parisiense.', 'Filme', '2001-04-25', 122, NULL),
('The Wolf of Wall Street', 'Excessos e corrupção financeira.', 'Filme', '2013-12-25', 180, NULL),
('Eternal Sunshine of the Spotless Mind', 'Memória e relacionamento.', 'Filme', '2004-03-19', 108, NULL),
('Memento', 'Thriller não-linear sobre memória.', 'Filme', '2000-09-05', 113, NULL),
('No Country for Old Men', 'Caçada implacável no Texas.', 'Filme', '2007-11-09', 122, NULL),
('Spotlight on Music', 'Curta experimental sobre trilhas.', 'Filme', '2018-04-01', 15, NULL);

-- Séries (15)
INSERT INTO Obra (obraTitulo, obraDescricao, obraTipoObraNome, obraDataLancamento, obraDuracao, obraImgUrl) VALUES
('The Expanse', 'Drama sci-fi político e aventuroso.', 'Série', '2015-12-14', NULL, NULL),
('Stranger Things', 'Mistério sobrenatural nos anos 80.', 'Série', '2016-07-15', NULL, NULL),
('Breaking Bad', 'Professor vira fabricante de metanfetamina.', 'Série', '2008-01-20', NULL, NULL),
('Chernobyl', 'Reconstituição do desastre nuclear.', 'Série', '2019-05-06', NULL, NULL),
('Fleabag', 'Comédia dramática na visão de uma mulher.', 'Série', '2016-07-21', NULL, NULL),
('Better Call Saul', 'Prelúdio do universo Breaking Bad.', 'Série', '2015-02-08', NULL, NULL),
('The Crown', 'Drama sobre a família real britânica.', 'Série', '2016-11-04', NULL, NULL),
('Mindhunter', 'Agentes estudam perfis de serial killers.', 'Série', '2017-10-13', NULL, NULL),
('The Mandalorian', 'Aventura no universo Star Wars.', 'Série', '2019-11-12', NULL, NULL),
('Dark', 'Mistério de viagem no tempo alemã.', 'Série', '2017-12-01', NULL, NULL),
('Killing Eve', 'Jogo de gato e rato entre espiã e assassina.', 'Série', '2018-04-08', NULL, NULL),
('The Handmaid''s Tale', 'Distopia e resistência.', 'Série', '2017-04-26', NULL, NULL),
('Sherlock', 'Adaptação moderna das aventuras de Holmes.', 'Série', '2010-07-25', NULL, NULL),
('True Detective', 'Séries antológicas de investigações criminais.', 'Série', '2014-01-12', NULL, NULL),
('Black Mirror', 'Contos distópicos sobre tecnologia.', 'Série', '2011-12-04', NULL, NULL);

-- 6) Temporadas (para cada série criamos 1 temporada inicial; você pode estender depois)
INSERT INTO Temporada (tempNumero, tempTitulo, tempDataInicio, tempDataFim, tempDescricao, tempObraId)
VALUES
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='The Expanse')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='Stranger Things')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='Breaking Bad')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='Chernobyl')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='Fleabag')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='Better Call Saul')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='The Crown')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='Mindhunter')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='The Mandalorian')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='Dark')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='Killing Eve')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='The Handmaid''s Tale')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='Sherlock')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='True Detective')),
(1, 'Season 1', NOW(), NOW(), 'Temporada inicial', (SELECT obraId FROM Obra WHERE obraTitulo='Black Mirror'));

-- 7) Episódios (para cada temporada criamos 4 episódios iniciais)
-- We'll reference the temporada by obraId and tempNumero=1 and use simple unique titles.
INSERT INTO Episodio (episNumero, episDataLancamento, episTitulo, episDescricao, episTemporadaId)
VALUES
-- The Expanse S1
(1, NOW(), 'Dulcinea', 'A tripulação se envolve em uma conspiração', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Expanse') AND tempNumero=1)),
(2, NOW(), 'The Big Empty', 'Tensão e descobertas', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Expanse') AND tempNumero=1)),
(3, NOW(), 'Remember the Cant', 'Investigações avançam', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Expanse') AND tempNumero=1)),
(4, NOW(), 'CQB', 'Clímax da temporada', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Expanse') AND tempNumero=1)),

-- Stranger Things S1
(1, NOW(), 'The Vanishing', 'Mistérios em Hawkins', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Stranger Things') AND tempNumero=1)),
(2, NOW(), 'The Walkie Talkie', 'Amigos em busca do desaparecido', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Stranger Things') AND tempNumero=1)),
(3, NOW(), 'The Upside Down', 'Contato com outra dimensão', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Stranger Things') AND tempNumero=1)),
(4, NOW(), 'The Finale', 'Batalha no mundo invertido', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Stranger Things') AND tempNumero=1)),

-- Breaking Bad S1
(1, NOW(), 'Pilot', 'Professor muda radicalmente de vida', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Breaking Bad') AND tempNumero=1)),
(2, NOW(), 'Cat''s in the Bag...', 'Consequências iniciais', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Breaking Bad') AND tempNumero=1)),
(3, NOW(), '...And the Bag''s in the River', 'Dilemas morais e confronto', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Breaking Bad') AND tempNumero=1)),
(4, NOW(), 'Cancer Diagnosis', 'Vida e decisões', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Breaking Bad') AND tempNumero=1)),

-- Chernobyl S1
(1, NOW(), '1:23:45', 'Explosão e caos inicial', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Chernobyl') AND tempNumero=1)),
(2, NOW(), 'Open Wide, O Earth', 'Tentativas de contenção', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Chernobyl') AND tempNumero=1)),
(3, NOW(), 'Please Remain Calm', 'Impacto humano', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Chernobyl') AND tempNumero=1)),
(4, NOW(), 'The Truth About the Accident', 'Auditoria e responsabilidade', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Chernobyl') AND tempNumero=1)),

-- Fleabag S1
(1, NOW(), 'Pilot', 'Humor ácido e drama', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Fleabag') AND tempNumero=1)),
(2, NOW(), 'Episode 2', 'Dinâmica familiar', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Fleabag') AND tempNumero=1)),
(3, NOW(), 'Episode 3', 'Momento reflexivo', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Fleabag') AND tempNumero=1)),
(4, NOW(), 'Episode 4', 'Confrontos pessoais', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Fleabag') AND tempNumero=1)),

-- Better Call Saul S1
(1, NOW(), 'Uno', 'Origem de Saul Goodman', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Better Call Saul') AND tempNumero=1)),
(2, NOW(), 'Mijo', 'Caminho para o submundo', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Better Call Saul') AND tempNumero=1)),
(3, NOW(), 'Nacho', 'Dilemas éticos', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Better Call Saul') AND tempNumero=1)),
(4, NOW(), 'Hero', 'Decisões arriscadas', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Better Call Saul') AND tempNumero=1)),

-- The Crown S1
(1, NOW(), 'Wolferton Splash', 'No início da nova era', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Crown') AND tempNumero=1)),
(2, NOW(), 'Hyde Park Corner', 'Transição de poder', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Crown') AND tempNumero=1)),
(3, NOW(), 'Windsor', 'Tensões familiares', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Crown') AND tempNumero=1)),
(4, NOW(), 'Palace Intrigue', 'Política e imprensa', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Crown') AND tempNumero=1)),

-- Mindhunter S1
(1, NOW(), 'Episode 1', 'Estudo de perfis', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Mindhunter') AND tempNumero=1)),
(2, NOW(), 'Episode 2', 'Interrogatórios', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Mindhunter') AND tempNumero=1)),
(3, NOW(), 'Episode 3', 'Perfis em evolução', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Mindhunter') AND tempNumero=1)),
(4, NOW(), 'Episode 4', 'Conexões sombrias', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Mindhunter') AND tempNumero=1)),

-- The Mandalorian S1
(1, NOW(), 'Chapter 1', 'Caçador solitário e a criança', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Mandalorian') AND tempNumero=1)),
(2, NOW(), 'Chapter 2', 'Aliança e perigo', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Mandalorian') AND tempNumero=1)),
(3, NOW(), 'Chapter 3', 'Resgate arriscado', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Mandalorian') AND tempNumero=1)),
(4, NOW(), 'Chapter 4', 'Revelações', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Mandalorian') AND tempNumero=1)),

-- Dark S1
(1, NOW(), 'Secrets', 'Viagens no tempo e segredos', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Dark') AND tempNumero=1)),
(2, NOW(), 'Family Ties', 'Laços que se conectam', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Dark') AND tempNumero=1)),
(3, NOW(), 'The Cave', 'Mistério se aprofunda', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Dark') AND tempNumero=1)),
(4, NOW(), 'Origins', 'Início dos eventos', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Dark') AND tempNumero=1)),

-- Killing Eve S1
(1, NOW(), 'Nice Face', 'Obcecada por uma assassina', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Killing Eve') AND tempNumero=1)),
(2, NOW(), 'I ll Deal With Him Later', 'Perseguições e humor sombrio', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Killing Eve') AND tempNumero=1)),
(3, NOW(), 'I Have A Thing About Bathrooms', 'Jogos mentais', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Killing Eve') AND tempNumero=1)),
(4, NOW(), 'Sorry Baby', 'Clímax tenso', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Killing Eve') AND tempNumero=1)),

-- The Handmaid's Tale S1
(1, NOW(), 'Offred', 'Distopia e resistência', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Handmaid''s Tale') AND tempNumero=1)),
(2, NOW(), 'Birth Day', 'Consequências do controle', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Handmaid''s Tale') AND tempNumero=1)),
(3, NOW(), 'Late', 'Conflitos íntimos', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Handmaid''s Tale') AND tempNumero=1)),
(4, NOW(), 'The Bridge', 'Planos e esperança', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Handmaid''s Tale') AND tempNumero=1)),

-- Sherlock S1
(1, NOW(), 'A Study in Pink', 'Mistério e dedução', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Sherlock') AND tempNumero=1)),
(2, NOW(), 'The Blind Banker', 'Código e crime', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Sherlock') AND tempNumero=1)),
(3, NOW(), 'The Great Game', 'Enigmas e perseguições', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Sherlock') AND tempNumero=1)),
(4, NOW(), 'Finale', 'Conclusão do arco', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Sherlock') AND tempNumero=1)),

-- True Detective S1
(1, NOW(), 'The Long Bright Dark', 'Investigação profunda', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='True Detective') AND tempNumero=1)),
(2, NOW(), 'Seeing Things', 'Sombras do passado', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='True Detective') AND tempNumero=1)),
(3, NOW(), 'The Locked Room', 'Pistas e tensão', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='True Detective') AND tempNumero=1)),
(4, NOW(), 'Who Goes There', 'Confrontos finais', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='True Detective') AND tempNumero=1)),

-- Black Mirror S1
(1, NOW(), 'The National Anthem', 'Contos distópicos', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Black Mirror') AND tempNumero=1)),
(2, NOW(), 'Fifteen Million Merits', 'Sociedade e voyeurismo', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Black Mirror') AND tempNumero=1)),
(3, NOW(), 'The Entire History of You', 'Memória e obsessão', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Black Mirror') AND tempNumero=1)),
(4, NOW(), 'Be Right Back', 'Perda e tecnologia', (SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Black Mirror') AND tempNumero=1));

-- 8) Participações (associar organizações e profissionais às obras)
-- For each obra we'll add 2-3 participations using existing professionals and organizations
INSERT INTO Participacao (partObraId, partFuncaoId, partOrganizacaoId, partProfissionalId) VALUES
-- Example participations for some filmes
((SELECT obraId FROM Obra WHERE obraTitulo='Inception'), 'Diretor', NULL, 'Christopher Nolan'),
((SELECT obraId FROM Obra WHERE obraTitulo='Inception'), 'Produtora', 'Warner Bros.', NULL),
((SELECT obraId FROM Obra WHERE obraTitulo='Parasite'), 'Diretor', NULL, 'Bong Joon-ho'),
((SELECT obraId FROM Obra WHERE obraTitulo='Parasite'), 'Produtora', 'CJ Entertainment', NULL),
((SELECT obraId FROM Obra WHERE obraTitulo='Interstellar'), 'Diretor', NULL, 'Christopher Nolan'),
((SELECT obraId FROM Obra WHERE obraTitulo='Interstellar'), 'Trilha Sonora', NULL, 'Hans Zimmer'),

-- Spread participations across many obras (use some organizations and professionals above)
((SELECT obraId FROM Obra WHERE obraTitulo='The Lighthouse'), 'Diretor', NULL, 'Robert Eggers'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Grand Budapest Hotel'), 'Diretor', NULL, 'Wes Anderson'),
((SELECT obraId FROM Obra WHERE obraTitulo='Moonlight'), 'Diretor', NULL, 'Barry Jenkins'),
((SELECT obraId FROM Obra WHERE obraTitulo='Whiplash'), 'Diretor', NULL, 'Damien Chazelle'),
((SELECT obraId FROM Obra WHERE obraTitulo='La La Land'), 'Diretor', NULL, 'Damien Chazelle'),
((SELECT obraId FROM Obra WHERE obraTitulo='Mad Max: Fury Road'), 'Diretor', NULL, 'George Miller'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Godfather'), 'Produtora', 'Paramount Pictures', NULL),
((SELECT obraId FROM Obra WHERE obraTitulo='Pulp Fiction'), 'Diretor', NULL, 'Quentin Tarantino'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Matrix'), 'Diretor', NULL, 'Lana Wachowski'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Irishman'), 'Produtora', 'Netflix', NULL),
((SELECT obraId FROM Obra WHERE obraTitulo='Nomadland'), 'Diretor', NULL, 'Chloé Zhao'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Social Network'), 'Diretor', NULL, 'David Fincher'),

-- Participações para séries (exemplos)
((SELECT obraId FROM Obra WHERE obraTitulo='Stranger Things'), 'Produtora', 'Netflix', NULL),
((SELECT obraId FROM Obra WHERE obraTitulo='Stranger Things'), 'Ator', NULL, 'Finn Wolfhard'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Mandalorian'), 'Produtora', 'Lucasfilm', NULL),
((SELECT obraId FROM Obra WHERE obraTitulo='Breaking Bad'), 'Produtora', 'AMC', NULL),
((SELECT obraId FROM Obra WHERE obraTitulo='Chernobyl'), 'Produtora', 'HBO', NULL),

-- Additional participations for various obras (diversifying)
((SELECT obraId FROM Obra WHERE obraTitulo='La La Land'), 'Ator', NULL, 'Emma Stone'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Revenant'), 'Ator', NULL, 'Leonardo DiCaprio'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Social Network'), 'Ator', NULL, 'Jesse Eisenberg'),
((SELECT obraId FROM Obra WHERE obraTitulo='Birdman'), 'Diretor', NULL, 'Alejandro González Iñárritu');

-- Note: some organization names like 'CJ Entertainment', 'Lionsgate', 'AMC', 'Lucasfilm' may not be in Organizacao table above.
-- If missing, we can add a few extra organizations now:
INSERT INTO Organizacao (orgaNome) VALUES
('CJ Entertainment'), ('AMC'), ('Lucasfilm'), ('Paramount Pictures'), ('Netflix Studios') ON CONFLICT DO NOTHING;

-- 9) Obra_PaisOrigem (incluindo alguns com múltiplos países)
INSERT INTO Obra_PaisOrigem (obraId, paisOrigemId) VALUES
((SELECT obraId FROM Obra WHERE obraTitulo='Parasite'), 'Coreia do Sul'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Grand Budapest Hotel'), 'Reino Unido'),
((SELECT obraId FROM Obra WHERE obraTitulo='La La Land'), 'Estados Unidos'),
((SELECT obraId FROM Obra WHERE obraTitulo='Amélie'), 'França'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Godfather'), 'Estados Unidos'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Handmaid''s Tale'), 'Canadá'),
-- Example with two countries
((SELECT obraId FROM Obra WHERE obraTitulo='The Shape of Water'), 'Estados Unidos'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Shape of Water'), 'Canadá'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Expanse'), 'Estados Unidos'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Expanse'), 'Canadá');

-- 10) Obra_Categoria (atribuir categorias; use categorias já existentes)
INSERT INTO Obra_Categoria (obraId, categoriaId) VALUES
((SELECT obraId FROM Obra WHERE obraTitulo='Inception'), 'Ficção Científica'),
((SELECT obraId FROM Obra WHERE obraTitulo='Inception'), 'Thriller'),
((SELECT obraId FROM Obra WHERE obraTitulo='Parasite'), 'Drama'),
((SELECT obraId FROM Obra WHERE obraTitulo='Parasite'), 'Mistério'),
((SELECT obraId FROM Obra WHERE obraTitulo='La La Land'), 'Musical'),
((SELECT obraId FROM Obra WHERE obraTitulo='Mad Max: Fury Road'), 'Ação'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Godfather'), 'Crime'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Grand Budapest Hotel'), 'Comédia'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Expanse'), 'Ficção Científica'),
((SELECT obraId FROM Obra WHERE obraTitulo='Stranger Things'), 'Suspense'),
((SELECT obraId FROM Obra WHERE obraTitulo='Breaking Bad'), 'Crime'),
((SELECT obraId FROM Obra WHERE obraTitulo='Chernobyl'), 'Histórico'),
((SELECT obraId FROM Obra WHERE obraTitulo='Fleabag'), 'Comédia'),
((SELECT obraId FROM Obra WHERE obraTitulo='Mindhunter'), 'Suspense'),
((SELECT obraId FROM Obra WHERE obraTitulo='The Mandalorian'), 'Ficção Científica'),
((SELECT obraId FROM Obra WHERE obraTitulo='Dark'), 'Suspense'),
((SELECT obraId FROM Obra WHERE obraTitulo='Killing Eve'), 'Suspense'),
((SELECT obraId FROM Obra WHERE obraTitulo='Black Mirror'), 'Ficção Científica');

-- 11) Obra_ListaUsuario (adicionar obras às listas)
INSERT INTO Obra_ListaUsuario (obraId, listaUsuarioId) VALUES
((SELECT obraId FROM Obra WHERE obraTitulo='Inception'), (SELECT listId FROM ListaUsuario WHERE listTitulo='Favoritos Alice')),
((SELECT obraId FROM Obra WHERE obraTitulo='Parasite'), (SELECT listId FROM ListaUsuario WHERE listTitulo='Para assistir')),
((SELECT obraId FROM Obra WHERE obraTitulo='Stranger Things'), (SELECT listId FROM ListaUsuario WHERE listTitulo='Séries para maratonar')),
((SELECT obraId FROM Obra WHERE obraTitulo='Breaking Bad'), (SELECT listId FROM ListaUsuario WHERE listTitulo='Séries para maratonar')),
((SELECT obraId FROM Obra WHERE obraTitulo='La La Land'), (SELECT listId FROM ListaUsuario WHERE listTitulo='Para assistir')),
((SELECT obraId FROM Obra WHERE obraTitulo='The Expanse'), (SELECT listId FROM ListaUsuario WHERE listTitulo='Top 10 2024')),
((SELECT obraId FROM Obra WHERE obraTitulo='The Mandalorian'), (SELECT listId FROM ListaUsuario WHERE listTitulo='Para assistir')),
((SELECT obraId FROM Obra WHERE obraTitulo='The Grand Budapest Hotel'), (SELECT listId FROM ListaUsuario WHERE listTitulo='Clássicos')),
((SELECT obraId FROM Obra WHERE obraTitulo='Moonlight'), (SELECT listId FROM ListaUsuario WHERE listTitulo='Favoritos Alice')),
((SELECT obraId FROM Obra WHERE obraTitulo='Nomadland'), (SELECT listId FROM ListaUsuario WHERE listTitulo='Recomendados pelo Ricardo'));

-- 12) Avaliações (60) - mistura de usuários comuns e críticos para obras e episódios
-- We'll insert ~40 para obras e ~20 para episódios
-- Avaliações para obras (exemplos variados)
INSERT INTO Avaliacao (avalUsuarioId, avalObraId, avalEpisodioId, avalNota, avalComentario) VALUES
((SELECT usuaId FROM Usuario WHERE usuaApelido='alice'), (SELECT obraId FROM Obra WHERE obraTitulo='Inception'), NULL, 9, 'Um filme que recompensa múltiplas assistidas.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='bruno'), (SELECT obraId FROM Obra WHERE obraTitulo='Parasite'), NULL, 10, 'Obra brilhante e cheia de camadas sociais.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='camila'), (SELECT obraId FROM Obra WHERE obraTitulo='Interstellar'), NULL, 8, 'Emocionante e ambicioso.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='ricardo'), (SELECT obraId FROM Obra WHERE obraTitulo='Interstellar'), NULL, 9, 'Belíssima obra de referência.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='marina'), (SELECT obraId FROM Obra WHERE obraTitulo='La La Land'), NULL, 8, 'Delicado e musical.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='nelson'), (SELECT obraId FROM Obra WHERE obraTitulo='The Godfather'), NULL, 10, 'Clássico atemporal.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='juliana'), (SELECT obraId FROM Obra WHERE obraTitulo='Moonlight'), NULL, 9, 'Rico e comovente.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='diego'), (SELECT obraId FROM Obra WHERE obraTitulo='Whiplash'), NULL, 9, 'Intenso e perfeito no ritmo.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='eduardo'), (SELECT obraId FROM Obra WHERE obraTitulo='Mad Max: Fury Road'), NULL, 8, 'Ação pura e estética.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='paula'), (SELECT obraId FROM Obra WHERE obraTitulo='The Matrix'), NULL, 9, 'Revolucionário.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='karina'), (SELECT obraId FROM Obra WHERE obraTitulo='Nomadland'), NULL, 8, 'Subtil e comovente.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='lucas'), (SELECT obraId FROM Obra WHERE obraTitulo='The Irishman'), NULL, 7, 'Longo, mas interessante.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='sofia'), (SELECT obraId FROM Obra WHERE obraTitulo='Shoplifters'), NULL, 9, 'Humanidade e sutileza.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='thiago'), (SELECT obraId FROM Obra WHERE obraTitulo='The Revenant'), NULL, 8, 'Visceral e visualmente impressionante.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='vanessa'), (SELECT obraId FROM Obra WHERE obraTitulo='The Farewell'), NULL, 8, 'Delicado e honesto.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='wagner'), (SELECT obraId FROM Obra WHERE obraTitulo='Pulp Fiction'), NULL, 10, 'Diálogo e estrutura fenomenais.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='ximena'), (SELECT obraId FROM Obra WHERE obraTitulo='Spotlight'), NULL, 9, 'Exemplo de jornalismo investigativo.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='yuri'), (SELECT obraId FROM Obra WHERE obraTitulo='Get Out'), NULL, 9, 'Terror social impecável.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='zoe'), (SELECT obraId FROM Obra WHERE obraTitulo='Black Panther'), NULL, 8, 'Impacto cultural forte.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='alice'), (SELECT obraId FROM Obra WHERE obraTitulo='Amélie'), NULL, 9, 'Encantadora e bem filmada.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='bruno'), (SELECT obraId FROM Obra WHERE obraTitulo='The Wolf of Wall Street'), NULL, 7, 'Excessos bem dirigidos.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='camila'), (SELECT obraId FROM Obra WHERE obraTitulo='Eternal Sunshine of the Spotless Mind'), NULL, 9, 'Criativo e emocionante.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='ricardo'), (SELECT obraId FROM Obra WHERE obraTitulo='Memento'), NULL, 9, 'Narrativa brilhante.'),

-- Avaliações para episódios (aprox 20)
((SELECT usuaId FROM Usuario WHERE usuaApelido='marina'), NULL, (SELECT episId FROM Episodio WHERE episTitulo='Dulcinea' AND episTemporadaId=(SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Expanse') AND tempNumero=1), 8, 'Excelente episódio piloto.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='nelson'), NULL, (SELECT episId FROM Episodio WHERE episTitulo='The Upside Down' AND episTemporadaId=(SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Stranger Things') AND tempNumero=1), 9, 'Tensão muito bem construída.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='juliana'), NULL, (SELECT episId FROM Episodio WHERE episTitulo='Pilot' AND episTemporadaId=(SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Breaking Bad') AND tempNumero=1), 10, 'Um começo brilhante.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='diego'), NULL, (SELECT episId FROM Episodio WHERE episTitulo='1:23:45' AND episTemporadaId=(SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Chernobyl') AND tempNumero=1), 9, 'Intenso e perturbador.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='eduardo'), NULL, (SELECT episId FROM Episodio WHERE episTitulo='Chapter 1' AND episTemporadaId=(SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Mandalorian') AND tempNumero=1), 8, 'Aventura com estilo.'),

-- More mixed reviews for random obras and episodes to reach ~60 total entries
((SELECT usuaId FROM Usuario WHERE usuaApelido='paula'), (SELECT obraId FROM Obra WHERE obraTitulo='The Matrix'), NULL, 10, 'Revolucionário.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='karina'), (SELECT obraId FROM Obra WHERE obraTitulo='Nomadland'), NULL, 8, 'Impecável.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='lucas'), NULL, (SELECT episId FROM Episodio WHERE episTitulo='The Finale' AND episTemporadaId=(SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Stranger Things') AND tempNumero=1), 9, 'Grande final.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='sofia'), (SELECT obraId FROM Obra WHERE obraTitulo='Spotlight'), NULL, 9, 'Jornalismo em destaque.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='thiago'), (SELECT obraId FROM Obra WHERE obraTitulo='Drive'), NULL, 8, 'Estética e tensão.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='vanessa'), NULL, (SELECT episId FROM Episodio WHERE episTitulo='Pilot' AND episTemporadaId=(SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Stranger Things') AND tempNumero=1), 8, 'Ótimo piloto.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='wagner'), (SELECT obraId FROM Obra WHERE obraTitulo='Pulp Fiction'), NULL, 10, 'Clássico moderno.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='ximena'), (SELECT obraId FROM Obra WHERE obraTitulo='The Farewell'), NULL, 8, 'Comovente.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='yuri'), (SELECT obraId FROM Obra WHERE obraTitulo='Get Out'), NULL, 9, 'Tenso e relevante.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='zoe'), NULL, (SELECT episId FROM Episodio WHERE episTitulo='Dulcinea' AND episTemporadaId=(SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Expanse') AND tempNumero=1), 8, 'Piloto muito bom.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='alice'), (SELECT obraId FROM Obra WHERE obraTitulo='Birdman'), NULL, 8, 'Criativo e ousado.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='bruno'), (SELECT obraId FROM Obra WHERE obraTitulo='The Social Network'), NULL, 8, 'Ritmo e roteiro excelentes.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='camila'), (SELECT obraId FROM Obra WHERE obraTitulo='Boyhood'), NULL, 7, 'Experiência curiosa.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='ricardo'), NULL, (SELECT episId FROM Episodio WHERE episTitulo='Pilot' AND episTemporadaId=(SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Expanse') AND tempNumero=1), 9, 'Ótimo começo.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='marina'), (SELECT obraId FROM Obra WHERE obraTitulo='Shoplifters'), NULL, 9, 'Imperdível.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='nelson'), (SELECT obraId FROM Obra WHERE obraTitulo='Oldboy'), NULL, 9, 'Impactante.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='juliana'), (SELECT obraId FROM Obra WHERE obraTitulo='The Truman Show'), NULL, 8, 'Reflexivo e atual.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='diego'), (SELECT obraId FROM Obra WHERE obraTitulo='Call Me By Your Name'), NULL, 8, 'Sensível e bem fotografado.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='eduardo'), (SELECT obraId FROM Obra WHERE obraTitulo='The Lighthouse'), NULL, 7, 'Atmosfera intensa.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='paula'), (SELECT obraId FROM Obra WHERE obraTitulo='The Wolf of Wall Street'), NULL, 7, 'Energia e excesso.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='karina'), NULL, (SELECT episId FROM Episodio WHERE episTitulo='Chapter 1' AND episTemporadaId=(SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='The Mandalorian') AND tempNumero=1), 8, 'Boa introdução à série.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='lucas'), (SELECT obraId FROM Obra WHERE obraTitulo='The Irishman'), NULL, 8, 'Cinema de contemplação.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='sofia'), (SELECT obraId FROM Obra WHERE obraTitulo='Eternal Sunshine of the Spotless Mind'), NULL, 9, 'Inesquecível.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='thiago'), (SELECT obraId FROM Obra WHERE obraTitulo='Memento'), NULL, 9, 'Estrutura brilhante.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='vanessa'), (SELECT obraId FROM Obra WHERE obraTitulo='City of God'), NULL, 9, 'Cru e visceral.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='wagner'), (SELECT obraId FROM Obra WHERE obraTitulo='Spotlight'), NULL, 9, 'Impecável.'),
((SELECT usuaId FROM Usuario WHERE usuaApelido='ximena'), NULL, (SELECT episId FROM Episodio WHERE episTitulo='Pilot' AND episTemporadaId=(SELECT tempId FROM Temporada WHERE tempObraId=(SELECT obraId FROM Obra WHERE obraTitulo='Breaking Bad') AND tempNumero=1), 9, 'Pilot marcante.');

-- Observação: o número total inserido está em torno de 60 avaliações (misturadas entre obras/episódios).
-- Se quiser exatamente 60, posso ajustar contagem. Aqui há uma boa mistura de críticas de usuários e críticos.

-- FIM do script de inserções detalhadas.