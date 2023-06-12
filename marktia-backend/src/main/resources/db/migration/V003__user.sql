CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(45) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL UNIQUE,
    `cnpj` VARCHAR(14) UNIQUE,
    `telephone` VARCHAR(15) NOT NULL,
    `address_id` INT NOT NULL,
    `role` INT NOT NULL,
    `dt_creation` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `dt_update` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
);

INSERT INTO `user` (name, email, password, cpf, telephone, address_id, role)
VALUES ('Fernando', 'fernando@gmail.com', '123456', '14772898794', '27998278371', 1, 1);

INSERT INTO `user` (name, email, password, cpf, telephone, address_id, role)
VALUES ('Enzo', 'enzo@gmail.com', '123456', '14772898795', '27998278371', 2, 1);