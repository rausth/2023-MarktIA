/*CREATE SCHEMA IF NOT EXISTS `Marktia` DEFAULT CHARACTER SET utf8;*/

USE `Marktia`;

CREATE TABLE `Marktia`.`Prestador` (
  `IdPrestador` INT NOT NULL AUTO_INCREMENT,
  `CNPJ` VARCHAR(14) NOT NULL,
  `CPF` VARCHAR(11) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Senha` VARCHAR(16) NULL,
  `is_ativo` Boolean NULL DEFAULT 1,
  `dt_criacao` datetime DEFAULT CURRENT_TIMESTAMP,
  `dt_autalizacao` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdPrestador`, `CNPJ`, `CPF`));

CREATE TABLE `Marktia`.`Consumidor` (
  `IdConsumidor` INT NOT NULL AUTO_INCREMENT,
  `CNPJ` VARCHAR(14) NOT NULL,
  `CPF` VARCHAR(11) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Senha` VARCHAR(16) NOT NULL,
   `is_ativo` Boolean NULL DEFAULT 1,
  `dt_criacao` datetime DEFAULT CURRENT_TIMESTAMP,
  `dt_autalizacao` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdConsumidor`, `CNPJ`, `CPF`));


CREATE TABLE `Marktia`.`Cadastro` (
  `IdCadastro` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(100) NOT NULL,
  `IdPrestador` INT NOT NULL,
  `IdConsumidor` INT NOT NULL,
  `Telefone` VARCHAR(15) NOT NULL,
  `CodigoMunicipio` INT NOT NULL,
  `CodUF` VARCHAR(45) NOT NULL,
  `Lagadouro` VARCHAR(45) NOT NULL,
  `Bairro` VARCHAR(45) NOT NULL,
  `Numero` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`IdCadastro`)
    FOREIGN KEY (`IdConsumidor`)
    FOREIGN KEY (`IdPrestador`)
    REFERENCES `Marketia`.`Consumidor` (`IdConsumidor`)
    REFERENCES `Marketia`.`Prestador` (`IdPrestador`)
);


CREATE TABLE `Marktia`.`Servicos` (
  `IdServicos` INT NOT NULL AUTO_INCREMENT,
  `IdPrestador` INT NOT NULL,
  `CODIGO` INT NOT NULL,
  `TITULO` VARCHAR(99) NOT NULL,
  PRIMARY KEY (`IdServicos`)
    FOREIGN KEY (`IdPrestador`)
    REFERENCES `Marketia`.`Prestador` (`IdPrestador`)
);

CREATE TABLE `Marktia`.`Agendamento` (
  `IdAgendamento` INT NOT NULL AUTO_INCREMENT,
  `IdServicos` INT NOT NULL,
  `IdConsumidor` INT NOT NULL,
  `IdPrestador` INT NOT NULL,
  `IdPagamento` INT NOT NULL,
  `IdMensagem` INT NOT NULL,
  `Data` DATETIME NOT NULL,
  `Bairro` VARCHAR(50) NOT NULL,
  `Cidade` VARCHAR(99) NOT NULL,
  `UF` VARCHAR(2) NOT NULL,
  `Lagadouro` VARCHAR(45) NOT NULL,
  `Numero` VARCHAR(15) NOT NULL,
  `CEP` INT NOT NULL,
  PRIMARY KEY (`IdAgendamento`)
    FOREIGN KEY (`IdServicos`)
    FOREIGN KEY (`IdPrestador`)
    FOREIGN KEY (`IdPagamentorvicos`)
    FOREIGN KEY (`IdConsumidor`)
    REFERENCES `Marketia`.`Servicos` (`IdServicos`)
    REFERENCES `Marketia`.`Prestador` (`IdPrestador`)
    REFERENCES `Marketia`.`Pagamento` (`IdPagamento`)
    REFERENCES `Marketia`.`Consumidor` (`IdConsumidor`)
    );


CREATE TABLE `Marktia`.`Mensagem` (
  `IdMensagem` INT NOT NULL AUTO_INCREMENT,
  `Mensagem` VARCHAR(1000) NULL,
  `IdAgendamento` INT NOT NULL,
  PRIMARY KEY (`IdMensagem`)  
    FOREIGN KEY (`IdAgendamento`)
    REFERENCES `Marketia`.`Agendamento` (`IdAgendamento`)

    );

CREATE TABLE `Marktia`.`Pagamento` (
  `IdPagamento` INT NOT NULL AUTO_INCREMENT,
  `IdAgendamento` VARCHAR(45) NOT NULL,
  `TipoPagamento` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`IdPagamento`)
    FOREIGN KEY (`IdAgendamento`)
    REFERENCES `Marketia`.`Agendamento` (`IdAgendamento`)

  );

CREATE TABLE `Marktia`.`Rank` (
  `IdRank` INT NOT NULL AUTO_INCREMENT,
  `IdConsumidor` INT NOT NULL,
  `IdPrestador` INT NOT NULL,
  `IdAgendamento` INT NOT NULL,
  `IdServicos` INT NOT NULL,
  `Nota` INT NULL,
  `Descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`IdRank`)
     FOREIGN KEY (`IdServicos`)
    FOREIGN KEY (`IdPrestador`)
    FOREIGN KEY (`IdPagamentorvicos`)
    FOREIGN KEY (`IdConsumidor`)
    REFERENCES `Marketia`.`Servicos` (`IdServicos`)
    REFERENCES `Marketia`.`Prestador` (`IdPrestador`)
    REFERENCES `Marketia`.`Pagamento` (`IdPagamento`)
    REFERENCES `Marketia`.`Consumidor` (`IdConsumidor`)
);


