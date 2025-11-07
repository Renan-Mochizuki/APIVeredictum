
CREATE TYPE tipoUsuario AS ENUM ('comum', 'critico', 'moderador');

CREATE TABLE Obra (
    obraId serial PRIMARY KEY,
    obraTitulo varchar(150) not null,
    obraDescricao varchar(200),
    obraTipoObraNome varchar(12) not null,
    obraCreatedAt timestamptz default now(),
    obraUpdatedAt timestamptz default now()
);

CREATE TABLE PaisOrigem (
    paisNome varchar(47) PRIMARY KEY
);

CREATE TABLE Profissional (
    profNome varchar(100) PRIMARY KEY
);

CREATE TABLE Funcao (
    funcTipo varchar(100) PRIMARY KEY
);

CREATE TABLE Participacao (
    partId serial PRIMARY KEY,
    partObraId integer not null,
    partFuncaoId varchar(100) not null,
    partOrganizacaoId varchar(100),
    partProfissionalId varchar(100)
);

CREATE TABLE Organizacao (
    orgaNome varchar(100) PRIMARY KEY
);

CREATE TABLE TipoObra (
    tipoNome varchar(12) PRIMARY KEY
);

CREATE TABLE Categoria (
    cateNome varchar(30) PRIMARY KEY
);

CREATE TABLE ListaUsuario (
    listId serial PRIMARY KEY,
    listTitulo varchar(100) not null,
    listDescricao varchar(200),
    listPrivado boolean default true,
    listUsuarioId integer not null,
    listCreatedAt timestamptz default now(),
    listUpdatedAt timestamptz default now()
);

CREATE TABLE Usuario (
    usuaId serial PRIMARY KEY,
    usuaApelido varchar(30) not null unique,
    usuaEmail varchar(255) not null unique,
    usuaSalt char(32) not null,
    usuaHash char(64) not null,
    usuaPerfilImg bytea,
    usuaTipo tipoUsuario not null default 'comum',
    usuaCreatedAt timestamptz default now(),
    usuaUpdatedAt timestamptz default now()
);

CREATE TABLE Temporada (
    tempId serial PRIMARY KEY,
    tempNumero integer not null,
    tempTitulo varchar(100),
    tempDataInicio date not null,
    tempDataFim date not null,
    tempDescricao varchar(150),
    tempImg bytea,
    tempObraId integer not null,
    tempCreatedAt timestamptz default now(),
    tempUpdatedAt timestamptz default now()
);

CREATE TABLE Episodio (
    episId serial PRIMARY KEY,
    episNumero integer not null,
    episDataLancamento date not null,
    episTitulo varchar(100) not null,
    episDescricao varchar(200) not null,
    episTemporadaId integer not null,
    episCreatedAt timestamptz default now(),
    episUpdatedAt timestamptz default now()
);

CREATE TABLE Avaliacao (
    avalId serial PRIMARY KEY,
    avalNota integer not null check (avalNota >= 0),
    avalComentario varchar(500),
    avalUsuarioId integer not null,
    avalObraId integer,
    avalEpisodioId integer,
    avalCreatedAt timestamptz default now(),
    avalUpdatedAt timestamptz default now()
);

CREATE TABLE Critico (
    usuaId serial PRIMARY KEY,
    critNome varchar(100) not null,
    critBio varchar(300) not null,
    critLinkWebsite varchar(50),
    critLinkRedeSocial varchar(50),
    critEmailProfissional varchar(255)
);

CREATE TABLE Moderador (
    usuaId serial PRIMARY KEY,
    modePermissaoCatalogo boolean not null default false,
    modePermissaoComunidade boolean not null default false,
    modePermissaoVerificacao boolean not null default false
);

CREATE TABLE Obra_Categoria (
    obraId integer not null,
    categoriaId varchar(30) not null
);

CREATE TABLE Obra_PaisOrigem (
    obraId integer not null,
    paisOrigemId varchar(47) not null
);

CREATE TABLE Obra_ListaUsuario (
    obraId integer not null,
    listaUsuarioId integer not null
);
 
ALTER TABLE Obra ADD CONSTRAINT FK_Obra_2
    FOREIGN KEY (obraTipoObraNome)
    REFERENCES TipoObra (tipoNome)
    ON DELETE CASCADE;
 
