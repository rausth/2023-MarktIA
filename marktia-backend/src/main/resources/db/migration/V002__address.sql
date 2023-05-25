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