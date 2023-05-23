USE `Marktia`;

CREATE TABLE `federation` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `uf` INT NOT NULL,
    `nome_uf` VARCHAR(20) NOT NULL,
    `regiao_geografica_intermediaria` INT NOT NULL,
    `nome_regiao_geografica_intermediaria` VARCHAR(50) NOT NULL,
    `regiao_geografica_imediata` INT NOT NULL,
    `nome_regiao_geografica_imediata` VARCHAR(50) NOT NULL,
    `mesorregiao_geografica` INT NOT NULL,
    `nome_mesorregiao` VARCHAR(50) NOT NULL,
    `microrregiao_geografica` INT NOT NULL,
    `nome_microrregiao` VARCHAR(50) NOT NULL,
    `municipio` INT NOT NULL,
    `codigo_municipio_completo` INT NOT NULL,
    `nome_municipio` VARCHAR(50) NOT NULL
);

CREATE TABLE `address` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `state` VARCHAR(45) NOT NULL,
    `county` VARCHAR(45) NOT NULL,
    `district` VARCHAR(45) NOT NULL,
    `public_place` VARCHAR(45) NOT NULL,
    `number` VARCHAR(15) NOT NULL
);

INSERT INTO `address` (`state`, `county`, `district`, `public_place`, `number`)
VALUES ('ES', 'Vitória', 'Jardim Camburi', 'Rua Teófilo Costa', '310');