ALTER TABLE Participacao ADD CONSTRAINT FK_Participacao_2
    FOREIGN KEY (partObraId)
    REFERENCES Obra (obraId)
    ON DELETE RESTRICT;
 
ALTER TABLE Participacao ADD CONSTRAINT FK_Participacao_3
    FOREIGN KEY (partOrganizacaoId)
    REFERENCES Organizacao (orgaNome)
    ON DELETE SET NULL;
 
ALTER TABLE Participacao ADD CONSTRAINT FK_Participacao_4
    FOREIGN KEY (partFuncaoId)
    REFERENCES Funcao (funcTipo)
    ON DELETE CASCADE;
 
ALTER TABLE Participacao ADD CONSTRAINT FK_Participacao_5
    FOREIGN KEY (partProfissionalId)
    REFERENCES Profissional (profNome)
    ON DELETE SET NULL;
 
ALTER TABLE ListaUsuario ADD CONSTRAINT FK_ListaUsuario_2
    FOREIGN KEY (listUsuarioId)
    REFERENCES Usuario (usuaId)
    ON DELETE CASCADE;
 
ALTER TABLE Temporada ADD CONSTRAINT FK_Temporada_2
    FOREIGN KEY (tempObraId)
    REFERENCES Obra (obraId)
    ON DELETE CASCADE;
 
ALTER TABLE Episodio ADD CONSTRAINT FK_Episodio_2
    FOREIGN KEY (episTemporadaId)
    REFERENCES Temporada (tempId)
    ON DELETE CASCADE;
 
ALTER TABLE Avaliacao ADD CONSTRAINT FK_Avaliacao_1
    FOREIGN KEY (avalObraId)
    REFERENCES Obra (obraId)
    ON DELETE SET NULL;
 
ALTER TABLE Avaliacao ADD CONSTRAINT FK_Avaliacao_2
    FOREIGN KEY (avalUsuarioId)
    REFERENCES Usuario (usuaId)
    ON DELETE CASCADE;
 
ALTER TABLE Avaliacao ADD CONSTRAINT FK_Avaliacao_3
    FOREIGN KEY (avalEpisodioId)
    REFERENCES Episodio (episId)
    ON DELETE SET NULL;
 
ALTER TABLE Critico ADD CONSTRAINT FK_Critico_2
    FOREIGN KEY (usuaId)
    REFERENCES Usuario (usuaId)
    ON DELETE CASCADE;
 
ALTER TABLE Moderador ADD CONSTRAINT FK_Moderador_2
    FOREIGN KEY (usuaId)
    REFERENCES Usuario (usuaId)
    ON DELETE CASCADE;
 
ALTER TABLE Obra_Categoria ADD CONSTRAINT FK_Obra_Categoria_1
    FOREIGN KEY (categoriaId)
    REFERENCES Categoria (cateNome)
    ON DELETE RESTRICT;
 
ALTER TABLE Obra_Categoria ADD CONSTRAINT FK_Obra_Categoria_2
    FOREIGN KEY (obraId)
    REFERENCES Obra (obraId)
    ON DELETE SET NULL;
 
ALTER TABLE Obra_PaisOrigem ADD CONSTRAINT FK_Obra_PaisOrigem_1
    FOREIGN KEY (paisOrigemId)
    REFERENCES PaisOrigem (paisNome)
    ON DELETE RESTRICT;
 
ALTER TABLE Obra_PaisOrigem ADD CONSTRAINT FK_Obra_PaisOrigem_2
    FOREIGN KEY (obraId)
    REFERENCES Obra (obraId)
    ON DELETE SET NULL;
 
ALTER TABLE Obra_ListaUsuario ADD CONSTRAINT FK_Obra_ListaUsuario_1
    FOREIGN KEY (listaUsuarioId)
    REFERENCES ListaUsuario (listId)
    ON DELETE SET NULL;
 
ALTER TABLE Obra_ListaUsuario ADD CONSTRAINT FK_Obra_ListaUsuario_2
    FOREIGN KEY (obraId)
    REFERENCES Obra (obraId)
    ON DELETE SET NULL;