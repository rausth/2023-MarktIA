CREATE TABLE `address` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `federation_id` INT NOT NULL,
    `district` VARCHAR(45) NOT NULL,
    `public_place` VARCHAR(45) NOT NULL,
    `number` VARCHAR(15) NOT NULL,
    `complement` VARCHAR(45)
);

INSERT INTO `address` (`federation_id`, `district`, `public_place`, `number`)
VALUES (3164, 'Jardim Camburi', 'Rua Teófilo Costa', '310');

INSERT INTO `address` (`federation_id`, `district`, `public_place`, `number`)
VALUES (3164, 'Jardim Camburi', 'Rua dos Inconfidentes', '106');