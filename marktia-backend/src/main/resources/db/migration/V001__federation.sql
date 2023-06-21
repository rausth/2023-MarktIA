USE `marktia`;

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