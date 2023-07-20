CREATE TABLE `address` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `state` VARCHAR(45) NOT NULL,
    `city` VARCHAR(45) NOT NULL,
    `district` VARCHAR(45) NOT NULL,
    `public_place` VARCHAR(45) NOT NULL,
    `number` VARCHAR(15) NOT NULL,
    `complement` VARCHAR(45)
);

INSERT INTO `address` (`state`, `city`, `district`, `public_place`, `number`)
VALUES ("Espírito Santo", "Vitória", 'Jardim Camburi', 'Rua Teófilo Costa', '310');

INSERT INTO `address` (`state`, `city`, `district`, `public_place`, `number`)
VALUES ("Espírito Santo", "Vitória", 'Jardim Camburi', 'Rua dos Inconfidentes', '106');